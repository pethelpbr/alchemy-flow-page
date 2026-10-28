import { useCallback, useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import { animate, motion, useMotionValue, useTransform, type MotionValue } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import productHero from "@/assets/product-hero.png.asset.json";
import galleryMisturarDosagem from "@/assets/gallery-misturar-dosagem.png.asset.json";
import galleryResultados60Dias from "@/assets/gallery-resultados-60-dias.png.asset.json";
import galleryResultados60DiasV2 from "@/assets/gallery-resultados-60-dias-v2.png.asset.json";
import galleryBeneficios from "@/assets/gallery-so-cuidar-por-fora.png.asset.json";
import galleryRotinaDiaria from "@/assets/gallery-rotina-diaria.png.asset.json";
import galleryFormula44Alimentos from "@/assets/gallery-formula-44-alimentos.png.asset.json";
import gallerySaudeIntestinoVet from "@/assets/gallery-saude-intestino-vet.png.asset.json";
import gallerySaudeIntestinoVetV2 from "@/assets/gallery-saude-intestino-vet-v2.png.asset.json";
import gallery150MilPets from "@/assets/gallery-150-mil-pets-transformados.png.asset.json";
import gallery150MilPetsV2 from "@/assets/gallery-150-mil-pets-transformados-v2.png.asset.json";
import gallerySinaisDiaADia from "@/assets/gallery-sinais-dia-a-dia.png.asset.json";
import galleryDragIcon from "@/assets/gallery-drag-icon.png.asset.json";

type Shot = { src: string; alt: string; ratio?: number };

const shots: Shot[] = [
  { src: productHero.url, alt: "Pote do suplemento NutraHelp sobre fundo bege" },
  { src: galleryBeneficios.url, alt: "Só cuidar por fora não resolve: menos coceiras, alergias e queda de pelo; pele mais saudável e pelo mais forte; intestino equilibrado; mais imunidade, energia e vitalidade; golden retriever filhote ao lado do pote NutraHelp" },
  { src: gallerySinaisDiaADia.url, alt: "Os sinais aparecem no dia a dia quando a pele do seu pet não está bem: seis cartões numerados — 01 a coceira e as lambidas interrompem o sono dele, 02 a pele fica cada vez mais sensível, vermelha e irritada, 03 ele se esfrega nos móveis para aliviar a irritação, 04 a queda de pelo deixa a pelagem espalhada pela casa, 05 ele fica menos disposto para brincar e passear, 06 mesmo depois de tantas tentativas os sinais continuam voltando; faixa laranja abaixo: se você reconheceu algum desses sinais, não ignore o que a pele está mostrando; golden retriever sentado se coçando com a pata traseira" },
  { src: galleryResultados60DiasV2.url, alt: "Resultados em poucas semanas: antes e depois de 60 dias de um cão de pelagem branca e tigrada — de um lado, a pele do peito irritada, vermelha, com falhas de pelo e crostas, marcada ANTES; do outro, a pele calma e o pelo recuperado, marcada 60 DIAS; abaixo, cinco estrelas e o depoimento de Camila S., tutora do Bento, de Recife/PE: meu cachorro se coçava 24h, sempre foi muito alérgico, melhorou demais, fiquei até surpresa" },
  { src: gallerySaudeIntestinoVetV2.url, alt: "A saúde do pet começa no intestino: o médico veterinário Dr. Rivaldo Junior, de jaleco branco, camisa preta e estetoscópio, sorri enquanto segura com a mão o pote do NutraHelp; à esquerda, o texto quando a saúde digestiva está equilibrada, pele, imunidade e organismo respondem melhor, com a assinatura Dr. Rivaldo Junior, Médico Veterinário; consultório com plantas e prateleiras de madeira ao fundo" },
  { src: galleryFormula44Alimentos.url, alt: "Fórmula completa com 44 nutrientes: cartão branco central sobre uma mesa com alimentos naturais — salmão cru, carne, cápsulas de ômega 3, cenoura, laranja, salsa, abóbora, mexilhões, sementes de abóbora e de girassol, amêndoas, couve e espinafre, além de uma colher dosadora com o pó; lista: digestão com pré e probióticos, pele e pelos com ômega 3, biotina e zinco, ossos e articulações com condroitina e cálcio, energia e imunidade com vitaminas A, C, D e complexo B, comportamento com triptofano e magnésio" },
  { src: galleryMisturarDosagem.url, alt: "É só misturar e pronto: na ração ou no alimento, o NutraHelp entra facilmente na rotina do seu pet. Tabela de dosagem — até 5 kg: 1/2 scoop; 6 a 10 kg: 1 scoop; 11 a 20 kg: 2 scoops; 21 a 30 kg: 3 scoops; mais de 30 kg: 4 scoops; etiqueta acompanha dosadora de 2g; destaques para cães e gatos a partir de 3 meses, sabor de carne mais fácil de aceitar e até 150 porções que rendem por mais tempo. À direita, uma mão dosadora despeja o pó bege sobre a ração em um comedouro bege" },
  { src: gallery150MilPetsV2.url, alt: "Mais de 150 mil pets transformados: antes e depois lado a lado do pelo de um cachorro — de um lado, a pelagem rala e opaca, com falhas e a pele clara aparente entre as dobras, marcada ANTES; do outro, o pelo denso, brilhante e uniforme em tom caramelo, marcado 60 DIAS; abaixo, cinco estrelas e o depoimento de Thiago M., tutor do Amendoim, de São Paulo/SP: o pelo parou de cair e voltou a ficar bonito, todas as falhas que ele tinha foram fechando" },
  { src: productHero.url, alt: "Imagem 9 do produto" },
  { src: galleryRotinaDiaria.url, alt: "Seu pet está assim? seis sinais em cartões numerados: 01 se coça ou se lambe com frequência, 02 está com queda de pelo e pelagem opaca, 03 sofre com alergias e irritações na pele, 04 tem cocô mole e com cheiro forte, 05 fica sem energia pra brincar ou passear, 06 vive estressado ou ansioso; faixa laranja abaixo: se você respondeu sim para algum desses sinais, é hora de agir; um cachorro golden retriever sentado se coçando com a pata traseira" },
];

const visibleShots = shots.slice(0, 10);

const AUTO_INTERVAL = 10000;

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
  const mobileUserScrollRef = useRef(false);
  const mobileAutoScrollRef = useRef(false);
  const mobileTouchStartRef = useRef({ x: 0, scrollLeft: 0 });
  const dragRef = useRef({ active: false, captured: false, startX: 0, startScrollLeft: 0, moved: false });
  const active = activeIndex ?? internal;
  const current = visibleShots[active] ?? visibleShots[0];
  const mobileProgress = useMotionValue(((active + 1) / visibleShots.length) * 100);
  const mobileProgressWidth = useTransform(mobileProgress, (value) => `${value}%`);

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
      if (mobileDragRef.current.active || mobileUserScrollRef.current || mobileAutoScrollRef.current) return;

      const el = mobileGalleryRef.current;
      if (!el) {
        next();
        return;
      }

      const nextIndex = (active + 1) % visibleShots.length;
      const slide = el.children.item(nextIndex);
      if (!(slide instanceof HTMLElement)) return;

      mobileAutoScrollRef.current = true;
      el.scrollTo({
        left: slide.offsetLeft,
        behavior: "smooth",
      });

      window.setTimeout(() => {
        mobileAutoScrollRef.current = false;
        handleSelect(nextIndex);
      }, 700);
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

  useEffect(() => {
    const el = mobileGalleryRef.current;
    if (!el || mobileUserScrollRef.current || mobileAutoScrollRef.current) return;

    const slide = el.children.item(active);
    if (!(slide instanceof HTMLElement)) return;

    const targetLeft = slide.offsetLeft;
    if (Math.abs(el.scrollLeft - targetLeft) < 2) return;

    el.scrollTo({
      left: targetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, [active]);


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
            const el = e.currentTarget;
            const first = el.children.item(0);
            if (!(first instanceof HTMLElement) || first.offsetWidth === 0) return;

            const second = el.children.item(1);
            const step = second instanceof HTMLElement ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
            const position = Math.max(0, Math.min(visibleShots.length - 1, el.scrollLeft / step));
            mobileProgress.set(((position + 1) / visibleShots.length) * 100);

            const index = Math.max(
              0,
              Math.min(visibleShots.length - 1, Math.round(el.scrollLeft / first.offsetWidth)),
            );

            if (index !== active && !mobileAutoScrollRef.current) handleSelect(index);
          }}
          onTouchStart={(e) => {
            mobileUserScrollRef.current = true;
            mobileTouchStartRef.current = {
              x: e.touches[0]?.clientX ?? 0,
              scrollLeft: e.currentTarget.scrollLeft,
            };
          }}
          onTouchEnd={(e) => {
            const el = e.currentTarget;
            const start = mobileTouchStartRef.current;
            const dx = (e.changedTouches[0]?.clientX ?? start.x) - start.x;
            const first = el.children.item(0);

            mobileUserScrollRef.current = false;

            if (
              first instanceof HTMLElement &&
              active === visibleShots.length - 1 &&
              start.scrollLeft >= el.scrollWidth - el.clientWidth - 4 &&
              dx < -36
            ) {
              mobileAutoScrollRef.current = true;
              el.scrollTo({ left: 0, behavior: "smooth" });
              window.setTimeout(() => {
                mobileAutoScrollRef.current = false;
                handleSelect(0);
              }, 700);
            }
          }}
          onTouchCancel={() => {
            mobileUserScrollRef.current = false;
          }}
          onPointerDown={(e) => {
            if (e.pointerType === "mouse") {
              mobileUserScrollRef.current = true;
            }
          }}
          onPointerUp={(e) => {
            if (e.pointerType === "mouse") {
              mobileUserScrollRef.current = false;
            }
          }}
          onPointerCancel={(e) => {
            if (e.pointerType === "mouse") {
              mobileUserScrollRef.current = false;
            }
          }}
          className="flex w-full items-start gap-1 snap-x snap-mandatory overflow-x-auto overscroll-x-contain pr-[10%] select-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", touchAction: "pan-x pan-y" }}
        >
          {visibleShots.map((shot, i) => (
            <div key={`mobile-gallery-${i}-${shot.src}`} className="relative w-full shrink-0 snap-start">
              <img src={shot.src} alt={shot.alt} width={1200} height={1200} draggable={false} className="block h-auto w-full" />
              {i === 0 && (
                <div className="pointer-events-none absolute right-2 top-[3%] z-10 grid h-[48px] w-[48px] place-items-center rounded-full bg-card">
                  <img
                    src={galleryDragIcon.url}
                  alt=""
                    aria-hidden="true"
                    className="h-[34px] w-[34px]"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="h-1 w-full bg-muted">
          <motion.div
            className="h-full bg-primary"
            style={{ width: mobileProgressWidth }}
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
