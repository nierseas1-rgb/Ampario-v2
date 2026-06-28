import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { MapPinIcon, PhoneIcon, MailIcon, ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Nos agences",
  description:
    "Retrouvez les agences Ampario en Gironde : Bordeaux, Cadillac et Langon. Une équipe d'experts à votre écoute.",
};

const agencies = [
  {
    city: "Bordeaux",
    address: "12 cours du Maréchal Foch, 33000 Bordeaux",
    phone: "+33 5 56 12 34 56",
    email: "bordeaux@ampario.fr",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Cadillac",
    address: "8 place de la République, 33410 Cadillac",
    phone: "+33 5 56 12 34 57",
    email: "cadillac@ampario.fr",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Langon",
    address: "24 cours des Fossés, 33210 Langon",
    phone: "+33 5 56 12 34 58",
    email: "langon@ampario.fr",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  },
];

const team = [
  {
    name: "Sophie Lambert",
    role: "Directrice — Biens de prestige",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Marc Delaunay",
    role: "Conseiller — Vente & investissement",
    photo:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Claire Fontaine",
    role: "Conseillère — Location & gestion",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
  },
];

export default function AgencesPage() {
  return (
    <div>
      <section className="bg-navy-900 py-16">
        <div className="container-page max-w-3xl">
          <p className="label-eyebrow text-gold-400">Notre maison</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-cream-50 sm:text-5xl">
            Trois agences au cœur de la Gironde
          </h1>
          <p className="mt-4 text-cream-100/70">
            Depuis 15 ans, Ampario cultive une approche de l&apos;immobilier
            fondée sur l&apos;exigence, l&apos;écoute et la confiance. Nos équipes
            connaissent chaque village, chaque quartier, chaque histoire.
          </p>
        </div>
      </section>

      <section className="container-page py-20">
        <SectionHeading eyebrow="Nous rencontrer" title="Nos agences" />
        <div className="mt-10 grid gap-7 md:grid-cols-3">
          {agencies.map((a) => (
            <div key={a.city} className="overflow-hidden card-surface">
              <div className="relative aspect-[4/3]">
                <Image
                  src={a.image}
                  alt={`Agence Ampario ${a.city}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl font-semibold text-navy-900">
                  {a.city}
                </h3>
                <div className="mt-4 space-y-2.5 text-sm text-navy-600">
                  <p className="flex items-start gap-2.5">
                    <MapPinIcon
                      width={16}
                      height={16}
                      className="mt-0.5 shrink-0 text-gold-500"
                    />
                    {a.address}
                  </p>
                  <a
                    href={`tel:${a.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-2.5 transition hover:text-gold-600"
                  >
                    <PhoneIcon width={16} height={16} className="text-gold-500" />
                    {a.phone}
                  </a>
                  <a
                    href={`mailto:${a.email}`}
                    className="flex items-center gap-2.5 transition hover:text-gold-600"
                  >
                    <MailIcon width={16} height={16} className="text-gold-500" />
                    {a.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream-200/40 py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Notre équipe"
            title="Des experts passionnés à votre service"
            align="center"
          />
          <div className="mt-12 grid gap-7 sm:grid-cols-3">
            {team.map((m) => (
              <div key={m.name} className="text-center">
                <div className="relative mx-auto aspect-square w-48 overflow-hidden rounded-3xl shadow-card">
                  <Image
                    src={m.photo}
                    alt={m.name}
                    fill
                    sizes="192px"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-5 font-serif text-xl font-semibold text-navy-900">
                  {m.name}
                </h3>
                <p className="text-sm text-gold-700">{m.role}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/contact" className="btn-primary">
              Nous contacter
              <ArrowRightIcon width={18} height={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
