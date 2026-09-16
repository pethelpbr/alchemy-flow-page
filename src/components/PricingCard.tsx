import { motion } from "motion/react";
import { Truck, RefreshCw, Lock } from "lucide-react";
import { brl, variantTotals, addonsTotal, type Variant } from "@/lib/product";
import { ProductSelector } from "@/components/ProductSelector";
import { BuyButton } from "@/components/ui/BuyButton";
import { KitBooster } from "@/components/KitBooster";
import { ProductVideoFeedback } from "@/components/ProductVideoFeedback";

const seals = [
  { icon: Lock, label: "Compra segura" },
  { icon: RefreshCw, label: "Garantia 30 dias" },
  { icon: Truck, label: "Envio rápido" },
];

export function PricingCard({
  selected,
  onSelect,
  onBuy,
  compact = false,
  addonIds,
  onToggleAddon,
}: {
  selected: Variant;
  onSelect: (v: Variant) => void;
  onBuy: () => void;
  compact?: boolean;
  addonIds: string[];
  onToggleAddon: (id: string) => void;
}) {
  const { total, installmentValue } = variantTotals(selected);
  const toggleAddon = onToggleAddon;

  const extra = addonsTotal(addonIds);
  const grandTotal = total + extra;
  const installment =
    selected.installmentValue != null
      ? selected.installmentValue + extra / selected.installments
      : grandTotal / selected.installments;

  return (
    <div id="comprar" className="scroll-mt-28 flex flex-col gap-6">
      <div className="overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-card sm:p-7">
        {!compact && (
          <p className="mb-4 flex items-center gap-2 text-base font-medium text-ink">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
              1
            </span>
            Escolha seu ritual
          </p>
        )}

        <ProductSelector selected={selected} onSelect={onSelect} />

        <KitBooster selectedIds={addonIds} onToggle={toggleAddon} />

        <motion.div
          key={`${selected.id}-${addonIds.join()}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-6 flex flex-wrap items-end gap-x-3 gap-y-1"
        >
          <span className="font-display text-3xl leading-none text-ink">{brl(grandTotal)}</span>
        </motion.div>

        {selected.units === 1 && selected.shipping != null && (
          <p className="mt-2 text-base text-muted-foreground">+ frete {brl(selected.shipping)}</p>
        )}
        {selected.note && (
          <p className="mt-2 text-base text-muted-foreground">{selected.note}</p>
        )}
        {selected.perPot != null && (
          <p className="mt-1 text-base text-muted-foreground">{brl(selected.perPot)} por pote</p>
        )}
        {!selected.hideInstallments && (
          <p className="mt-1 text-base text-muted-foreground">
            ou {selected.installments}x de {brl(installment)} sem juros
          </p>
        )}

        {extra > 0 && (
          <p className="mt-3 flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-base">
            <span className="text-muted-foreground">Preço total com adicionais</span>
            <span className="font-semibold text-ink">{brl(grandTotal)}</span>
          </p>
        )}

        <BuyButton
          size="lg"
          className="mt-6 px-4 normal-case tracking-normal text-lg sm:px-8"
          onClick={onBuy}
        >
          Quero cuidar da pele do meu pet
        </BuyButton>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {seals.map((s) => (
            <span
              key={s.label}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
            >
              <s.icon size={14} strokeWidth={1.4} className="shrink-0 text-primary" />
              {s.label}
            </span>
          ))}
        </div>

      </div>

      {!compact && (
        <div className="px-5 sm:px-7">
          <ProductVideoFeedback
            productName={selected.units === 1 ? "Daily Greens" : selected.label}
            currentPrice={grandTotal}
            onBuy={onBuy}
          />
        </div>
      )}
    </div>
  );
}
