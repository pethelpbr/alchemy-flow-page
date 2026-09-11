import { useCallback, useEffect, useState } from "react";
import { motion, type MotionValue } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import productHero from "@/assets/product-hero.jpg";
import galleryHand from "@/assets/gallery-hand.jpg";
import galleryFlatlay from "@/assets/gallery-flatlay.jpg";
import galleryDrink from "@/assets/gallery-drink.jpg";

const shots = [
  { src: productHero, alt: "Pote do suplemento Daily Greens sobre fundo bege" },
  { src: galleryFlatlay, alt: "Pote, dosador dourado e copo de água sobre travertino" },
  { src: galleryHand, alt: "Mão segurando o pote do suplemento" },
  { src: galleryDrink, alt: "Copo com a bebida verde preparada" },
];

const AUTO_INTERVAL = 7000;

export function ProductGallery({
  activeIndex,
  onSelect,
  scale,
  autoplay = true,
}: {
  activeIndex?: number | undefined;
  onSelect?: ((index: number) => void) | undefined;
  scale?: MotionValue<number> | undefined;
  autoplay?: boolean;
}) {
  const [internal, setInternal] = useState(0);
  const active = activeIndex ?? internal;
  const current = shots[active]!;

  const handleSelect = useCallback(
    (i: number) => {
      if (onSelect) onSelect(i);
      else setInternal(i);
    },
    [onSelect],
  );

  const next = useCallback(() => handleSelect((active + 1) % shots.length), [active, handleSelect]);
  const prev = useCallback(
    () => handleSelect((active - 1 + shots.length) % shots.length),
    [active, handleSelect],
  );

  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [autoplay, next, active]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative overflow-hidden rounded-3xl bg-sand">
        <motion.img
          key={active}
          src={current.src}
          alt={current.alt}
          width={1200}
          height={1400}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ ...(scale ? { scale } : {}) }}
          className="aspect-[4/5] w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between px-3">
          <button
            onClick={prev}
            aria-label="Imagem anterior"
            className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-card/80 text-ink shadow-sm backdrop-blur-sm transition-colors hover:bg-card"
          >
            <ArrowLeft size={16} strokeWidth={1.4} />
          </button>
          <button
            onClick={next}
            aria-label="Próxima imagem"
            className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-card/80 text-ink shadow-sm backdrop-blur-sm transition-colors hover:bg-card"
          >
            <ArrowRight size={16} strokeWidth={1.4} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {shots.map((s, i) => (
          <button
            key={s.src}
            onClick={() => handleSelect(i)}
            aria-label={`Ver imagem ${i + 1}`}
            className={cn(
              "overflow-hidden rounded-2xl border transition-all duration-300",
              i === active ? "border-primary/60 opacity-100" : "border-transparent opacity-60",
            )}
          >
            <img
              src={s.src}
              alt=""
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
