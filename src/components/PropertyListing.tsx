"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { properties } from "@/data/properties";
import { PropertyCard } from "./PropertyCard";
import {
  PropertyFilters,
  Filters,
  defaultFilters,
} from "./PropertyFilters";
import { PropertyCategory, TransactionType } from "@/data/types";
import { FilterIcon, CloseIcon, SearchIcon } from "./icons";

type SortKey = "recent" | "price-asc" | "price-desc" | "surface-desc";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "recent", label: "Plus récents" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "surface-desc", label: "Surface décroissante" },
];

export function PropertyListing() {
  const params = useSearchParams();
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [sort, setSort] = useState<SortKey>("recent");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Initialise les filtres depuis l'URL
  useEffect(() => {
    setFilters({
      transaction: (params.get("transaction") as TransactionType) ?? "all",
      category: (params.get("category") as PropertyCategory) ?? "all",
      q: params.get("q") ?? "",
      maxPrice: params.get("maxPrice") ? Number(params.get("maxPrice")) : "",
      minSurface: params.get("minSurface")
        ? Number(params.get("minSurface"))
        : "",
      minBedrooms: params.get("minBedrooms")
        ? Number(params.get("minBedrooms"))
        : "",
      exclusiveOnly: params.get("exclusive") === "1",
    });
  }, [params]);

  const update = (next: Partial<Filters>) =>
    setFilters((prev) => ({ ...prev, ...next }));

  const reset = () => setFilters(defaultFilters);

  const results = useMemo(() => {
    let list = properties.filter((p) => !p.isSold);

    if (filters.transaction !== "all")
      list = list.filter((p) => p.transaction === filters.transaction);
    if (filters.category !== "all")
      list = list.filter((p) => p.category === filters.category);
    if (filters.q.trim()) {
      const q = filters.q.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.city.toLowerCase().includes(q) ||
          p.postalCode.includes(q) ||
          p.region.toLowerCase().includes(q) ||
          p.title.toLowerCase().includes(q)
      );
    }
    const { maxPrice, minSurface, minBedrooms } = filters;
    if (typeof maxPrice === "number")
      list = list.filter((p) => p.price <= maxPrice);
    if (typeof minSurface === "number")
      list = list.filter(
        (p) =>
          (p.category === "terrain" ? p.landSurface ?? 0 : p.surface) >=
          minSurface
      );
    if (typeof minBedrooms === "number")
      list = list.filter((p) => (p.bedrooms ?? 0) >= minBedrooms);
    if (filters.exclusiveOnly) list = list.filter((p) => p.isExclusive);

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "surface-desc":
        list = [...list].sort(
          (a, b) =>
            (b.surface || b.landSurface || 0) -
            (a.surface || a.landSurface || 0)
        );
        break;
      default:
        list = [...list].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
    return list;
  }, [filters, sort]);

  return (
    <div className="container-page py-10 lg:py-14">
      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        {/* Sidebar desktop */}
        <aside className="hidden lg:block">
          <div className="sticky top-32 rounded-2xl bg-white p-6 shadow-card">
            <PropertyFilters
              filters={filters}
              onChange={update}
              onReset={reset}
            />
          </div>
        </aside>

        <div>
          {/* Barre de résultats */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-navy-500">
              <span className="font-serif text-2xl font-semibold text-navy-900">
                {results.length}
              </span>{" "}
              bien{results.length > 1 ? "s" : ""} correspondant
              {results.length > 1 ? "s" : ""} à votre recherche
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="btn-outline px-4 py-2.5 lg:hidden"
              >
                <FilterIcon width={16} height={16} />
                Filtres
              </button>
              <div className="flex items-center gap-2">
                <span className="hidden text-sm text-navy-400 sm:inline">
                  Trier par
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="cursor-pointer rounded-xl border border-navy-200 bg-white px-3 py-2.5 text-sm text-navy-700 focus:border-gold-400 focus:outline-none"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Résultats */}
          {results.length > 0 ? (
            <div className="mt-8 grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-navy-200 bg-white py-20 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream-200 text-navy-400">
                <SearchIcon width={28} height={28} />
              </span>
              <h3 className="mt-5 font-serif text-2xl font-semibold text-navy-900">
                Aucun bien ne correspond
              </h3>
              <p className="mt-2 max-w-sm text-sm text-navy-500">
                Essayez d&apos;élargir vos critères de recherche ou contactez nos
                conseillers pour une recherche personnalisée.
              </p>
              <button onClick={reset} className="btn-primary mt-6">
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filtres mobile (drawer) */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-navy-950/40 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[88vw] max-w-sm overflow-y-auto bg-cream-50 p-6 shadow-2xl animate-fade-in">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-serif text-lg font-semibold">Filtres</span>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-full p-2 hover:bg-navy-50"
              >
                <CloseIcon />
              </button>
            </div>
            <PropertyFilters
              filters={filters}
              onChange={update}
              onReset={reset}
            />
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="btn-primary mt-8 w-full"
            >
              Voir les {results.length} biens
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
