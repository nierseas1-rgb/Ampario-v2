import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { articles, getArticleBySlug } from "@/data/articles";
import { formatDate } from "@/lib/format";
import { ArrowRightIcon, ChevronRightIcon } from "@/components/icons";
import { ShareButtons } from "@/components/ShareButtons";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article introuvable" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { images: [article.cover], type: "article" },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <article>
      {/* En-tête */}
      <div className="relative h-[420px]">
        <Image
          src={article.cover}
          alt={article.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/50 to-navy-950/30" />
        <div className="container-page relative flex h-full flex-col justify-end pb-10">
          <div className="flex items-center gap-2 text-sm text-cream-100/70">
            <Link href="/" className="hover:text-gold-300">
              Accueil
            </Link>
            <ChevronRightIcon width={14} height={14} />
            <Link href="/actualites" className="hover:text-gold-300">
              Actualités
            </Link>
          </div>
          <span className="mt-4 w-fit rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-white">
            {article.category}
          </span>
          <h1 className="mt-4 max-w-3xl font-serif text-3xl font-semibold text-cream-50 sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <div className="mt-5 flex items-center gap-3 text-sm text-cream-100/80">
            <span>{article.author}</span>
            <span>·</span>
            <span>{formatDate(article.date)}</span>
            <span>·</span>
            <span>{article.readingTime} min de lecture</span>
          </div>
        </div>
      </div>

      {/* Corps */}
      <div className="container-page grid gap-12 py-14 lg:grid-cols-[1fr_280px]">
        <div className="max-w-2xl">
          <p className="font-serif text-xl leading-relaxed text-navy-700">
            {article.excerpt}
          </p>
          <div className="mt-8 space-y-6">
            {article.content.map((p, i) => (
              <p key={i} className="leading-relaxed text-navy-600">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-10 border-t border-navy-100 pt-6">
            <ShareButtons title={article.title} />
          </div>

          <div className="mt-10 rounded-2xl bg-navy-900 p-8 text-center">
            <h3 className="font-serif text-2xl font-semibold text-cream-50">
              Un projet immobilier en tête ?
            </h3>
            <p className="mt-2 text-cream-100/70">
              Nos conseillers vous accompagnent gratuitement et sans engagement.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="btn-gold">
                Nous contacter
              </Link>
              <Link
                href="/estimation"
                className="btn-outline border-cream-100/30 text-cream-100 hover:bg-cream-100 hover:text-navy-900"
              >
                Estimer mon bien
              </Link>
            </div>
          </div>
        </div>

        {/* Articles liés */}
        <aside>
          <div className="sticky top-32">
            <h3 className="font-serif text-xl font-semibold text-navy-900">
              À lire aussi
            </h3>
            <div className="mt-5 space-y-5">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  href={`/actualites/${a.slug}`}
                  className="group flex gap-3"
                >
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={a.cover}
                      alt={a.title}
                      fill
                      sizes="80px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gold-700">{a.category}</p>
                    <p className="text-sm font-medium text-navy-800 line-clamp-2 group-hover:text-gold-700">
                      {a.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="/actualites"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-700"
            >
              Toutes les actualités
              <ArrowRightIcon width={16} height={16} />
            </Link>
          </div>
        </aside>
      </div>
    </article>
  );
}
