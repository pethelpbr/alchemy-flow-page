import { Check } from "lucide-react";
import { BuyButton } from "@/components/ui/BuyButton";
import { brl, variantTotals, variants, type Variant } from "@/lib/product";
import { cn } from "@/lib/utils";
import productHero from "@/assets/product-hero.jpg";

function ProductStack({ units }: { units: number }) {
  return (
    <div className="relative mx-auto h-28 w-full max-w-48 sm:h-32">
      {Array.from({ length: units }).map((_, index) => {
        const centeredIndex = index - (units - 1) / 2;
        return (
          <img
            key={index}
            src={productHero}
            alt={index === 0 ? `${units} pote${units > 1 ? "s" : ""} de NutraHelp` : ""}
            aria-hidden={index > 0}
            loading="lazy"
            className="absolute bottom-0 left-1/2 h-24 w-[76px] rounded-md object-cover shadow-card sm:h-28 sm:w-[88px]"
            style={{
              transform: `translateX(calc(-50% + ${centeredIndex * 42}px))`,
              zIndex: units - Math.abs(centeredIndex),
            }}
          />
        );
      })}
    </div>
  );
}

export function FinalOffer({
  selected,
  onSelect,
  onBuy,
}: {
  selected: Variant;
  onSelect: (v: Variant) => void;
  onBuy: () => void;
  addonIds: string[];
  onToggleAddon: (id: string) => void;
}) {
  const orderedVariants = [...variants].sort((a, b) => b.units - a.units);

  return (
    <section className="section bg-sand/60">
      <div id="comprar" className="container-x scroll-mt-28">
        <div className="mx-auto max-w-6xl text-center">
          <p className="eyebrow text-primary">Oferta final</p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Escolha o cuidado ideal para seu pet
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3 md:items-stretch">
          {orderedVariants.map((variant) => {
            const isActive = selected.id === variant.id;
            const isBestChoice = variant.id === "3-un-brinde";
            const hasFreeShipping = variant.units > 1;
            const { total } = variantTotals(variant);
            const displayedTotal = total + (variant.shipping ?? 0);

            return (
              <article
                key={variant.id}
                onClick={() => onSelect(variant)}
                className={cn(
                  "relative flex cursor-pointer flex-col rounded-2xl border bg-card px-4 pb-4 pt-7 text-center shadow-card transition-colors sm:px-5 sm:pb-5",
                  isActive || isBestChoice ? "border-primary" : "border-border",
                  isBestChoice && "md:order-first",
                )}
              >
                {isBestChoice && (
                  <span className="absolute -top-px left-1/2 -translate-x-1/2 -translate-y-full rounded-t-xl bg-primary px-6 py-2 text-xs font-bold uppercase text-primary-foreground">
                    Melhor escolha
                  </span>
                )}

                <span
                  className={cn(
                    "absolute right-4 top-4 grid size-6 place-items-center rounded-full border",
                    isActive ? "border-primary bg-primary" : "border-border bg-card",
                  )}
                >
                  {isActive && <Check className="size-3.5 text-primary-foreground" strokeWidth={3} />}
                </span>

                <ProductStack units={variant.units} />

                <div className="mt-3 flex min-h-7 flex-wrap items-center justify-center gap-2">
                  {hasFreeShipping ? (
                    <span className="rounded-full bg-shipping px-3 py-1 text-[11px] font-bold uppercase text-shipping-foreground">
                      Frete grátis
                    </span>
                  ) : (
                    <span className="rounded-full bg-ink px-3 py-1 text-[11px] font-bold uppercase text-card">
                      Frete fixo
                    </span>
                  )}
                  {isBestChoice && (
                    <span className="rounded-full bg-gift px-3 py-1 text-[11px] font-bold uppercase text-gift-foreground">
                      Brinde
                    </span>
                  )}
                </div>

                <h3 className="mt-3 text-2xl font-bold text-ink">{variant.label}</h3>
                <p className="mt-0.5 min-h-10 text-sm leading-snug text-muted-foreground">
                  {variant.units === 1
                    ? `${brl(variant.unitPrice)} + ${brl(variant.shipping ?? 0)} de frete`
                    : `${brl(variant.perPot ?? variant.unitPrice)} por pote${isBestChoice ? " + PataHelp" : ""}`}
                </p>

                <div className="mt-3 min-h-5 text-sm text-muted-foreground line-through">
                  {variant.compareAt ? brl(variant.compareAt) : null}
                </div>
                <p className="mt-1 text-3xl font-bold leading-none text-primary sm:text-[34px]">
                  {brl(displayedTotal)}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  ou {variant.installments}x de {brl(variant.installmentValue ?? displayedTotal / variant.installments)}
                </p>
                <p className="mt-4 min-h-5 text-sm font-semibold text-terracotta">
                  {variant.savings ? `Economize ${brl(variant.savings).replace(",00", "")}` : null}
                </p>

                <BuyButton
                  size="md"
                  className="mt-5 w-full rounded-full px-4 text-sm font-bold tracking-normal"
                  onClick={(event) => {
                    event.stopPropagation();
                    onSelect(variant);
                    onBuy();
                  }}
                >
                  Quero este!
                </BuyButton>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}