import Link from "next/link";
import Image from "next/image";
import { Property } from "@/data/types";
import {
  categoryLabels,
  formatPriceLabel,
  formatSurface,
} from "@/lib/format";
import { FavoriteButton } from "./FavoriteButton";
import { BedIcon, RulerIcon, MapPinIcon, RoomsIcon } from "./icons";
import { DpeBadge } from "./DpeBadge";

export function PropertyCard({ property }: { property: Property }) {
  const isLand = property.category === "terrain";

  return (
    <Link
      href={`/proprietes/${property.id}`}
      className="group flex flex-col overflow-hidden card-surface hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <div className="flex flex-col gap-1.5">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold tracking-wide text-white ${
                property.transaction === "vente"
                  ? "bg-navy-900/90"
                  : "bg-gold-600/95"
              }`}
            >
              {property.transaction === "vente" ? "À vendre" : "À louer"}
            </span>
            {property.isExclusive && (
              <span className="rounded-full bg-cream-50/95 px-3 py-1 text-xs font-semibold text-gold-700">
                ✦ Exclusivité
              </span>
            )}
            {property.isNew && !property.isExclusive && (
              <span className="rounded-full bg-green-600/95 px-3 py-1 text-xs font-semibold text-white">
                Nouveau
              </span>
            )}
          </div>
          <FavoriteButton id={property.id} className="h-10 w-10" />
        </div>
        {property.isSold && (
          <div className="absolute inset-0 flex items-center justify-center bg-navy-950/55">
            <span className="rotate-[-8deg] rounded-lg border-2 border-cream-50 px-6 py-2 font-serif text-2xl font-semibold text-cream-50">
              Vendu
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="label-eyebrow">{categoryLabels[property.category]}</span>
          <DpeBadge grade={property.dpe} />
        </div>
        <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-navy-900 line-clamp-1">
          {property.title}
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-navy-500">
          <MapPinIcon width={15} height={15} className="text-gold-500" />
          {property.city} · {property.postalCode}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-navy-50 pt-4 text-sm text-navy-600">
          {isLand ? (
            <span className="flex items-center gap-1.5">
              <RulerIcon width={16} height={16} className="text-navy-400" />
              {formatSurface(property.landSurface ?? 0)} terrain
            </span>
          ) : (
            <>
              <span className="flex items-center gap-1.5">
                <RulerIcon width={16} height={16} className="text-navy-400" />
                {formatSurface(property.surface)}
              </span>
              {property.rooms != null && (
                <span className="flex items-center gap-1.5">
                  <RoomsIcon width={16} height={16} className="text-navy-400" />
                  {property.rooms} p.
                </span>
              )}
              {property.bedrooms != null && property.bedrooms > 0 && (
                <span className="flex items-center gap-1.5">
                  <BedIcon width={16} height={16} className="text-navy-400" />
                  {property.bedrooms} ch.
                </span>
              )}
            </>
          )}
        </div>

        <div className="mt-auto flex items-end justify-between pt-5">
          <p className="font-serif text-2xl font-semibold text-navy-900">
            {formatPriceLabel(property)}
          </p>
          <span className="text-xs font-medium text-navy-300">
            Réf. {property.reference}
          </span>
        </div>
      </div>
    </Link>
  );
}
