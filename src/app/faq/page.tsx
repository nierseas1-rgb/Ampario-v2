import { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Questions fréquentes",
  description:
    "Toutes les réponses à vos questions sur l'achat, la vente, la location et la gestion de biens immobiliers avec Ampario.",
};

const groups = [
  {
    title: "Acheter",
    items: [
      {
        q: "Comment organiser une visite ?",
        a: "Depuis chaque fiche bien, utilisez le formulaire « Demander une visite » ou contactez directement le conseiller indiqué. Nous vous proposons un créneau sous 24h.",
      },
      {
        q: "Puis-je négocier le prix d'un bien ?",
        a: "Oui. Notre rôle est justement de vous accompagner dans la négociation pour obtenir les meilleures conditions, dans le respect des attentes du vendeur.",
      },
      {
        q: "Quels sont les frais à prévoir lors d'un achat ?",
        a: "Outre le prix du bien, prévoyez les frais de notaire (environ 7-8% dans l'ancien, 2-3% dans le neuf) et, le cas échéant, les frais de dossier bancaire.",
      },
    ],
  },
  {
    title: "Vendre",
    items: [
      {
        q: "L'estimation est-elle vraiment gratuite ?",
        a: "Oui, totalement gratuite et sans engagement, que ce soit via notre outil en ligne ou lors d'une visite d'expertise à votre domicile.",
      },
      {
        q: "Combien de temps pour vendre un bien ?",
        a: "Le délai moyen de nos ventes est de 21 jours, mais il dépend du bien, de son prix et du marché local. Une bonne estimation est la clé d'une vente rapide.",
      },
      {
        q: "Quand sont dus les honoraires ?",
        a: "Uniquement en cas de vente effective. Aucun honoraire n'est facturé tant que la transaction n'est pas signée.",
      },
    ],
  },
  {
    title: "Louer & gérer",
    items: [
      {
        q: "Proposez-vous la gestion locative ?",
        a: "Oui, nous proposons un service de gestion locative complet dès 6% des loyers encaissés. Recherche de locataire, état des lieux, encaissement et suivi inclus.",
      },
      {
        q: "Comment constituer mon dossier de location ?",
        a: "Pièce d'identité, justificatifs de revenus, dernières quittances ou avis d'imposition. Notre équipe vous guide pour un dossier complet et rapide à traiter.",
      },
    ],
  },
  {
    title: "Mon compte",
    items: [
      {
        q: "À quoi sert la création d'un compte ?",
        a: "Votre compte vous permet d'enregistrer vos biens favoris, de créer des alertes personnalisées et de suivre vos demandes, sur tous vos appareils.",
      },
      {
        q: "Comment fonctionnent les alertes ?",
        a: "Depuis votre espace, définissez vos critères (type, ville, budget). Vous serez notifié(e) dès qu'un bien correspondant est mis en ligne.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div>
      <section className="bg-navy-900 py-16">
        <div className="container-page max-w-3xl">
          <p className="label-eyebrow text-gold-400">Centre d&apos;aide</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-cream-50 sm:text-5xl">
            Questions fréquentes
          </h1>
          <p className="mt-4 text-cream-100/70">
            Retrouvez les réponses aux questions les plus courantes. Vous ne
            trouvez pas votre réponse ? Notre Infoline est là pour vous.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="mx-auto max-w-3xl space-y-12">
          {groups.map((g) => (
            <div key={g.title}>
              <h2 className="font-serif text-2xl font-semibold text-navy-900">
                {g.title}
              </h2>
              <div className="mt-5 space-y-3">
                {g.items.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-2xl bg-white p-6 shadow-sm"
                  >
                    <summary className="flex cursor-pointer items-center justify-between font-semibold text-navy-900 marker:content-none">
                      {item.q}
                      <span className="ml-4 text-xl text-gold-500 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-navy-500">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-3xl rounded-3xl bg-cream-200/50 p-8 text-center">
          <h3 className="font-serif text-2xl font-semibold text-navy-900">
            Une autre question ?
          </h3>
          <p className="mt-2 text-navy-500">
            Nos conseillers vous répondent 7j/7 via l&apos;Infoline.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary">
              Nous contacter
              <ArrowRightIcon width={18} height={18} />
            </Link>
            <Link href="/infoline" className="btn-outline">
              Découvrir l&apos;Infoline
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
