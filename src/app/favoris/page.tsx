"use client";

import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";
import { properties } from "@/data/properties";
import { PropertyCard } from "@/components/PropertyCard";
import { HeartIcon, TrashIcon, ArrowRightIcon } from "@/components/icons";

export default function FavorisPage() {
  const { favorites, clearFavorites } = useFavorites();
  const saved = properties.filter((p) => favorites.includes(p.id));

  return (
    <div className="container-page py-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="label-eyebrow">Votre sélection</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-navy-900">
            Mes favoris
          </h1>
          <p className="mt-2 text-navy-500">
            Retrouvez ici tous les biens que vous avez mis de côté.
          </p>
        </div>
        {saved.length > 0 && (
          <button
            onClick={clearFavorites}
            className="flex items-center gap-2 self-start rounded-full border border-navy-200 px-4 py-2 text-sm font-medium text-navy-500 transition hover:border-red-300 hover:text-red-600"
          >
            <TrashIcon width={16} height={16} />
            Tout effacer
          </button>
        )}
      </div>

      {saved.length > 0 ? (
        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      ) : (
        <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-navy-200 bg-white py-24 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-cream-200 text-gold-500">
            <HeartIcon width={36} height={36} />
          </span>
          <h2 className="mt-6 font-serif text-2xl font-semibold text-navy-900">
            Aucun favori pour le moment
          </h2>
          <p className="mt-2 max-w-md text-navy-500">
            Parcourez nos biens et cliquez sur le cœur pour les ajouter à votre
            sélection. Vous les retrouverez ici à tout moment.
          </p>
          <Link href="/proprietes" className="btn-primary mt-7">
            Découvrir les biens
            <ArrowRightIcon width={18} height={18} />
          </Link>
        </div>
      )}
    </div>
  );
}
