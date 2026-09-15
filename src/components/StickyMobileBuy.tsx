import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { brl, variantTotals, type Variant } from "@/lib/product";
import { BuyButton } from "@/components/ui/BuyButton";
import productHero from "@/assets/product-hero.jpg";

export function StickyMobileBuy({
  selected,
  onBuy,
  addonsExtra = 0,
}: {
  selected: Variant;
  onBuy: () => void;
  addonsExtra?: number;
}) {
  const [visible, setVisible] = useState(false);
  const { total } = variantTotals(selected);
  const grandTotal = total + addonsExtra;
  const installmentValue = grandTotal / selected.installments;

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120 }}
          animate={{ y: 0 }}
          exit={{ y: 120 }}
          transition={{ type: "spring", damping: 26, stiffness: 240 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-xl lg:hidden"
        >
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
            <img
              src={productHero}
              alt=""
              loading="lazy"
              className="h-12 w-12 shrink-0 rounded-lg object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-ink">{brl(grandTotal)}</p>
              <p className="truncate text-[11px] text-muted-foreground">
                {selected.installments}x de {brl(installmentValue)}
              </p>
            </div>
            <BuyButton size="sm" onClick={onBuy} className="shrink-0">
              Comprar
            </BuyButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
