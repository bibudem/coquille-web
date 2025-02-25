

export default {
  title: 'Obtenir un document',
  route: '/obtenir/',
  children: [
    {
      title: 'Prêt, renouvellement, retour',
      route: '/obtenir/pret-renouvellement-retour/',
      isActive: true,
      children: [
        {
          title: 'Communauté UdeM',
          route: '/obtenir/pret-renouvellement-retour/communaute-udem/',
          isActive: true,
          children: [
            {
              title: 'Carte PBUQ',
              route: '/obtenir/pret-renouvellement-retour/communaute-udem/carte-pbuq',
              isActive: true,
            },
            {
              title: 'Ententes avec les cégeps',
              route: '/obtenir/pret-renouvellement-retour/communaute-udem/ententes-cegeps',
            },
          ],
        },
      ],
    },
    {
      title: 'Demande de numérisation',
      route: '/obtenir/numerisation',
    },
    {
      title: 'Prêt entre bibliothèques',
      route: '/obtenir/peb/',
      children: [
        {
          title: 'Demande de prêt',
          route: '/obtenir/peb/demande-de-pret',
        },
        {
          title: 'Renouvellement',
          route: '/obtenir/peb/renouvellement',
        },
        {
          title: 'Retour',
          route: '/obtenir/peb/retour',
        },
      ]
    },
    {
      title: 'Reproduction de thèses et mémoires',
      route: '/obtenir/reproduction-theses-memoires',
    },
  ],
}