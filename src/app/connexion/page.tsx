"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "@/components/Logo";
import { ArrowRightIcon } from "@/components/icons";

export default function ConnexionPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = login(email, password);
    if (res.ok) router.push("/compte");
    else setError(res.error ?? "Une erreur est survenue.");
  };

  return (
    <div className="grid min-h-[calc(100vh-5rem)] lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <Logo />
          <h1 className="mt-10 font-serif text-3xl font-semibold text-navy-900">
            Bon retour parmi nous
          </h1>
          <p className="mt-2 text-navy-500">
            Connectez-vous pour retrouver vos favoris, vos alertes et vos
            recherches.
          </p>

          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy-700">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@email.fr"
                className="input-field"
              />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-sm font-medium text-navy-700">
                  Mot de passe
                </label>
                <Link
                  href="#"
                  className="text-xs font-medium text-gold-600 hover:text-gold-700"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Se connecter
              <ArrowRightIcon width={18} height={18} />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-navy-500">
            Pas encore de compte ?{" "}
            <Link
              href="/inscription"
              className="font-semibold text-gold-700 hover:text-gold-600"
            >
              Créer un compte
            </Link>
          </p>
        </div>
      </div>

      <div className="relative hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
          alt="Intérieur de prestige"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy-950/40" />
        <div className="absolute bottom-12 left-12 right-12 text-cream-50">
          <p className="font-serif text-3xl font-semibold leading-snug">
            « Chaque bien raconte une histoire. Trouvons ensemble la vôtre. »
          </p>
          <p className="mt-4 text-sm uppercase tracking-[0.2em] text-gold-300">
            Ampario — Immobilier de prestige
          </p>
        </div>
      </div>
    </div>
  );
}
