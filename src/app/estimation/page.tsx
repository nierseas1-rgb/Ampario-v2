import { Metadata } from "next";
import { EstimationWizard } from "@/components/EstimationWizard";
import { ShieldIcon, SparkleIcon, CalculatorIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Estimation immobilière gratuite en ligne",
  description:
    "Estimez gratuitement la valeur de votre bien immobilier en quelques minutes grâce à l'outil Ampario.",
};

const points = [
  { icon: CalculatorIcon, text: "Estimation immédiate et gratuite" },
  { icon: SparkleIcon, text: "Basée sur les données du marché local" },
  { icon: ShieldIcon, text: "Sans engagement, en toute confidentialité" },
];

export default function EstimationPage() {
  return (
    <div>
      <section className="bg-navy-900 py-16">
        <div className="container-page max-w-3xl text-center">
          <p className="label-eyebrow text-gold-400">Estimation en ligne</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-cream-50 sm:text-5xl">
            Combien vaut votre bien ?
          </h1>
          <p className="mt-4 text-cream-100/70">
            Obtenez une estimation fiable en moins de 2 minutes. Renseignez
            quelques informations, notre algorithme fait le reste.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-cream-100/80">
            {points.map((p) => (
              <span key={p.text} className="flex items-center gap-2">
                <p.icon width={18} height={18} className="text-gold-400" />
                {p.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page -mt-10 pb-24">
        <div className="mx-auto max-w-3xl">
          <EstimationWizard />
        </div>
      </section>
    </div>
  );
}
