"use client";

import Link from "next/link";
import Image from "next/image";
import { useCompare } from "@/context/CompareContext";
import { properties } from "@/data/properties";
import {
  categoryLabels,
  formatPrice,
  formatPriceLabel,
  formatSurface,
  pricePerSqm,
} from "@/lib/format";
import { CloseIcon, ArrowRightIcon } from "@/components/icons";
import { DpeBadge } from "@/components/DpeBadge";

const ScalesIcon = () => (
  <svg
    width={36}
    height={36}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3v18M7 21h10M5 7l-3 6a3 3 0 0 0 6 0L5 7Zm14 0-3 6a3 3 0 0 0 6 0l-3-6ZM5 7l7-2 7 2" />
  </svg>
);

export default function ComparateurPage() {
  const { items, remove, clear } = useCompare();
  const selected = properties.filter((p) => items.includes(p.id));

  if (selected.length === 0) {
    return (
      <div className="container-page flex min-h-[55vh] flex-col items-center justify-center py-20 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-cream-200 text-gold-500">
          <ScalesIcon />
        </span>
        <h1 className="mt-6 font-serif text-3xl font-semibold text-navy-900">
          Comparez vos biens favoris
        </h1>
        <p className="mt-3 max-w-md text-navy-500">
          Ajoutez jusqu&apos;à 3 biens au comparateur depuis les annonces pour
          les confronter caractéristique par caractéristique.
        </p>
        <Link href="/proprietes" className="btn-primary mt-7">
          Parcourir les biens
          <ArrowRightIcon width={18} height={18} />
        </Link>
      </div>
    );
  }

  const rows: { label: string; render: (p: (typeof selected)[0]) => React.ReactNode }[] = [
    { label: "Prix", render: (p) => <span className="font-serif text-xl font-semibold text-navy-900">{formatPriceLabel(p)}</span> },
    { label: "Type", render: (p) => categoryLabels[p.category] },
    { label: "Transaction", render: (p) => (p.transaction === "vente" ? "À vendre" : "À louer") },
    { label: "Ville", render: (p) => `${p.city} (${p.postalCode})` },
    { label: "Surface", render: (p) => (p.surface ? formatSurface(p.surface) : "—") },
    { label: "Terrain", render: (p) => (p.landSurface ? formatSurface(p.landSurface) : "—") },
    { label: "Prix / m²", render: (p) => { const v = pricePerSqm(p); return v ? formatPrice(v) : "—"; } },
    { label: "Pièces", render: (p) => p.rooms ?? "—" },
    { label: "Chambres", render: (p) => p.bedrooms ?? "—" },
    { label: "Salles de bain", render: (p) => p.bathrooms ?? "—" },
    { label: "Année", render: (p) => p.yearBuilt ?? "—" },
    { label: "DPE", render: (p) => <DpeBadge grade={p.dpe} label="" /> },
    { label: "GES", render: (p) => <DpeBadge grade={p.ges} label="" /> },
    { label: "Prestations", render: (p) => (
      <ul className="space-y-1 text-sm">
        {p.features.slice(0, 5).map((f) => (
          <li key={f} className="text-navy-600">• {f}</li>
        ))}
      </ul>
    ) },
  ];

  return (
    <div className="bg-cream-100 pb-28">
      <section className="bg-navy-900 py-12">
        <div className="container-page flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label-eyebrow text-gold-400">Comparateur</p>
            <h1 className="mt-2 font-serif text-3xl font-semibold text-cream-50 sm:text-4xl">
              Comparez {selected.length} biens
            </h1>
          </div>
          <button
            onClick={clear}
            className="self-start text-sm text-cream-100/70 underline-offset-4 transition hover:text-gold-300 hover:underline"
          >
            Tout effacer
          </button>
        </div>
      </section>

      <div className="container-page mt-8 overflow-x-auto">
        <table className="w-full min-w-[640px] border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="w-40 align-bottom" />
              {selected.map((p) => (
                <th key={p.id} className="p-2 align-bottom">
                  <div className="relative overflow-hidden rounded-2xl bg-white shadow-card">
                    <button
                      onClick={() => remove(p.id)}
                      className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-navy-600 shadow transition hover:text-red-600"
                      aria-label="Retirer"
                    >
                      <CloseIcon width={16} height={16} />
                    </button>
                    <Link href={`/proprietes/${p.id}`}>
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={p.images[0]}
                          alt={p.title}
                          fill
                          sizes="280px"
                          className="object-cover"
                        />
                      </div>
                      <p className="p-3 text-left font-serif text-base font-semibold text-navy-900 line-clamp-1">
                        {p.title}
                      </p>
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.label} className={i % 2 ? "bg-white/60" : ""}>
                <td className="border-b border-navy-50 px-3 py-4 text-sm font-semibold text-navy-400 align-top">
                  {row.label}
                </td>
                {selected.map((p) => (
                  <td
                    key={p.id}
                    className="border-b border-navy-50 px-4 py-4 text-sm text-navy-700 align-top"
                  >
                    {row.render(p)}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td />
              {selected.map((p) => (
                <td key={p.id} className="px-4 py-5 align-top">
                  <Link
                    href={`/proprietes/${p.id}`}
                    className="btn-outline w-full justify-center text-sm"
                  >
                    Voir le bien
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
