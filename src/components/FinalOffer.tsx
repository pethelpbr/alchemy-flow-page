import { RefreshCw } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { PricingCard } from "@/components/PricingCard";
import type { Variant } from "@/lib/product";
import productHero from "@/assets/product-hero.jpg";

export function FinalOffer({
  selected,
  onSelect,
  onBuy,
}: {
  selected: Variant;
  onSelect: (v: Variant) => void;
  onBuy: () => void;
}) {
  return (
    <section className="section bg-sand/60">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
        <Reveal className="self-start">
          <img
            src={productHero}
            alt="Pote do suplemento Daily Greens"
            loading="lazy"
            width={1200}
            height={1504}
            className="aspect-4/5 w-full rounded-2xl object-cover"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="eyebrow">Oferta final</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Comece sua nova rotina hoje.
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Quanto maior o kit, menor o valor por pote — e menos vezes você precisa se lembrar de
            repor.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-lg border border-primary/25 px-4 py-2 text-xs uppercase tracking-[0.14em] text-primary">
            <RefreshCw size={13} strokeWidth={1.5} /> 30 dias de garantia total
          </p>

          <div className="mt-8">
            <PricingCard selected={selected} onSelect={onSelect} onBuy={onBuy} compact />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
