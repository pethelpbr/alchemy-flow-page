import { useState } from "react";
import { motion } from "motion/react";
import { ShieldCheck, Truck, RefreshCw, Lock } from "lucide-react";
import { brl, variantTotals, type Variant } from "@/lib/product";
import { ProductSelector } from "@/components/ProductSelector";
import { BuyButton } from "@/components/ui/BuyButton";
import { KitBooster, addonsTotal } from "@/components/KitBooster";
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
}: {
  selected: Variant;
  onSelect: (v: Variant) => void;
  onBuy: () => void;
  compact?: boolean;
}) {
  const { total, oldTotal, savings, discount, installmentValue } = variantTotals(selected);
  const [addonIds, setAddonIds] = useState<string[]>([]);

  const toggleAddon = (id: string) =>
    setAddonIds((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );

  const extra = addonsTotal(addonIds);
  const grandTotal = total + extra;

  return (
    <div
      id="comprar"
      className="scroll-mt-28 rounded-3xl border border-border bg-background/70 p-5 backdrop-blur sm:p-7"
    >
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
        className="mt-6 hidden flex-wrap items-end gap-x-3 gap-y-1 sm:flex"
      >
        <span className="text-base text-muted-foreground line-through">{brl(oldTotal + extra)}</span>
        <span className="font-display text-4xl leading-none text-ink">{brl(grandTotal)}</span>
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-primary">
          {discount}% off
        </span>
      </motion.div>

      <p className="mt-2 hidden text-base text-muted-foreground sm:block">
        ou {selected.installments}x de {brl(grandTotal / selected.installments)} sem juros
      </p>
      <p className="mt-1 hidden text-base text-primary sm:block">
        Você economiza {brl(savings)} nesta oferta.
      </p>

      {extra > 0 && (
        <p className="mt-3 flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3 text-base">
          <span className="text-muted-foreground">Preço total com adicionais</span>
          <span className="font-semibold text-ink">{brl(grandTotal)}</span>
        </p>
      )}

      <div className="mt-6 sm:mt-8">
        <div className="mb-3 flex items-end justify-between sm:hidden">
          <span className="text-base font-medium text-ink">Preço total:</span>
          <span className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground line-through">{brl(oldTotal + extra)}</span>
            <span className="font-display text-3xl leading-none text-ink">{brl(grandTotal)}</span>
          </span>
        </div>
        <BuyButton size="lg" className="w-full sm:w-auto" onClick={onBuy}>
          Comprar agora
        </BuyButton>
      </div>

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

      <p className="mt-4 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
        <ShieldCheck size={13} strokeWidth={1.4} /> Pagamento processado em ambiente criptografado
      </p>

      {!compact && (
        <ProductVideoFeedback
          productName={selected.units === 1 ? "Daily Greens" : selected.label}
          currentPrice={grandTotal}
          oldPrice={oldTotal + extra}
          onBuy={onBuy}
        />
      )}
    </div>
  );
}
