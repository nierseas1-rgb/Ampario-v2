"use client";

import { useState } from "react";
import { CheckIcon } from "./icons";

const subjects = [
  "Achat d'un bien",
  "Vente / estimation",
  "Location",
  "Gestion locative",
  "Autre demande",
];

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: subjects[0],
    message: "",
  });

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-green-50 p-12 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white">
          <CheckIcon width={28} height={28} />
        </span>
        <h3 className="font-serif text-2xl font-semibold text-navy-900">
          Message envoyé !
        </h3>
        <p className="max-w-sm text-navy-500">
          Merci {form.name.split(" ")[0]}, votre message a bien été transmis. Un
          conseiller Ampario vous recontactera très rapidement.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-4 rounded-2xl bg-white p-7 shadow-card sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-700">
            Nom complet *
          </label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input-field"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-700">
            Téléphone
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="input-field"
          />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-700">
          Email *
        </label>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="input-field"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-700">
          Sujet
        </label>
        <select
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="input-field cursor-pointer"
        >
          {subjects.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-700">
          Votre message *
        </label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="input-field resize-none"
        />
      </div>
      <label className="flex items-start gap-2 text-xs text-navy-400">
        <input type="checkbox" required className="mt-0.5 accent-gold-500" />
        J&apos;accepte que mes données soient traitées dans le cadre de ma
        demande, conformément à la politique de confidentialité.
      </label>
      <button type="submit" className="btn-primary w-full">
        Envoyer mon message
      </button>
    </form>
  );
}
