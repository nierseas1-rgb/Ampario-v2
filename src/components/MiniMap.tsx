import { MapPinIcon } from "./icons";

export function MiniMap({
  lat,
  lng,
  label,
}: {
  lat: number;
  lng: number;
  label: string;
}) {
  const delta = 0.012;
  const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-card">
      <div className="flex items-center gap-2 border-b border-navy-50 px-5 py-4">
        <MapPinIcon width={18} height={18} className="text-gold-500" />
        <span className="text-sm font-semibold text-navy-700">{label}</span>
      </div>
      <iframe
        title={`Carte — ${label}`}
        src={src}
        className="h-72 w-full border-0"
        loading="lazy"
      />
    </div>
  );
}
