import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyMobileBuy } from "@/components/StickyMobileBuy";
import type { useCart } from "@/lib/use-cart";
import { scrollToOffer } from "@/lib/scroll-to-offer";

type Cart = ReturnType<typeof useCart>;

/** Base compartilhada das landing pages por dor (/pele, /mobilidade, /intestino...). */
export function LandingLayout({ cart, children, className }: { cart: Cart; children: ReactNode; className?: string }) {
  const goToOffer = () => scrollToOffer();
  return (
    <div className={`min-h-screen bg-background text-foreground ${className ?? ""}`}>
      <Header onBuy={goToOffer} />
      <main>{children}</main>
      <Footer />
      <StickyMobileBuy selected={cart.selected} onBuy={goToOffer} addonsExtra={cart.addonsExtra} />
    </div>
  );
}
