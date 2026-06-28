import { Property, PropertyCategory, TransactionType } from "@/data/types";

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPriceLabel(property: Property): string {
  if (property.transaction === "location") {
    return `${formatPrice(property.price)} / mois`;
  }
  return formatPrice(property.price);
}

export function formatSurface(value: number): string {
  return `${new Intl.NumberFormat("fr-FR").format(value)} m²`;
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export const categoryLabels: Record<PropertyCategory, string> = {
  maison: "Maison",
  appartement: "Appartement",
  villa: "Villa",
  terrain: "Terrain",
  immeuble: "Immeuble",
  local: "Local commercial",
};

export const categoryLabelsPlural: Record<PropertyCategory, string> = {
  maison: "Maisons",
  appartement: "Appartements",
  villa: "Villas",
  terrain: "Terrains",
  immeuble: "Immeubles",
  local: "Locaux commerciaux",
};

export const transactionLabels: Record<TransactionType, string> = {
  vente: "À vendre",
  location: "À louer",
};

export function pricePerSqm(property: Property): number | null {
  if (!property.surface || property.category === "terrain") return null;
  return Math.round(property.price / property.surface);
}
