import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { ToastProvider } from "@/context/ToastContext";
import { CompareProvider } from "@/context/CompareContext";
import { RecentProvider } from "@/context/RecentContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CompareBar } from "@/components/CompareBar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CookieConsent } from "@/components/CookieConsent";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ampario.fr"),
  title: {
    default: "Ampario — Immobilier de prestige",
    template: "%s | Ampario",
  },
  description:
    "Ampario, agence immobilière de prestige. Achat, vente et location de maisons, appartements, villas et terrains. Découvrez nos biens d'exception.",
  keywords: [
    "immobilier",
    "prestige",
    "achat",
    "vente",
    "location",
    "maison",
    "appartement",
    "terrain",
    "villa",
    "Gironde",
    "Bordeaux",
  ],
  openGraph: {
    title: "Ampario — Immobilier de prestige",
    description:
      "Achat, vente et location de biens d'exception. Maisons, appartements, villas et terrains.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <ToastProvider>
          <AuthProvider>
            <FavoritesProvider>
              <CompareProvider>
                <RecentProvider>
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                  <CompareBar />
                  <ScrollToTop />
                  <CookieConsent />
                </RecentProvider>
              </CompareProvider>
            </FavoritesProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
