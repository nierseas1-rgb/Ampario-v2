"use client";

import Link from "next/link";
import Image from "next/image";
import { useCompare } from "@/context/CompareContext";
import { properties } from "@/data/properties";
import { CloseIcon, ArrowRightIcon } from "./icons";

export function CompareBar() {
  const { items, remove, clear, max } = useCompare();
  if (items.length === 0) return null;

  const selected = properties.filter((p) => items.includes(p.id));

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy-100 bg-cream-50/95 backdrop-blur shadow-[0_-8px_30px_-12px_rgba(22,36,63,0.25)]">
      <div className="container-page flex items-center gap-4 py-3">
        <div className="hidden shrink-0 sm:block">
          <p className="font-serif text-lg font-semibold text-navy-900">
            Comparateur
          </p>
          <p className="text-xs text-navy-400">
            {items.length}/{max} bien{items.length > 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex flex-1 items-center gap-3 overflow-x-auto no-scrollbar">
          {selected.map((p) => (
            <div
              key={p.id}
              className="relative flex shrink-0 items-center gap-2 rounded-xl border border-navy-100 bg-white py-1.5 pl-1.5 pr-3"
            >
              <div className="relative h-10 w-12 overflow-hidden rounded-lg">
                <Image
                  src={p.images[0]}
                  alt={p.title}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <span className="max-w-[120px] truncate text-xs font-medium text-navy-700">
                {p.title}
              </span>
              <button
                onClick={() => remove(p.id)}
                className="text-navy-300 transition hover:text-red-600"
                aria-label="Retirer"
              >
                <CloseIcon width={15} height={15} />
              </button>
            </div>
          ))}
          {[...Array(Math.max(0, max - selected.length))].map((_, i) => (
            <div
              key={i}
              className="hidden h-13 w-32 shrink-0 items-center justify-center rounded-xl border border-dashed border-navy-200 px-3 py-3 text-xs text-navy-300 sm:flex"
            >
              Bien {selected.length + i + 1}
            </div>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={clear}
            className="hidden text-sm text-navy-400 transition hover:text-navy-700 sm:block"
          >
            Effacer
          </button>
          <Link
            href="/comparateur"
            className={`btn-primary px-5 py-2.5 text-sm ${
              selected.length < 2 ? "pointer-events-none opacity-50" : ""
            }`}
          >
            Comparer
            <ArrowRightIcon width={16} height={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
