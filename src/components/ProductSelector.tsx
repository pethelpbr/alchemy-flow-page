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
    <div className="flex flex-col gap-3 sm:flex-col">
      {variants.map((v) => {
        const { total, oldTotal, discount } = variantTotals(v);
        const isActive = v.id === selected.id;
        return (
          <button
            key={v.id}
            onClick={() => onSelect(v)}
            aria-pressed={isActive}
            className={cn(
              "relative rounded-2xl border bg-card p-4 text-left transition-all duration-300 sm:grid sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center sm:gap-3 sm:px-5 sm:py-4",
              isActive
                ? "border-primary/70 shadow-card"
                : "border-border hover:border-primary/30",
            )}
          >
            {/* Mobile layout */}
            <span className="flex flex-col gap-2 sm:hidden">
              <span className="flex items-start justify-between gap-2">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-base font-semibold text-ink">{v.label}</span>
                  {v.badge && (
                    <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-accent-foreground">
                      {v.badge}
                    </span>
                  )}
                </span>
                <span
                  className={cn(
                    "grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors",
                    isActive ? "border-primary bg-primary" : "border-clay",
                  )}
                >
                  {isActive && <Check size={12} strokeWidth={3} className="text-primary-foreground" />}
                </span>
              </span>

              <span className="block text-sm text-muted-foreground">
                {brl(v.unitPrice)}/pote
              </span>

              <span className="flex items-end justify-between">
                <span>
                  <span className="block text-sm text-muted-foreground line-through">
                    {brl(oldTotal)}
                  </span>
                  <span className="block text-xl font-bold leading-none text-ink">
                    {brl(total)}
                  </span>
                </span>
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-primary">
                  -{discount}%
                </span>
              </span>
            </span>

            {/* Desktop layout */}
            <span className="hidden sm:grid sm:grid-cols-subgrid sm:items-center sm:gap-3">
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
                <span className="block text-base font-medium text-ink">{brl(total)}</span>
                <span className="block text-[11px] text-muted-foreground">-{discount}%</span>
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
