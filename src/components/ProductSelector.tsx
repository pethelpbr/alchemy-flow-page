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
    <div className="flex flex-col gap-2.5">
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
              "relative grid grid-cols-[1.25rem_minmax(0,1fr)] items-center gap-x-3 gap-y-1.5 rounded-xl border px-3.5 py-3 text-left transition-all duration-300 sm:grid-cols-[1.5rem_minmax(0,1fr)_auto] sm:gap-x-4 sm:px-5 sm:py-3",
              isActive
                ? "border-primary bg-primary/[0.07] shadow-card"
                : "border-border bg-card hover:border-primary/40",
            )}
          >
            <span
              className={cn(
                "row-span-2 grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors sm:row-span-1 sm:h-6 sm:w-6",
                isActive
                  ? "border-primary bg-primary"
                  : "border-clay bg-card",
              )}
            >
              {isActive && <Check size={12} strokeWidth={3.5} className="text-primary-foreground" />}
            </span>

            <span className="min-w-0">
              <span className="flex flex-wrap items-center gap-2">
                <span className="text-base font-bold leading-snug text-ink sm:text-lg">{v.label}</span>
                {hasFreeShipping && (
                  <span className="rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold uppercase text-primary-foreground sm:text-[10px]">
                    Frete grátis
                  </span>
                )}
                {hasGift && (
                  <span className="rounded-full bg-gift px-2 py-0.5 text-[9px] font-bold uppercase text-gift-foreground sm:text-[10px]">
                    Brinde
                  </span>
                )}
              </span>
              <span className="mt-0.5 block text-[13px] leading-snug text-muted-foreground">
                {v.units === 1
                  ? `${brl(v.unitPrice)} + ${brl(v.shipping ?? 0)} de frete`
                  : `${brl(v.perPot ?? v.unitPrice)} por pote${hasGift ? " · PataHelp de brinde" : ""}`}
              </span>
              {v.savings != null && (
                <span className="mt-0.5 block text-[13px] font-semibold text-terracotta">
                  Economize {brl(v.savings).replace(",00", "")}
                </span>
              )}
            </span>

            <span className="col-start-2 shrink-0 text-left sm:col-start-auto sm:text-right">
              {v.compareAt != null && (
                <span className="mb-0.5 block text-[11px] text-muted-foreground line-through sm:text-xs">
                  {brl(v.compareAt)}
                </span>
              )}
              <span className={cn("block text-xl font-bold leading-none sm:text-2xl", isActive ? "text-primary" : "text-ink")}>{brl(displayedTotal)}</span>
              <span className="mt-0.5 block text-[11px] text-muted-foreground sm:text-xs">
                ou {v.installments}x de {brl(v.installmentValue ?? displayedTotal / v.installments)}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
