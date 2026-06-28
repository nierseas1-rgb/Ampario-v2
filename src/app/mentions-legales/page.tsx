import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales, conditions générales, honoraires et politique de confidentialité d'Ampario.",
};

const sections = [
  {
    id: "editeur",
    title: "Éditeur du site",
    body: "Le site Ampario est édité par la société Ampario SAS, au capital de 50 000 €, immatriculée au RCS de Bordeaux sous le numéro 900 000 000, dont le siège social est situé 12 cours du Maréchal Foch, 33000 Bordeaux. Carte professionnelle CPI 3300 2026 000 000 001 délivrée par la CCI de Bordeaux Gironde. Directeur de la publication : la direction d'Ampario SAS.",
  },
  {
    id: "hebergement",
    title: "Hébergement",
    body: "Le site est hébergé par un prestataire d'hébergement professionnel garantissant la disponibilité et la sécurité des données. Les coordonnées complètes de l'hébergeur sont disponibles sur simple demande.",
  },
  {
    id: "honoraires",
    title: "Honoraires",
    body: "Les honoraires de transaction sont à la charge du vendeur, sauf mention contraire indiquée sur l'annonce. Le barème détaillé des honoraires est affiché en agence et disponible sur demande. Aucun honoraire n'est dû en l'absence de réalisation effective de la transaction.",
  },
  {
    id: "cgv",
    title: "Conditions générales",
    body: "Toute prestation de service réalisée par Ampario fait l'objet d'un mandat écrit précisant les conditions, la durée et la rémunération. Les présentes conditions générales régissent l'utilisation du site et des services proposés. Les annonces sont fournies à titre indicatif et ne constituent pas une offre contractuelle.",
  },
  {
    id: "confidentialite",
    title: "Politique de confidentialité",
    body: "Ampario s'engage à protéger la vie privée des utilisateurs. Les données personnelles collectées via les formulaires (contact, estimation, création de compte) sont utilisées uniquement pour traiter vos demandes et ne sont jamais cédées à des tiers sans votre consentement. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données en écrivant à contact@ampario.fr.",
  },
  {
    id: "cookies",
    title: "Cookies",
    body: "Le site utilise des cookies strictement nécessaires à son bon fonctionnement ainsi que des cookies de mesure d'audience. Vous pouvez à tout moment configurer votre navigateur pour refuser les cookies non essentiels.",
  },
  {
    id: "propriete",
    title: "Propriété intellectuelle",
    body: "L'ensemble des contenus présents sur le site (textes, photographies, logo, charte graphique) est la propriété exclusive d'Ampario ou de ses partenaires. Toute reproduction, même partielle, est interdite sans autorisation préalable écrite.",
  },
];

export default function MentionsLegalesPage() {
  return (
    <div>
      <section className="bg-navy-900 py-14">
        <div className="container-page">
          <p className="label-eyebrow text-gold-400">Informations légales</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-cream-50">
            Mentions légales
          </h1>
        </div>
      </section>

      <section className="container-page grid gap-10 py-16 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <nav className="sticky top-32 space-y-1">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block rounded-lg px-3 py-2 text-sm text-navy-500 transition hover:bg-white hover:text-gold-700"
              >
                {s.title}
              </a>
            ))}
          </nav>
        </aside>

        <div className="max-w-3xl space-y-10">
          {sections.map((s) => (
            <div key={s.id} id={s.id} className="scroll-mt-32">
              <h2 className="font-serif text-2xl font-semibold text-navy-900">
                {s.title}
              </h2>
              <p className="mt-3 leading-relaxed text-navy-600">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
