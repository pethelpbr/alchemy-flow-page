import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Variant } from "@/lib/product";
import { ProductGallery } from "@/components/ProductGallery";
import { PricingCard } from "@/components/PricingCard";
import { Stars } from "@/components/ui/Stars";

export function HeroSection({
  selected,
  onSelect,
  onBuy,
  addonIds,
  onToggleAddon,
}: {
  selected: Variant;
  onSelect: (v: Variant) => void;
  onBuy: () => void;
  addonIds: string[];
  onToggleAddon: (id: string) => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.07]);

  return (
    <section
      ref={sectionRef}
      id="topo"
      className="relative overflow-x-clip pt-20 pb-14 md:pt-24 md:pb-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] bg-linear-to-b from-sand to-transparent"
      />
      <div className="container-x relative grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
        <motion.div
          className="self-start lg:sticky lg:top-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <ProductGallery autoplay={!reduced} scale={reduced ? undefined : scale} />
        </motion.div>

        <motion.div
          className="lg:pb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">cães e gatos · Suplemento 8 em 1 · 44 nutrientes</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
            <h1 className="inline-block font-display text-[30px] leading-[1.05] text-ink sm:text-[40px]">
              NutraHelp — para o pet que se coça, lambe a pata e está perdendo pelo
            </h1>
            <div className="inline-flex shrink-0 items-center gap-2">
              <Stars size={16} />
              <span className="text-sm text-muted-foreground">4,8 | +743 avaliações</span>
            </div>
          </div>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            A coceira que vai e volta tem dois pontos de origem: o desequilíbrio da flora intestinal
            e a barreira da pele enfraquecida. O NutraHelp cuida dos dois na mesma dose —
            probióticos e prebióticos por dentro, ômega 3, zinco e biotina para a pele e o pelo.
            Sabor carne, misturado na ração, uma vez por dia.
          </p>

          <div className="mt-8">
            <PricingCard
              selected={selected}
              onSelect={onSelect}
              onBuy={onBuy}
              addonIds={addonIds}
              onToggleAddon={onToggleAddon}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
