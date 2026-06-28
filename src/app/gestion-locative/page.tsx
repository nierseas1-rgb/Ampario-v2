import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import {
  CheckIcon,
  ShieldIcon,
  KeyIcon,
  CalculatorIcon,
  ArrowRightIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Gestion locative",
  description:
    "Confiez la gestion de vos biens locatifs à Ampario : recherche de locataires, état des lieux, encaissement des loyers et suivi complet.",
};

const services = [
  {
    icon: KeyIcon,
    title: "Recherche de locataires",
    text: "Sélection rigoureuse des candidats, vérification des dossiers et solvabilité.",
  },
  {
    icon: ShieldIcon,
    title: "Sécurisation des loyers",
    text: "Garantie loyers impayés, gestion des cautions et des éventuels contentieux.",
  },
  {
    icon: CalculatorIcon,
    title: "Gestion administrative",
    text: "Quittances, révisions de loyer, régularisation des charges et déclarations.",
  },
];

const included = [
  "Estimation du loyer au prix du marché",
  "Diffusion de l'annonce et organisation des visites",
  "Rédaction du bail et état des lieux d'entrée/sortie",
  "Encaissement et reversement des loyers",
  "Suivi des travaux et relation locataire",
  "Compte rendu de gestion et bilan annuel",
];

export default function GestionLocativePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-navy-900">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1600&q=80"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="container-page relative grid gap-8 py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="label-eyebrow text-gold-400">Gestion locative</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold text-cream-50 sm:text-5xl">
              Louez l&apos;esprit tranquille
            </h1>
            <p className="mt-4 max-w-lg text-cream-100/75">
              De la recherche du locataire au suivi quotidien, Ampario gère vos
              biens locatifs avec rigueur et transparence. Vous percevez vos
              loyers, nous nous occupons du reste.
            </p>
            <Link href="/contact" className="btn-gold mt-8">
              Confier mon bien
              <ArrowRightIcon width={18} height={18} />
            </Link>
          </div>
          <div className="rounded-3xl bg-cream-50/10 p-8 backdrop-blur">
            <p className="font-serif text-5xl font-semibold text-gold-400">
              dès 6%
            </p>
            <p className="mt-2 text-cream-100/70">
              des loyers encaissés, sans frais cachés. Honoraires déductibles de
              vos revenus fonciers.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <SectionHeading
          eyebrow="Nos prestations"
          title="Une gestion complète et sereine"
          align="center"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="card-surface p-8">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 text-gold-400">
                <s.icon width={26} height={26} />
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
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card">
            <Image
              src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80"
              alt="Gestion locative Ampario"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="label-eyebrow">Tout compris</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-navy-900">
              Ce que comprend notre mandat de gestion
            </h2>
            <ul className="mt-6 space-y-3">
              {included.map((i) => (
                <li key={i} className="flex items-center gap-3 text-navy-700">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                    <CheckIcon width={14} height={14} />
                  </span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
