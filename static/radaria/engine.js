/**
 * Moteur de recommandation du Radar IA.
 *
 * Le module est volontairement pur (aucun accès au DOM) afin de pouvoir être
 * exécuté tel quel par les tests de scénarios (`tests/scenarios.test.mjs`).
 *
 * Chaîne de traitement :
 *
 *   réponses → filtres d'exclusion → outils admissibles → score → classement → affichage
 *
 * Étape A (admissibilité) et étape B (classement) sont strictement séparées :
 * un outil écarté à l'étape A ne peut plus réapparaître, quel que soit son score.
 */

export const DEFAULT_LIMITS = {
  primary: 3,
  secondary: 3,
};

/* ------------------------------------------------------------------ étape A */

function ruleApplies(rule, answers) {
  const answer = answers[rule.when.questionId];
  return Boolean(answer) && rule.when.optionIds.includes(answer);
}

function toolSatisfies(rule, tool, optionId) {
  const requirement = rule.require;

  switch (requirement.type) {
    case "flagTrue":
      return tool[requirement.field] === true;
    case "flagFalse":
      return tool[requirement.field] !== true;
    case "listIncludesOption":
      return Array.isArray(tool[requirement.field]) && tool[requirement.field].includes(optionId);
    case "listIncludesValue": {
      const expected = requirement.valueByOption?.[optionId];
      if (!expected) {
        return true;
      }
      return Array.isArray(tool[requirement.field]) && tool[requirement.field].includes(expected);
    }
    default:
      console.warn(`Type de règle d'admissibilité inconnu : ${requirement.type}`);
      return true;
  }
}

function pickByOption(rule, keys, optionId) {
  for (const key of keys) {
    const value = rule[key];
    if (typeof value === "string") {
      return value;
    }
    if (value && typeof value === "object" && value[optionId]) {
      return value[optionId];
    }
  }
  return "";
}

/**
 * Applique les règles d'admissibilité actives.
 * `ignoredRuleIds` permet d'assouplir certaines règles quand aucun outil ne survit.
 */
function applyFilters(tools, rules, answers, ignoredRuleIds = []) {
  const activeRules = rules
    .filter((rule) => ruleApplies(rule, answers))
    .filter((rule) => !ignoredRuleIds.includes(rule.id))
    .sort((left, right) => right.priority - left.priority);

  const admissible = [];
  const excluded = [];

  tools.forEach((tool) => {
    const matchedRules = [];
    let blockingRule = null;

    for (const rule of activeRules) {
      const optionId = answers[rule.when.questionId];

      if (toolSatisfies(rule, tool, optionId)) {
        matchedRules.push({
          id: rule.id,
          badge: rule.badge,
          reason: pickByOption(rule, ["reasonByOption", "reason"], optionId),
        });
        continue;
      }

      blockingRule = {
        id: rule.id,
        badge: rule.badge,
        reason: pickByOption(rule, ["rejectionByOption", "rejection"], optionId),
      };
      break;
    }

    if (blockingRule) {
      excluded.push({ tool, rule: blockingRule });
    } else {
      admissible.push({ tool, matchedRules });
    }
  });

  return { admissible, excluded, activeRules };
}

/* ------------------------------------------------------------------ étape B */

/**
 * Départage des égalités de score (§5, critère « qualité de la recherche »).
 * À score égal, un outil qui laisse passer moins de revues douteuses passe devant.
 * Ce signal ne modifie jamais le score : il n'intervient qu'entre ex æquo.
 */
function qualitySignal(tool) {
  switch (tool.doubtfulReviews) {
    case "Non":
      return 2;
    case "Peu":
      return 1;
    case "Oui":
      return 0;
    default:
      return 1;
  }
}

function buildScoreLookup(rules) {
  const lookup = new Map();
  rules.forEach((rule) => {
    lookup.set(`${rule.questionId}:${rule.optionId}`, rule.effects);
  });
  return lookup;
}

