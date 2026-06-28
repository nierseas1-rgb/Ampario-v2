import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { EstimationWizard } from "@/components/EstimationWizard";
import { SectionHeading } from "@/components/SectionHeading";
import {
  ArrowRightIcon,
  CheckIcon,
  ShieldIcon,
  KeyIcon,
  SparkleIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Vendre votre bien immobilier",
  description:
    "Confiez la vente de votre bien à Ampario. Estimation gratuite, accompagnement sur-mesure et réseau d'acquéreurs qualifiés.",
};

const steps = [
  {
    n: "01",
    title: "Estimation gratuite",
    text: "Nous évaluons votre bien au juste prix grâce à notre connaissance fine du marché local.",
  },
  {
    n: "02",
    title: "Mise en valeur",
    text: "Reportage photo professionnel, visite virtuelle et diffusion sur les plus grands portails.",
  },
  {
    n: "03",
    title: "Visites qualifiées",
    text: "Nous sélectionnons les acquéreurs sérieux et organisons les visites à votre convenance.",
  },
  {
    n: "04",
    title: "Signature sécurisée",
    text: "Nous vous accompagnons jusque chez le notaire pour une transaction sereine.",
  },
];

const guarantees = [
  "Estimation offerte et sans engagement",
  "Honoraires uniquement en cas de succès",
  "Mandat clair et conseiller dédié",
  "Reportage photo et home-staging virtuel",
];

export default function VendrePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900">
        <div className="absolute inset-0 opacity-25">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="container-page relative grid gap-10 py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="label-eyebrow text-gold-400">Vous vendez ?</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold text-cream-50 sm:text-5xl">
              Vendez votre bien au meilleur prix, sereinement
            </h1>
            <p className="mt-4 max-w-lg text-cream-100/75">
              De l&apos;estimation à la signature, Ampario met son expertise et
              son réseau au service de votre projet de vente.
            </p>
            <ul className="mt-7 space-y-3">
              {guarantees.map((g) => (
                <li
                  key={g}
                  className="flex items-center gap-3 text-cream-100/90"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-white">
                    <CheckIcon width={14} height={14} />
                  </span>
                  {g}
                </li>
              ))}
            </ul>
            <Link href="#estimation" className="btn-gold mt-8">
              Estimer mon bien gratuitement
              <ArrowRightIcon width={18} height={18} />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[ShieldIcon, KeyIcon, SparkleIcon].map((Icon, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 rounded-2xl bg-cream-50/10 p-6 text-center backdrop-blur"
              >
                <Icon width={28} height={28} className="text-gold-400" />
                <span className="font-serif text-3xl font-semibold text-cream-50">
                  {["21j", "98%", "850+"][i]}
                </span>
                <span className="text-xs text-cream-100/60">
                  {["délai moyen", "biens vendus", "transactions"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Étapes */}
      <section className="container-page py-20">
        <SectionHeading
          eyebrow="Notre méthode"
          title="Vendre avec Ampario, c'est simple"
          align="center"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div
              key={s.n}
              className="relative rounded-2xl bg-white p-7 shadow-card"
            >
              <span className="font-serif text-5xl font-semibold text-cream-200">
                {s.n}
              </span>
              <h3 className="mt-3 font-serif text-xl font-semibold text-navy-900">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-500">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Estimation */}
      <section id="estimation" className="bg-cream-200/40 py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Première étape"
            title="Estimez votre bien en 2 minutes"
            align="center"
          />
          <div className="mx-auto mt-10 max-w-3xl">
            <EstimationWizard />
          </div>
        </div>
      </section>
    </div>
  );
}
