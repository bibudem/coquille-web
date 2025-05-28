

export default {
    title: 'À propos',
    route: '/a-propos/',
    children: [
        {
            title: 'Prêt, renouvellement, retour',
            route: '/a-propos/pret-renouvellement-retour/',
            children: [
                {
                    title: 'Communauté UdeM',
                    route: '/a-propos/pret-renouvellement-retour/communaute-udem/',
                    isActive: true,
                    children: [
                        {
                            title: 'Carte PBUQ',
                            route: '/a-propos/pret-renouvellement-retour/communaute-udem/carte-pbuq',
                            isActive: true,
                        },
                        {
                            title: 'Ententes avec les cégeps',
                            route: '/a-propos/pret-renouvellement-retour/communaute-udem/ententes-cegeps',
                        },
                    ],
                },
            ],
        },
        {
            title: 'Demande de numérisation',
            route: '/a-propos/numerisation',
        },
        {
            title: 'Prêt entre bibliothèques',
            route: '/a-propos/peb/',
            isActive: true,
            children: [
                {
                    title: 'Prêt aux institutions externes',
                    route: '/a-propos/peb/demande-de-pret',
                },
                {
                    title: 'ILL Service for external libraries',
                    route: '/a-propos/peb/renouvellement',
                    isActive: true,
                },
            ]
        },
        {
            title: 'Reproduction de thèses et mémoires',
            route: '/a-propos/reproduction-theses-memoires',
        },
        {
            title: 'Suggestions d\'achat',
            route: '/a-propos/reproduction-theses-memoires',
        },
    ],
}

