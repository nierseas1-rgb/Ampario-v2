"use client";

import { useCompare } from "@/context/CompareContext";
import { useToast } from "@/context/ToastContext";

const ScalesIcon = ({ active }: { active: boolean }) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill={active ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3v18M7 21h10M5 7l-3 6a3 3 0 0 0 6 0L5 7Zm14 0-3 6a3 3 0 0 0 6 0l-3-6ZM5 7l7-2 7 2" />
  </svg>
);

export function CompareButton({
  id,
  className = "",
}: {
  id: string;
  className?: string;
}) {
  const { isComparing, toggleCompare, isFull } = useCompare();
  const { notify } = useToast();
  const active = isComparing(id);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!active && isFull) {
          notify("Comparateur plein (3 biens maximum)", "info");
          return;
        }
        const added = toggleCompare(id);
        notify(
          added ? "Ajouté au comparateur" : "Retiré du comparateur",
          "success"
        );
      }}
      aria-label={active ? "Retirer du comparateur" : "Comparer ce bien"}
      aria-pressed={active}
      title={active ? "Retirer du comparateur" : "Comparer ce bien"}
      className={`flex items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-110 ${
        active ? "text-navy-900" : "text-navy-700 hover:text-navy-900"
      } ${className}`}
    >
      <ScalesIcon active={active} />
    </button>
  );
}
