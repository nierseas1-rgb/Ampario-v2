"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "@/components/Logo";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";

const benefits = [
  "Enregistrez vos biens favoris",
  "Créez des alertes personnalisées",
  "Suivez vos demandes de visite",
  "Accédez aux exclusivités en avant-première",
];

export default function InscriptionPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    const res = register(form.name, form.email, form.password);
    if (res.ok) router.push("/compte");
    else setError(res.error ?? "Une erreur est survenue.");
  };

  return (
    <div className="grid min-h-[calc(100vh-5rem)] lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
          alt="Villa de prestige"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy-950/55" />
        <div className="absolute inset-0 flex flex-col justify-center px-14 text-cream-50">
          <p className="font-serif text-4xl font-semibold leading-snug">
            Rejoignez Ampario
          </p>
          <p className="mt-4 max-w-sm text-cream-100/80">
            Créez votre espace personnel et profitez d&apos;une expérience
            immobilière sur-mesure.
          </p>
          <ul className="mt-8 space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-3 text-cream-100/90">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-white">
                  <CheckIcon width={14} height={14} />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <Logo />
          <h1 className="mt-10 font-serif text-3xl font-semibold text-navy-900">
            Créer un compte
          </h1>
          <p className="mt-2 text-navy-500">
            Quelques secondes suffisent pour rejoindre Ampario.
          </p>

          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy-700">
                Nom complet
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Jean Dupont"
                className="input-field"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy-700">
                Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="vous@email.fr"
                className="input-field"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy-700">
                  Mot de passe
                </label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="••••••••"
                  className="input-field"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy-700">
                  Confirmation
                </label>
                <input
                  type="password"
                  required
                  value={form.confirm}
                  onChange={(e) =>
                    setForm({ ...form, confirm: e.target.value })
                  }
                  placeholder="••••••••"
                  className="input-field"
                />
              </div>
            </div>
            <label className="flex items-start gap-2 text-xs text-navy-400">
              <input type="checkbox" required className="mt-0.5 accent-gold-500" />
              J&apos;accepte les conditions générales et la politique de
              confidentialité d&apos;Ampario.
            </label>
            <button type="submit" className="btn-primary w-full">
              Créer mon compte
              <ArrowRightIcon width={18} height={18} />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-navy-500">
            Déjà inscrit ?{" "}
            <Link
              href="/connexion"
              className="font-semibold text-gold-700 hover:text-gold-600"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
