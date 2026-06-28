import Link from "next/link";
import { ArrowRightIcon } from "./icons";

export function SectionHeading({
  eyebrow,
  title,
  description,
  linkHref,
  linkLabel,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  linkHref?: string;
  linkLabel?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`flex flex-col gap-4 ${
        align === "center"
          ? "items-center text-center"
          : "sm:flex-row sm:items-end sm:justify-between"
      }`}
    >
      <div className={align === "center" ? "max-w-2xl" : "max-w-xl"}>
        {eyebrow && <p className="label-eyebrow">{eyebrow}</p>}
        <h2 className="mt-3 font-serif text-3xl font-semibold text-navy-900 sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-base leading-relaxed text-navy-500">
            {description}
          </p>
        )}
      </div>
      {linkHref && linkLabel && (
        <Link
          href={linkHref}
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-gold-700 transition hover:text-gold-600"
        >
          {linkLabel}
          <ArrowRightIcon
            width={16}
            height={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      )}
    </div>
  );
}
