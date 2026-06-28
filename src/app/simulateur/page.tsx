"use client";

import { useState } from "react";
import { LoanSimulator } from "@/components/LoanSimulator";
import { formatPrice } from "@/lib/format";

export default function SimulateurPage() {
  const [price, setPrice] = useState(350000);

  return (
    <div>
      <section className="bg-navy-900 py-16">
        <div className="container-page max-w-3xl text-center">
          <p className="label-eyebrow text-gold-400">Simulateur de prêt</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-cream-50 sm:text-5xl">
            Calculez votre capacité d&apos;emprunt
          </h1>
          <p className="mt-4 text-cream-100/70">
            Estimez votre mensualité et le coût total de votre crédit immobilier
            en ajustant les paramètres.
          </p>
        </div>
      </section>

      <section className="container-page -mt-10 pb-24">
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-navy-600">
                Prix du bien
              </label>
              <span className="font-serif text-2xl font-semibold text-navy-900">
                {formatPrice(price)}
              </span>
            </div>
            <input
              type="range"
              min={50000}
              max={2000000}
              step={10000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="mt-3 w-full accent-gold-500"
            />
          </div>
          <LoanSimulator price={price} />
        </div>
      </section>
    </div>
  );
}
