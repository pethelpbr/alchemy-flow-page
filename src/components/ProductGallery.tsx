import { useCallback, useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import { animate, motion, type MotionValue } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import productHero from "@/assets/product-hero.png.asset.json";
import galleryAntesDepois30 from "@/assets/gallery-antes-depois-30-dias.png.asset.json";
import galleryFormula44 from "@/assets/gallery-formula-44-nutrientes.png.asset.json";
import galleryBeneficios from "@/assets/gallery-beneficios-4.png.asset.json";
import galleryMisturarNova from "@/assets/gallery-misturar-nova.png.asset.json";
import galleryRacaoBase from "@/assets/gallery-racao-base.png.asset.json";
import galleryRacaoNaoSuficiente from "@/assets/gallery-racao-nao-suficiente.png.asset.json";
import galleryResultadosSemanas from "@/assets/gallery-resultados-semanas.png.asset.json";
import galleryRotinaDiaria from "@/assets/gallery-rotina-diaria.png.asset.json";

type Shot = { src: string; alt: string; ratio?: number };

const shots: Shot[] = [
  { src: productHero.url, alt: "Pote do suplemento NutraHelp sobre fundo bege" },
  { src: galleryBeneficios.url, alt: "Só tratar por fora não resolve, com os benefícios: menos coceiras, alergias e queda de pelo, fortalece a imunidade, regula o intestino, mais energia e articulações saudáveis; selo nova embalagem, mesma fórmula; pote do NutraHelp ao lado de um cachorro" },
  { src: galleryMisturarNova.url, alt: "Basta misturar e pronto: na ração ou no alimento, seu pet já começa a receber os benefícios; tabela de dosagem por peso do pet — até 5kg meia dose, 6 a 10kg 1 dose, 11 a 20kg 2 doses, 21 a 30kg 3 doses, mais de 30kg 4 doses; acompanha dosador de 2g; uso diário e seguro, para todas as raças e idades, sabor aprovado pelos exigentes e rende até 150 porções; spitz alemão comendo ração com o suplemento" },
  { src: galleryFormula44.url, alt: "Fórmula completa com 44 nutrientes: colher dosadora com o pó de um lado e alimentos frescos do outro, ligada a ômega 3, biotina e zinco para pele e pelos, pré e probióticos para digestão, triptofano e magnésio para comportamento, vitaminas A, C, D e complexo B para energia e imunidade, e condroitina e cálcio para ossos e articulações" },
  {
    src: galleryRacaoNaoSuficiente.url,
    alt: "A ração não é suficiente: de um lado, nutrição limitada que pode gerar desequilíbrios; do outro, pele e pelos mais saudáveis, equilíbrio intestinal e mais imunidade. Tigelas de ração com e sem o pó, colher dosadora e pote do NutraHelp ao lado de alimentos frescos",
  },
  { src: galleryRacaoBase.url, alt: "A saúde do pet começa no intestino: a médica veterinária Dra. Ialy Andrade, CRMV 5655-PE, recomenda o NutraHelp, com potes do produto na prateleira ao fundo e selo recomendado por veterinários" },
  { src: galleryAntesDepois30.url, alt: "Antes e depois em 30 dias: de um lado, um cachorro caramelo com as orelhas vermelhas e se coçando; do outro, o mesmo cachorro com o pelo brilhante e sem coceira; embaixo, um gato malhado deitado; a marcação de 30 dias com os destaques pele calma, pelo forte e intestino regulado, e o pote do NutraHelp" },
  { src: galleryResultadosSemanas.url, alt: "Resultados em poucas semanas: antes e depois de 50 dias de um cachorro, de um lado a pele irritada, vermelha e sem pelo, do outro a pele calma e o pelo recuperado; abaixo, o depoimento de Camila S., tutora do Bento, de Recife/PE, com cinco estrelas: meu cachorro se coçava 24h, sempre foi muito alérgico, melhorou demais, fiquei até surpresa" },
  { src: productHero.url, alt: "Imagem 9 do produto" },
  { src: galleryRotinaDiaria.url, alt: "Seu pet está assim? seis sinais em cartões numerados: 01 se coça ou se lambe com frequência, 02 está com queda de pelo e pelagem opaca, 03 sofre com alergias e irritações na pele, 04 tem cocô mole e com cheiro forte, 05 fica sem energia pra brincar ou passear, 06 vive estressado ou ansioso; faixa laranja abaixo: se você respondeu sim para algum desses sinais, é hora de agir; um cachorro golden retriever sentado se coçando com a pata traseira" },
];

const visibleShots = shots.slice(0, 10);

const AUTO_INTERVAL = 8000;

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
  const [scrolledLeft, setScrolledLeft] = useState(false);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const mobileGalleryRef = useRef<HTMLDivElement>(null);
  const mobileScrollTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const mobileAnimation = useRef<{ stop: () => void } | undefined>(undefined);
  const mobileDragRef = useRef({ active: false, startX: 0, startScrollLeft: 0 });
  const dragRef = useRef({ active: false, captured: false, startX: 0, startScrollLeft: 0, moved: false });
  const active = activeIndex ?? internal;
  const current = visibleShots[active] ?? visibleShots[0];

  const handleSelect = useCallback(
    (i: number) => {
      if (onSelect) onSelect(i);
      else setInternal(i);
    },
    [onSelect],
  );

  const next = useCallback(() => handleSelect((active + 1) % visibleShots.length), [active, handleSelect]);

  const handleThumbPointerDown = useCallback((e: PointerEvent<HTMLDivElement>) => {
    const el = thumbsRef.current;
    if (!el) return;
    // Capture only once a drag really starts: capturing on press would retarget
    // the click to the strip and the thumbnail buttons would never fire.
    dragRef.current = { active: true, captured: false, startX: e.clientX, startScrollLeft: el.scrollLeft, moved: false };
  }, []);

  const handleThumbPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = thumbsRef.current;
    const drag = dragRef.current;
    if (!el || !drag.active) return;
    const dx = e.clientX - drag.startX;
    if (Math.abs(dx) > 4) {
      drag.moved = true;
      if (!drag.captured) {
        drag.captured = true;
        el.setPointerCapture(e.pointerId);
      }
    }
    if (drag.captured) el.scrollLeft = drag.startScrollLeft - dx;
  }, []);

  const handleThumbPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = thumbsRef.current;
    if (el?.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    dragRef.current.active = false;
  }, []);

  const handleThumbScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrolledLeft(e.currentTarget.scrollLeft > 4);
  }, []);

  const handleThumbClick = useCallback((e: MouseEvent<HTMLButtonElement>, i: number) => {
    if (dragRef.current.moved) {
      e.preventDefault();
      dragRef.current.moved = false;
      return;
    }
    handleSelect(i);
  }, [handleSelect]);
  const prev = useCallback(
    () => handleSelect((active - 1 + visibleShots.length) % visibleShots.length),
    [active, handleSelect],
  );

  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => {
      if (!mobileDragRef.current.active && !mobileAnimation.current) next();
    }, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [autoplay, next]);

  useEffect(() => {
    const strip = thumbsRef.current;
    const thumbnail = strip?.children.item(active);
    if (!strip || !(thumbnail instanceof HTMLElement)) return;

    const stripBounds = strip.getBoundingClientRect();
    const thumbnailBounds = thumbnail.getBoundingClientRect();
    // Keep the selected thumbnail away from the arrows and continuity fade.
    const visibleLeft = stripBounds.left + 28;
    const visibleRight = stripBounds.right - 80;
    if (thumbnailBounds.left >= visibleLeft && thumbnailBounds.right <= visibleRight) return;

    strip.scrollTo({
      left: strip.scrollLeft + thumbnailBounds.left - stripBounds.left - (strip.clientWidth - thumbnailBounds.width) / 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }, [active]);

  const animateMobileTo = useCallback((index: number, duration = 0.85) => {
    const el = mobileGalleryRef.current;
    if (!el || el.clientWidth === 0) return;
    const slide = el.children.item(index);
    const first = el.children.item(0);
    if (!(slide instanceof HTMLElement) || !(first instanceof HTMLElement)) return;
    const targetLeft = slide.offsetLeft - first.offsetLeft;
    mobileAnimation.current?.stop();
    clearTimeout(mobileScrollTimer.current);
    if (Math.abs(el.scrollLeft - targetLeft) < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.scrollTo({ left: targetLeft, behavior: "instant" });
      el.style.scrollSnapType = "";
      handleSelect(index);
      return;
    }
    el.style.scrollSnapType = "none";
    const restoreSnap = () => {
      mobileAnimation.current = undefined;
      el.style.scrollSnapType = "";
    };
    const animation = animate(el.scrollLeft, targetLeft, {
      duration,
      ease: [0.45, 0, 0.2, 1],
      onUpdate: (left) => { el.scrollLeft = left; },
      onComplete: () => {
        restoreSnap();
        handleSelect(index);
      },
    });
    const stop = () => {
      animation.stop();
      restoreSnap();
    };
    mobileAnimation.current = { stop };
  }, [handleSelect]);

  const settleMobileDrag = useCallback(() => {
    const el = mobileGalleryRef.current;
    if (!el || mobileDragRef.current.active || mobileAnimation.current) return;
    const first = el.children.item(0);
    if (!(first instanceof HTMLElement)) return;
    let nearest = 0;
    let distance = Infinity;
    Array.from(el.children).forEach((slide, index) => {
      if (!(slide instanceof HTMLElement)) return;
      const delta = Math.abs(el.scrollLeft - (slide.offsetLeft - first.offsetLeft));
      if (delta < distance) {
        distance = delta;
        nearest = index;
      }
    });
    animateMobileTo(nearest, 0.65);
  }, [animateMobileTo]);

  useEffect(() => {
    if (!mobileDragRef.current.active) animateMobileTo(active);
  }, [active, animateMobileTo]);

  useEffect(() => () => {
    clearTimeout(mobileScrollTimer.current);
    mobileAnimation.current?.stop();
  }, []);

  if (!current) return null;

  return (
    <div className="flex w-full flex-col gap-3">
      <motion.div
        initial={false}
        animate={{ aspectRatio: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto hidden w-full max-w-[720px] overflow-hidden rounded-2xl bg-sand md:block"
        style={{ width: "min(100%, 720px, calc(100svh - 220px))" }}
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
      </motion.div>

      <div className="relative -mx-4 block w-[calc(100%+2rem)] overflow-hidden md:hidden">
        <div
          ref={mobileGalleryRef}
          onScroll={(e) => {
            if (mobileAnimation.current) return;
            const el = e.currentTarget;
            const first = el.children.item(0);
            if (first instanceof HTMLElement && first.offsetWidth > 0) {
              const index = Math.max(
                0,
                Math.min(visibleShots.length - 1, Math.round(el.scrollLeft / first.offsetWidth)),
              );
              if (index !== active) handleSelect(index);
            }
            if (mobileDragRef.current.active) return;
            clearTimeout(mobileScrollTimer.current);
            mobileScrollTimer.current = setTimeout(settleMobileDrag, 120);
          }}
          onTouchStart={(e) => {
            mobileAnimation.current?.stop();
            clearTimeout(mobileScrollTimer.current);
            mobileDragRef.current.active = true;
            e.currentTarget.style.scrollSnapType = "none";
          }}
          onTouchEnd={() => {
            const el = mobileGalleryRef.current;
            const drag = mobileDragRef.current;
            mobileDragRef.current.active = false;
            clearTimeout(mobileScrollTimer.current);

            if (el && active === visibleShots.length - 1 && drag.startScrollLeft - el.scrollLeft > 24) {
              animateMobileTo(0, 0.65);
              return;
            }

            mobileScrollTimer.current = setTimeout(settleMobileDrag, 120);
          }}
          onTouchCancel={() => {
            mobileDragRef.current.active = false;
            settleMobileDrag();
          }}
          onPointerDown={(e) => {
            mobileAnimation.current?.stop();
            if (e.pointerType !== "mouse") return;
            const el = e.currentTarget;
            clearTimeout(mobileScrollTimer.current);
            el.style.scrollSnapType = "none";
            mobileDragRef.current = { active: true, startX: e.clientX, startScrollLeft: el.scrollLeft };
          }}
          onPointerMove={(e) => {
            const el = e.currentTarget;
            if (!mobileDragRef.current.active) return;
            const dx = e.clientX - mobileDragRef.current.startX;
            if (Math.abs(dx) > 4 && !el.hasPointerCapture(e.pointerId)) el.setPointerCapture(e.pointerId);
            if (el.hasPointerCapture(e.pointerId)) el.scrollLeft = mobileDragRef.current.startScrollLeft - dx;
          }}
          onPointerUp={(e) => {
            if (e.pointerType !== "mouse") return;
            const el = e.currentTarget;
            if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
            mobileDragRef.current.active = false;
            settleMobileDrag();
          }}
          onPointerCancel={(e) => {
            if (e.pointerType !== "mouse") return;
            const el = e.currentTarget;
            if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
            mobileDragRef.current.active = false;
            settleMobileDrag();
          }}
          className="flex w-full items-start gap-1 snap-x snap-mandatory overflow-x-auto pr-[10%] touch-auto select-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {visibleShots.map((shot, i) => (
            <div key={`mobile-gallery-${i}-${shot.src}`} className="w-full shrink-0 snap-start">
              <img src={shot.src} alt={shot.alt} width={1200} height={1200} draggable={false} className="block h-auto w-full" />
            </div>
          ))}
        </div>
        <div className="h-1 w-full bg-muted">
          <div
            className="h-full bg-primary transition-[width] duration-300"
            style={{ width: `${((active + 1) / visibleShots.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="relative hidden w-full min-w-0 md:block">
        <button
          onClick={prev}
          aria-label="Imagem anterior"
          className="absolute left-0 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 -translate-x-1/2 place-items-center rounded-full border border-border/60 bg-card/80 text-ink/70 shadow-sm backdrop-blur-md transition-all duration-200 hover:bg-card hover:text-ink"
        >
          <ArrowLeft size={16} strokeWidth={1.4} />
        </button>

        <div
          ref={thumbsRef}
          onScroll={handleThumbScroll}
          onPointerDown={handleThumbPointerDown}
          onPointerMove={handleThumbPointerMove}
          onPointerUp={handleThumbPointerUp}
          onPointerCancel={handleThumbPointerUp}
          className="flex @container w-full min-w-0 shrink-0 cursor-grab gap-2 overflow-x-auto pl-7 pr-20 pb-1 touch-pan-x select-none active:cursor-grabbing"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {visibleShots.map((shot, i) => (
            <button
              key={`gallery-${i}-${shot.src}`}
              onClick={(e) => handleThumbClick(e, i)}
              aria-label={`Ver imagem ${i + 1}`}
              className={cn(
                "aspect-square w-[80px] shrink-0 overflow-hidden rounded-xl border transition-all duration-300",
                i === active ? "border-primary/60 opacity-100" : "border-transparent opacity-60",
              )}
            >
              <img src={shot.src} alt="" loading="lazy" draggable={false} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>

        <div
          className={cn(
            "pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-linear-to-r from-background via-background/80 to-transparent transition-opacity duration-300",
            scrolledLeft ? "opacity-100" : "opacity-0",
          )}
        />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-linear-to-l from-background via-background/80 to-transparent" />

        <button
          onClick={next}
          aria-label="Próxima imagem"
          className="absolute right-0 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 translate-x-1/2 place-items-center rounded-full border border-border/50 bg-card/70 text-ink/60 shadow-sm backdrop-blur-md transition-all duration-200 hover:bg-card/90 hover:text-ink"
        >
          <ArrowRight size={16} strokeWidth={1.4} />
        </button>
      </div>
    </div>
  );
}
