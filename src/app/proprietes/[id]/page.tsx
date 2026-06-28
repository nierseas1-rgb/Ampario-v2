import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import {
  getPropertyById,
  getRelatedProperties,
  properties,
} from "@/data/properties";
import {
  categoryLabels,
  formatPrice,
  formatPriceLabel,
  formatSurface,
  formatDate,
  pricePerSqm,
} from "@/lib/format";
import { Gallery } from "@/components/Gallery";
import { LoanSimulator } from "@/components/LoanSimulator";
import { ContactAgentForm } from "@/components/ContactAgentForm";
import { MiniMap } from "@/components/MiniMap";
import { PropertyCard } from "@/components/PropertyCard";
import { DpeBadge } from "@/components/DpeBadge";
import { ShareButtons } from "@/components/ShareButtons";
import { TrackView } from "@/components/TrackView";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import {
  BedIcon,
  BathIcon,
  RulerIcon,
  RoomsIcon,
  MapPinIcon,
  CheckIcon,
  ChevronRightIcon,
} from "@/components/icons";

export function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const property = getPropertyById(id);
  if (!property) return { title: "Bien introuvable" };
  return {
    title: `${property.title} — ${property.city}`,
    description: property.description.slice(0, 160),
    openGraph: { images: [property.images[0]] },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = getPropertyById(id);
  if (!property) notFound();

  const related = getRelatedProperties(property);
  const isLand = property.category === "terrain";
  const ppsqm = pricePerSqm(property);

  const keyFigures = [
    !isLand && {
      icon: RulerIcon,
      label: "Surface habitable",
      value: formatSurface(property.surface),
    },
    property.landSurface && {
      icon: RulerIcon,
      label: "Surface terrain",
      value: formatSurface(property.landSurface),
    },
    property.rooms != null && {
      icon: RoomsIcon,
      label: "Pièces",
      value: String(property.rooms),
    },
    property.bedrooms != null &&
      property.bedrooms > 0 && {
        icon: BedIcon,
        label: "Chambres",
        value: String(property.bedrooms),
      },
    property.bathrooms != null && {
      icon: BathIcon,
      label: "Salles de bain",
      value: String(property.bathrooms),
    },
  ].filter(Boolean) as {
    icon: typeof RulerIcon;
    label: string;
    value: string;
  }[];

  return (
    <div className="pb-24">
      <TrackView id={property.id} />
      {/* Fil d'Ariane */}
      <div className="border-b border-navy-50 bg-cream-50">
        <div className="container-page flex items-center gap-2 py-4 text-sm text-navy-400">
          <Link href="/" className="hover:text-gold-600">
            Accueil
          </Link>
          <ChevronRightIcon width={14} height={14} />
          <Link
            href={`/proprietes?transaction=${property.transaction}`}
            className="hover:text-gold-600"
          >
            {property.transaction === "vente" ? "Acheter" : "Louer"}
          </Link>
          <ChevronRightIcon width={14} height={14} />
          <span className="truncate text-navy-700">{property.title}</span>
        </div>
      </div>

      <div className="container-page pt-8">
        {/* En-tête */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-navy-900 px-3 py-1 text-xs font-semibold text-cream-100">
                {property.transaction === "vente" ? "À vendre" : "À louer"}
              </span>
              <span className="rounded-full bg-cream-200 px-3 py-1 text-xs font-semibold text-navy-700">
                {categoryLabels[property.category]}
              </span>
              {property.isExclusive && (
                <span className="rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold text-gold-700">
                  ✦ Exclusivité
                </span>
              )}
            </div>
            <h1 className="mt-3 font-serif text-3xl font-semibold text-navy-900 sm:text-4xl">
              {property.title}
            </h1>
            <p className="mt-2 flex items-center gap-1.5 text-navy-500">
              <MapPinIcon width={17} height={17} className="text-gold-500" />
              {property.city} · {property.postalCode} · {property.region}
            </p>
          </div>
          <div className="lg:text-right">
            <p className="font-serif text-4xl font-semibold text-navy-900">
              {formatPriceLabel(property)}
            </p>
            {ppsqm && (
              <p className="mt-1 text-sm text-navy-400">
                soit {formatPrice(ppsqm)} / m²
              </p>
            )}
            {property.transaction === "location" && property.charges ? (
              <p className="text-sm text-navy-400">
                + {formatPrice(property.charges)} de charges
              </p>
            ) : null}
          </div>
        </div>

        {/* Galerie */}
        <div className="mt-8">
          <Gallery
            images={property.images}
            title={property.title}
            propertyId={property.id}
          />
        </div>

        {/* Corps */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.7fr_1fr]">
          <div className="space-y-12">
            {/* Chiffres clés */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {keyFigures.map((f) => (
                <div
                  key={f.label}
                  className="rounded-2xl bg-white p-5 text-center shadow-card"
                >
                  <f.icon
                    width={24}
                    height={24}
                    className="mx-auto text-gold-500"
                  />
                  <p className="mt-3 font-serif text-2xl font-semibold text-navy-900">
                    {f.value}
                  </p>
                  <p className="text-xs text-navy-400">{f.label}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <section>
              <h2 className="font-serif text-2xl font-semibold text-navy-900">
                Description
              </h2>
              <p className="mt-4 whitespace-pre-line leading-relaxed text-navy-600">
                {property.description}
              </p>
            </section>

            {/* Caractéristiques */}
            <section>
              <h2 className="font-serif text-2xl font-semibold text-navy-900">
                Caractéristiques &amp; prestations
              </h2>
              <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {property.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                      <CheckIcon width={15} height={15} />
                    </span>
                    <span className="text-sm text-navy-700">{f}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Détails techniques */}
            <section>
              <h2 className="font-serif text-2xl font-semibold text-navy-900">
                Informations complémentaires
              </h2>
              <dl className="mt-5 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                <DetailRow label="Référence" value={property.reference} />
                <DetailRow
                  label="Type de bien"
                  value={categoryLabels[property.category]}
                />
                {property.yearBuilt && (
                  <DetailRow
                    label="Année de construction"
                    value={String(property.yearBuilt)}
                  />
                )}
                <DetailRow
                  label="Disponibilité"
                  value="Nous consulter"
                />
                <DetailRow
                  label="Publié le"
                  value={formatDate(property.createdAt)}
                />
              </dl>

              {(property.dpe || property.ges) && (
                <div className="mt-6 flex flex-wrap items-center gap-6 rounded-2xl bg-cream-200/50 px-6 py-5">
                  <span className="text-sm font-semibold text-navy-700">
                    Diagnostic énergétique
                  </span>
                  <DpeBadge grade={property.dpe} label="DPE" size="lg" />
                  <DpeBadge grade={property.ges} label="GES" size="lg" />
                </div>
              )}
            </section>

            {/* Carte */}
            <section>
              <h2 className="mb-5 font-serif text-2xl font-semibold text-navy-900">
                Localisation
              </h2>
              <MiniMap
                lat={property.lat}
                lng={property.lng}
                label={`${property.city} (${property.postalCode})`}
              />
            </section>

            {/* Simulateur (sauf location) */}
            {property.transaction === "vente" && (
              <section>
                <h2 className="mb-5 font-serif text-2xl font-semibold text-navy-900">
                  Financer ce bien
                </h2>
                <LoanSimulator price={property.price} />
              </section>
            )}

            {/* Partage */}
            <section className="border-t border-navy-100 pt-8">
              <ShareButtons title={`${property.title} — ${property.city}`} />
            </section>
          </div>

          {/* Colonne latérale */}
          <aside>
            <div className="sticky top-32 space-y-6">
              <ContactAgentForm property={property} />
            </div>
          </aside>
        </div>

        {/* Biens similaires */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-serif text-3xl font-semibold text-navy-900">
              Biens similaires
            </h2>
            <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Biens consultés récemment */}
      <RecentlyViewed excludeId={property.id} />
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-navy-50 py-2.5">
      <dt className="text-sm text-navy-400">{label}</dt>
      <dd className="text-sm font-semibold text-navy-800">{value}</dd>
    </div>
  );
}
