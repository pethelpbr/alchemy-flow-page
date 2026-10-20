import { useId } from "react";

const STAR_PATH =
  "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.771-.56l.882-5.14a2.122 2.122 0 0 0-.611-1.878L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z";

function StarShape({ size, fill }: { size: number; fill: number }) {
  const id = useId();
  const pct = `${Math.round(fill * 1000) / 10}%`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden
      className="shrink-0"
    >
      {fill > 0 && fill < 1 && (
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
            <stop offset={pct} style={{ stopColor: "var(--primary)" }} />
            <stop offset={pct} style={{ stopColor: "transparent" }} />
          </linearGradient>
        </defs>
      )}
      <path
        d={STAR_PATH}
        style={{
          fill:
            fill >= 1
              ? "var(--primary)"
              : fill > 0
                ? `url(#${id})`
                : "none",
        }}
      />
      <path
        d={STAR_PATH}
        fill="none"
        strokeWidth={1}
        strokeLinejoin="round"
        style={{ stroke: "var(--primary)" }}
      />
    </svg>
  );
}

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
    <span className="inline-flex items-center gap-0.5" aria-label={ariaLabel}>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarShape
          key={i}
          size={size}
          fill={Math.max(0, Math.min(1, rating - i))}
        />
      ))}
    </span>
  );
}