function scoreTool(tool, answers, scoreLookup, questions) {
  let score = 0;
  const contributions = [];

  Object.entries(answers).forEach(([questionId, optionId]) => {
    const effects = scoreLookup.get(`${questionId}:${optionId}`) || [];
    effects.forEach((effect) => {
      if (effect.toolId !== tool.id) {
        return;
      }
      score += effect.delta;
      contributions.push({
        ...effect,
        questionId,
        optionId,
        questionTitle: questions.find((item) => item.id === questionId)?.title || questionId,
      });
    });
  });

  return {
    score,
    contributions,
    positiveReasons: contributions
      .filter((item) => item.delta > 0)
      .sort((left, right) => right.delta - left.delta),
    negativeReasons: contributions
      .filter((item) => item.delta < 0)
      .sort((left, right) => left.delta - right.delta),
  };
}

/**
 * Justification affichée sous chaque recommandation (§7).
 * Elle est construite à partir des critères qui ont réellement joué : le motif de
 * pondération le plus fort (propre à l'outil) d'abord, puis les règles d'admissibilité
 * franchies. Le motif propre à l'outil passe en premier pour ne jamais être écarté par
 * la limite de 3 lignes : sinon, deux outils admis par les mêmes règles afficheraient
 * exactement la même justification générique.
 */
function buildJustification(entry) {
  const parts = [];

  const strongest = entry.positiveReasons[0];
  if (strongest) {
    parts.push(strongest.reason);
  }

  entry.matchedRules.forEach((rule) => {
    if (rule.reason && !parts.some((part) => sameText(part, rule.reason))) {
      parts.push(rule.reason);
    }
  });

  if (parts.length === 0) {
    parts.push(entry.tool.defaultReason);
  }

  return parts.slice(0, 3);
}

function sameText(left, right) {
  const normalize = (value) =>
    String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  return normalize(left) === normalize(right);
}

/* ------------------------------------------------------------------ public */

export function evaluate({
  tools,
  questions,
  scoringRules,
  eligibilityRules,
  answers,
  limits = DEFAULT_LIMITS,
}) {
  const scoreLookup = buildScoreLookup(scoringRules);
  const answeredCount = Object.keys(answers).length;

  // Étape A — admissibilité, avec assouplissement progressif si l'ensemble est vide.
  let ignoredRuleIds = [];
  let relaxedRules = [];
  let result = applyFilters(tools, eligibilityRules, answers, ignoredRuleIds);

  const relaxationOrder = eligibilityRules
    .filter((rule) => rule.relaxable && ruleApplies(rule, answers))
    .sort((left, right) => left.priority - right.priority);

  for (const rule of relaxationOrder) {
    if (result.admissible.length > 0) {
      break;
    }
    ignoredRuleIds = [...ignoredRuleIds, rule.id];
    relaxedRules = [
      ...relaxedRules,
      { id: rule.id, badge: rule.badge, questionId: rule.when.questionId },
    ];
    result = applyFilters(tools, eligibilityRules, answers, ignoredRuleIds);
  }

  // Étape B — classement des seuls outils admissibles.
  const ranked = result.admissible
    .map((entry, defaultIndex) => {
      const scored = scoreTool(entry.tool, answers, scoreLookup, questions);
      return { ...entry, ...scored, defaultIndex };
    })
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }
      const quality = qualitySignal(right.tool) - qualitySignal(left.tool);
      if (quality !== 0) {
        return quality;
      }
      if (right.positiveReasons.length !== left.positiveReasons.length) {
        return right.positiveReasons.length - left.positiveReasons.length;
      }
      return left.defaultIndex - right.defaultIndex;
    })
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
      justification: buildJustification(entry),
    }));

  const criteria = result.activeRules.map((rule) => ({
    id: rule.id,
    badge: rule.badge,
    summary: pickByOption(rule, ["summaryByOption", "summary"], answers[rule.when.questionId]),
  }));

  return {
    answeredCount,
    ranked,
    primary: ranked.slice(0, limits.primary),
    secondary: ranked.slice(limits.primary, limits.primary + limits.secondary),
    excluded: result.excluded,
    criteria,
    relaxedRules,
    // Un outil retiré à l'étape A n'apparaît jamais dans `ranked` : les sections
    // « principales » et « autres outils » sont deux tranches du même ensemble admissible.
    admissibleIds: ranked.map((entry) => entry.tool.id),
  };
}
