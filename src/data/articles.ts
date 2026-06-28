export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: number;
  cover: string;
  author: string;
  content: string[];
}

export const articles: Article[] = [
  {
    slug: "acheter-bien-prestige-2026",
    title: "Acheter un bien de prestige en 2026 : les clés d'un investissement réussi",
    excerpt:
      "Entre emplacement, performance énergétique et rareté, découvrez les critères qui font la valeur d'un bien d'exception aujourd'hui.",
    category: "Conseils d'achat",
    date: "2026-06-15",
    readingTime: 5,
    cover:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    author: "Sophie Lambert",
    content: [
      "Le marché de l'immobilier de prestige conserve en 2026 une dynamique singulière, portée par la recherche de biens rares et la quête d'un cadre de vie d'exception. Pour réussir son acquisition, quelques principes méritent toute votre attention.",
      "L'emplacement demeure le premier critère de valorisation. Un bien situé dans un quartier recherché, à proximité des commodités et bénéficiant d'une vue dégagée, conservera et accroîtra sa valeur dans le temps. La rareté de l'emplacement prime souvent sur la surface.",
      "La performance énergétique s'impose désormais comme un facteur déterminant. Un diagnostic favorable (DPE A ou B) constitue un argument de poids, tant pour le confort que pour la revente. Les biens énergivores, à l'inverse, voient leur attractivité diminuer.",
      "Enfin, ne négligez pas l'accompagnement par un professionnel. Un conseiller expérimenté vous aide à déceler le potentiel d'un bien, à négocier au juste prix et à sécuriser chaque étape de la transaction. C'est tout le sens de l'accompagnement Ampario.",
    ],
  },
  {
    slug: "estimation-prix-immobilier",
    title: "Comment bien estimer le prix de votre bien avant de vendre",
    excerpt:
      "Une estimation juste est la condition d'une vente rapide et au meilleur prix. Voici notre méthode pour évaluer votre bien avec précision.",
    category: "Vendre",
    date: "2026-05-28",
    readingTime: 4,
    cover:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    author: "Marc Delaunay",
    content: [
      "Fixer le bon prix de vente est un exercice délicat : trop élevé, votre bien stagne ; trop bas, vous perdez de la valeur. L'estimation repose sur une analyse rigoureuse de plusieurs facteurs.",
      "On compare d'abord votre bien aux transactions récentes de biens similaires dans le même secteur. Ces références de marché constituent la base d'une estimation crédible.",
      "On ajuste ensuite selon les caractéristiques propres : surface, état général, prestations, exposition, étage, extérieurs et performance énergétique. Chaque atout — comme chaque défaut — influe sur la valeur finale.",
      "Notre outil d'estimation en ligne vous donne une première fourchette en deux minutes. Pour une évaluation précise, nos experts se déplacent gratuitement et sans engagement.",
    ],
  },
  {
    slug: "investissement-locatif-gironde",
    title: "Investissement locatif en Gironde : où placer son argent ?",
    excerpt:
      "Bordeaux, Entre-deux-Mers, communes viticoles… tour d'horizon des secteurs porteurs pour un investissement locatif rentable.",
    category: "Investissement",
    date: "2026-05-10",
    readingTime: 6,
    cover:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    author: "Claire Fontaine",
    content: [
      "La Gironde offre un terrain de jeu varié pour l'investisseur, de l'hyper-centre bordelais aux villages viticoles de l'Entre-deux-Mers. Encore faut-il cibler le bon secteur selon sa stratégie.",
      "À Bordeaux, la demande locative reste soutenue, portée par les étudiants et les jeunes actifs. Les studios et T2 bien situés affichent une excellente liquidité, au prix d'un ticket d'entrée plus élevé.",
      "Dans les communes périphériques — Cadillac, Langon, Podensac — les rendements sont plus attractifs et les biens familiaux trouvent facilement preneur auprès de locataires à la recherche d'espace et de calme.",
      "L'immeuble de rapport constitue une option intéressante pour mutualiser les risques. Nos conseillers vous accompagnent dans le calcul de rentabilité et le montage de votre projet.",
    ],
  },
  {
    slug: "renovation-energetique-valoriser",
    title: "Rénovation énergétique : valoriser son bien tout en réduisant ses factures",
    excerpt:
      "Isolation, chauffage, menuiseries… quels travaux privilégier pour améliorer son DPE et la valeur de son patrimoine ?",
    category: "Conseils",
    date: "2026-04-22",
    readingTime: 5,
    cover:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    author: "Sophie Lambert",
    content: [
      "La rénovation énergétique n'est plus une option : elle conditionne la valeur et la louabilité d'un bien. Bien menée, elle améliore le confort, réduit les charges et fait grimper l'étiquette DPE.",
      "L'isolation est la priorité absolue. Combles, murs et planchers représentent les principales sources de déperdition. Une isolation performante peut faire gagner plusieurs classes énergétiques.",
      "Le remplacement d'un système de chauffage ancien par une pompe à chaleur, couplé à des menuiseries double ou triple vitrage, complète efficacement le dispositif.",
      "De nombreuses aides existent pour financer ces travaux. Nos partenaires vous orientent vers les dispositifs adaptés à votre situation.",
    ],
  },
];

export function getArticleBySlug(slug: string) {
  return articles.find((a) => a.slug === slug);
}
