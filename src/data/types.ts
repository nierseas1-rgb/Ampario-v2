export type TransactionType = "vente" | "location";

export type PropertyCategory =
  | "maison"
  | "appartement"
  | "villa"
  | "terrain"
  | "immeuble"
  | "local";

export interface Property {
  id: string;
  reference: string;
  title: string;
  transaction: TransactionType;
  category: PropertyCategory;
  price: number; // € (prix de vente ou loyer mensuel)
  charges?: number; // charges mensuelles pour la location
  surface: number; // m²
  landSurface?: number; // surface du terrain en m²
  rooms?: number; // pièces
  bedrooms?: number; // chambres
  bathrooms?: number; // salles de bain
  city: string;
  postalCode: string;
  region: string;
  lat: number;
  lng: number;
  description: string;
  features: string[];
  images: string[];
  dpe?: "A" | "B" | "C" | "D" | "E" | "F" | "G"; // diagnostic énergétique
  ges?: "A" | "B" | "C" | "D" | "E" | "F" | "G";
  yearBuilt?: number;
  isExclusive?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  isSold?: boolean;
  createdAt: string; // ISO date
  agent: {
    name: string;
    phone: string;
    email: string;
    photo: string;
  };
}
