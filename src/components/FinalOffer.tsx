import { BuyButton } from "@/components/ui/BuyButton";
import { brl, variantTotals, variants, type Variant } from "@/lib/product";
import { cn } from "@/lib/utils";
import nutraHelpPot from "@/assets/nutrahelp-pot-v2.png";
import pataHelpGift from "@/assets/patahelp-gift-v2.png";

function ProductKit({ units, withGift }: { units: number; withGift: boolean }) {
  const spacing = units === 3 ? 33 : 30;

  return (
    <div className="relative mx-auto h-36 w-full max-w-56 sm:h-40">
      {Array.from({ length: units }).map((_, index) => {
        const centeredIndex = index - (units - 1) / 2;
        return (
          <img
            key={index}
            src={nutraHelpPot}
            alt={index === 0 ? `${units} pote${units > 1 ? "s" : ""} de NutraHelp` : ""}
            aria-hidden={index > 0}
            loading="lazy"
            width={602}
            height={905}
            className="absolute bottom-0 left-1/2 h-32 w-auto object-contain sm:h-36"
            style={{
              transform: `translateX(calc(-50% + ${centeredIndex * spacing}px))`,
              zIndex: index + 1,
            }}
          />
        );
      })}
      {withGift && (
        <img
          src={pataHelpGift}
          alt="PataHelp de brinde"
          loading="lazy"
          width={490}
          height={610}
          className="absolute bottom-0 right-4 z-10 h-20 w-auto object-contain sm:right-3 sm:h-24"
        />
      )}
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
  onBuy: (variant?: Variant) => void;
  addonIds: string[];
  onToggleAddon: (id: string) => void;
}) {
  const orderedVariants = [...variants].sort((a, b) => b.units - a.units);

  return (
    <section className="section bg-background">
      <div id="comprar" className="container-x scroll-mt-28">
        <div className="mx-auto grid max-w-6xl gap-4 pt-8 md:grid-cols-3 md:items-stretch">
          {orderedVariants.map((variant) => {
            const isActive = selected.id === variant.id;
            const isBestChoice = variant.id === "3-un-brinde";
            const hasFreeShipping = variant.units > 1;
            const displayedTotal = variantTotals(variant).total + (variant.shipping ?? 0);

            return (
              <article
                key={variant.id}
                onClick={() => onSelect(variant)}
                className={cn(
                  "relative flex cursor-pointer flex-col rounded-lg border bg-card px-4 pb-4 pt-7 text-center shadow-card sm:px-5 sm:pb-5",
                  isActive ? "border-primary" : "border-border",
                )}
              >
                {isBestChoice && (
                  <span className="absolute left-12 top-0 -translate-y-full rounded-t-lg bg-primary px-6 py-2.5 text-xs font-bold uppercase text-primary-foreground sm:text-sm">
                    Melhor escolha
                  </span>
                )}

                <ProductKit units={variant.units} withGift={isBestChoice} />

                <div className="mt-2 flex min-h-8 flex-wrap items-center justify-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-3 py-1.5 text-xs font-bold uppercase",
                      hasFreeShipping
                        ? "bg-shipping text-shipping-foreground"
                        : "bg-ink text-primary-foreground",
                    )}
                  >
                    {hasFreeShipping ? "Frete grátis" : "Frete fixo"}
                  </span>
                  {isBestChoice && (
                    <span className="rounded-full bg-gift px-3 py-1.5 text-xs font-bold uppercase text-gift-foreground">
                      Brinde
                    </span>
                  )}
                </div>

                <h2 className="mt-3 font-sans text-2xl font-bold leading-none text-foreground">{variant.label}</h2>
                <p className="mt-1 min-h-6 text-sm text-muted-foreground">
                  {variant.units === 1
                    ? `${brl(variant.unitPrice)} + ${brl(variant.shipping ?? 0)} de frete`
                    : `${brl(variant.perPot ?? variant.unitPrice)} por pote${isBestChoice ? " + PataHelp" : ""}`}
                </p>

                <div className="mt-4 min-h-5 text-sm text-muted-foreground line-through">
                  {variant.compareAt ? brl(variant.compareAt) : null}
                </div>
                <p className="mt-1 text-3xl font-bold leading-none text-primary sm:text-4xl">{brl(displayedTotal)}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  ou {variant.installments}x de {brl(variant.installmentValue ?? displayedTotal / variant.installments)}
                </p>

                <p className="mt-4 min-h-6 text-sm font-bold text-terracotta">
                  {variant.savings ? `Economize ${brl(variant.savings).replace(",00", "")}` : null}
                </p>

                <BuyButton
                  size="md"
                  className="mt-auto w-full rounded-full px-4 text-sm font-bold uppercase tracking-normal"
                  onClick={(event) => {
                    event.stopPropagation();
                    onSelect(variant);
                    onBuy(variant);
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