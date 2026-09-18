import { Check } from "lucide-react";
import { BuyButton } from "@/components/ui/BuyButton";
import { brl, variantTotals, variants, type Variant } from "@/lib/product";
import { cn } from "@/lib/utils";

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
  const { total } = variantTotals(selected);
  const orderTotal = total + (selected.shipping ?? 0);

  return (
    <section className="section bg-sand/60">
      <div id="comprar" className="container-x scroll-mt-28">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border bg-card shadow-card">
          <div className="p-5 sm:p-7 md:p-10">
            <h2 className="flex items-center gap-3 font-sans text-2xl font-bold text-ink sm:text-3xl">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-xl font-bold text-primary-foreground sm:size-11">
                1
              </span>
              Escolha seu ritual
            </h2>

            <div className="mt-7 space-y-4">
              {orderedVariants.map((variant) => {
                const isActive = selected.id === variant.id;
                const isBestChoice = variant.id === "3-un-brinde";
                const hasFreeShipping = variant.units > 1;
                const variantTotal = variantTotals(variant).total + (variant.shipping ?? 0);

                return (
                  <label
                    key={variant.id}
                    className={cn(
                      "relative grid cursor-pointer grid-cols-[3rem_1fr_auto] items-center gap-x-3 rounded-2xl border px-4 py-5 sm:grid-cols-[3.25rem_1fr_auto] sm:px-6 md:min-h-36 md:gap-x-5 md:py-6",
                      isActive ? "border-primary bg-accent" : "border-border bg-card",
                    )}
                  >
                    <input
                      type="radio"
                      name="final-offer"
                      value={variant.id}
                      checked={isActive}
                      onChange={() => onSelect(variant)}
                      className="sr-only"
                    />

                    <span
                      className={cn(
                        "row-start-2 grid size-11 place-items-center rounded-full border-2 sm:row-start-1 sm:size-12",
                        isActive ? "border-primary bg-primary" : "border-border bg-card",
                      )}
                    >
                      {isActive && <Check className="size-6 text-primary-foreground" strokeWidth={3} />}
                    </span>

                    <div className="col-span-3 mb-4 flex flex-wrap gap-2 sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:mb-0">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-2xl font-bold leading-none text-ink">{variant.label}</h3>
                          {hasFreeShipping && (
                            <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase text-primary-foreground sm:text-sm">
                              Frete grátis
                            </span>
                          )}
                          {isBestChoice && (
                            <span className="rounded-full bg-gift px-3 py-1 text-xs font-bold uppercase text-gift-foreground sm:text-sm">
                              Brinde
                            </span>
                          )}
                        </div>
                        <p className="mt-2 text-base leading-snug text-muted-foreground sm:text-lg">
                          {variant.units === 1
                            ? `${brl(variant.unitPrice)} + ${brl(variant.shipping ?? 0)} de frete`
                            : `${brl(variant.perPot ?? variant.unitPrice)} por pote${isBestChoice ? " · PataHelp de brinde" : ""}`}
                        </p>
                        {variant.savings && (
                          <p className="mt-1 text-base font-bold text-terracotta sm:text-lg">
                            Economize {brl(variant.savings).replace(",00", "")}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row-start-2 text-right sm:row-start-1">
                      {variant.compareAt && (
                        <p className="text-sm text-muted-foreground line-through sm:text-base">{brl(variant.compareAt)}</p>
                      )}
                      <p className={cn("text-2xl font-bold leading-none sm:text-4xl", isActive ? "text-primary" : "text-ink")}>{brl(variantTotal)}</p>
                      <p className="mt-1 whitespace-nowrap text-sm text-muted-foreground sm:text-base">
                        ou {variant.installments}x de {brl(variant.installmentValue ?? variantTotal / variant.installments)}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="border-t border-border bg-muted px-5 py-6 sm:px-7 md:flex md:items-center md:justify-between md:px-10">
            <div className="flex items-baseline justify-between gap-3 md:block">
              <p className="text-base text-muted-foreground sm:text-lg">Total do pedido</p>
              <div className="mt-1 flex items-baseline justify-end gap-3">
                {selected.compareAt && <span className="text-base text-muted-foreground line-through sm:text-lg">{brl(selected.compareAt)}</span>}
                <strong className="text-3xl leading-none text-ink sm:text-4xl">{brl(orderTotal)}</strong>
              </div>
            </div>
            <BuyButton
              size="md"
              className="mt-5 w-full rounded-xl px-9 text-base font-bold uppercase tracking-normal md:mt-0 md:w-auto md:min-w-64"
              onClick={() => onBuy(selected)}
            >
              Quero meu NutraHelp
            </BuyButton>
          </div>
        </div>
      </div>
    </section>
  );
}