export const biblioMap = {
  am: { titre: "Aménagement", ancre: "amenagement" },
  pa: { titre: "Parc", ancre: "bibliotheque-du-parc" },
  conservation: { titre: "Centre de conservation Lionel-Groulx", ancre: "centre-de-conservation-lionel-groulx" },
  lrcs: { titre: "Livres rares et collections spéciales", ancre: "livres-rares-et-collections-speciales" },
  dr: { titre: "Droit", ancre: "droit" },
  tgd: { titre: "Thérèse-Gouin-Décarie", ancre: "therese-gouin-decarie" },
  jardin: { titre: "Point de service : À venir - Jardin Botanique, Brossard, Médecine", ancre: "jardin-botanique" },
  ki: { titre: "Kinésiologie", ancre: "kinesiologie" },
  laval: { titre: "Campus de Laval", ancre: "campus-de-laval" },
  "marcel-laurin": { titre: "Centre de conservation 101, boul. Marcel-Laurin", ancre: "centre-de-conservation-marcel-laurin" },
  mi: { titre: "Mathématiques et informatique", ancre: "math-info" },
  mu: { titre: "Musique", ancre: "musique" },
  mv: { titre: "Médecine vétérinaire", ancre: "medecine-veterinaire" },
  "marguerite-d-youville": { titre: "Marguerite-d'Youville", ancre: "marguerite-d-youville" },
  sa: { titre: "Santé", ancre: "sante" },
  ss: { titre: "Hubert-Reeves", ancre: "hubert-reeves" },
  lsh: { titre: "Lettres et sciences humaines", ancre: "lettres-et-sciences-humaines" }
};


export const getBiblioByCode = (code) => biblioMap[code];
export const getBiblioAncre = (code) => biblioMap[code]?.ancre || '';
export const getBiblioTitre = (code) => biblioMap[code]?.titre || '';