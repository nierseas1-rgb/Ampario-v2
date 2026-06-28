import Link from "next/link";
import Image from "next/image";
import { SearchBar } from "@/components/SearchBar";
import { PropertyCard } from "@/components/PropertyCard";
import { SectionHeading } from "@/components/SectionHeading";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { properties } from "@/data/properties";
import {
  ArrowRightIcon,
  ShieldIcon,
  KeyIcon,
  SparkleIcon,
  CalculatorIcon,
  LeafIcon,
  StarIcon,
} from "@/components/icons";
import { categoryLabelsPlural } from "@/lib/format";

const featured = properties.filter((p) => p.isFeatured && !p.isSold).slice(0, 6);
const exclusives = properties.filter((p) => p.isExclusive && !p.isSold).slice(0, 3);
const recentSales = properties.filter((p) => p.isSold).slice(0, 4);

const categories: { key: keyof typeof categoryLabelsPlural; img: string }[] = [
  {
    key: "maison",
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80",
  },
  {
    key: "appartement",
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80",
  },
  {
    key: "villa",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
  },
  {
    key: "terrain",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80",
  },
];

const advantages = [
  {
    icon: ShieldIcon,
    title: "Accompagnement sur-mesure",
    text: "Un conseiller dédié à chaque étape, de la première visite à la signature.",
  },
  {
    icon: KeyIcon,
    title: "Biens d'exception",
    text: "Une sélection rigoureuse de propriétés de prestige et d'exclusivités.",
  },
  {
    icon: CalculatorIcon,
    title: "Estimation gratuite",
    text: "Connaissez la juste valeur de votre bien en quelques minutes.",
  },
  {
    icon: LeafIcon,
    title: "Transparence totale",
    text: "Honoraires clairs, diagnostics complets et conseils honnêtes.",
  },
];

const stats = [
  { value: "850+", label: "Biens vendus" },
  { value: "98%", label: "Clients satisfaits" },
  { value: "15 ans", label: "D'expérience" },
  { value: "3", label: "Agences en Gironde" },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
            alt="Villa de prestige Ampario"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/60 to-navy-900/30" />
        </div>

        <div className="container-page relative flex min-h-[640px] flex-col justify-center py-20">
          <div className="max-w-2xl animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              <SparkleIcon width={14} height={14} />
              Immobilier de prestige
            </span>
            <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight text-cream-50 sm:text-5xl lg:text-6xl">
              Trouvez le lieu où commence votre prochaine histoire
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-100/80">
              Maisons de caractère, villas d&apos;architecte, appartements et
              terrains d&apos;exception. Ampario vous accompagne dans l&apos;achat,
              la vente et la location de biens choisis avec exigence.
            </p>
          </div>

          <div className="mt-10 max-w-4xl animate-fade-up" style={{ animationDelay: "120ms" }}>
            <SearchBar />
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-cream-100/70">
            <span className="flex items-center gap-1.5">
              <span className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} width={16} height={16} filled className="text-gold-400" />
                ))}
              </span>
              4,9/5 · 264 avis clients
            </span>
            <span>Plus de 850 transactions réalisées</span>
          </div>
        </div>
      </section>

      {/* CATÉGORIES */}
      <section className="container-page -mt-12 relative z-10">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.key}
              href={`/proprietes?category=${cat.key}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card"
            >
              <Image
                src={cat.img}
                alt={categoryLabelsPlural[cat.key]}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                <span className="font-serif text-lg font-semibold text-cream-50">
                  {categoryLabelsPlural[cat.key]}
                </span>
                <ArrowRightIcon
                  width={18}
                  height={18}
                  className="text-gold-300 transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* COUPS DE CŒUR */}
      <section className="container-page py-20">
        <SectionHeading
          eyebrow="Nos coups de cœur"
          title="Une sélection de biens d'exception"
          description="Découvrez les propriétés qui ont retenu l'attention de nos conseillers."
          linkHref="/proprietes"
          linkLabel="Voir tous les biens"
        />
        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

      {/* BANDEAU ESTIMATION */}
      <section className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-navy-900 px-8 py-14 sm:px-14">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl" />
          <div className="absolute -bottom-20 left-1/3 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-center">
            <div>
              <p className="label-eyebrow text-gold-400">Vous vendez ?</p>
              <h2 className="mt-3 max-w-xl font-serif text-3xl font-semibold text-cream-50 sm:text-4xl">
                Estimez la valeur de votre bien gratuitement en 2 minutes
              </h2>
              <p className="mt-4 max-w-lg text-cream-100/70">
                Notre outil d&apos;estimation en ligne, alimenté par les données
                du marché local, vous donne une fourchette de prix fiable et
                instantanée.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <Link href="/estimation" className="btn-gold w-full justify-center lg:w-auto">
                Estimer mon bien
                <ArrowRightIcon width={18} height={18} />
              </Link>
              <Link
                href="/simulateur"
                className="btn-outline w-full justify-center border-cream-100/30 text-cream-100 hover:bg-cream-100 hover:text-navy-900 lg:w-auto"
              >
                Simuler mon prêt
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* EXCLUSIVITÉS */}
      <section className="container-page py-20">
        <SectionHeading
          eyebrow="Nos exclusivités"
          title="Des biens que vous ne trouverez que chez Ampario"
          linkHref="/proprietes?exclusive=1"
          linkLabel="Toutes nos exclusivités"
        />
        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {exclusives.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

      {/* AVANTAGES */}
      <section className="bg-cream-200/40 py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Pourquoi Ampario"
            title="Un savoir-faire au service de vos projets"
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((a) => (
              <div
                key={a.title}
                className="card-surface flex flex-col items-start p-7 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 text-gold-400">
                  <a.icon width={26} height={26} />
                </span>
                <h3 className="mt-5 font-serif text-xl font-semibold text-navy-900">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">
                  {a.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-navy-900 py-16">
        <div className="container-page grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-4xl font-semibold text-gold-400 sm:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-cream-100/60">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* AVIS CLIENTS */}
      <TestimonialsSection />

      {/* BIENS CONSULTÉS RÉCEMMENT */}
      <RecentlyViewed />

      {/* VENTES RÉCENTES */}
      <section className="container-page py-20">
        <SectionHeading
          eyebrow="Nos dernières ventes"
          title="Ils nous ont fait confiance"
          description="Quelques-uns des biens récemment vendus par nos équipes."
        />
        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {recentSales.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

      {/* INFOLINE CTA */}
      <section className="container-page pb-24">
        <div className="grid gap-6 rounded-3xl border border-gold-200 bg-gradient-to-br from-cream-50 to-cream-200/60 p-8 sm:p-12 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div>
            <p className="label-eyebrow">Infoline Ampario</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-navy-900">
              Une question ? Nos conseillers vous répondent 7j/7
            </h2>
            <p className="mt-3 text-navy-500">
              Achat, vente, location, gestion ou financement : bénéficiez d&apos;un
              conseil d&apos;expert, gratuit et sans engagement.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a href="tel:+33556123456" className="btn-primary w-full justify-center">
              +33 5 56 12 34 56
            </a>
            <Link href="/contact" className="btn-outline w-full justify-center">
              Être rappelé(e)
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
