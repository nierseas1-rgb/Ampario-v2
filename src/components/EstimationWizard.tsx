"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/format";
import {
  HomeIcon,
  ArrowRightIcon,
  CheckIcon,
  MapPinIcon,
} from "@/components/icons";

type PropType = "maison" | "appartement" | "villa" | "terrain";

const propTypes: { key: PropType; label: string; base: number }[] = [
  { key: "appartement", label: "Appartement", base: 3800 },
  { key: "maison", label: "Maison", base: 3200 },
  { key: "villa", label: "Villa", base: 4500 },
  { key: "terrain", label: "Terrain", base: 180 },
];

const conditions = [
  { key: "neuf", label: "Neuf / rénové", factor: 1.12 },
  { key: "bon", label: "Bon état", factor: 1 },
  { key: "rafraichir", label: "À rafraîchir", factor: 0.9 },
  { key: "travaux", label: "Gros travaux", factor: 0.78 },
];

const cityFactors: Record<string, number> = {
  bordeaux: 1.5,
  talence: 1.2,
  cadillac: 0.85,
  langon: 0.8,
  podensac: 0.82,
};

export function EstimationWizard() {
  const [step, setStep] = useState(0);
  const [type, setType] = useState<PropType>("maison");
  const [city, setCity] = useState("");
  const [surface, setSurface] = useState(100);
  const [rooms, setRooms] = useState(4);
  const [condition, setCondition] = useState("bon");
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [result, setResult] = useState<{ low: number; high: number } | null>(
    null
  );

  const totalSteps = 4;

  const compute = () => {
    const typeDef = propTypes.find((p) => p.key === type)!;
    const condFactor =
      conditions.find((c) => c.key === condition)?.factor ?? 1;
    const cityFactor = cityFactors[city.trim().toLowerCase()] ?? 1;
    const roomBonus = type === "terrain" ? 1 : 1 + (rooms - 3) * 0.015;
    const pricePerSqm = typeDef.base * condFactor * cityFactor * roomBonus;
    const estimate = pricePerSqm * surface;
    setResult({
      low: Math.round((estimate * 0.93) / 1000) * 1000,
      high: Math.round((estimate * 1.07) / 1000) * 1000,
    });
    setStep(totalSteps);
  };

  const next = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-card">
      {/* Barre de progression */}
      {step < totalSteps && (
        <div className="h-1.5 bg-cream-200">
          <div
            className="h-full bg-gold-500 transition-all duration-500"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      )}

      <div className="p-8 sm:p-10">
        {step < totalSteps && (
          <p className="mb-6 text-sm font-semibold uppercase tracking-wide text-gold-600">
            Étape {step + 1} / {totalSteps}
          </p>
        )}

        {/* Étape 1 : type */}
        {step === 0 && (
          <div className="animate-fade-up">
            <h2 className="font-serif text-2xl font-semibold text-navy-900">
              Quel type de bien souhaitez-vous estimer ?
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {propTypes.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setType(p.key)}
                  className={`flex flex-col items-center gap-3 rounded-2xl border-2 p-6 transition ${
                    type === p.key
                      ? "border-gold-500 bg-gold-50"
                      : "border-navy-100 hover:border-navy-300"
                  }`}
                >
                  <HomeIcon
                    width={28}
                    height={28}
                    className={type === p.key ? "text-gold-600" : "text-navy-400"}
                  />
                  <span className="text-sm font-medium text-navy-800">
                    {p.label}
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <button onClick={next} className="btn-primary">
                Continuer <ArrowRightIcon width={18} height={18} />
              </button>
            </div>
          </div>
        )}

        {/* Étape 2 : localisation + surface */}
        {step === 1 && (
          <div className="animate-fade-up">
            <h2 className="font-serif text-2xl font-semibold text-navy-900">
              Où se situe votre bien ?
            </h2>
            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy-700">
                  Ville
                </label>
                <div className="relative">
                  <MapPinIcon
                    width={18}
                    height={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold-500"
                  />
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Bordeaux, Cadillac, Langon…"
                    className="input-field pl-11"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-navy-700">
                    {type === "terrain" ? "Surface du terrain" : "Surface habitable"}
                  </label>
                  <span className="font-semibold text-navy-900">{surface} m²</span>
                </div>
                <input
                  type="range"
                  min={type === "terrain" ? 200 : 20}
                  max={type === "terrain" ? 5000 : 400}
                  step={type === "terrain" ? 50 : 5}
                  value={surface}
                  onChange={(e) => setSurface(Number(e.target.value))}
                  className="mt-2 w-full accent-gold-500"
                />
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              <button onClick={prev} className="btn-ghost">
                Retour
              </button>
              <button onClick={next} className="btn-primary">
                Continuer <ArrowRightIcon width={18} height={18} />
              </button>
            </div>
          </div>
        )}

        {/* Étape 3 : pièces + état */}
        {step === 2 && (
          <div className="animate-fade-up">
            <h2 className="font-serif text-2xl font-semibold text-navy-900">
              Décrivez votre bien
            </h2>
            <div className="mt-6 space-y-6">
              {type !== "terrain" && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-navy-700">
                    Nombre de pièces
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                      <button
                        key={n}
                        onClick={() => setRooms(n)}
                        className={`h-11 w-11 rounded-xl border text-sm font-medium transition ${
                          rooms === n
                            ? "border-navy-900 bg-navy-900 text-cream-100"
                            : "border-navy-200 text-navy-600 hover:border-navy-400"
                        }`}
                      >
                        {n}
                        {n === 7 ? "+" : ""}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {type !== "terrain" && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-navy-700">
                    État général
                  </label>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {conditions.map((c) => (
                      <button
                        key={c.key}
                        onClick={() => setCondition(c.key)}
                        className={`rounded-xl border-2 px-3 py-3 text-sm font-medium transition ${
                          condition === c.key
                            ? "border-gold-500 bg-gold-50 text-navy-900"
                            : "border-navy-100 text-navy-600 hover:border-navy-300"
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="mt-8 flex justify-between">
              <button onClick={prev} className="btn-ghost">
                Retour
              </button>
              <button onClick={next} className="btn-primary">
                Continuer <ArrowRightIcon width={18} height={18} />
              </button>
            </div>
          </div>
        )}

        {/* Étape 4 : coordonnées */}
        {step === 3 && (
          <div className="animate-fade-up">
            <h2 className="font-serif text-2xl font-semibold text-navy-900">
              Recevez votre estimation
            </h2>
            <p className="mt-2 text-sm text-navy-500">
              Renseignez vos coordonnées pour découvrir l&apos;estimation et être
              recontacté(e) par un expert.
            </p>
            <div className="mt-6 space-y-3">
              <input
                placeholder="Nom et prénom"
                value={contact.name}
                onChange={(e) => setContact({ ...contact, name: e.target.value })}
                className="input-field"
              />
              <input
                type="email"
                placeholder="Email"
                value={contact.email}
                onChange={(e) =>
                  setContact({ ...contact, email: e.target.value })
                }
                className="input-field"
              />
              <input
                type="tel"
                placeholder="Téléphone"
                value={contact.phone}
                onChange={(e) =>
                  setContact({ ...contact, phone: e.target.value })
                }
                className="input-field"
              />
            </div>
            <div className="mt-8 flex justify-between">
              <button onClick={prev} className="btn-ghost">
                Retour
              </button>
              <button onClick={compute} className="btn-gold">
                Voir mon estimation <ArrowRightIcon width={18} height={18} />
              </button>
            </div>
          </div>
        )}

        {/* Résultat */}
        {step === totalSteps && result && (
          <div className="animate-fade-up text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700">
              <CheckIcon width={32} height={32} />
            </span>
            <h2 className="mt-5 font-serif text-2xl font-semibold text-navy-900">
              Estimation de votre bien
            </h2>
            <p className="mt-2 text-sm text-navy-500">
              Fourchette estimée d&apos;après les données du marché local
            </p>
            <div className="mx-auto mt-6 max-w-md rounded-2xl bg-navy-900 p-8">
              <p className="font-serif text-4xl font-semibold text-gold-400">
                {formatPrice(result.low)} – {formatPrice(result.high)}
              </p>
              <p className="mt-3 text-sm text-cream-100/60">
                {type === "terrain" ? "Terrain" : propTypes.find((p) => p.key === type)?.label}{" "}
                · {surface} m² {city && `· ${city}`}
              </p>
            </div>
            <p className="mx-auto mt-5 max-w-md text-xs text-navy-400">
              Cette estimation est indicative. Pour une évaluation précise, nos
              experts se déplacent gratuitement chez vous.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="tel:+33556123456" className="btn-primary">
                Être rappelé(e)
              </a>
              <button
                onClick={() => {
                  setStep(0);
                  setResult(null);
                }}
                className="btn-outline"
              >
                Nouvelle estimation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
