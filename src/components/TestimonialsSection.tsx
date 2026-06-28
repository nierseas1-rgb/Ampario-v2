import { testimonials } from "@/data/testimonials";
import { TestimonialCard } from "./TestimonialCard";
import { SectionHeading } from "./SectionHeading";

export function TestimonialsSection() {
  return (
    <section className="bg-cream-200/40 py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Avis clients"
          title="Ils parlent de nous"
          description="La satisfaction de nos clients est notre plus belle récompense."
          linkHref="/avis"
          linkLabel="Tous les avis"
        />
        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
