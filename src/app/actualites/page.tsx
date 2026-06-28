import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { articles } from "@/data/articles";
import { formatDate } from "@/lib/format";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Actualités & conseils immobiliers",
  description:
    "Conseils d'achat, de vente, d'investissement et tendances du marché : le blog Ampario vous éclaire sur l'immobilier.",
};

export default function ActualitesPage() {
  const [featured, ...rest] = articles;

  return (
    <div>
      <section className="bg-navy-900 py-16">
        <div className="container-page max-w-3xl">
          <p className="label-eyebrow text-gold-400">Le journal Ampario</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-cream-50 sm:text-5xl">
            Actualités &amp; conseils
          </h1>
          <p className="mt-4 text-cream-100/70">
            Décryptages du marché, conseils d&apos;experts et guides pratiques
            pour mener à bien tous vos projets immobiliers.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        {/* Article à la une */}
        <Link
          href={`/actualites/${featured.slug}`}
          className="group grid overflow-hidden card-surface lg:grid-cols-2"
        >
          <div className="relative aspect-[16/10] lg:aspect-auto">
            <Image
              src={featured.cover}
              alt={featured.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute left-4 top-4 rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-white">
              À la une
            </span>
          </div>
          <div className="flex flex-col justify-center p-8 lg:p-10">
            <span className="label-eyebrow">{featured.category}</span>
            <h2 className="mt-3 font-serif text-2xl font-semibold text-navy-900 sm:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-3 text-navy-500">{featured.excerpt}</p>
            <div className="mt-5 flex items-center gap-3 text-sm text-navy-400">
              <span>{featured.author}</span>
              <span>·</span>
              <span>{formatDate(featured.date)}</span>
              <span>·</span>
              <span>{featured.readingTime} min de lecture</span>
            </div>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-700">
              Lire l&apos;article
              <ArrowRightIcon
                width={16}
                height={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </div>
        </Link>

        {/* Autres articles */}
        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <Link
              key={a.slug}
              href={`/actualites/${a.slug}`}
              className="group flex flex-col overflow-hidden card-surface hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={a.cover}
                  alt={a.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="label-eyebrow">{a.category}</span>
                <h3 className="mt-2 font-serif text-xl font-semibold text-navy-900 line-clamp-2">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm text-navy-500 line-clamp-2">
                  {a.excerpt}
                </p>
                <div className="mt-auto pt-4 text-xs text-navy-400">
                  {formatDate(a.date)} · {a.readingTime} min
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
