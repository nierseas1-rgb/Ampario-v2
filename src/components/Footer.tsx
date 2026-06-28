import Link from "next/link";
import { Logo } from "./Logo";
import { MapPinIcon, PhoneIcon, MailIcon } from "./icons";
import { NewsletterForm } from "./NewsletterForm";

const columns = [
  {
    title: "Naviguer",
    links: [
      { href: "/", label: "Accueil" },
      { href: "/proprietes?transaction=vente", label: "Acheter" },
      { href: "/proprietes?transaction=location", label: "Louer" },
      { href: "/vendre", label: "Vendre" },
      { href: "/estimation", label: "Estimation en ligne" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/simulateur", label: "Simulateur de prêt" },
      { href: "/infoline", label: "Infoline conseil" },
      { href: "/agences", label: "Nos agences" },
      { href: "/compte", label: "Mon espace" },
      { href: "/favoris", label: "Mes favoris" },
    ],
  },
  {
    title: "Informations",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/mentions-legales", label: "Mentions légales" },
      { href: "/mentions-legales#cgv", label: "CGV" },
      { href: "/mentions-legales#confidentialite", label: "Confidentialité" },
      { href: "/mentions-legales#honoraires", label: "Honoraires" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-navy-900 text-cream-100">
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="light" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream-100/70">
              Ampario accompagne particuliers et investisseurs dans leurs projets
              immobiliers d&apos;exception : achat, vente et location de maisons,
              villas, appartements et terrains.
            </p>
            <div className="mt-6 space-y-3 text-sm text-cream-100/80">
              <p className="flex items-center gap-3">
                <MapPinIcon width={16} height={16} className="text-gold-400" />
                12 cours du Maréchal Foch, 33000 Bordeaux
              </p>
              <a
                href="tel:+33556123456"
                className="flex items-center gap-3 transition hover:text-gold-300"
              >
                <PhoneIcon width={16} height={16} className="text-gold-400" />
                +33 5 56 12 34 56
              </a>
              <a
                href="mailto:contact@ampario.fr"
                className="flex items-center gap-3 transition hover:text-gold-300"
              >
                <MailIcon width={16} height={16} className="text-gold-400" />
                contact@ampario.fr
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream-100/70 transition hover:text-gold-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-8 border-t border-cream-100/10 pt-10 lg:grid-cols-[1.4fr_2fr] lg:items-center">
          <div>
            <h4 className="font-serif text-2xl">Restez informé de nos exclusivités</h4>
            <p className="mt-2 text-sm text-cream-100/60">
              Recevez en avant-première nos nouveaux biens et nos conseils
              immobiliers.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-cream-100/10">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-xs text-cream-100/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Ampario — Immobilier de prestige. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <span>Carte professionnelle CPI 3300 2026 000 000 001</span>
            <span>SIREN 900 000 000</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
