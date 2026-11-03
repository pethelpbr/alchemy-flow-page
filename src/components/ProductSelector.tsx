import { Check } from "lucide-react";
import { brl, variantTotals, type Variant } from "@/lib/product";
import { cn } from "@/lib/utils";
import { useOffer } from "@/lib/offer-context";

export function ProductSelector({
  selected,
  onSelect,
}: {
  selected: Variant;
  onSelect: (v: Variant) => void;
}) {
  const { variants } = useOffer();
  const orderedVariants = [...variants].sort((a, b) => b.units - a.units);

  if (orderedVariants[0]?.id.startsWith("bf-")) {
    return <BlackFridaySelector variants={orderedVariants} selected={selected} onSelect={onSelect} />;
  }

  return (
  <div className="flex flex-col gap-2.5">
    {orderedVariants.map((v) => {
        const { total } = variantTotals(v);
        const isActive = v.id === selected.id;
        const hasFreeShipping = v.freeShipping ?? v.units > 1;
        const hasGift = v.id === "3-un-brinde" || !!v.tag;
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
                : "border-border bg-card hover:border-primary",
            )}
          >
            {/* ===== Mobile layout ===== */}
            <span className="flex flex-col sm:hidden">
              {(hasFreeShipping || hasGift) && (
                <span className="mb-2 flex flex-wrap items-center gap-2">
                  {hasFreeShipping && (
                    <span className="rounded-full bg-shipping px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-shipping-foreground">
                      Frete grátis
                    </span>
                  )}
                  {hasGift && (
                    <span className="rounded-full bg-gift px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-gift-foreground">
                      {v.tag ?? "Brinde"}
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
                    {v.detail ?? (v.units === 1
                      ? `${brl(v.unitPrice)} + ${brl(v.shipping ?? 0)} de frete`
                      : `${brl(v.perPot ?? v.unitPrice)} por pote`)}
                  </span>
                  {hasGift && !v.tag && (
                    <span className="block text-[13px] leading-snug text-muted-foreground">
                      + PataHelp de brinde
                    </span>
                  )}
                  {v.savings != null && (
                    <span className="mt-0.5 block text-[13px] font-semibold text-terracotta">
                      Economize {brl(v.savings).replace(",00", "")}
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
                  {!v.hideInstallments && (<span className="mt-0.5 block text-[11px] text-muted-foreground">
                    ou {v.installments}x de {brl(v.installmentValue ?? displayedTotal / v.installments)}
                  </span>)}
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
                    <span className="rounded-full bg-shipping px-2 py-0.5 text-[10px] font-bold uppercase text-shipping-foreground">
                      Frete grátis
                    </span>
                  )}
                  {hasGift && (
                    <span className="rounded-full bg-gift px-2 py-0.5 text-[10px] font-bold uppercase text-gift-foreground">
                      {v.tag ?? "Brinde"}
                    </span>
                  )}
                </span>
                <span className="mt-0.5 block text-[13px] leading-snug text-muted-foreground">
                  {v.detail ?? (v.units === 1
                    ? `${brl(v.unitPrice)} + ${brl(v.shipping ?? 0)} de frete`
                    : `${brl(v.perPot ?? v.unitPrice)} por pote${hasGift ? " · PataHelp de brinde" : ""}`)}
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
{!v.hideInstallments && (<span className="mt-0.5 block text-xs text-muted-foreground">
                  ou {v.installments}x de {brl(v.installmentValue ?? displayedTotal / v.installments)}
                </span>)}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function BlackFridaySelector({
  variants,
  selected,
  onSelect,
}: {
  variants: Variant[];
  selected: Variant;
  onSelect: (v: Variant) => void;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      {variants.map((v) => {
        const { total } = variantTotals(v);
        const isActive = v.id === selected.id;
        const off = v.compareAt ? Math.round((1 - total / v.compareAt) * 100) : null;
        return (
          <button
            type="button"
            key={v.id}
            onClick={() => onSelect(v)}
            aria-pressed={isActive}
            className={cn(
              "overflow-hidden rounded-xl text-left transition-all duration-300",
              isActive
                ? "border-2 border-primary bg-accent/60 ring-4 ring-primary/15"
                : "border border-border bg-muted hover:border-primary",
            )}
          >
            {v.badge && (
              <span className="block bg-gift py-1.5 text-center text-[10px] font-bold uppercase tracking-[0.13em] text-gift-foreground">
                {v.badge}
              </span>
            )}
            <span className="flex items-start gap-3 px-3.5 pb-3 pt-3.5 sm:px-4">
              <span
                className={cn(
                  "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition-colors",
                  isActive ? "border-primary bg-primary" : "border-clay",
                )}
              >
                {isActive && <Check size={11} strokeWidth={3.5} className="text-primary-foreground" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className={cn("block font-display leading-tight text-ink", isActive ? "text-xl" : "text-lg")}>
                  {v.label}
                </span>
                <span className="mt-1 block whitespace-pre-line text-xs leading-snug text-muted-foreground">
                  {v.detail}
                </span>
                {v.freeShipping && (
                  <span className="mt-2 inline-block rounded-full bg-[rgba(34,187,187,0.17)] px-[7px] py-1 text-[9px] font-extrabold uppercase tracking-[0.06em] text-[#63D8D8]">
                    Frete grátis
                  </span>
                )}
              </span>
              <span className="shrink-0 text-right tabular-nums">
                {v.compareAt != null && (
                  <span className="block text-[11px] text-muted-foreground line-through">{brl(v.compareAt)}</span>
                )}
                <span
                  className={cn(
                    "block font-bold leading-tight tracking-tight",
                    isActive ? "text-2xl text-terracotta" : "text-xl text-ink",
                  )}
                >
                  {brl(total)}
                </span>
                <span className="mt-0.5 block text-[10.5px] text-muted-foreground">
                  {v.installments}x de {brl(v.installmentValue ?? total / v.installments)}
                </span>
              </span>
            </span>
            {off != null && (
              <span className="flex flex-wrap items-center gap-2 border-t border-gift/15 bg-gift/10 px-3.5 py-2 sm:px-4">
                <span className="rounded-md bg-primary px-2 py-0.5 text-[11px] font-bold text-primary-foreground">
                  {off}% OFF
                </span>
                {v.savings != null && (
                  <span className="text-xs font-bold text-gift">Economize {brl(v.savings)}</span>
                )}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
