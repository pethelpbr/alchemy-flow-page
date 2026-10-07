import { useCallback, useEffect, useState } from "react";
import { motion, type MotionValue } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import productHero from "@/assets/product-hero.png.asset.json";
import galleryHand from "@/assets/gallery-hand.jpg";
import galleryFlatlay from "@/assets/gallery-flatlay.jpg";
import gallerySinais from "@/assets/gallery-sinais.png.asset.json";
import galleryBeneficios from "@/assets/gallery-beneficios-3.png.asset.json";
import galleryDrink from "@/assets/gallery-drink.jpg";
import galleryMisturar from "@/assets/gallery-misturar.png.asset.json";
import galleryRacao2 from "@/assets/gallery-racao-2.png.asset.json";

type Shot = { src: string; alt: string; ratio?: number };

const shots: Shot[] = [
  { src: productHero.url, alt: "Pote do suplemento NutraHelp sobre fundo bege" },
  { src: galleryBeneficios.url, alt: "Só cuidar por fora não resolve, com os benefícios: menos coceiras, alergias e queda de pelo, pele mais saudável e pelo mais forte, intestino equilibrado e bem cuidado, mais imunidade, energia e vitalidade, pote do NutraHelp ao lado de um cachorro" },
  { src: galleryMisturar.url, alt: "É só misturar e pronto: tabela de dosagem por peso do pet, badge acompanhada dosador de 2 g, cachorro comendo ração com o suplemento e os destaques uso diário, para cães e gatos a partir de 3 meses, sabor de carne e até 150 porções" },
  { src: gallerySinais.url, alt: "Seis sinais de que a pele do pet não está bem listados em cartões numerados, cachorro se coçando ao lado" },
  {
    src: galleryMisturar.url,
    alt: "É só misturar e pronto: tabela de dosagem por peso do pet — até 5 kg meia dose, 6 a 10 kg 1 dose, 11 a 20 kg 2 doses, 21 a 30 kg 3 doses, mais de 30 kg 4 doses — badge acompanhada dosador de 2 g, cachorro comendo ração com o suplemento e os destaques uso diário, para cães e gatos a partir de 3 meses, sabor de carne e até 150 porções",
  },
  { src: galleryRacao2.url, alt: "A ração é a base, mas não é suficiente: comparativo entre só a ração, com nutrição limitada e lacunas nutricionais, e ração mais NutraHelp, com 44 nutrientes, pele, pelos e intestino, imunidade, energia e articulações; tigelas de ração com e sem o pó, colher dosadora e pote do produto" },
  { src: galleryHand, alt: "Imagem 7 do produto" },
  { src: galleryDrink, alt: "Imagem 8 do produto" },
  { src: productHero.url, alt: "Imagem 9 do produto" },
  { src: galleryFlatlay, alt: "Imagem 10 do produto" },
];

const visibleShots = shots.slice(0, 10);

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
  const current = visibleShots[active]!;

  const handleSelect = useCallback(
    (i: number) => {
      if (onSelect) onSelect(i);
      else setInternal(i);
    },
    [onSelect],
  );

  const next = useCallback(() => handleSelect((active + 1) % visibleShots.length), [active, handleSelect]);
  const prev = useCallback(
    () => handleSelect((active - 1 + visibleShots.length) % visibleShots.length),
    [active, handleSelect],
  );

  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [autoplay, next]);

  return (
    <div className="flex w-full flex-col gap-3">
      <motion.div
        initial={false}
        animate={{ aspectRatio: current.ratio ?? 6 / 7 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full min-h-0 overflow-hidden rounded-2xl bg-sand"
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
          className="h-full w-full object-contain"
        />
        <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between px-3">
          <button
            onClick={prev}
            aria-label="Imagem anterior"
            className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-card/60 text-ink/60 shadow-sm backdrop-blur-sm opacity-80 transition-all duration-200 hover:opacity-100 hover:bg-card/90 hover:text-ink hover:border-primary"
          >
            <ArrowLeft size={16} strokeWidth={1.4} />
          </button>
          <button
            onClick={next}
            aria-label="Próxima imagem"
            className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-card/60 text-ink/60 shadow-sm backdrop-blur-sm opacity-80 transition-all duration-200 hover:opacity-100 hover:bg-card/90 hover:text-ink hover:border-primary"
          >
            <ArrowRight size={16} strokeWidth={1.4} />
          </button>
        </div>
      </motion.div>

      <div className="grid shrink-0 grid-cols-10 gap-1.5">
        {visibleShots.map((shot, i) => (
          <button
            key={`gallery-${i}-${shot.src}`}
            onClick={() => handleSelect(i)}
            aria-label={`Ver imagem ${i + 1}`}
            className={cn(
              "aspect-square w-full min-w-0 overflow-hidden rounded-xl border transition-all duration-300",
              i === active ? "border-primary/60 opacity-100" : "border-transparent opacity-60",
            )}
          >
            <img src={shot.src} alt="" loading="lazy" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
