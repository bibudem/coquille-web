import { evaluate } from "./engine.js";

const state = {
  tools: [],
  questions: [],
  scoringRules: [],
  eligibilityRules: [],
  answers: {},
  currentQuestionIndex: 0,
  evaluation: null,
};

const elements = {
  questionnaireStatus: document.querySelector("#questionnaire-status"),
  questionnaireProgress: document.querySelector("#questionnaire-progress"),
  progressFill: document.querySelector("#progress-fill"),
  steps: document.querySelector("#steps"),
  questionnaire: document.querySelector("#questionnaire"),
  recommendationsEmpty: document.querySelector("#recommendations-empty"),
  primaryHeading: document.querySelector("#primary-heading"),
  cardsGrid: document.querySelector("#cards-grid"),
  secondarySection: document.querySelector("#secondary-section"),
  secondaryHeading: document.querySelector("#secondary-heading"),
  secondaryGrid: document.querySelector("#secondary-grid"),
  selectionSummary: document.querySelector("#selection-summary"),
  criteriaBadges: document.querySelector("#criteria-badges"),
  relaxationNotice: document.querySelector("#relaxation-notice"),
  editAnswersBtn: document.querySelector("#edit-answers-btn"),
  restartBtn: document.querySelector("#restart-btn"),
};

const cardRegistry = new Map();

document.addEventListener("DOMContentLoaded", init);

const EXTERNAL_LINK_ICON = `
  <svg class="external-link-icon" aria-hidden="true" viewBox="0 0 24 24" width="16" height="16">
    <path d="M14 4h6v6" />
    <path d="M10 14 20 4" />
    <path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5" />
  </svg>
`;

const UDEM_AI_GUIDE_LICENSE_URL =
  "https://boite-outils.bib.umontreal.ca/trouver-evaluer/iag?p=5425689";

async function init() {
  bindEvents();

  try {
    const [tools, questions, scoring, eligibility] = await Promise.all([
      fetchJson("data/tools.json"),
      fetchJson("data/questions.json"),
      fetchJson("data/scoring.json"),
      fetchJson("data/eligibility.json"),
    ]);

    state.tools = tools;
    state.questions = questions;
    state.scoringRules = scoring.rules;
    state.eligibilityRules = eligibility.rules;

    recompute();
    renderAll();
  } catch (error) {
    console.error(error);
    renderError(
      "Les données JSON n'ont pas pu être chargées. Lancez un serveur local dans le dossier du projet pour permettre au navigateur de lire `data/*.json`."
    );
  }
}

function bindEvents() {
  elements.steps.addEventListener("click", (event) => {
    const button = event.target.closest("[data-step-index]");
    if (!button) {
      return;
    }

    state.currentQuestionIndex = Number(button.dataset.stepIndex);
    renderQuestionnaire();
    focusCurrentQuestionHeading();
  });

  elements.questionnaire.addEventListener("click", (event) => {
    const optionButton = event.target.closest("[data-option-id]");
    if (!optionButton) {
      return;
    }

    const questionId = optionButton.dataset.questionId;
    const optionId = optionButton.dataset.optionId;
    handleAnswer(questionId, optionId);
  });

  elements.questionnaire.addEventListener("keydown", (event) => {
    const optionButton = event.target.closest("[data-option-id]");
    if (!optionButton) {
      return;
    }

    const navigationKeys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
    if (!navigationKeys.includes(event.key)) {
      return;
    }

    event.preventDefault();
    focusSiblingOption(optionButton, event.key);
  });

  elements.editAnswersBtn.addEventListener("click", () => {
    elements.questionnaire.scrollIntoView({ behavior: "smooth", block: "start" });
    focusCurrentQuestionHeading();
  });

  elements.restartBtn.addEventListener("click", () => {
    state.answers = {};
    state.currentQuestionIndex = 0;
    recompute();
    renderAll();
    elements.questionnaire.scrollIntoView({ behavior: "smooth", block: "start" });
    focusCurrentQuestionHeading();
  });
}

