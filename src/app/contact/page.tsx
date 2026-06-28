import { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { MiniMap } from "@/components/MiniMap";
import { PhoneIcon, MailIcon, MapPinIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Ampario pour tout projet d'achat, de vente ou de location. Nos conseillers vous répondent 7j/7.",
};

export default function ContactPage() {
  return (
    <div>
      <section className="bg-navy-900 py-16">
        <div className="container-page max-w-3xl">
          <p className="label-eyebrow text-gold-400">Contact</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-cream-50 sm:text-5xl">
            Parlons de votre projet
          </h1>
          <p className="mt-4 text-cream-100/70">
            Une question, un projet, une demande de visite ? Notre équipe est à
            votre écoute et s&apos;engage à vous répondre dans les meilleurs
            délais.
          </p>
        </div>
      </section>

      <section className="container-page grid gap-10 py-16 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-6">
          <div className="space-y-4 rounded-2xl bg-white p-7 shadow-card">
            <h2 className="font-serif text-2xl font-semibold text-navy-900">
              Coordonnées
            </h2>
            <a
              href="tel:+33556123456"
              className="flex items-center gap-4 text-navy-700 transition hover:text-gold-600"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cream-200 text-gold-600">
                <PhoneIcon width={20} height={20} />
              </span>
              <span>
                <span className="block text-xs text-navy-400">Téléphone</span>
                +33 5 56 12 34 56
              </span>
            </a>
            <a
              href="mailto:contact@ampario.fr"
              className="flex items-center gap-4 text-navy-700 transition hover:text-gold-600"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cream-200 text-gold-600">
                <MailIcon width={20} height={20} />
              </span>
              <span>
                <span className="block text-xs text-navy-400">Email</span>
                contact@ampario.fr
              </span>
            </a>
            <div className="flex items-center gap-4 text-navy-700">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cream-200 text-gold-600">
                <MapPinIcon width={20} height={20} />
              </span>
              <span>
                <span className="block text-xs text-navy-400">Adresse</span>
                12 cours du Maréchal Foch, 33000 Bordeaux
              </span>
            </div>
            <div className="border-t border-navy-50 pt-4 text-sm text-navy-500">
              <p className="font-semibold text-navy-700">Horaires d&apos;ouverture</p>
              <p className="mt-1">Lundi – Vendredi : 9h00 – 19h00</p>
              <p>Samedi : 10h00 – 18h00</p>
              <p className="text-gold-700">Infoline : 7j/7</p>
            </div>
          </div>
          <MiniMap lat={44.8412} lng={-0.5731} label="Ampario Bordeaux" />
        </div>

        <ContactForm />
      </section>
    </div>
  );
}
