import { Check } from "lucide-react";
import { brl, variantTotals, variants, type Variant } from "@/lib/product";
import { cn } from "@/lib/utils";

export function ProductSelector({
  selected,
  onSelect,
}: {
  selected: Variant;
  onSelect: (v: Variant) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      {variants.map((v) => {
        const { total } = variantTotals(v);
        const isActive = v.id === selected.id;
        const isBestValue = v.badge === "Maior economia";
        return (
          <button
            key={v.id}
            onClick={() => onSelect(v)}
            aria-pressed={isActive}
            className={cn(
              "relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border px-4 py-4 text-left transition-all duration-300 sm:px-5",
              isBestValue && "mt-3",
              isActive
                ? "border-primary bg-primary/[0.08] shadow-[0_8px_30px_-12px_oklch(0.62_0.19_47.6/0.45)]"
                : "border-border bg-card hover:border-primary/30",
            )}
          >
            {isBestValue && (
              <span className="absolute -top-3 left-4 rounded-md bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-foreground">
                Maior economia
              </span>
            )}
            <span
              className={cn(
                "grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors",
                isActive
                  ? "border-primary bg-primary"
                  : "border-clay bg-card",
              )}
            >
              {isActive && <Check size={12} strokeWidth={3} className="text-primary-foreground" />}
            </span>

            <span className="min-w-0">
              <span className="flex flex-wrap items-center gap-2">
                <span className={cn("text-base font-medium leading-snug", isActive ? "text-ink" : "text-ink")}>{v.label}</span>
                {v.badge && (
                  <span className={cn(
                    "rounded-lg px-2.5 py-0.5 text-[10px] uppercase tracking-[0.14em]",
                    "bg-primary text-primary-foreground",
                  )}>
                    {isBestValue ? "Frete grátis" : v.badge}
                  </span>
                )}
              </span>
              {v.sublabel && (
                <span className="mt-1 block text-xs text-muted-foreground">{v.sublabel}</span>
              )}
            </span>

            <span className="shrink-0 text-right">
              <span className={cn("block text-base font-medium", isActive ? "text-primary" : "text-ink")}>{brl(total)}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
