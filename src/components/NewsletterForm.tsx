"use client";

import { useState } from "react";
import { ArrowRightIcon, CheckIcon } from "./icons";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="flex items-center gap-3 rounded-full bg-cream-100/10 px-6 py-4 text-sm text-cream-100">
        <CheckIcon className="text-gold-400" />
        Merci ! Votre inscription à la newsletter est confirmée.
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email.includes("@")) setDone(true);
      }}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Votre adresse email"
        className="w-full rounded-full border border-cream-100/20 bg-cream-100/5 px-5 py-3.5 text-sm text-cream-100 placeholder:text-cream-100/40 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/30"
      />
      <button type="submit" className="btn-gold shrink-0">
        S&apos;inscrire
        <ArrowRightIcon width={16} height={16} />
      </button>
    </form>
  );
}
