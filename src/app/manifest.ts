import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ampario — Immobilier de prestige",
    short_name: "Ampario",
    description:
      "Achat, vente et location de biens et terrains d'exception en Gironde.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f2ea",
    theme_color: "#16243f",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
