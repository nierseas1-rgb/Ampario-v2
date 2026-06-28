export interface Testimonial {
  name: string;
  role: string;
  city: string;
  rating: number;
  text: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Hélène & Patrick M.",
    role: "Vendeurs",
    city: "Cadillac",
    rating: 5,
    text: "Une équipe à l'écoute et d'un grand professionnalisme. Notre maison a été vendue en trois semaines, au prix souhaité. Nous recommandons Ampario les yeux fermés.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Julien R.",
    role: "Acquéreur",
    city: "Bordeaux",
    rating: 5,
    text: "Sophie a su comprendre exactement ce que nous cherchions. Elle nous a fait gagner un temps précieux et a négocié avec brio. Un accompagnement haut de gamme.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Nathalie D.",
    role: "Investisseuse",
    city: "Langon",
    rating: 5,
    text: "J'ai confié la gestion locative de deux appartements à Ampario. Sérénité totale : tout est géré avec rigueur et transparence. Je suis pleinement satisfaite.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Famille Lefèvre",
    role: "Acquéreurs",
    city: "Podensac",
    rating: 5,
    text: "Premier achat immobilier réussi grâce à Marc, qui nous a guidés pas à pas, du financement à la signature. Pédagogue, disponible et rassurant.",
    avatar:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Caroline B.",
    role: "Vendeuse",
    city: "Rions",
    rating: 5,
    text: "Le reportage photo et la mise en valeur de mon bien ont fait toute la différence. Beaucoup de visites qualifiées et une vente rapide. Bravo à toute l'équipe.",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Thomas & Léa",
    role: "Locataires",
    city: "Talence",
    rating: 5,
    text: "Recherche de location traitée avec efficacité et bienveillance. Nous avons trouvé notre appartement en quelques jours. Merci Claire pour ta réactivité !",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
];
