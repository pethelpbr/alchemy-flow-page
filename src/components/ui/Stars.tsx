import { Star } from "lucide-react";

export function Stars({ size = 14 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-gold" aria-label="5 de 5 estrelas">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} strokeWidth={1} className="fill-gold" />
      ))}
    </span>
  );
}
