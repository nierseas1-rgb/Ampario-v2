const dpeColors: Record<string, string> = {
  A: "bg-green-600",
  B: "bg-green-500",
  C: "bg-lime-500",
  D: "bg-yellow-500",
  E: "bg-orange-500",
  F: "bg-orange-600",
  G: "bg-red-600",
};

export function DpeBadge({
  grade,
  label = "DPE",
  size = "sm",
}: {
  grade?: string;
  label?: string;
  size?: "sm" | "lg";
}) {
  if (!grade) return null;
  const dim = size === "lg" ? "h-9 w-9 text-base" : "h-6 w-6 text-xs";
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-xs font-medium text-navy-400">{label}</span>
      <span
        className={`flex items-center justify-center rounded font-bold text-white ${dpeColors[grade]} ${dim}`}
      >
        {grade}
      </span>
    </span>
  );
}
