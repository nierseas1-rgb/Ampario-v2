import Link from "next/link";
import { ArrowRightIcon, HomeIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-serif text-8xl font-semibold text-cream-200">404</p>
      <h1 className="mt-4 font-serif text-3xl font-semibold text-navy-900">
        Cette page semble introuvable
      </h1>
      <p className="mt-3 max-w-md text-navy-500">
        Le bien ou la page que vous recherchez n&apos;existe plus ou a été
        déplacé. Laissez-nous vous guider vers nos plus belles propriétés.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-primary">
          <HomeIcon width={18} height={18} />
          Retour à l&apos;accueil
        </Link>
        <Link href="/proprietes" className="btn-outline">
          Voir les biens
          <ArrowRightIcon width={18} height={18} />
        </Link>
      </div>
    </div>
  );
}
