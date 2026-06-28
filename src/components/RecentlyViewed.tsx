"use client";

import { useRecent } from "@/context/RecentContext";
import { properties } from "@/data/properties";
import { PropertyCard } from "./PropertyCard";
import { SectionHeading } from "./SectionHeading";

export function RecentlyViewed({ excludeId }: { excludeId?: string }) {
  const { recent } = useRecent();
  const items = recent
    .filter((id) => id !== excludeId)
    .map((id) => properties.find((p) => p.id === id))
    .filter((p): p is (typeof properties)[number] => Boolean(p))
    .slice(0, 4);

  if (items.length === 0) return null;

  return (
    <section className="container-page py-16">
      <SectionHeading
        eyebrow="Reprenez où vous en étiez"
        title="Biens consultés récemment"
      />
      <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </section>
  );
}
