"use client";

import { useFavorites } from "@/context/FavoritesContext";
import { HeartIcon } from "./icons";

export function FavoriteButton({
  id,
  className = "",
  size = 20,
}: {
  id: string;
  className?: string;
  size?: number;
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(id);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(id);
      }}
      aria-label={active ? "Retirer des favoris" : "Ajouter aux favoris"}
      aria-pressed={active}
      className={`flex items-center justify-center rounded-full bg-white/90 text-navy-700 shadow-sm backdrop-blur transition hover:scale-110 hover:text-gold-600 ${
        active ? "text-gold-600" : ""
      } ${className}`}
    >
      <HeartIcon filled={active} width={size} height={size} />
    </button>
  );
}
