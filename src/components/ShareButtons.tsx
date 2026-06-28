"use client";

import { useState } from "react";

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const share = async (network: "facebook" | "twitter" | "linkedin" | "copy") => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (network === "copy") {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        /* ignore */
      }
      return;
    }
    const enc = encodeURIComponent(url);
    const encTitle = encodeURIComponent(title);
    const links = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${enc}`,
      twitter: `https://twitter.com/intent/tweet?url=${enc}&text=${encTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${enc}`,
    };
    window.open(links[network], "_blank", "noopener,noreferrer,width=600,height=500");
  };

  const buttons: { key: "facebook" | "twitter" | "linkedin"; label: string; icon: React.ReactNode }[] = [
    {
      key: "facebook",
      label: "Facebook",
      icon: (
        <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
        </svg>
      ),
    },
    {
      key: "twitter",
      label: "X",
      icon: (
        <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.656l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
        </svg>
      ),
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      icon: (
        <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-semibold text-navy-700">Partager :</span>
      {buttons.map((b) => (
        <button
          key={b.key}
          onClick={() => share(b.key)}
          aria-label={`Partager sur ${b.label}`}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-200 text-navy-600 transition hover:border-navy-900 hover:bg-navy-900 hover:text-cream-50"
        >
          {b.icon}
        </button>
      ))}
      <button
        onClick={() => share("copy")}
        className="flex items-center gap-2 rounded-full border border-navy-200 px-4 py-2 text-sm font-medium text-navy-600 transition hover:border-navy-900"
      >
        {copied ? "Lien copié ✓" : "Copier le lien"}
      </button>
    </div>
  );
}
