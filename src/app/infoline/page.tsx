import { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import {
  PhoneIcon,
  MailIcon,
  ShieldIcon,
  CalculatorIcon,
  KeyIcon,
  HomeIcon,
  ArrowRightIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Infoline — Conseil & accompagnement 7j/7",
  description:
    "L'Infoline Ampario : un service de conseil immobilier gratuit, disponible 7j/7 pour répondre à toutes vos questions.",
};

const services = [
  {
    icon: HomeIcon,
    title: "Conseil à l'achat",
    text: "Définition de votre projet, recherche ciblée et négociation à vos côtés.",
  },
  {
    icon: KeyIcon,
    title: "Accompagnement vente",
    text: "Estimation, stratégie de prix et mise en valeur de votre bien.",
  },
  {
    icon: CalculatorIcon,
    title: "Financement",
    text: "Mise en relation avec nos partenaires courtiers pour votre prêt.",
  },
  {
    icon: ShieldIcon,
    title: "Juridique & fiscal",
    text: "Réponses à vos questions sur les diagnostics, la fiscalité et les démarches.",
  },
];

const faqs = [
  {
    q: "L'Infoline est-elle vraiment gratuite ?",
    a: "Oui, l'accès à notre Infoline et au conseil de nos experts est entièrement gratuit et sans engagement.",
  },
  {
    q: "Quels sont les horaires de disponibilité ?",
    a: "Nos conseillers sont joignables 7j/7, de 8h à 21h, par téléphone, email ou via le formulaire de rappel.",
  },
  {
    q: "Puis-je être accompagné(e) même sans bien chez vous ?",
    a: "Absolument. Que vous soyez acheteur, vendeur ou locataire, nos conseillers vous orientent quel que soit votre projet.",
  },
  {
    q: "Comment être recontacté(e) rapidement ?",
    a: "Utilisez notre formulaire de rappel ou appelez directement le +33 5 56 12 34 56 : un conseiller vous répond en quelques minutes.",
  },
];

export default function InfolinePage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-navy-900 to-navy-800 py-20">
        <div className="container-page max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
            ☎ Infoline Ampario
          </span>
          <h1 className="mt-5 font-serif text-4xl font-semibold text-cream-50 sm:text-5xl">
            Un conseil d&apos;expert, quand vous en avez besoin
          </h1>
          <p className="mt-4 text-cream-100/70">
            Notre ligne dédiée met un conseiller immobilier à votre disposition
            7j/7. Gratuit, sans engagement, pour tous vos projets.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="tel:+33556123456" className="btn-gold">
              <PhoneIcon width={18} height={18} />
              +33 5 56 12 34 56
            </a>
            <Link
              href="/contact"
              className="btn-outline border-cream-100/30 text-cream-100 hover:bg-cream-100 hover:text-navy-900"
            >
              <MailIcon width={18} height={18} />
              Être rappelé(e)
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <SectionHeading
          eyebrow="Nos services"
          title="Un accompagnement à 360°"
          align="center"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.title} className="card-surface p-7">
              <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-navy-900 p-3 text-gold-400">
                <s.icon width={24} height={24} />
              </span>
              <h3 className="mt-5 font-serif text-xl font-semibold text-navy-900">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-500">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream-200/40 py-20">
        <div className="container-page max-w-3xl">
          <SectionHeading
            eyebrow="Questions fréquentes"
            title="Tout savoir sur l'Infoline"
            align="center"
          />
          <div className="mt-10 space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl bg-white p-6 shadow-sm"
              >
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-navy-900 marker:content-none">
                  {f.q}
                  <span className="ml-4 text-gold-500 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-navy-500">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/contact" className="btn-primary">
              Poser ma question
              <ArrowRightIcon width={18} height={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
