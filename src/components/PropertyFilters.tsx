"use client";

import { PropertyCategory, TransactionType } from "@/data/types";
import { categoryLabels } from "@/lib/format";
import { TrashIcon } from "./icons";

export interface Filters {
  transaction: TransactionType | "all";
  category: PropertyCategory | "all";
  q: string;
  maxPrice: number | "";
  minSurface: number | "";
  minBedrooms: number | "";
  exclusiveOnly: boolean;
}

export const defaultFilters: Filters = {
  transaction: "all",
  category: "all",
  q: "",
  maxPrice: "",
  minSurface: "",
  minBedrooms: "",
  exclusiveOnly: false,
};

const categories: (PropertyCategory | "all")[] = [
  "all",
  "maison",
  "appartement",
  "villa",
  "terrain",
  "immeuble",
  "local",
];

export function PropertyFilters({
  filters,
  onChange,
  onReset,
}: {
  filters: Filters;
  onChange: (next: Partial<Filters>) => void;
  onReset: () => void;
}) {
  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-xl font-semibold text-navy-900">Filtres</h3>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs font-medium text-navy-400 transition hover:text-gold-600"
        >
          <TrashIcon width={14} height={14} />
          Réinitialiser
        </button>
      </div>

      {/* Transaction */}
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-navy-400">
          Transaction
        </label>
        <div className="grid grid-cols-3 gap-1.5 rounded-xl bg-cream-200/60 p-1.5">
          {(["all", "vente", "location"] as const).map((t) => (
            <button
              key={t}
              onClick={() => onChange({ transaction: t })}
              className={`rounded-lg px-2 py-2 text-sm font-medium transition ${
                filters.transaction === t
                  ? "bg-navy-900 text-cream-100 shadow"
                  : "text-navy-600 hover:bg-white"
              }`}
            >
              {t === "all" ? "Tout" : t === "vente" ? "Acheter" : "Louer"}
            </button>
          ))}
        </div>
      </div>

      {/* Recherche localisation */}
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-navy-400">
          Localisation
        </label>
        <input
          type="text"
          value={filters.q}
          onChange={(e) => onChange({ q: e.target.value })}
          placeholder="Ville, code postal…"
          className="input-field"
        />
      </div>

      {/* Type de bien */}
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-navy-400">
          Type de bien
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => onChange({ category: c })}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
                filters.category === c
                  ? "border-navy-900 bg-navy-900 text-cream-100"
                  : "border-navy-200 text-navy-600 hover:border-navy-400"
              }`}
            >
              {c === "all" ? "Tous" : categoryLabels[c]}
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-navy-400">
          Budget maximum
        </label>
        <select
          value={filters.maxPrice}
          onChange={(e) =>
            onChange({ maxPrice: e.target.value ? Number(e.target.value) : "" })
          }
          className="input-field cursor-pointer"
        >
          <option value="">Sans limite</option>
          <option value="100000">Jusqu&apos;à 100 000 €</option>
          <option value="200000">Jusqu&apos;à 200 000 €</option>
          <option value="300000">Jusqu&apos;à 300 000 €</option>
          <option value="500000">Jusqu&apos;à 500 000 €</option>
          <option value="800000">Jusqu&apos;à 800 000 €</option>
          <option value="1500000">Jusqu&apos;à 1 500 000 €</option>
        </select>
      </div>

      {/* Surface min */}
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-navy-400">
          Surface minimum
        </label>
        <select
          value={filters.minSurface}
          onChange={(e) =>
            onChange({ minSurface: e.target.value ? Number(e.target.value) : "" })
          }
          className="input-field cursor-pointer"
        >
          <option value="">Indifférent</option>
          <option value="30">30 m²</option>
          <option value="50">50 m²</option>
          <option value="80">80 m²</option>
          <option value="120">120 m²</option>
          <option value="200">200 m²</option>
        </select>
      </div>

      {/* Chambres min */}
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-navy-400">
          Chambres minimum
        </label>
        <div className="flex gap-1.5">
          {["", 1, 2, 3, 4].map((n) => (
            <button
              key={String(n)}
              onClick={() => onChange({ minBedrooms: n === "" ? "" : Number(n) })}
              className={`flex-1 rounded-lg border py-2 text-sm font-medium transition ${
                filters.minBedrooms === n
                  ? "border-navy-900 bg-navy-900 text-cream-100"
                  : "border-navy-200 text-navy-600 hover:border-navy-400"
              }`}
            >
              {n === "" ? "Tous" : `${n}+`}
            </button>
          ))}
        </div>
      </div>

      {/* Exclusivités */}
      <label className="flex cursor-pointer items-center justify-between rounded-xl border border-navy-100 bg-cream-50 px-4 py-3">
        <span className="text-sm font-medium text-navy-700">
          Exclusivités uniquement
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={filters.exclusiveOnly}
          onClick={() => onChange({ exclusiveOnly: !filters.exclusiveOnly })}
          className={`relative h-6 w-11 rounded-full transition ${
            filters.exclusiveOnly ? "bg-gold-500" : "bg-navy-200"
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
              filters.exclusiveOnly ? "left-[22px]" : "left-0.5"
            }`}
          />
        </button>
      </label>
    </div>
  );
}
