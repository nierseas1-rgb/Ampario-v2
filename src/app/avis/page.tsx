import { Metadata } from "next";
import { testimonials } from "@/data/testimonials";
import { TestimonialCard } from "@/components/TestimonialCard";
import { StarIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Avis clients",
  description:
    "Découvrez les témoignages de nos clients vendeurs, acquéreurs, investisseurs et locataires. La satisfaction au cœur d'Ampario.",
};

export default function AvisPage() {
  return (
    <div>
      <section className="bg-navy-900 py-16">
        <div className="container-page max-w-3xl text-center">
          <p className="label-eyebrow text-gold-400">Ils témoignent</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-cream-50 sm:text-5xl">
            La confiance de nos clients
          </h1>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  width={22}
                  height={22}
                  filled
                  className="text-gold-400"
                />
              ))}
            </span>
            <span className="font-serif text-2xl font-semibold text-cream-50">
              4,9/5
            </span>
            <span className="text-cream-100/60">· 264 avis vérifiés</span>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </div>
      </section>
    </div>
  );
}
