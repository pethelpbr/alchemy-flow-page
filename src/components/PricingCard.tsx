import { motion } from "motion/react";
import { RefreshCw, Lock } from "lucide-react";
import { brl, variantTotals, addonsTotal, type Variant } from "@/lib/product";
import { ProductSelector } from "@/components/ProductSelector";
import { BuyButton } from "@/components/ui/BuyButton";
import { KitBooster } from "@/components/KitBooster";
import { ProductVideoFeedback } from "@/components/ProductVideoFeedback";

const seals = [
  { icon: Lock, label: "Compra segura" },
  { icon: RefreshCw, label: "Garantia de 60 dias" },
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
  const grandTotal = total + (selected.shipping ?? 0) + extra;
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
          className="mt-7 flex items-end justify-between gap-4 border-t border-border pt-6"
        >
          <span>
            <span className="block text-sm text-muted-foreground">Total do pedido</span>
            <span className="font-display text-3xl leading-none text-ink">{brl(grandTotal)}</span>
          </span>
          <BuyButton
            size="md"
            className="shrink-0 px-7 normal-case tracking-normal sm:px-10 sm:text-base"
            onClick={onBuy}
          >
            Continuar
          </BuyButton>
        </motion.div>

        {extra > 0 && (
          <p className="mt-3 flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-base">
            <span className="text-muted-foreground">Preço total com adicionais</span>
            <span className="font-semibold text-ink">{brl(grandTotal)}</span>
          </p>
        )}

        <div className="mt-5 flex flex-nowrap items-center justify-center gap-x-3 sm:gap-x-6">
          {seals.map((s) => (
            <span
              key={s.label}
              className="inline-flex min-w-0 items-center gap-1 whitespace-nowrap text-[9px] uppercase tracking-[0.06em] text-muted-foreground sm:gap-2 sm:text-[11px] sm:tracking-[0.12em]"
            >
              <s.icon size={14} strokeWidth={1.4} className="size-3 shrink-0 text-primary sm:size-[14px]" />
              {s.label}
            </span>
          ))}
        </div>

      </div>

      {!compact && (
        <div className="px-5 sm:px-7">
          <ProductVideoFeedback onBuy={onBuy} />
        </div>
      )}
    </div>
  );
}
