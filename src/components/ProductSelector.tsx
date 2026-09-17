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
        const hasFreeShipping = v.units > 1;
        const hasGift = v.id === "3-un-brinde";
        const displayedTotal = total + (v.shipping ?? 0);
        return (
          <button
            type="button"
            key={v.id}
            onClick={() => onSelect(v)}
            aria-pressed={isActive}
            className={cn(
              "relative grid min-h-28 grid-cols-[2rem_minmax(0,1fr)] items-center gap-x-3 gap-y-3 rounded-xl border px-4 py-4 text-left transition-all duration-300 sm:min-h-32 sm:grid-cols-[2.5rem_minmax(0,1fr)_auto] sm:gap-x-4 sm:px-6",
              isActive
                ? "border-primary bg-primary/[0.07] shadow-card"
                : "border-border bg-card hover:border-primary/40",
            )}
          >
            <span
              className={cn(
                "row-span-2 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors sm:row-span-1 sm:h-10 sm:w-10",
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
                {hasFreeShipping && (
                  <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase text-primary-foreground sm:text-xs">
                    Frete grátis
                  </span>
                )}
                {hasGift && (
                  <span className="rounded-full bg-[#FDDB7A] px-2.5 py-1 text-[10px] font-bold uppercase text-[#5B3D0C] sm:text-xs">
                    Brinde
                  </span>
                )}
              </span>
              <span className="mt-1 block text-sm text-muted-foreground">
                {v.units === 1
                  ? `${brl(v.unitPrice)} + ${brl(v.shipping ?? 0)} de frete`
                  : `${brl(v.perPot ?? v.unitPrice)} por pote${hasGift ? " · PataHelp de brinde" : ""}`}
              </span>
              {v.savings != null && (
                <span className="mt-1 block text-sm font-semibold text-terracotta">
                  Economize {brl(v.savings).replace(",00", "")}
                </span>
              )}
            </span>

            <span className="col-start-2 shrink-0 text-left sm:col-start-auto sm:text-right">
              {v.compareAt != null && (
                <span className="mb-1 block text-xs text-muted-foreground line-through sm:text-sm">
                  {brl(v.compareAt)}
                </span>
              )}
              <span className={cn("block text-2xl font-bold leading-none sm:text-3xl", isActive ? "text-primary" : "text-ink")}>{brl(displayedTotal)}</span>
              <span className="mt-1 block text-xs text-muted-foreground sm:text-sm">
                ou {v.installments}x de {brl(v.installmentValue ?? displayedTotal / v.installments)}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
