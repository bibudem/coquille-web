const HEADINGS = [
  { key: "tools", label: "Outil(s) d'intelligence artificielle", required: true, help: "Nom(s) de l'outil, version(s) et dates d'utilisation. Vous pouvez aussi indiquer les biais ou limites connus du ou des modèles.", placeholder: "Ex : ChatGPT o4-mini, Copilot, versions, dates d'utilisation, limites, biais..." },
  { key: "conceptualization", label: "Conceptualisation", placeholder: "Décrivez comment l'IAG a été utilisée pour le développement d'idées ou d'hypothèses de recherche, y compris la reformulation d’une question ou l’aide à trouver et exprimer une problématique." },
  { key: "methodology", label: "Méthodologie", placeholder: "Décrivez comment l'IAG a été utilisée pour la planification et la conception d’une étude ou l’élaboration du plan de méthodologie." },
  { key: "informationCollection", label: "Collection d'informations", placeholder: "Décrivez comment l'IAG a été utilisée pour faire l’état de la question et mettre en contexte la recherche, soit pour la revue de littérature, un sommaire d’articles, l’identification des concepts clés pour l’étude, le recadrage méthodologique, etc." },
  { key: "dataCollectionMethod", label: "Méthode de collecte des données", placeholder: "Décrivez comment l'IAG a été utilisée pour la gestion et l'organisation des données de recherche (ex. : nettoyage, classification ou tri)." },
  { key: "execution", label: "Exécution", placeholder: "Décrivez comment l'IAG a été utilisée pour l’exécution des tâches ou des processus de recherche (ex. : moissonnage, création de données synthétiques, etc.)." },
  { key: "dataCuration", label: "Curation de données", placeholder: "Décrivez comment l'IAG a été utilisée pour la curation des données pour la gestion et l'organisation des données de recherche (ex. : nettoyage, classification ou tri)." },
  { key: "dataAnalysis", label: "Analyse de données", placeholder: "Décrivez comment l'IAG a été utilisée pour la modélisation statistique et mathématique." },
  { key: "interpretation", label: "Interprétation", placeholder: "Décrivez comment l'IAG a été utilisée pour catégoriser, résumer ou manipuler les données afin d’identifier des tendances et suggérer des conclusions." },
  { key: "visualization", label: "Visualisation", placeholder: "Décrivez comment l'IAG a été utilisée pour créer des visualisations (ex. : graphiques, images, etc.) à partir des données." },
  { key: "writingEdit", label: "Rédaction - Révision et édition", placeholder: "Décrivez comment l'IAG a été utilisée pour la rédaction, la révision ou l'édition du manuscrit, incluant la réécriture, la correction ou l’amélioration du style." },
  { key: "writingTranslation", label: "Rédaction - Traduction", placeholder: "Décrivez comment l'IAG a été utilisée pour traduire un texte d'une langue à une autre." },
  { key: "projectAdmin", label: "Administration du projet", placeholder: "Décrivez comment l'IAG a été utilisée pour toute tâche administrative liée à l'étude, y compris la gestion des budgets, la gestion de projet et les communications." },
  { key: "privacySecurity", label: "Confidentialité et sécurité", rows: 7, placeholder: "Précisez comment la sécurité des données et la protection de la vie privée ont été respectées, conformément aux attentes en matière de conduite responsable de la recherche, aux lignes directrices disciplinaires et aux politiques institutionnelles. Ex. : Aucune information personnelle, sensible ou confidentielle n’a été partagée avec les outils d’IAg. Les outils d’IAg utilisés ne conservent aucunes des données des utilisateurs. Toutes les interactions ont respecté les directives institutionnelles en matière de confidentialité." }
];

function sanitize(text) {
  return (text || "").replace(/[:;]/g, "");
}

