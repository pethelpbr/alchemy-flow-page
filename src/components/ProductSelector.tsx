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
              "relative rounded-xl border px-3.5 py-3 text-left transition-all duration-300 sm:px-5",
              isActive
                ? "border-primary bg-primary/[0.07] shadow-card"
                : "border-border bg-card hover:border-primary/40",
            )}
          >
            {/* ===== Mobile layout ===== */}
            <span className="flex flex-col sm:hidden">
              {(hasFreeShipping || hasGift) && (
                <span className="mb-2 flex flex-wrap items-center gap-2">
                  {hasFreeShipping && (
                    <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                      Frete grátis
                    </span>
                  )}
                  {hasGift && (
                    <span className="rounded-full bg-gift px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-gift-foreground">
                      Brinde
                    </span>
                  )}
                </span>
              )}

              <span className="flex items-center gap-3">
                <span
                  className={cn(
                    "grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors",
                    isActive ? "border-primary bg-primary" : "border-clay bg-card",
                  )}
                >
                  {isActive && <Check size={13} strokeWidth={3.5} className="text-primary-foreground" />}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-base font-bold leading-snug text-ink">
                    {v.label}
                  </span>
                  <span className="mt-0.5 block text-[13px] leading-snug text-muted-foreground">
                    {v.units === 1
                      ? `${brl(v.unitPrice)} + ${brl(v.shipping ?? 0)} de frete`
                      : `${brl(v.perPot ?? v.unitPrice)} por pote`}
                  </span>
                  {hasGift && (
                    <span className="block text-[13px] leading-snug text-muted-foreground">
                      + PataHelp de brinde
                    </span>
                  )}
                </span>

                <span className="shrink-0 text-right">
                  {v.compareAt != null && (
                    <span className="mb-0.5 block text-[11px] text-muted-foreground line-through">
                      {brl(v.compareAt)}
                    </span>
                  )}
                  <span
                    className={cn(
                      "block text-xl font-bold leading-none",
                      isActive ? "text-primary" : "text-ink",
                    )}
                  >
                    {brl(displayedTotal)}
                  </span>
                </span>
              </span>

              <span
                className={cn(
                  "mt-2.5 flex items-center justify-between gap-2 border-t pt-2",
                  isActive ? "border-primary/25" : "border-border",
                )}
              >
                <span className="text-[13px] font-semibold text-terracotta">
                  {v.savings != null ? `Economize ${brl(v.savings).replace(",00", "")}` : ""}
                </span>
                <span className="text-[12px] text-muted-foreground">
                  ou {v.installments}x de {brl(v.installmentValue ?? displayedTotal / v.installments)}
                </span>
              </span>
            </span>

            {/* ===== Desktop layout ===== */}
            <span className="hidden sm:grid sm:grid-cols-[1.5rem_minmax(0,1fr)_auto] sm:items-center sm:gap-x-4">
              <span
                className={cn(
                  "grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors",
                  isActive ? "border-primary bg-primary" : "border-clay bg-card",
                )}
              >
                {isActive && <Check size={12} strokeWidth={3.5} className="text-primary-foreground" />}
              </span>

              <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-lg font-bold leading-snug text-ink">{v.label}</span>
                  {hasFreeShipping && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">
                      Frete grátis
                    </span>
                  )}
                  {hasGift && (
                    <span className="rounded-full bg-gift px-2 py-0.5 text-[10px] font-bold uppercase text-gift-foreground">
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

              <span className="shrink-0 text-right">
                {v.compareAt != null && (
                  <span className="mb-0.5 block text-xs text-muted-foreground line-through">
                    {brl(v.compareAt)}
                  </span>
                )}
                <span
                  className={cn(
                    "block text-2xl font-bold leading-none",
                    isActive ? "text-primary" : "text-ink",
                  )}
                >
                  {brl(displayedTotal)}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  ou {v.installments}x de {brl(v.installmentValue ?? displayedTotal / v.installments)}
                </span>
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
