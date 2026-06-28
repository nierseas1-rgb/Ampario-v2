import Link from "next/link";

interface LogoProps {
  variant?: "light" | "dark";
  showTagline?: boolean;
  className?: string;
}

/**
 * Logo Ampario — monogramme "AP" surmonté d'un toit (accent circonflexe)
 * évoquant l'immobilier, accompagné du nom et de la signature.
 */
export function Logo({
  variant = "dark",
  showTagline = true,
  className = "",
}: LogoProps) {
  const mark = variant === "light" ? "#f5f2ea" : "#16243f";
  const accent = "#b8975a";

  return (
    <Link
      href="/"
      aria-label="Ampario — Accueil"
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <svg
        width="44"
        height="44"
        viewBox="0 0 100 100"
        fill="none"
        className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5"
        aria-hidden="true"
      >
        {/* Toit / accent circonflexe */}
        <path
          d="M30 30 L50 12 L70 30"
          stroke={accent}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Lettre A */}
        <path
          d="M22 82 L42 34 L50 54"
          stroke={mark}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M33 64 L47 64"
          stroke={mark}
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Lettre P */}
        <path
          d="M52 82 L52 38 L66 38 Q78 38 78 50 Q78 62 66 62 L52 62"
          stroke={mark}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className="font-serif text-2xl font-semibold tracking-[0.18em]"
          style={{ color: mark }}
        >
          AMPARIO
        </span>
        {showTagline && (
          <span
            className="mt-1 text-[10px] font-medium uppercase tracking-[0.32em]"
            style={{ color: accent }}
          >
            Immobilier de prestige
          </span>
        )}
      </span>
    </Link>
  );
}