function AIDFrameworkSite() {
  const { useMemo, useState } = React;
  const [sections, setSections] = useState(() =>
    HEADINGS.reduce((acc, h) => { acc[h.key] = { enabled: h.required || false, text: "" }; return acc; }, {})
  );
  const [copied, setCopied] = useState(false);

  const aidStatement = useMemo(() => {
    const pairs = [];
    const tools = sanitize(sections.tools.text).trim();
    if (sections.tools.enabled && tools) {
      pairs.push(`Outil d'intelligence artificielle: ${tools}`);
    }
    HEADINGS.filter(h => h.key !== "tools").forEach(h => {
      const val = sanitize(sections[h.key].text).trim();
      if (sections[h.key].enabled && val) {
        pairs.push(`${h.label}: ${val}`);
      }
    });
    if (pairs.length === 0) return "";
    return `Déclaration DDIA: ${pairs.map((p, i) => i === pairs.length - 1 ? `${p}.` : `${p};`).join(" ")}`;
  }, [sections]);

  const handleToggle = (key) => {
    setSections(prev => ({...prev, [key]: { ...prev[key], enabled: !prev[key].enabled }}));
  };

  const handleText = (key, val) => {
    setSections(prev => ({...prev, [key]: { ...prev[key], text: val }}));
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(aidStatement);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error(e);
      alert("La copie a échoué. Sélectionnez le texte et copiez-le manuellement.");
    }
  };

  return (
    <div className="page-shell">
      <header className="hero">
        <div className="hero-brand">
          <a className="hero-logo-link" href="https://bib.umontreal.ca/" aria-label="Accueil des bibliothèques UdeM">
            <img className="hero-logo" src="logobib.svg" alt="" width="156" height="43" />
          </a>
        </div>
        <div className="hero-copy">
          <div className="hero-copy-text">
            <h1>Déclaration détaillée de l’utilisation de l’intelligence artificielle générative (DDIA)</h1>
            <p className="hero-text">
              Générateur interactif pour rédiger une déclaration DDIA.
            </p>
          </div>
          <a href="#about" className="hero-link">Pour en savoir plus sur cet outil</a>
        </div>
      </header>

      <main className="layout" id="main-content" tabIndex={-1}>
        <section id="builder" className="panel builder-panel" aria-labelledby="builder-title">
          <div className="section-head">
            <div>
              <p className="section-kicker">Zone de rédaction</p>
              <h2 id="builder-title">Rédigez votre déclaration DDIA</h2>
            </div>
            <p className="section-note">Les deux-points et les points-virgules sont supprimés automatiquement.</p>
          </div>

          <div className="builder-shell">
            <div className="fields-list">
              {HEADINGS.map(h => (
                <div key={h.key} className="field-card">
                  <div className="field-header">
                    <input
                      id={`chk-${h.key}`}
                      type="checkbox"
                      className="field-checkbox"
                      checked={sections[h.key].enabled}
                      aria-required={h.required ? "true" : undefined}
                      onChange={() => handleToggle(h.key)}
                    />
                    <label htmlFor={`chk-${h.key}`} id={`label-${h.key}`} className="field-label">
                      {h.label}
                      {h.required && (
                        <React.Fragment>
                          <span className="field-required" aria-hidden="true">*</span>
                          <span className="sr-only"> (obligatoire)</span>
                        </React.Fragment>
                      )}
                    </label>
                  </div>
                  {h.help && (
                    <p id={`help-${h.key}`} className="field-help">{h.help}</p>
                  )}
                  <textarea
                    id={`field-${h.key}`}
                    value={sections[h.key].text}
                    onChange={(e) => handleText(h.key, e.target.value)}
                    placeholder={h.placeholder || "Décrivez votre méthodologie pour cette étape."}
                    className="field-textarea"
                    rows={h.rows || 4}
                    aria-labelledby={`label-${h.key}`}
                    aria-describedby={h.help ? `help-${h.key}` : undefined}
                    aria-required={h.required ? "true" : undefined}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="panel preview-panel" aria-labelledby="preview-title">
          <div className="section-head">
            <div>
              <p className="section-kicker">Zone aperçu</p>
              <h2 id="preview-title">Aperçu de la déclaration</h2>
            </div>
            <button
              onClick={copyToClipboard}
              disabled={!aidStatement}
              className="ghost-button ghost-button--primary"
            >
              {copied ? "Copié !" : "Copier dans le presse-papiers"}
            </button>
          </div>
          <pre className="preview-box">
{aidStatement || "Commencez à remplir les champs à gauche pour générer votre déclaration DDIA."}
          </pre>
          <p className="preview-note">
            Collez cette déclaration à la fin de votre travail.
          </p>
          <span className="sr-only" role="status" aria-live="polite">
            {copied ? "Déclaration copiée dans le presse-papiers." : ""}
          </span>
        </section>

        <section id="about" className="panel about-panel" aria-labelledby="about-title">
          <div className="section-head">
            <div>
              <p className="section-kicker">À propos</p>
              <h2 id="about-title">À propos du DDIA</h2>
            </div>
          </div>

          <p>
            Le modèle de déclaration détaillée de l’utilisation de l’intelligence artificielle générative (DDIA) a été développé par Kari D. Weaver, bibliothécaire de l’Université de Waterloo. Elle s'est inspirée de la norme{" "}
            <a href="https://credit.niso.org/" target="_blank" rel="noopener noreferrer">CRediT</a>{" "}
            de la National Information Standard Organization (NISO) utilisée pour déclarer les rôles des contributeurs à une communication savante.
          </p>

          <div className="about-credit">
            <img className="about-credit-logo" src="logo-ets.svg" alt="" width="40" height="40" />
            <p>
              Traduction et adaptation en français réalisées par la Bibliothèque de l’École de technologie supérieure (ÉTS).
            </p>
          </div>

          <p>
            Le modèle de déclaration détaillée de l’utilisation de l’intelligence artificielle générative (DDIA) fournit un moyen concis et normalisé de divulguer la manière dont les outils d'IA générative ont été utilisés tout au long du processus de recherche et de rédaction. Il complète (mais ne remplace pas) les citations traditionnelles en capturant les rôles que l'IAG peut jouer, de la conceptualisation et l'analyse des données à la traduction et l'administration de projets, et encourage la clarté en matière de pratiques de confidentialité et de sécurité. Cette transparence aide les lecteurs, les évaluateurs et les enseignants à comprendre la nature et l'étendue de l'aide apportée par l'IA, ce qui favorise l'intégrité et la reproductibilité académiques.
            <br /><br />
            Traduction du site{" "}
            <a href="https://aidframework.org/" target="_blank" rel="noopener noreferrer">https://aidframework.org/</a>
            <br /><br />
            Pour aller plus loin : notre{" "}
            <a href="https://boite-outils.bib.umontreal.ca/trouver-evaluer/iag" target="_blank" rel="noopener noreferrer">
              Guide sur l’IA générative des Bibliothèques de l’Université de Montréal
            </a>.
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <p>Déclaration DDIA - Bibliothèques de l’Université de Montréal - 2026</p>
        <nav className="footer-links" aria-label="Liens utiles">
          <a href="https://bib.umontreal.ca/" target="_blank" rel="noreferrer">
            Bibliothèques de l’Université de Montréal
            <span className="sr-only">, ouvre dans un nouvel onglet</span>
          </a>
          <a href="https://boite-outils.bib.umontreal.ca/trouver-evaluer/iag" target="_blank" rel="noreferrer">
            Guide sur l’IA générative
            <span className="sr-only">, ouvre dans un nouvel onglet</span>
          </a>
        </nav>
      </footer>
    </div>
  );
}

// Mount app
ReactDOM.createRoot(document.getElementById("root")).render(<AIDFrameworkSite />);
