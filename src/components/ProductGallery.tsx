import { useState } from "react";
import { motion, type MotionValue } from "motion/react";
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

export function ProductGallery({
  activeIndex,
  onSelect,
  scale,
}: {
  activeIndex?: number;
  onSelect?: (index: number) => void;
  scale?: MotionValue<number>;
}) {
  const [internal, setInternal] = useState(0);
  const active = activeIndex ?? internal;
  const current = shots[active]!;

  const handleSelect = (i: number) => {
    if (onSelect) onSelect(i);
    else setInternal(i);
  };

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
