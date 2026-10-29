import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { brl, variantTotals, type Variant } from "@/lib/product";
import { BuyButton } from "@/components/ui/BuyButton";
import productHero from "@/assets/product-hero.png.asset.json";
import kitTwoPots from "@/assets/sticky-kit-2-potes.png.asset.json";
import kitThreePots from "@/assets/sticky-kit-3-potes.png.asset.json";

// A tarja encosta no fundo físico da tela; o respiro do texto vem do próprio
// fundo da faixa (bege ou branco), nunca de uma faixa vazia embaixo dela.
const SAFE_BOTTOM = "env(safe-area-inset-bottom, 0px)";
const STRIP_BOTTOM = `max(0.25rem, calc(${SAFE_BOTTOM} - 0.625rem))`;

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
  const { total, installmentValue } = variantTotals(selected);
  // No layout do 1 pote, o preço da tarja inclui o frete, como no card de compra.
  const grandTotal =
    total + addonsExtra + (selected.id === "1-un" ? (selected.shipping ?? 0) : 0);
  const singlePot = selected.id === "1-un";
  const twoPots = selected.id === "2-un";
  const withGift = selected.id === "3-un-brinde";
  const cardBar = singlePot || twoPots || withGift;
  const barLabel = withGift ? `${selected.label} + brinde` : selected.label;

  // Distância entre o fundo do layout e o fundo realmente visível (barra do Safari no iPhone).
  const [bottomOffset, setBottomOffset] = useState(0);

  useEffect(() => {
    const vv = window.visualViewport;
    const onScroll = () => {
      const anchor = document.getElementById("duvidas-compra");
      setVisible(anchor ? anchor.getBoundingClientRect().bottom < window.innerHeight : false);
      if (vv) {
        setBottomOffset(Math.max(0, Math.round(window.innerHeight - (vv.height + vv.offsetTop))));
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    vv?.addEventListener("resize", onScroll);
    vv?.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      vv?.removeEventListener("resize", onScroll);
      vv?.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120 }}
          animate={{ y: 0 }}
          exit={{ y: 120 }}
          transition={{ type: "spring", damping: 26, stiffness: 240 }}
          style={{ bottom: bottomOffset, willChange: "transform" }}
          className={
            cardBar
              ? "fixed inset-x-0 bottom-0 z-40 lg:hidden"
              : "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-xl lg:hidden"
          }
        >
          {cardBar ? (
            <div
              className="border-t border-border bg-background"
              style={
                twoPots || withGift
                  ? undefined
                  : { paddingBottom: `max(0.5rem, ${SAFE_BOTTOM})` }
              }
            >
              <div className="overflow-hidden">
                <div className="flex items-center gap-3 px-3 py-2.5">
                  <img
                    src={
                      withGift
                        ? kitThreePots.url
                        : twoPots
                          ? kitTwoPots.url
                          : productHero.url
                    }
                    alt=""
                    loading="lazy"
                    className="h-11 w-11 shrink-0 rounded-xl bg-muted object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-ink">
                      {barLabel}
                    </p>
                    <p className="flex min-w-0 items-baseline gap-1.5">
                      <span className="whitespace-nowrap text-lg font-bold leading-none text-ink">
                        {brl(grandTotal)}
                      </span>
                      <span className="whitespace-nowrap text-[11px] text-muted-foreground">
                        {withGift ? "· " : ""}
                        {selected.installments}x {brl(installmentValue)}
                      </span>
                    </p>
                  </div>
                  <BuyButton
                    size="sm"
                    onClick={onBuy}
                    className="shrink-0 rounded-full px-5"
                  >
                    Comprar
                  </BuyButton>
                </div>
                {withGift && (
                  <p
                    className="bg-sand px-3 py-1.5 text-center text-[13px] font-bold text-ink"
                    style={{ paddingBottom: STRIP_BOTTOM }}
                  >
                    Frete grátis · Garantia de 60 dias · Compra segura
                  </p>
                )}
                {twoPots && (
                  <p
                    className="bg-sand px-3 py-1.5 text-center text-[13px] font-bold text-ink"
                    style={{ paddingBottom: STRIP_BOTTOM }}
                  >
                    Frete grátis · Compra segura
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div
              className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3"
              style={{ paddingBottom: `max(0.75rem, calc(0.75rem + ${SAFE_BOTTOM}))` }}
            >
              <img
                src={productHero.url}
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
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
