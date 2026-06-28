"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "ampario.cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      /* ignore */
    }
  }, []);

  const decide = (value: "all" | "essential") => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md">
      <div className="rounded-2xl border border-navy-100 bg-cream-50 p-5 shadow-card-hover">
        <p className="font-serif text-lg font-semibold text-navy-900">
          🍪 Respect de votre vie privée
        </p>
        <p className="mt-2 text-sm leading-relaxed text-navy-500">
          Nous utilisons des cookies pour améliorer votre expérience et mesurer
          notre audience. Vous gardez le contrôle.{" "}
          <Link
            href="/mentions-legales#cookies"
            className="font-medium text-gold-700 underline-offset-2 hover:underline"
          >
            En savoir plus
          </Link>
        </p>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => decide("all")}
            className="btn-primary flex-1 px-4 py-2.5 text-sm"
          >
            Tout accepter
          </button>
          <button
            onClick={() => decide("essential")}
            className="btn-outline flex-1 px-4 py-2.5 text-sm"
          >
            Essentiels
          </button>
        </div>
      </div>
    </div>
  );
}
