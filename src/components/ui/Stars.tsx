import { Star } from "lucide-react";

export function Stars({
  size = 14,
  rating = 5,
  label,
}: {
  size?: number;
  rating?: number;
  label?: string;
}) {
  const ariaLabel =
    label ?? `${rating.toLocaleString("pt-BR")} de 5 estrelas`;

  return (
    <span className="inline-flex items-center gap-0.5 text-primary" aria-label={ariaLabel}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i));

        if (fill >= 1) {
          return <Star key={i} size={size} strokeWidth={1} className="fill-primary" />;
        }

        if (fill <= 0) {
          return <Star key={i} size={size} strokeWidth={1} className="text-border" />;
        }

        return (
          <span
            key={i}
            aria-hidden
            className="relative inline-flex shrink-0"
            style={{ width: size, height: size }}
          >
            <Star size={size} strokeWidth={1} className="absolute inset-0 text-border" />
            <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star size={size} strokeWidth={1} className="fill-primary" />
            </span>
          </span>
        );
      })}
    </span>
  );
}
