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
}: {
  selected: Variant;
  onSelect: (v: Variant) => void;
  onBuy: () => void;
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
      className="relative overflow-x-clip pt-28 pb-16 md:pt-36 md:pb-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] bg-linear-to-b from-sand to-transparent"
      />
      <div className="container-x relative grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
        <motion.div
          className="self-start lg:sticky lg:top-28"
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
          <p className="eyebrow">Fórmula diária · 30 doses</p>
          <h1 className="mt-4 font-display text-[40px] leading-[1.05] text-ink sm:text-[40px]">
            PataHelp - Hidratação,Cicatrização e Proteção 100% Natural
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Uma fórmula premium desenvolvida para acompanhar sua rotina e entregar praticidade —
            uma dose, um copo de água, trinta segundos.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Stars />
            <span className="text-base text-muted-foreground">
              4,9 · mais de 12.000 clientes satisfeitos
            </span>
          </div>

          <div className="mt-8">
            <PricingCard selected={selected} onSelect={onSelect} onBuy={onBuy} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
