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
        const { total, discount } = variantTotals(v);
        const isActive = v.id === selected.id;
        return (
          <button
            key={v.id}
            onClick={() => onSelect(v)}
            aria-pressed={isActive}
            className={cn(
              "relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border bg-card px-4 py-4 text-left transition-all duration-300 sm:px-5",
              isActive
                ? "border-primary/70 shadow-card"
                : "border-border hover:border-primary/30",
            )}
          >
            <span
              className={cn(
                "grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors",
                isActive ? "border-primary bg-primary" : "border-clay",
              )}
            >
              {isActive && <Check size={12} strokeWidth={3} className="text-primary-foreground" />}
            </span>

            <span className="min-w-0">
              <span className="flex flex-wrap items-center gap-2">
                <span className="truncate text-base font-medium text-ink">{v.label}</span>
                {v.badge && (
                  <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] uppercase tracking-[0.14em] text-accent-foreground">
                    {v.badge}
                  </span>
                )}
              </span>
              <span className="mt-1 block text-xs text-muted-foreground">{v.sublabel}</span>
            </span>

            <span className="shrink-0 text-right">
              <span className="block text-sm font-medium text-ink">{brl(total)}</span>
              <span className="block text-[11px] text-muted-foreground">-{discount}%</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
