"use client";

import { useState, useMemo } from "react";
import { formatPrice } from "@/lib/format";
import { CalculatorIcon } from "./icons";

function monthlyPayment(principal: number, annualRate: number, years: number) {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

export function LoanSimulator({ price }: { price: number }) {
  const [contribution, setContribution] = useState(
    Math.round(price * 0.15)
  );
  const [rate, setRate] = useState(3.4);
  const [years, setYears] = useState(20);

  const { monthly, totalInterest, loanAmount } = useMemo(() => {
    const loan = Math.max(price - contribution, 0);
    const m = monthlyPayment(loan, rate, years);
    return {
      loanAmount: loan,
      monthly: m,
      totalInterest: m * years * 12 - loan,
    };
  }, [price, contribution, rate, years]);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 text-gold-400">
          <CalculatorIcon width={22} height={22} />
        </span>
        <div>
          <h3 className="font-serif text-xl font-semibold text-navy-900">
            Simulateur de financement
          </h3>
          <p className="text-sm text-navy-400">Estimez votre mensualité</p>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-navy-600">
              Apport personnel
            </label>
            <span className="text-sm font-semibold text-navy-900">
              {formatPrice(contribution)}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={price}
            step={5000}
            value={contribution}
            onChange={(e) => setContribution(Number(e.target.value))}
            className="mt-2 w-full accent-gold-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-navy-600">Durée</label>
            <span className="text-sm font-semibold text-navy-900">
              {years} ans
            </span>
          </div>
          <input
            type="range"
            min={5}
            max={30}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="mt-2 w-full accent-gold-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-navy-600">
              Taux d&apos;intérêt
            </label>
            <span className="text-sm font-semibold text-navy-900">
              {rate.toFixed(2)} %
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={6}
            step={0.05}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="mt-2 w-full accent-gold-500"
          />
        </div>
      </div>

      <div className="mt-7 rounded-2xl bg-navy-900 p-6 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-cream-100/60">
          Mensualité estimée
        </p>
        <p className="mt-1 font-serif text-4xl font-semibold text-gold-400">
          {formatPrice(Math.round(monthly))}
          <span className="text-base font-normal text-cream-100/60"> /mois</span>
        </p>
        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-cream-100/10 pt-5 text-left">
          <div>
            <p className="text-xs text-cream-100/50">Montant emprunté</p>
            <p className="text-sm font-semibold text-cream-50">
              {formatPrice(loanAmount)}
            </p>
          </div>
          <div>
            <p className="text-xs text-cream-100/50">Coût des intérêts</p>
            <p className="text-sm font-semibold text-cream-50">
              {formatPrice(Math.round(totalInterest))}
            </p>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-navy-300">
        Simulation indicative, hors assurance et frais de dossier.
      </p>
    </div>
  );
}
