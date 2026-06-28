"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Property } from "@/data/types";
import { formatPriceLabel } from "@/lib/format";
import { CloseIcon, MapPinIcon } from "./icons";

export function PropertyMap({ items }: { items: Property[] }) {
  const [active, setActive] = useState<string | null>(null);

  const { bbox, bounds } = useMemo(() => {
    const lats = items.map((p) => p.lat);
    const lngs = items.map((p) => p.lng);
    const padLat = 0.02;
    const padLng = 0.03;
    const minLat = Math.min(...lats) - padLat;
    const maxLat = Math.max(...lats) + padLat;
    const minLng = Math.min(...lngs) - padLng;
    const maxLng = Math.max(...lngs) + padLng;
    return {
      bbox: `${minLng},${minLat},${maxLng},${maxLat}`,
      bounds: { minLat, maxLat, minLng, maxLng },
    };
  }, [items]);

  const pos = (p: Property) => ({
    left: `${((p.lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100}%`,
    top: `${((bounds.maxLat - p.lat) / (bounds.maxLat - bounds.minLat)) * 100}%`,
  });

  const activeProp = items.find((p) => p.id === active);

  if (items.length === 0) {
    return (
      <div className="flex h-[600px] items-center justify-center rounded-2xl bg-white text-navy-400">
        Aucun bien à afficher sur la carte.
      </div>
    );
  }

  return (
    <div className="relative h-[600px] overflow-hidden rounded-2xl bg-white shadow-card">
      <iframe
        title="Carte des biens"
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik`}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
      />
      {/* Calque des épingles */}
      <div className="pointer-events-none absolute inset-0">
        {items.map((p) => (
          <button
            key={p.id}
            onClick={() => setActive(p.id)}
            style={pos(p)}
            className="pointer-events-auto absolute -translate-x-1/2 -translate-y-full transition hover:z-20 hover:scale-110"
          >
            <span
              className={`flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold shadow-lg ring-2 ring-white ${
                active === p.id
                  ? "bg-gold-500 text-white"
                  : "bg-navy-900 text-cream-50"
              }`}
            >
              <MapPinIcon width={12} height={12} />
              {formatPriceLabel(p).replace(" / mois", "")}
            </span>
          </button>
        ))}
      </div>

      {/* Carte du bien sélectionné */}
      {activeProp && (
        <div className="absolute bottom-4 left-1/2 z-30 w-[90%] max-w-sm -translate-x-1/2">
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-card-hover">
            <button
              onClick={() => setActive(null)}
              className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-navy-600 shadow transition hover:text-red-600"
              aria-label="Fermer"
            >
              <CloseIcon width={16} height={16} />
            </button>
            <Link href={`/proprietes/${activeProp.id}`} className="flex gap-3">
              <div className="relative h-24 w-28 shrink-0">
                <Image
                  src={activeProp.images[0]}
                  alt={activeProp.title}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center py-2 pr-3">
                <p className="font-serif text-base font-semibold text-navy-900 line-clamp-1">
                  {activeProp.title}
                </p>
                <p className="text-xs text-navy-400">
                  {activeProp.city} · {activeProp.postalCode}
                </p>
                <p className="mt-1 font-serif text-lg font-semibold text-gold-700">
                  {formatPriceLabel(activeProp)}
                </p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