/*
[
    {
        "id": "b4fa7e65-db96-5bb5-a8fc-4f2fece2671a",
        "title": "Les bibliothèques / UdeM",
        "path": "/pages/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": [
            {
                "id": "ff92a89e-58a3-5de7-8dfe-2377378114f3",
                "path": "/pages/tests",
                "hidden": false,
                "isRoot": false,
                "order": null
            },
            {
                "id": "0b19f037-9565-53c2-beda-c415273b9648",
                "path": "/pages/horaires",
                "hidden": false,
                "isRoot": false,
                "order": null
            },
            {
                "id": "fcc97cef-29ba-5c9d-85f5-184c7c145809",
                "path": "/pages/personnel",
                "hidden": false,
                "isRoot": false,
                "order": null
            },
            {
                "id": "c527abe3-37fb-56bb-a92f-afced96f60f4",
                "path": "/pages/widget-horaire",
                "hidden": false,
                "isRoot": false,
                "order": null
            },
            {
                "id": "558d94a6-16a0-5b21-b9e3-c94adb536b12",
                "path": "/pages/fiche-personnel",
                "hidden": false,
                "isRoot": false,
                "order": null
            },
            {
                "id": "7c796ddd-051c-5105-bb20-c5c2844bf718",
                "path": "/pages/service-accessibilite",
                "hidden": false,
                "isRoot": false,
                "order": null
            },
            {
                "id": "9c0dbb2e-5e6d-55b9-bac0-e65afcd07a62",
                "path": "/pages/a-propos/",
                "hidden": false,
                "isRoot": true,
                "order": 1
            },
            {
                "id": "39f5a4f3-ccb6-5951-8a79-a62c32e5748d",
                "path": "/pages/engagements/",
                "hidden": false,
                "isRoot": true,
                "order": null
            },
            {
                "id": "1d5628ff-4797-5415-90ca-18218eb2b2d1",
                "path": "/pages/enseignement/",
                "hidden": false,
                "isRoot": true,
                "order": null
            },
            {
                "id": "eed3437a-a4b6-5860-9c3a-c2082076bdfc",
                "path": "/pages/espaces/",
                "hidden": false,
                "isRoot": true,
                "order": null
            },
            {
                "id": "16e075f9-7a00-5cd6-a8da-96159d82d216",
                "path": "/pages/etudes/",
                "hidden": false,
                "isRoot": true,
                "order": null
            },
            {
                "id": "e661798f-4283-59dc-a265-a960828e134b",
                "path": "/pages/nous-joindre/",
                "hidden": false,
                "isRoot": true,
                "order": null
            },
            {
                "id": "507055f4-2230-5322-aef9-5ca7edd79432",
                "path": "/pages/nous-soutenir/",
                "hidden": false,
                "isRoot": true,
                "order": null
            },
            {
                "id": "d6cf311c-aee6-5f1c-bf99-823ca0eb0aa4",
                "path": "/pages/recherche/",
                "hidden": false,
                "isRoot": true,
                "order": null
            }
        ]
    },
    {
        "id": "ff92a89e-58a3-5de7-8dfe-2377378114f3",
        "title": "Tests",
        "path": "/pages/tests",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "0b19f037-9565-53c2-beda-c415273b9648",
        "title": "Horaires",
        "path": "/pages/horaires",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "fcc97cef-29ba-5c9d-85f5-184c7c145809",
        "title": "Répertoire du personnel",
        "path": "/pages/personnel",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "c527abe3-37fb-56bb-a92f-afced96f60f4",
        "title": "Exemple de widget d'horaire",
        "path": "/pages/widget-horaire",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "558d94a6-16a0-5b21-b9e3-c94adb536b12",
        "title": "Fiche d'employé",
        "path": "/pages/fiche-personnel",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "7c796ddd-051c-5105-bb20-c5c2844bf718",
        "title": "Les bibliothèques / UdeM",
        "path": "/pages/service-accessibilite",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "9c0dbb2e-5e6d-55b9-bac0-e65afcd07a62",
        "title": "Notre équipe",
        "path": "/pages/a-propos/",
        "hidden": false,
        "isRoot": true,
        "order": 1,
        "childrenSiteNavigation": [
            {
                "id": "51a18381-4e1b-55dd-ab6c-d296167b63c6",
                "path": "/pages/a-propos/carriere",
                "hidden": false,
                "isRoot": false,
                "order": null
            },
            {
                "id": "a35833f9-fccb-5d86-85f1-577b514d22d4",
                "path": "/pages/a-propos/nos-collections",
                "hidden": false,
                "isRoot": false,
                "order": 2
            },
            {
                "id": "6ed883b0-c13e-5b63-949c-39a021dfcca5",
                "path": "/pages/a-propos/rapports-annuels",
                "hidden": false,
                "isRoot": false,
                "order": null
            },
            {
                "id": "6ffc2124-0ec0-51b8-93f7-d6d605959629",
                "path": "/pages/a-propos/politiques-reglement",
                "hidden": false,
                "isRoot": false,
                "order": null
            },
            {
                "id": "cec8c75d-5fd6-5fce-9255-07acffadddf2",
                "path": "/pages/a-propos/mission-vision-valeur",
                "hidden": false,
                "isRoot": false,
                "order": 3
            },
            {
                "id": "5f966a89-60f1-57af-9189-c455a6b4e1b1",
                "path": "/pages/a-propos/notre-organisation/",
                "hidden": false,
                "isRoot": true,
                "order": 1
            },
            {
                "id": "2b7f5aa2-17ae-5211-88b0-aede54b760c2",
                "path": "/pages/a-propos/nouvelles/",
                "hidden": false,
                "isRoot": true,
                "order": null
            }
        ]
    },
    {
        "id": "39f5a4f3-ccb6-5951-8a79-a62c32e5748d",
        "title": "Engagements",
        "path": "/pages/engagements/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "1d5628ff-4797-5415-90ca-18218eb2b2d1",
        "title": "Enseignement",
        "path": "/pages/enseignement/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": [
            {
                "id": "70937bad-d54e-5859-b2e3-2c070a811b0e",
                "path": "/pages/enseignement/reserve",
                "hidden": false,
                "isRoot": false,
                "order": null
            },
            {
                "id": "111bc64b-d2c7-5de4-af3b-8be43828f0dd",
                "path": "/pages/enseignement/formulaire-reserve",
                "hidden": false,
                "isRoot": false,
                "order": null
            }
        ]
    },
    {
        "id": "eed3437a-a4b6-5860-9c3a-c2082076bdfc",
        "title": "Espaces",
        "path": "/pages/espaces/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "16e075f9-7a00-5cd6-a8da-96159d82d216",
        "title": "Études",
        "path": "/pages/etudes/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "e661798f-4283-59dc-a265-a960828e134b",
        "title": "Nous joindre",
        "path": "/pages/nous-joindre/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": [
            {
                "id": "858a63b3-1983-5af5-a761-5d51b45a7c84",
                "path": "/pages/nous-joindre/nous-ecrire",
                "hidden": false,
                "isRoot": false,
                "order": null
            },
            {
                "id": "be7dd7ec-34fc-51bc-b088-1d253d3605d8",
                "path": "/pages/nous-joindre/notre-equipe",
                "hidden": false,
                "isRoot": false,
                "order": 1
            },
            {
                "id": "c268ac95-4704-580f-b9c2-85e2b0ae789d",
                "path": "/pages/nous-joindre/suggestion-achat",
                "hidden": false,
                "isRoot": false,
                "order": null
            }
        ]
    },
    {
        "id": "507055f4-2230-5322-aef9-5ca7edd79432",
        "title": "Nous soutenir",
        "path": "/pages/nous-soutenir/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": [
            {
                "id": "0d7780fa-31cb-5826-9d31-0b5b0da3cbf8",
                "path": "/pages/nous-soutenir/fonds-livres-rares",
                "hidden": false,
                "isRoot": false,
                "order": null
            }
        ]
    },
    {
        "id": "d6cf311c-aee6-5f1c-bf99-823ca0eb0aa4",
        "title": "Recherche",
        "path": "/pages/recherche/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": [
            {
                "id": "f7c25466-28f1-5d5d-8264-a173c66a6e9c",
                "path": "/pages/recherche/rediger",
                "hidden": false,
                "isRoot": false,
                "order": null
            },
            {
                "id": "0c61f1e2-aa3b-5621-992b-374dfb280d65",
                "path": "/pages/recherche/diffuser/",
                "hidden": false,
                "isRoot": true,
                "order": null
            }
        ]
    },
    {
        "id": "9b31c247-0044-50ed-a2b7-269bea7a9ba8",
        "title": "Consent Server",
        "path": "/pages/consent/server",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "70937bad-d54e-5859-b2e3-2c070a811b0e",
        "title": "Réserve de cours",
        "path": "/pages/enseignement/reserve",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "f7c25466-28f1-5d5d-8264-a173c66a6e9c",
        "title": "Rédiger",
        "path": "/pages/recherche/rediger",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "51a18381-4e1b-55dd-ab6c-d296167b63c6",
        "title": "Carrière",
        "path": "/pages/a-propos/carriere",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "bf4bc39b-df28-5afb-b3ff-476cc86e7db7",
        "title": "Frais et avis de retard",
        "path": "/pages/a-propos/frais-avis",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "858a63b3-1983-5af5-a761-5d51b45a7c84",
        "title": "Nous écrire",
        "path": "/pages/nous-joindre/nous-ecrire",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "73b3ac03-61c3-53a2-aca3-ef24e1234e7c",
        "title": "Remise de la bourse Geneviève-Bazin de la Bibliothèque des livres rares et collections spéciales",
        "path": "/nouvelles/2025/bourse-Bazin",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "be7dd7ec-34fc-51bc-b088-1d253d3605d8",
        "title": "Notre équipe",
        "path": "/pages/nous-joindre/notre-equipe",
        "hidden": false,
        "isRoot": false,
        "order": 1,
        "childrenSiteNavigation": []
    },
    {
        "id": "a4b6449d-8444-5f69-ad4a-3d4ee0c5f9cd",
        "title": "Demande de numérisation",
        "path": "/pages/a-propos/numerisation",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "a35833f9-fccb-5d86-85f1-577b514d22d4",
        "title": "Nos collections",
        "path": "/pages/a-propos/nos-collections",
        "hidden": false,
        "isRoot": false,
        "order": 2,
        "childrenSiteNavigation": []
    },
    {
        "id": "d3fbbfd7-90a0-513e-b850-012c328cbb1d",
        "title": "Échappées belles: livres, co-création, correspondances dans le surréalisme au féminin",
        "path": "/nouvelles/2025/echappees-belles",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "6ed883b0-c13e-5b63-949c-39a021dfcca5",
        "title": "Rapports annuels",
        "path": "/pages/a-propos/rapports-annuels",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "c268ac95-4704-580f-b9c2-85e2b0ae789d",
        "title": "Suggestion d'achat",
        "path": "/pages/nous-joindre/suggestion-achat",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "111bc64b-d2c7-5de4-af3b-8be43828f0dd",
        "title": "Formulaire de réserve de cours",
        "path": "/pages/enseignement/formulaire-reserve",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "0d7780fa-31cb-5826-9d31-0b5b0da3cbf8",
        "title": "Soutenez le Fonds des livres rares de l'Université de Montréal",
        "path": "/pages/nous-soutenir/fonds-livres-rares",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "6ffc2124-0ec0-51b8-93f7-d6d605959629",
        "title": "Politiques et règlement",
        "path": "/pages/a-propos/politiques-reglement",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "cec8c75d-5fd6-5fce-9255-07acffadddf2",
        "title": "Mission, vision, valeurs et objectifs",
        "path": "/pages/a-propos/mission-vision-valeur",
        "hidden": false,
        "isRoot": false,
        "order": 3,
        "childrenSiteNavigation": []
    },
    {
        "id": "5820ba8d-84c9-5d10-8873-506be6869510",
        "title": "Reproduction de thèses et mémoires UdeM",
        "path": "/pages/a-propos/reproduction-theses-memoires",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "faf19cce-c479-548a-84d7-4bb7f414a011",
        "title": "Papyrus rejoint le service de dépôt institutionnel canadien Scholaris",
        "path": "/nouvelles/2025/papyrus-rejoint-service-de-depot-institutionnel-canadien-scholaris",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "5f966a89-60f1-57af-9189-c455a6b4e1b1",
        "title": "Notre organisation",
        "path": "/pages/a-propos/notre-organisation/",
        "hidden": false,
        "isRoot": true,
        "order": 1,
        "childrenSiteNavigation": []
    },
    {
        "id": "2b7f5aa2-17ae-5211-88b0-aede54b760c2",
        "title": "Nouvelles",
        "path": "/pages/a-propos/nouvelles/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "e9d75b13-f816-57cc-a36f-1891f73a930d",
        "title": "Typographie",
        "path": "/pages/dev/typography/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "d4e8ad5c-384c-51b6-a6d8-0260eaaaf1a9",
        "title": "Prêt entre bibliothèques",
        "path": "/pages/a-propos/peb/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": [
            {
                "id": "cbd3235b-381b-58ef-a4b8-6babee417578",
                "path": "/pages/a-propos/peb/ill-external-libraries",
                "hidden": false,
                "isRoot": false,
                "order": null
            },
            {
                "id": "3ae35155-6112-5b4b-8651-63167a2b9cc9",
                "path": "/pages/a-propos/peb/peb-institutions-externes",
                "hidden": false,
                "isRoot": false,
                "order": null
            }
        ]
    },
    {
        "id": "f88a31ee-0d2b-5aca-9e9e-6425188a9b59",
        "title": "Prêt, renouvellement retour",
        "path": "/pages/a-propos/pret-renouvellement-retour/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": [
            {
                "id": "a7ccaae6-08d9-5f32-a8ee-06ed27e98cc7",
                "path": "/pages/a-propos/pret-renouvellement-retour/pbuq",
                "hidden": false,
                "isRoot": false,
                "order": null
            },
            {
                "id": "f2bdb611-1591-5b1e-b4e8-3c0dfc1d48eb",
                "path": "/pages/a-propos/pret-renouvellement-retour/cegeps",
                "hidden": false,
                "isRoot": false,
                "order": null
            },
            {
                "id": "38a0d439-1858-557a-847a-b19d368cc078",
                "path": "/pages/a-propos/pret-renouvellement-retour/diplomes",
                "hidden": false,
                "isRoot": false,
                "order": null
            },
            {
                "id": "f2d40251-7f10-5494-ac90-72eb3bf43a7c",
                "path": "/pages/a-propos/pret-renouvellement-retour/grand-public",
                "hidden": false,
                "isRoot": false,
                "order": null
            },
            {
                "id": "badf15a7-fd6f-5227-9ae5-77295ab961d9",
                "path": "/pages/a-propos/pret-renouvellement-retour/droit-accorde",
                "hidden": false,
                "isRoot": false,
                "order": null
            },
            {
                "id": "3bbf7aa8-3fc5-505d-ac03-239fc801687c",
                "path": "/pages/a-propos/pret-renouvellement-retour/banq-universite-canadiennes",
                "hidden": false,
                "isRoot": false,
                "order": null
            },
            {
                "id": "7154e941-534b-519a-bc11-a6ad2b906e36",
                "path": "/pages/a-propos/pret-renouvellement-retour/communaute-udem/",
                "hidden": false,
                "isRoot": true,
                "order": null
            }
        ]
    },
    {
        "id": "0c61f1e2-aa3b-5621-992b-374dfb280d65",
        "title": "Diffuser vos savoirs",
        "path": "/pages/recherche/diffuser/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": [
            {
                "id": "d57780ea-e8a1-52bd-8cad-f347982c4aa1",
                "path": "/pages/recherche/diffuser/kerko",
                "hidden": false,
                "isRoot": false,
                "order": null
            }
        ]
    },
    {
        "id": "a7ccaae6-08d9-5f32-a8ee-06ed27e98cc7",
        "title": "Entente PBUQ",
        "path": "/pages/a-propos/pret-renouvellement-retour/pbuq",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "417a6122-ccbe-5736-9e4c-70b574bbed1d",
        "title": "Bonjour de 'content/section/sous/allo.mdx'!",
        "path": "/pages/section/sous/allo",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "d57780ea-e8a1-52bd-8cad-f347982c4aa1",
        "title": "Bibliographies créées à l'UdeM et diffusées sur Kerko",
        "path": "/pages/recherche/diffuser/kerko",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "f2bdb611-1591-5b1e-b4e8-3c0dfc1d48eb",
        "title": "Ententes avec les cégeps",
        "path": "/pages/a-propos/pret-renouvellement-retour/cegeps",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "38a0d439-1858-557a-847a-b19d368cc078",
        "title": "Diplômées et diplômés UdeM, HEC Montréal, Polytechnique Montréal",
        "path": "/pages/a-propos/pret-renouvellement-retour/diplomes",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "e0d8ebf8-c74f-5ee0-a372-20e38dc9688b",
        "title": "Navigation secondaire",
        "path": "/pages/dev/navigation/secondaire",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "f2d40251-7f10-5494-ac90-72eb3bf43a7c",
        "title": "Grand public",
        "path": "/pages/a-propos/pret-renouvellement-retour/grand-public",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "badf15a7-fd6f-5227-9ae5-77295ab961d9",
        "title": "Personnes inscrites par droit accordé",
        "path": "/pages/a-propos/pret-renouvellement-retour/droit-accorde",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "cbd3235b-381b-58ef-a4b8-6babee417578",
        "title": "ILL Service for External Libraries",
        "path": "/pages/a-propos/peb/ill-external-libraries",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "3ae35155-6112-5b4b-8651-63167a2b9cc9",
        "title": "Prêts aux institutions externes",
        "path": "/pages/a-propos/peb/peb-institutions-externes",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "3bbf7aa8-3fc5-505d-ac03-239fc801687c",
        "title": "Ententes BAnQ et universités canadiennes",
        "path": "/pages/a-propos/pret-renouvellement-retour/banq-universite-canadiennes",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "415f1733-113b-554c-b0ed-85dfcaebafb5",
        "title": "<Accordion>",
        "path": "/pages/dev/components/accordion/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "533fd0ed-c4a6-5d4c-94ce-71a7dd0a6bf6",
        "title": "<Alerts>",
        "path": "/pages/dev/components/alert/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "3bab6329-0004-542f-985a-d21a2cf57f3c",
        "title": "<Blockquote>",
        "path": "/pages/dev/components/blockquote/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "f4727620-a39a-5c98-8ae7-4cc202e26076",
        "title": "<Button>",
        "path": "/pages/dev/components/button/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "f9cf14c7-bfc9-51b1-9d7b-93681e2ac245",
        "title": "<Card2>",
        "path": "/pages/dev/components/card2/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "4e1d1445-3154-598c-8a68-822cda829d22",
        "title": "<CardWithIcon>",
        "path": "/pages/dev/components/cardWithIcon/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "d3321fe2-4250-5280-bf45-32a53b7a58bf",
        "title": "<CardWithImage>",
        "path": "/pages/dev/components/cardWithImage/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "0689572f-cb72-508f-bc36-3334e36072e7",
        "title": "<Carousel1>",
        "path": "/pages/dev/components/carousel1/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "43a7a581-16c2-5f58-b79a-4ec55e9cf22d",
        "title": "<FlipCardWithBg>",
        "path": "/pages/dev/components/flipCardWithBg/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "698caf73-cab1-5148-91e4-e295c42fc75f",
        "title": "<FlipCardWithImage>",
        "path": "/pages/dev/components/flipCardWithImage/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "b7216e56-7086-5745-960d-e48180dd361a",
        "title": "<HeroWithImage>",
        "path": "/pages/dev/components/heroWithImage/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "d5ae9447-b84f-5722-a4cf-659f82f944cc",
        "title": "<HeroWithText>",
        "path": "/pages/dev/components/heroWithText/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "422fb79c-17b4-525b-9c22-3a8edb81b3f8",
        "title": "<HeroWithText2>",
        "path": "/pages/dev/components/heroWithText2/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "41cdde3d-0c29-51bb-9cf7-477d5ee622a1",
        "title": "<Liste>",
        "path": "/pages/dev/components/liste/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "017e3e9e-6e8c-5850-91f3-7c78fce1d85c",
        "title": "<ListeEvenements>",
        "path": "/pages/dev/components/listeEvenements/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "dea2ff47-f118-53ec-88d4-67454e06d9ad",
        "title": "<ListeFormations>",
        "path": "/pages/dev/components/listeFormations/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "8e00f871-1174-5e4f-af1a-5cca52f8bf8b",
        "title": "<ListeNouvelles>",
        "path": "/pages/dev/components/listeNouvelles/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "def1512a-2be1-53db-9d7a-a1fba9dee9e1",
        "title": "<RichListItemWithLink>",
        "path": "/pages/dev/components/richListItemWithLink/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "c2c59f01-a983-55b8-9d7d-93d744b79848",
        "title": "<Section>",
        "path": "/pages/dev/components/section/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "b36c87e6-d8e9-591d-8c8e-48e79f4140fe",
        "title": "<Tabs1>",
        "path": "/pages/dev/components/tabs1/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "7154e941-534b-519a-bc11-a6ad2b906e36",
        "title": "Communauté UdeM",
        "path": "/pages/a-propos/pret-renouvellement-retour/communaute-udem/",
        "hidden": false,
        "isRoot": true,
        "order": null,
        "childrenSiteNavigation": [
            {
                "id": "6399d2c8-f23a-5569-bbe9-4b8953014c62",
                "path": "/pages/a-propos/pret-renouvellement-retour/communaute-udem/carte-pbuq",
                "hidden": false,
                "isRoot": false,
                "order": null
            },
            {
                "id": "fa0a0fea-3c2d-524d-b25a-8a0f8858c744",
                "path": "/pages/a-propos/pret-renouvellement-retour/communaute-udem/ententes-cegeps",
                "hidden": false,
                "isRoot": false,
                "order": null
            }
        ]
    },
    {
        "id": "6399d2c8-f23a-5569-bbe9-4b8953014c62",
        "title": "Carte PBUQ",
        "path": "/pages/a-propos/pret-renouvellement-retour/communaute-udem/carte-pbuq",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    },
    {
        "id": "fa0a0fea-3c2d-524d-b25a-8a0f8858c744",
        "title": "Ententes avec les cégeps",
        "path": "/pages/a-propos/pret-renouvellement-retour/communaute-udem/ententes-cegeps",
        "hidden": false,
        "isRoot": false,
        "order": null,
        "childrenSiteNavigation": []
    }
]
  */