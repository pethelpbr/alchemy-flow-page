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
  const orderedVariants = [...variants].sort((a, b) => b.units - a.units);

  return (
    <div className="flex flex-col gap-3.5">
      {orderedVariants.map((v) => {
        const { total } = variantTotals(v);
        const isActive = v.id === selected.id;
        const isBestValue = v.badge === "Maior economia";
        const hasGift = v.id === "3-un-brinde";
        return (
          <button
            type="button"
            key={v.id}
            onClick={() => onSelect(v)}
            aria-pressed={isActive}
            className={cn(
              "relative grid min-h-28 grid-cols-[2rem_minmax(0,1fr)] items-center gap-x-3 gap-y-3 rounded-xl border px-4 py-4 text-left transition-all duration-300 sm:grid-cols-[2rem_minmax(0,1fr)_auto] sm:gap-x-4 sm:px-5",
              isActive
                ? "border-primary bg-primary/[0.07] shadow-card"
                : "border-border bg-card hover:border-primary/40",
            )}
          >
            <span
              className={cn(
                "row-span-2 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors sm:row-span-1",
                isActive
                  ? "border-primary bg-primary"
                  : "border-clay bg-card",
              )}
            >
              {isActive && <Check size={17} strokeWidth={3} className="text-primary-foreground" />}
            </span>

            <span className="min-w-0">
              <span className="flex flex-wrap items-center gap-2">
                <span className="text-lg font-bold leading-snug text-ink">{v.label}</span>
                {v.badge && (
                  <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase text-primary-foreground sm:text-xs">
                    {isBestValue ? "Frete grátis" : v.badge}
                  </span>
                )}
                {hasGift && (
                  <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase text-accent-foreground sm:text-xs">
                    Brinde
                  </span>
                )}
              </span>
              {v.sublabel && (
                <span className="mt-1 block text-sm text-muted-foreground">
                  {v.perPot != null ? `${brl(v.perPot)} por pote · ` : ""}
                  {v.sublabel}
                </span>
              )}
            </span>

            <span className="col-start-2 shrink-0 text-left sm:col-start-auto sm:text-right">
              <span className={cn("block text-2xl font-bold leading-none sm:text-3xl", isActive ? "text-primary" : "text-ink")}>{brl(total)}</span>
              {!v.hideInstallments && (
                <span className="mt-1 block text-xs text-muted-foreground sm:text-sm">
                  ou {v.installments}x de {brl(v.installmentValue ?? total / v.installments)}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
