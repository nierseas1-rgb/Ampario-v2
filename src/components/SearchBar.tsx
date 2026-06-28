"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SearchIcon, MapPinIcon } from "./icons";

const categories = [
  { value: "", label: "Tous les biens" },
  { value: "maison", label: "Maison" },
  { value: "appartement", label: "Appartement" },
  { value: "villa", label: "Villa" },
  { value: "terrain", label: "Terrain" },
  { value: "immeuble", label: "Immeuble" },
  { value: "local", label: "Local commercial" },
];

const budgets = [
  { value: "", label: "Budget max" },
  { value: "150000", label: "150 000 €" },
  { value: "300000", label: "300 000 €" },
  { value: "500000", label: "500 000 €" },
  { value: "800000", label: "800 000 €" },
  { value: "1500000", label: "1 500 000 €" },
];

export function SearchBar({ variant = "hero" }: { variant?: "hero" | "compact" }) {
  const router = useRouter();
  const [transaction, setTransaction] = useState<"vente" | "location">("vente");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("transaction", transaction);
    if (category) params.set("category", category);
    if (location) params.set("q", location);
    if (budget) params.set("maxPrice", budget);
    router.push(`/proprietes?${params.toString()}`);
  };

  return (
    <div
      className={`w-full ${
        variant === "hero" ? "rounded-2xl bg-white/95 p-2 shadow-card-hover backdrop-blur" : ""
      }`}
    >
      {/* Onglets vente/location */}
      <div className="flex gap-1 p-1.5">
        {(["vente", "location"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTransaction(t)}
            className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition sm:flex-none sm:px-8 ${
              transaction === t
                ? "bg-navy-900 text-cream-100 shadow"
                : "text-navy-600 hover:bg-navy-50"
            }`}
          >
            {t === "vente" ? "Acheter" : "Louer"}
          </button>
        ))}
      </div>

      <form
        onSubmit={submit}
        className="grid gap-2 p-1.5 sm:grid-cols-2 lg:grid-cols-[2fr_1.4fr_1.4fr_auto]"
      >
        <div className="relative">
          <MapPinIcon
            width={18}
            height={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold-500"
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ville, code postal, région…"
            className="input-field pl-11"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input-field cursor-pointer appearance-none"
        >
          {categories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        <select
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="input-field cursor-pointer appearance-none"
        >
          {budgets.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>

        <button type="submit" className="btn-gold h-full px-8">
          <SearchIcon width={18} height={18} />
          Rechercher
        </button>
      </form>
    </div>
  );
}
