import { useCallback, useEffect, useState } from "react";
import { motion, type MotionValue } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import productHero from "@/assets/product-hero.png.asset.json";
import galleryHand from "@/assets/gallery-hand.jpg";
import galleryFlatlay from "@/assets/gallery-flatlay.jpg";
import gallerySinais from "@/assets/gallery-sinais.png.asset.json";
import galleryDrink from "@/assets/gallery-drink.jpg";

type Shot = { src: string; alt: string; ratio?: number };

const shots: Shot[] = [
  { src: productHero.url, alt: "Pote do suplemento NutraHelp sobre fundo bege" },
  { src: gallerySinais.url, alt: "Cartões com os seis sinais de que a pele do pet não está bem, cachorro deitado ao lado", ratio: 1 },
  { src: galleryHand, alt: "Mão segurando o pote do suplemento" },
  { src: galleryDrink, alt: "Copo com a bebida verde preparada" },
  { src: productHero.url, alt: "Imagem 5 do produto" },
  { src: galleryFlatlay, alt: "Imagem 6 do produto" },
  { src: galleryHand, alt: "Imagem 7 do produto" },
  { src: galleryDrink, alt: "Imagem 8 do produto" },
  { src: productHero.url, alt: "Imagem 9 do produto" },
  { src: galleryFlatlay, alt: "Imagem 10 do produto" },
];

const AUTO_INTERVAL = 5000;

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
    <div className="flex w-full flex-col gap-3 lg:sticky lg:top-[72px]">
      <motion.div
        initial={false}
        animate={{ aspectRatio: current.ratio ?? 6 / 7 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full min-h-0 max-h-[calc(100vh-150px)] overflow-hidden rounded-2xl bg-sand"
      >
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
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between px-3">
          <button
            onClick={prev}
            aria-label="Imagem anterior"
            className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-card/80 text-ink shadow-sm backdrop-blur-sm transition-colors hover:border-primary"
          >
            <ArrowLeft size={16} strokeWidth={1.4} />
          </button>
          <button
            onClick={next}
            aria-label="Próxima imagem"
            className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-card/80 text-ink shadow-sm backdrop-blur-sm transition-colors hover:border-primary"
          >
            <ArrowRight size={16} strokeWidth={1.4} />
          </button>
        </div>
      </motion.div>
      <div className="grid shrink-0 grid-cols-10 gap-1.5">
        {shots.map((s, i) => (
          <button
            key={s.src}
            onClick={() => handleSelect(i)}
            aria-label={`Ver imagem ${i + 1}`}
            className={cn(
              "aspect-square w-full min-w-0 overflow-hidden rounded-xl border transition-all duration-300",
              i === active ? "border-primary/60 opacity-100" : "border-transparent opacity-60",
            )}
          >
            <img
              src={s.src}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
