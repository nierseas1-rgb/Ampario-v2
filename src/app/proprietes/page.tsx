import { Suspense } from "react";
import { Metadata } from "next";
import { PropertyListing } from "@/components/PropertyListing";

export const metadata: Metadata = {
  title: "Nos biens à vendre et à louer",
  description:
    "Parcourez l'ensemble des biens Ampario : maisons, appartements, villas, terrains et locaux à la vente et à la location.",
};

export default function ProprietesPage() {
  return (
    <>
      <section className="bg-navy-900 py-14">
        <div className="container-page">
          <p className="label-eyebrow text-gold-400">Nos biens</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-cream-50 sm:text-5xl">
            Trouvez le bien qui vous ressemble
          </h1>
          <p className="mt-3 max-w-2xl text-cream-100/70">
            Affinez votre recherche grâce à nos filtres et découvrez nos biens à
            la vente comme à la location.
          </p>
        </div>
      </section>
      <Suspense
        fallback={
          <div className="container-page py-20 text-center text-navy-400">
            Chargement des biens…
          </div>
        }
      >
        <PropertyListing />
      </Suspense>
    </>
  );
}
