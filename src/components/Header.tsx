"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { useFavorites } from "@/context/FavoritesContext";
import { useAuth } from "@/context/AuthContext";
import {
  HeartIcon,
  UserIcon,
  MenuIcon,
  CloseIcon,
  PhoneIcon,
  MailIcon,
  ChevronDownIcon,
  GlobeIcon,
} from "./icons";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/proprietes?transaction=vente", label: "Acheter" },
  { href: "/proprietes?transaction=location", label: "Louer" },
  { href: "/vendre", label: "Vendre" },
  { href: "/estimation", label: "Estimation" },
  { href: "/agences", label: "Agences" },
  { href: "/contact", label: "Contact" },
];

const languages = ["FR", "EN", "ES"];

export function Header() {
  const pathname = usePathname();
  const { favorites } = useFavorites();
  const { user, logout, hydrated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState("FR");
  const [scrolled, setScrolled] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setAccountOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const isActive = (href: string) => {
    const base = href.split("?")[0];
    if (base === "/") return pathname === "/";
    return pathname.startsWith(base);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Infoline */}
      <div className="hidden bg-navy-900 text-cream-100 lg:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <a
              href="tel:+33556123456"
              className="flex items-center gap-2 text-cream-100/80 transition hover:text-gold-300"
            >
              <PhoneIcon width={14} height={14} />
              <span>+33 5 56 12 34 56</span>
            </a>
            <a
              href="mailto:contact@ampario.fr"
              className="flex items-center gap-2 text-cream-100/80 transition hover:text-gold-300"
            >
              <MailIcon width={14} height={14} />
              <span>contact@ampario.fr</span>
            </a>
            <span className="hidden items-center gap-2 text-cream-100/60 xl:flex">
              Du lundi au samedi · 9h–19h
            </span>
          </div>
          <div className="flex items-center gap-5">
            <Link
              href="/infoline"
              className="font-medium tracking-wide text-gold-300 transition hover:text-gold-200"
            >
              ☎ Infoline — Conseil &amp; suivi 7j/7
            </Link>
            <div className="relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                onBlur={() => setTimeout(() => setLangOpen(false), 150)}
                className="flex items-center gap-1 text-cream-100/80 transition hover:text-gold-300"
              >
                <GlobeIcon width={14} height={14} />
                {lang}
                <ChevronDownIcon width={12} height={12} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 w-20 overflow-hidden rounded-lg bg-white py-1 text-navy-900 shadow-card">
                  {languages.map((l) => (
                    <button
                      key={l}
                      onMouseDown={() => {
                        setLang(l);
                        setLangOpen(false);
                      }}
                      className="block w-full px-3 py-1.5 text-left hover:bg-cream-100"
                    >
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Barre principale */}
      <div
        className={`border-b border-navy-100/60 backdrop-blur transition-all duration-300 ${
          scrolled ? "bg-cream-50/95 shadow-sm" : "bg-cream-50/80"
        }`}
      >
        <div className="container-page flex h-20 items-center justify-between gap-4">
          <Logo />

          <nav className="hidden items-center gap-1 xl:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive(link.href)
                    ? "text-navy-900"
                    : "text-navy-600 hover:text-navy-900"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gold-500" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/favoris"
              aria-label="Mes favoris"
              className="relative rounded-full p-2.5 text-navy-700 transition hover:bg-navy-50 hover:text-navy-900"
            >
              <HeartIcon filled={favorites.length > 0} />
              {favorites.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-white">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Compte */}
            <div ref={accountRef} className="relative hidden sm:block">
              <button
                onClick={() => setAccountOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full border border-navy-200 px-3 py-2 text-sm font-medium text-navy-700 transition hover:border-navy-400"
              >
                <UserIcon width={18} height={18} />
                <span className="max-w-[100px] truncate">
                  {hydrated && user ? user.name.split(" ")[0] : "Compte"}
                </span>
                <ChevronDownIcon width={14} height={14} />
              </button>
              {accountOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-2xl bg-white py-2 shadow-card-hover">
                  {hydrated && user ? (
                    <>
                      <div className="border-b border-navy-50 px-4 py-3">
                        <p className="text-sm font-semibold text-navy-900">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-navy-400">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        href="/compte"
                        className="block px-4 py-2.5 text-sm text-navy-700 hover:bg-cream-100"
                      >
                        Mon espace
                      </Link>
                      <Link
                        href="/favoris"
                        className="block px-4 py-2.5 text-sm text-navy-700 hover:bg-cream-100"
                      >
                        Mes favoris
                      </Link>
                      <Link
                        href="/compte#alertes"
                        className="block px-4 py-2.5 text-sm text-navy-700 hover:bg-cream-100"
                      >
                        Mes alertes
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setAccountOpen(false);
                        }}
                        className="block w-full border-t border-navy-50 px-4 py-2.5 text-left text-sm text-gold-700 hover:bg-cream-100"
                      >
                        Se déconnecter
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/connexion"
                        className="block px-4 py-2.5 text-sm text-navy-700 hover:bg-cream-100"
                      >
                        Se connecter
                      </Link>
                      <Link
                        href="/inscription"
                        className="mx-4 my-2 block rounded-full bg-navy-900 px-4 py-2.5 text-center text-sm font-semibold text-cream-100 hover:bg-navy-800"
                      >
                        Créer un compte
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <Link href="/vendre" className="btn-gold hidden md:inline-flex">
              Estimer mon bien
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Ouvrir le menu"
              className="rounded-full p-2.5 text-navy-700 transition hover:bg-navy-50 xl:hidden"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <div
            className="absolute inset-0 bg-navy-950/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 flex h-full w-80 max-w-[85vw] flex-col bg-cream-50 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-navy-100 px-5 py-5">
              <Logo showTagline={false} />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Fermer le menu"
                className="rounded-full p-2 text-navy-700 hover:bg-navy-50"
              >
                <CloseIcon />
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-xl px-4 py-3 text-base font-medium transition ${
                    isActive(link.href)
                      ? "bg-navy-900 text-cream-100"
                      : "text-navy-700 hover:bg-navy-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="border-t border-navy-100 p-5">
              {hydrated && user ? (
                <div className="space-y-3">
                  <p className="text-sm text-navy-500">
                    Connecté en tant que{" "}
                    <span className="font-semibold text-navy-900">
                      {user.name}
                    </span>
                  </p>
                  <Link href="/compte" className="btn-outline w-full">
                    Mon espace
                  </Link>
                  <button onClick={logout} className="btn-ghost w-full">
                    Se déconnecter
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link href="/connexion" className="btn-outline w-full">
                    Se connecter
                  </Link>
                  <Link href="/inscription" className="btn-primary w-full">
                    Créer un compte
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
