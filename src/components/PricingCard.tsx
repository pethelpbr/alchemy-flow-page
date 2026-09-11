import { useState } from "react";
import { motion } from "motion/react";
import { ShieldCheck, Truck, RefreshCw, Lock } from "lucide-react";
import { brl, variantTotals, type Variant } from "@/lib/product";
import { ProductSelector } from "@/components/ProductSelector";
import { BuyButton } from "@/components/ui/BuyButton";
import { KitBooster, addonsTotal } from "@/components/KitBooster";

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

  return (
    <div
      id="comprar"
      className="scroll-mt-28 rounded-3xl border border-border bg-background/70 p-5 backdrop-blur sm:p-7"
    >
      {!compact && (
        <p className="eyebrow mb-4">Escolha seu ritual</p>
      )}

      <ProductSelector selected={selected} onSelect={onSelect} />

      <motion.div
        key={selected.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mt-6 flex flex-wrap items-end gap-x-3 gap-y-1"
      >
        <span className="text-sm text-muted-foreground line-through">{brl(oldTotal)}</span>
        <span className="font-display text-4xl leading-none text-ink">{brl(total)}</span>
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-primary">
          {discount}% off
        </span>
      </motion.div>

      <p className="mt-2 text-sm text-muted-foreground">
        ou {selected.installments}x de {brl(installmentValue)} sem juros
      </p>
      <p className="mt-1 text-sm text-primary">
        Você economiza {brl(savings)} nesta oferta.
      </p>

      <BuyButton size="lg" className="mt-6" onClick={onBuy}>
        Comprar agora
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

      <p className="mt-4 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
        <ShieldCheck size={13} strokeWidth={1.4} /> Pagamento processado em ambiente criptografado
      </p>
    </div>
  );
}
