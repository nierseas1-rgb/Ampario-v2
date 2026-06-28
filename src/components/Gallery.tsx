"use client";

import Image from "next/image";
import { useState } from "react";
import { CloseIcon, ChevronRightIcon, HeartIcon } from "./icons";
import { useFavorites } from "@/context/FavoritesContext";

export function Gallery({
  images,
  title,
  propertyId,
}: {
  images: string[];
  title: string;
  propertyId: string;
}) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(propertyId);

  const go = (dir: number) =>
    setActive((a) => (a + dir + images.length) % images.length);

  return (
    <>
      <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
        <button
          onClick={() => setLightbox(true)}
          className="group relative aspect-[16/11] overflow-hidden rounded-2xl"
        >
          <Image
            src={images[active]}
            alt={title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute bottom-4 left-4 rounded-full bg-navy-950/70 px-4 py-1.5 text-xs font-medium text-cream-50 backdrop-blur">
            {active + 1} / {images.length} · Cliquez pour agrandir
          </span>
        </button>

        <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
          {images.slice(0, 3).map((img, i) => (
            <button
              key={img}
              onClick={() => setActive(i)}
              className={`relative aspect-[4/3] overflow-hidden rounded-xl transition lg:aspect-auto lg:h-full ${
                active === i ? "ring-2 ring-gold-500 ring-offset-2" : "opacity-90 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${title} ${i + 1}`}
                fill
                sizes="33vw"
                className="object-cover"
              />
              {i === 2 && images.length > 3 && (
                <span className="absolute inset-0 flex items-center justify-center bg-navy-950/55 text-sm font-semibold text-cream-50">
                  +{images.length - 3} photos
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Bouton favori flottant sous la galerie */}
      <button
        onClick={() => toggleFavorite(propertyId)}
        className={`mt-4 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
          fav
            ? "border-gold-500 bg-gold-50 text-gold-700"
            : "border-navy-200 text-navy-700 hover:border-navy-400"
        }`}
      >
        <HeartIcon filled={fav} width={18} height={18} />
        {fav ? "Retiré des favoris" : "Ajouter aux favoris"}
      </button>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-950/95 p-4 animate-fade-in">
          <button
            onClick={() => setLightbox(false)}
            className="absolute right-5 top-5 rounded-full bg-cream-50/10 p-3 text-cream-50 hover:bg-cream-50/20"
            aria-label="Fermer"
          >
            <CloseIcon />
          </button>
          <button
            onClick={() => go(-1)}
            className="absolute left-4 rounded-full bg-cream-50/10 p-3 text-cream-50 hover:bg-cream-50/20"
            aria-label="Précédent"
          >
            <ChevronRightIcon className="rotate-180" />
          </button>
          <div className="relative h-[80vh] w-full max-w-5xl">
            <Image
              src={images[active]}
              alt={title}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <button
            onClick={() => go(1)}
            className="absolute right-4 rounded-full bg-cream-50/10 p-3 text-cream-50 hover:bg-cream-50/20"
            aria-label="Suivant"
          >
            <ChevronRightIcon />
          </button>
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-cream-50/10 px-4 py-1.5 text-sm text-cream-50">
            {active + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  );
}