async function fetchJson(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Impossible de charger ${path}`);
  }

  return response.json();
}

function handleAnswer(questionId, optionId) {
  const currentQuestion = state.questions[state.currentQuestionIndex];
  const shouldAdvance =
    currentQuestion &&
    currentQuestion.id === questionId &&
    state.currentQuestionIndex < state.questions.length - 1;

  state.answers[questionId] = optionId;

  if (shouldAdvance) {
    state.currentQuestionIndex += 1;
  }

  recompute();
  renderAll();

  if (shouldAdvance) {
    focusCurrentQuestionHeading();
    return;
  }

  focusCurrentOption(questionId, optionId);
}

function recompute() {
  state.evaluation = evaluate({
    tools: state.tools,
    questions: state.questions,
    scoringRules: state.scoringRules,
    eligibilityRules: state.eligibilityRules,
    answers: state.answers,
  });
}

function renderAll() {
  renderMetrics();
  renderQuestionnaire();
  renderSelectionSummary();
  renderCriteriaBadges();
  renderRelaxationNotice();
  renderCards();
}

function renderMetrics() {
  const answeredCount = Object.keys(state.answers).length;
  const totalQuestions = state.questions.length;

  elements.questionnaireStatus.textContent =
    answeredCount === totalQuestions
      ? "Questionnaire complet. Ajustez librement les réponses."
      : "Les cartes se réordonnent à chaque réponse sélectionnée.";

  const progress = totalQuestions === 0 ? 0 : (answeredCount / totalQuestions) * 100;
  elements.progressFill.style.width = `${progress}%`;
  elements.questionnaireProgress.setAttribute("aria-valuenow", String(Math.round(progress)));
  elements.questionnaireProgress.setAttribute(
    "aria-valuetext",
    `${answeredCount} question${answeredCount > 1 ? "s" : ""} sur ${totalQuestions} répondue${
      answeredCount > 1 ? "s" : ""
    }`
  );
}

function renderQuestionnaire() {
  renderSteps();

  const question = state.questions[state.currentQuestionIndex];
  if (!question) {
    elements.questionnaire.innerHTML = "";
    return;
  }

  const selectedOptionId = state.answers[question.id];
  const questionTitleId = `question-${question.id}-title`;
  const questionDescriptionId = `question-${question.id}-description`;
  const optionsMarkup = question.options
    .map((option, optionIndex) => {
      const isSelected = option.id === selectedOptionId;
      const isTabbable = selectedOptionId ? isSelected : optionIndex === 0;
      const optionDescriptionId = `option-${question.id}-${option.id}-description`;
      return `
        <button
          class="option-card ${isSelected ? "is-selected" : ""}"
          type="button"
          data-question-id="${question.id}"
          data-option-id="${option.id}"
          data-option-index="${optionIndex}"
          role="radio"
          aria-checked="${isSelected ? "true" : "false"}"
          aria-describedby="${optionDescriptionId}"
          tabindex="${isTabbable ? "0" : "-1"}"
        >
          <p class="option-label">${option.label}</p>
          <p class="option-description" id="${optionDescriptionId}">${option.description}</p>
        </button>
      `;
    })
    .join("");

  elements.questionnaire.innerHTML = `
    <div class="question-stage-top">
      <div class="question-header">
        <div>
          <p class="question-kicker">Question</p>
          <h3 id="${questionTitleId}" tabindex="-1">${question.title}</h3>
          <p id="${questionDescriptionId}">${question.description}</p>
        </div>
        <div class="question-counter">
          ${state.currentQuestionIndex + 1}/${state.questions.length}
        </div>
      </div>
    </div>
    <div
      class="options-grid"
      role="radiogroup"
      aria-labelledby="${questionTitleId}"
      aria-describedby="${questionDescriptionId}"
    >
      ${optionsMarkup}
    </div>
  `;
}

function renderSteps() {
  const markup = state.questions
    .map((question, index) => {
      const selectedOption = getSelectedOption(question.id);
      const classes = [
        "step-button",
        index === state.currentQuestionIndex ? "is-current" : "",
        selectedOption ? "is-answered" : "",
      ]
        .filter(Boolean)
        .join(" ");

      return `
        <button
          class="${classes}"
          type="button"
          data-step-index="${index}"
          ${index === state.currentQuestionIndex ? 'aria-current="step"' : ""}
          aria-label="Question ${index + 1} sur ${state.questions.length} : ${
            question.title
          }. ${selectedOption ? `Réponse actuelle : ${selectedOption.label}.` : "Pas encore renseignée."}"
        >
          <span class="step-index">${index + 1}</span>
          <div>
            <p class="step-title">${question.title}</p>
            <p class="step-meta">${
              selectedOption ? selectedOption.label : "Pas encore renseignée"
            }</p>
          </div>
        </button>
      `;
    })
    .join("");

  elements.steps.innerHTML = markup;
}

function renderSelectionSummary() {
  const answeredCount = Object.keys(state.answers).length;

  if (answeredCount === 0) {
    elements.selectionSummary.textContent = "";
    return;
  }

  const evaluation = state.evaluation;
  const displayedCount = evaluation.primary.length + evaluation.secondary.length;

  if (displayedCount === 0) {
    elements.selectionSummary.textContent =
      "Aucun outil ne correspond à l'ensemble de vos critères actuels.";
    return;
  }

  elements.selectionSummary.textContent = `Nous avons retenu ${displayedCount} outil${
    displayedCount > 1 ? "s" : ""
  } particulièrement pertinent${displayedCount > 1 ? "s" : ""} selon vos réponses, parmi les ${
    state.tools.length
  } outils évalués.`;
}

function renderCriteriaBadges() {
  const criteria = state.evaluation?.criteria || [];

  if (criteria.length === 0) {
    elements.criteriaBadges.innerHTML = "";
    return;
  }

  elements.criteriaBadges.innerHTML = criteria
    .map(
      (criterion) => `
        <span class="criterion-badge" title="${criterion.summary || ""}">
          ${criterion.badge}
        </span>
      `
    )
    .join("");
}

function renderRelaxationNotice() {
  const relaxedRules = state.evaluation?.relaxedRules || [];

  if (relaxedRules.length === 0) {
    elements.relaxationNotice.hidden = true;
    elements.relaxationNotice.innerHTML = "";
    return;
  }

  const relaxedLabels = relaxedRules.map((rule) => rule.badge).join(", ");
  elements.relaxationNotice.hidden = false;
  elements.relaxationNotice.innerHTML = `
    <strong>Critères assouplis :</strong> aucun outil ne correspondait à tous les critères,
    nous avons donc assoupli : ${relaxedLabels}. La règle sur les documents sous licence des
    bibliothèques n'est jamais assouplie.
  `;
}

function renderEmptyState(message, helperText) {
  elements.recommendationsEmpty.hidden = false;
  elements.recommendationsEmpty.innerHTML = `
    <p class="recommendations-empty-title">${message}</p>
    <p class="helper-text">${helperText}</p>
  `;
  elements.primaryHeading.hidden = true;
  elements.cardsGrid.innerHTML = "";
  cardRegistry.clear();
  elements.secondarySection.hidden = true;
  elements.secondaryGrid.innerHTML = "";
}

function renderCards() {
  const answeredCount = Object.keys(state.answers).length;

  if (answeredCount === 0) {
    renderEmptyState(
      "Le radar attend un premier signal.",
      "Dès que vous répondez à une question, un classement des 3 meilleurs outils apparaît ici avec le profil de chaque outil et les raisons de son classement."
    );
    return;
  }

  const evaluation = state.evaluation;
  const primary = evaluation?.primary || [];
  const secondary = evaluation?.secondary || [];

  if (primary.length === 0) {
    renderEmptyState(
      "Aucun outil ne correspond à ces critères.",
      "Essayez d'ajuster vos réponses pour élargir la sélection."
    );
    return;
  }

  elements.recommendationsEmpty.hidden = true;
  elements.recommendationsEmpty.innerHTML = "";
  elements.primaryHeading.hidden = false;

  renderCardGroup(elements.cardsGrid, primary);
  renderCardGroup(elements.secondaryGrid, secondary);
  elements.secondarySection.hidden = secondary.length === 0;
  elements.secondaryHeading.textContent = `Autres outils à considérer (${secondary.length})`;
}

function renderCardGroup(grid, entries) {
  const firstRects = new Map();
  Array.from(grid.children).forEach((card) => {
    firstRects.set(card.dataset.toolId, card.getBoundingClientRect());
  });

  const fragment = document.createDocumentFragment();

  entries.forEach((entry) => {
    const card = cardRegistry.get(entry.tool.id) || createCard(entry.tool.id);
    updateCard(card, entry);
    fragment.appendChild(card);
  });

  grid.innerHTML = "";
  grid.appendChild(fragment);

  Array.from(grid.children).forEach((card) => {
    const firstRect = firstRects.get(card.dataset.toolId);
    const lastRect = card.getBoundingClientRect();

    if (!firstRect) {
      card.animate(
        [
          { opacity: 0, transform: "translateY(14px) scale(0.98)" },
          { opacity: 1, transform: "translateY(0) scale(1)" },
        ],
        {
          duration: 420,
          easing: "cubic-bezier(0.2, 0.7, 0.2, 1)",
        }
      );
      return;
    }

    const deltaX = firstRect.left - lastRect.left;
    const deltaY = firstRect.top - lastRect.top;

    if (deltaX !== 0 || deltaY !== 0) {
      card.animate(
        [
          { transform: `translate(${deltaX}px, ${deltaY}px)` },
          { transform: "translate(0, 0)" },
        ],
        {
          duration: 520,
          easing: "cubic-bezier(0.2, 0.7, 0.2, 1)",
        }
      );
    }
  });
}

function createCard(toolId) {
  const card = document.createElement("article");
  card.className = "tool-card";
  card.dataset.toolId = toolId;
  cardRegistry.set(toolId, card);
  return card;
}

function updateCard(card, entry) {
  const institutionalBadge = renderInstitutionalBadge(entry.tool);
  const institutionalAccessNote = renderInstitutionalAccessNote(entry.tool);
  const privacyWarning = renderPrivacyWarning(entry.tool);
  const toolFacts = [
    ["Corpus", entry.tool.corpus],
    ["Recherche", entry.tool.ragScope],
    ["Sortie", entry.tool.outputs.join(" + ")],
  ]
    .map(
      ([label, value]) => `
        <div>
          <dt>${label}</dt>
          <dd>${value}</dd>
        </div>
      `
    )
    .join("");

  const justificationMarkup = `
    <div class="why-this-tool">
      <p class="why-this-tool-title">Pourquoi cet outil ?</p>
      <ul>
        ${entry.justification.map((reason) => `<li>${reason}</li>`).join("")}
      </ul>
    </div>
  `;

  const isFeatured = entry.rank === 1;

  card.dataset.rank = String(entry.rank);
  card.classList.toggle("tool-card--featured", isFeatured);
  card.style.setProperty("--tool-accent", entry.tool.accent);
  card.innerHTML = `
    <div class="card-top">
      <div>
        <div class="badge-row">
          <span class="rank-badge">#${entry.rank}</span>
          ${isFeatured ? '<span class="featured-badge">Meilleure recommandation</span>' : ""}
        </div>
        <p class="tool-category">${entry.tool.category}</p>
      </div>
      <div>
        ${institutionalBadge}
      </div>
    </div>

    <div class="card-body">
      <div class="card-primary">
        <div>
          <h3 class="tool-name">${entry.tool.name}</h3>
          <p class="tool-tagline">${entry.tool.tagline}</p>
        </div>

        <p class="tool-summary">${entry.tool.bestFor}</p>
        ${justificationMarkup}
        ${institutionalAccessNote}
        ${privacyWarning}
      </div>

      <div class="card-side">
        <dl class="tool-facts">
          ${toolFacts}
        </dl>
        <a class="tool-link ${isFeatured ? "tool-link--primary" : ""}" href="${entry.tool.url}" target="_blank" rel="noreferrer">
          <span>Ouvrir ${entry.tool.name}</span>
          <span class="sr-only">, ouvre dans un nouvel onglet</span>
          ${EXTERNAL_LINK_ICON}
        </a>
      </div>
    </div>
  `;
}

function renderInstitutionalBadge(tool) {
  if (!tool.institutionalLicense) {
    return "";
  }

  const label = tool.licenseLabel || "Licence institutionnelle UdeM";
  return `
    <a
      class="license-badge"
      href="${UDEM_AI_GUIDE_LICENSE_URL}"
      target="_blank"
      rel="noreferrer"
      title="Consulter le guide des bibliothèques sur les fonctionnalités d'IA incluses dans les licences institutionnelles"
    >
      ${label}
      <span class="sr-only">, ouvre dans un nouvel onglet</span>
    </a>
  `;
}

function renderInstitutionalAccessNote(tool) {
  if (!tool.institutionalAccessNote) {
    return "";
  }

  return `
    <p class="access-note">
      ${tool.institutionalAccessNote}
      <a href="${UDEM_AI_GUIDE_LICENSE_URL}" target="_blank" rel="noreferrer">
        Voir les consignes d’accès.
        <span class="sr-only">, ouvre dans un nouvel onglet</span>
      </a>
    </p>
  `;
}

function renderPrivacyWarning(tool) {
  if (!tool.privacyWarning) {
    return "";
  }

  return `
    <p class="privacy-warning">
      <strong>Avertissement :</strong>
      ${tool.privacyWarning}
    </p>
  `;
}

function renderError(message) {
  elements.questionnaireStatus.textContent = "Erreur de chargement";
  elements.questionnaire.innerHTML = `<p class="helper-text">${message}</p>`;
  elements.primaryHeading.hidden = true;
  elements.recommendationsEmpty.hidden = false;
  elements.recommendationsEmpty.innerHTML = `<p class="helper-text">${message}</p>`;
  elements.cardsGrid.innerHTML = "";
  elements.secondaryGrid.innerHTML = "";
  elements.secondarySection.hidden = true;
}

function focusCurrentQuestionHeading() {
  const heading = elements.questionnaire.querySelector("h3");
  if (!heading) {
    return;
  }

  heading.focus({ preventScroll: true });
}

function focusCurrentOption(questionId, optionId) {
  const optionButton = elements.questionnaire.querySelector(
    `[data-question-id="${questionId}"][data-option-id="${optionId}"]`
  );

  if (!optionButton) {
    return;
  }

  optionButton.focus({ preventScroll: true });
}

function focusSiblingOption(currentOption, key) {
  const options = Array.from(
    elements.questionnaire.querySelectorAll(
      `[data-question-id="${currentOption.dataset.questionId}"][data-option-id]`
    )
  );

  if (options.length === 0) {
    return;
  }

  const currentIndex = options.indexOf(currentOption);
  const lastIndex = options.length - 1;
  let nextIndex = currentIndex;

  if (key === "Home") {
    nextIndex = 0;
  } else if (key === "End") {
    nextIndex = lastIndex;
  } else if (key === "ArrowRight" || key === "ArrowDown") {
    nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
  } else if (key === "ArrowLeft" || key === "ArrowUp") {
    nextIndex = currentIndex <= 0 ? lastIndex : currentIndex - 1;
  }

  options[nextIndex]?.focus({ preventScroll: true });
  options.forEach((option, index) => {
    option.tabIndex = index === nextIndex ? 0 : -1;
  });
}

function getSelectedOption(questionId) {
  const question = state.questions.find((item) => item.id === questionId);
  if (!question) {
    return null;
  }

  return (
    question.options.find((option) => option.id === state.answers[questionId]) || null
  );
}
