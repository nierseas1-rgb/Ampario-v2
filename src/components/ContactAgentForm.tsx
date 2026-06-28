"use client";

import { useState } from "react";
import { Property } from "@/data/types";
import { PhoneIcon, MailIcon, CheckIcon } from "./icons";
import Image from "next/image";

export function ContactAgentForm({ property }: { property: Property }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: `Bonjour, je suis intéressé(e) par le bien "${property.title}" (réf. ${property.reference}). Merci de me recontacter.`,
  });

  return (
    <div className="rounded-2xl bg-white p-6 shadow-card sm:p-7">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-gold-200">
          <Image
            src={property.agent.photo}
            alt={property.agent.name}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-gold-600">
            Votre conseiller
          </p>
          <p className="font-serif text-lg font-semibold text-navy-900">
            {property.agent.name}
          </p>
          <a
            href={`tel:${property.agent.phone.replace(/\s/g, "")}`}
            className="text-sm text-navy-500 transition hover:text-gold-600"
          >
            {property.agent.phone}
          </a>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <a
          href={`tel:${property.agent.phone.replace(/\s/g, "")}`}
          className="btn-outline px-3 py-2.5 text-sm"
        >
          <PhoneIcon width={16} height={16} />
          Appeler
        </a>
        <a
          href={`mailto:${property.agent.email}`}
          className="btn-outline px-3 py-2.5 text-sm"
        >
          <MailIcon width={16} height={16} />
          Email
        </a>
      </div>

      {sent ? (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-xl bg-green-50 py-8 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white">
            <CheckIcon />
          </span>
          <p className="font-serif text-lg font-semibold text-navy-900">
            Demande envoyée !
          </p>
          <p className="max-w-xs text-sm text-navy-500">
            {property.agent.name.split(" ")[0]} vous recontactera dans les plus
            brefs délais.
          </p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="mt-6 space-y-3"
        >
          <p className="text-sm font-semibold text-navy-700">
            Demander une visite ou plus d&apos;informations
          </p>
          <input
            required
            placeholder="Nom et prénom"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input-field"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input-field"
            />
            <input
              type="tel"
              placeholder="Téléphone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="input-field"
            />
          </div>
          <textarea
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="input-field resize-none"
          />
          <label className="flex items-start gap-2 text-xs text-navy-400">
            <input type="checkbox" required className="mt-0.5 accent-gold-500" />
            J&apos;accepte que mes données soient utilisées pour être recontacté(e).
          </label>
          <button type="submit" className="btn-primary w-full">
            Envoyer ma demande
          </button>
        </form>
      )}
    </div>
  );
}
