import Image from "next/image";
import { Testimonial } from "@/data/testimonials";
import { StarIcon } from "./icons";

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl bg-white p-7 shadow-card">
      <div className="flex gap-0.5 text-gold-500">
        {[...Array(t.rating)].map((_, i) => (
          <StarIcon key={i} width={18} height={18} filled />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-navy-600">
        <p className="leading-relaxed">“{t.text}”</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-navy-50 pt-5">
        <div className="relative h-11 w-11 overflow-hidden rounded-full">
          <Image
            src={t.avatar}
            alt={t.name}
            fill
            sizes="44px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-navy-900">{t.name}</p>
          <p className="text-xs text-navy-400">
            {t.role} · {t.city}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
