"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";
import { properties } from "@/data/properties";
import { PropertyCard } from "@/components/PropertyCard";
import {
  HeartIcon,
  UserIcon,
  SparkleIcon,
  ArrowRightIcon,
  CheckIcon,
  TrashIcon,
} from "@/components/icons";

interface Alert {
  id: string;
  label: string;
  transaction: string;
  budget: string;
}

const ALERTS_KEY = "ampario.alerts";

export default function ComptePage() {
  const router = useRouter();
  const { user, hydrated, logout } = useAuth();
  const { favorites } = useFavorites();
  const [tab, setTab] = useState<"favoris" | "alertes" | "profil">("favoris");
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [newAlert, setNewAlert] = useState({
    label: "",
    transaction: "vente",
    budget: "",
  });

  useEffect(() => {
    if (hydrated && !user) router.replace("/connexion");
  }, [hydrated, user, router]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(ALERTS_KEY);
      if (raw) setAlerts(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const persistAlerts = (next: Alert[]) => {
    setAlerts(next);
    localStorage.setItem(ALERTS_KEY, JSON.stringify(next));
  };

  const addAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlert.label.trim()) return;
    persistAlerts([
      ...alerts,
      { ...newAlert, id: Date.now().toString() },
    ]);
    setNewAlert({ label: "", transaction: "vente", budget: "" });
  };

  const saved = properties.filter((p) => favorites.includes(p.id));

  if (!hydrated || !user) {
    return (
      <div className="container-page flex min-h-[50vh] items-center justify-center text-navy-400">
        Chargement de votre espace…
      </div>
    );
  }

  const tabs = [
    { key: "favoris" as const, label: "Mes favoris", icon: HeartIcon, count: saved.length },
    { key: "alertes" as const, label: "Mes alertes", icon: SparkleIcon, count: alerts.length },
    { key: "profil" as const, label: "Mon profil", icon: UserIcon },
  ];

  return (
    <div className="bg-cream-100">
      {/* En-tête espace */}
      <section className="bg-navy-900 py-14">
        <div className="container-page flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500 font-serif text-2xl font-semibold text-white">
              {user.name.charAt(0).toUpperCase()}
            </span>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gold-400">
                Mon espace
              </p>
              <h1 className="font-serif text-3xl font-semibold text-cream-50">
                Bonjour, {user.name.split(" ")[0]}
              </h1>
              <p className="text-sm text-cream-100/60">{user.email}</p>
            </div>
          </div>
          <button onClick={logout} className="btn-outline self-start border-cream-100/30 text-cream-100 hover:bg-cream-100 hover:text-navy-900">
            Se déconnecter
          </button>
        </div>
      </section>

      <div className="container-page grid gap-8 py-12 lg:grid-cols-[260px_1fr]">
        {/* Onglets */}
        <aside>
          <nav className="flex gap-2 overflow-x-auto rounded-2xl bg-white p-2 shadow-card lg:flex-col">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  tab === t.key
                    ? "bg-navy-900 text-cream-100"
                    : "text-navy-600 hover:bg-cream-100"
                }`}
              >
                <t.icon width={18} height={18} />
                {t.label}
                {t.count != null && (
                  <span
                    className={`ml-auto rounded-full px-2 py-0.5 text-xs ${
                      tab === t.key
                        ? "bg-cream-100/20 text-cream-50"
                        : "bg-cream-200 text-navy-500"
                    }`}
                  >
                    {t.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        <div>
          {tab === "favoris" && (
            <div>
              <h2 className="font-serif text-2xl font-semibold text-navy-900">
                Mes biens favoris
              </h2>
              {saved.length > 0 ? (
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {saved.map((p) => (
                    <PropertyCard key={p.id} property={p} />
                  ))}
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-dashed border-navy-200 bg-white py-16 text-center">
                  <HeartIcon className="mx-auto text-gold-400" width={36} height={36} />
                  <p className="mt-4 text-navy-500">
                    Vous n&apos;avez pas encore de favoris.
                  </p>
                  <Link href="/proprietes" className="btn-primary mt-5">
                    Découvrir les biens
                    <ArrowRightIcon width={16} height={16} />
                  </Link>
                </div>
              )}
            </div>
          )}

          {tab === "alertes" && (
            <div id="alertes">
              <h2 className="font-serif text-2xl font-semibold text-navy-900">
                Mes alertes email
              </h2>
              <p className="mt-2 text-sm text-navy-500">
                Soyez prévenu(e) dès qu&apos;un bien correspond à vos critères.
              </p>

              <form
                onSubmit={addAlert}
                className="mt-6 grid gap-3 rounded-2xl bg-white p-5 shadow-card sm:grid-cols-[2fr_1fr_1fr_auto]"
              >
                <input
                  value={newAlert.label}
                  onChange={(e) =>
                    setNewAlert({ ...newAlert, label: e.target.value })
                  }
                  placeholder="Ex : Maison à Bordeaux"
                  className="input-field"
                />
                <select
                  value={newAlert.transaction}
                  onChange={(e) =>
                    setNewAlert({ ...newAlert, transaction: e.target.value })
                  }
                  className="input-field cursor-pointer"
                >
                  <option value="vente">Achat</option>
                  <option value="location">Location</option>
                </select>
                <input
                  value={newAlert.budget}
                  onChange={(e) =>
                    setNewAlert({ ...newAlert, budget: e.target.value })
                  }
                  placeholder="Budget max"
                  className="input-field"
                />
                <button type="submit" className="btn-gold">
                  Créer
                </button>
              </form>

              <div className="mt-6 space-y-3">
                {alerts.length === 0 ? (
                  <p className="rounded-2xl border border-dashed border-navy-200 bg-white py-12 text-center text-navy-400">
                    Aucune alerte active pour l&apos;instant.
                  </p>
                ) : (
                  alerts.map((a) => (
                    <div
                      key={a.id}
                      className="flex items-center justify-between rounded-2xl bg-white px-5 py-4 shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                          <SparkleIcon width={18} height={18} />
                        </span>
                        <div>
                          <p className="font-semibold text-navy-900">
                            {a.label}
                          </p>
                          <p className="text-xs text-navy-400">
                            {a.transaction === "vente" ? "Achat" : "Location"}
                            {a.budget && ` · Budget max ${a.budget}`}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          persistAlerts(alerts.filter((x) => x.id !== a.id))
                        }
                        className="rounded-full p-2 text-navy-300 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <TrashIcon width={18} height={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {tab === "profil" && (
            <div>
              <h2 className="font-serif text-2xl font-semibold text-navy-900">
                Mon profil
              </h2>
              <div className="mt-6 max-w-lg space-y-4 rounded-2xl bg-white p-6 shadow-card">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy-700">
                    Nom complet
                  </label>
                  <input defaultValue={user.name} className="input-field" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy-700">
                    Email
                  </label>
                  <input defaultValue={user.email} className="input-field" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy-700">
                    Téléphone
                  </label>
                  <input placeholder="+33 6 00 00 00 00" className="input-field" />
                </div>
                <button className="btn-primary mt-2">
                  <CheckIcon width={16} height={16} />
                  Enregistrer les modifications
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
