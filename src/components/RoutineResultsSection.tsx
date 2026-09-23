import { Fragment, useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { MarqueeStrip } from "@/components/MarqueeStrip";
import beforePhoto from "@/assets/cachorro-ruim.png.asset.json";
import afterPhoto from "@/assets/cachorro-top.png.asset.json";

const timeline = [
  {
    badge: "Primeiras semanas",
    label: "O alívio começa",
    text: "Ele se coça e se lambe menos, e as orelhas ficam menos irritadas. São os primeiros sinais de que o organismo está se equilibrando.",
  },
  {
    badge: "Depois do 1º mês",
    label: "A pele se acalma",
    text: "A vermelhidão da pele diminui, as feridas começam a cicatrizar e o cheiro forte do corpo vai sumindo.",
  },
  {
    badge: "Entre o 2º e o 3º mês",
    label: "Menos queda de pelo",
    text: "Sem tufos espalhados pela casa. Pelos novos crescendo e preenchendo as falhas. Os sinais de alergia se tornam raros.",
  },
  {
    badge: "A partir do 4º mês",
    label: "Pelagem saudável de novo",
    text: "A pele está cicatrizada. O pelo forte, macio e brilhoso. Agora é só manter o uso contínuo — para evitar que as crises voltem.",
  },
];

type Step = (typeof timeline)[number];

function StepItem({ item }: { item: Step }) {
  return (
    <li className="relative pb-12 last:pb-0 sm:pb-14">
      <span className="absolute top-1 left-[calc(-2rem+0.375rem)] h-3 w-3 rounded-full bg-primary sm:left-[calc(-2.5rem+0.375rem)]" />
      <span className="eyebrow inline-block rounded-lg bg-primary/12 px-3 py-1 text-primary">
        {item.badge}
      </span>
      <p className="mt-3 text-xl leading-snug font-medium text-ink sm:text-2xl">
        {item.label}
      </p>
      <p className="mt-1 max-w-md text-base leading-relaxed text-muted-foreground sm:text-base">
        {item.text}
      </p>
    </li>
  );
}

function Images() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    active: boolean;
    pointerType: string;
  } | null>(null);

  const updateFromClientX = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const isMouse = event.pointerType === "mouse";
    if (isMouse) {
      event.preventDefault();
    }
    dragRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      active: isMouse,
      pointerType: event.pointerType,
    };

    if (isMouse) {
      event.currentTarget.setPointerCapture(event.pointerId);
      updateFromClientX(event.clientX);
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    if (drag.pointerType === "mouse") {
      updateFromClientX(event.clientX);
      return;
    }
    if (!drag.active) {
      const dx = event.clientX - drag.startX;
      const dy = event.clientY - drag.startY;
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      if (Math.abs(dy) > Math.abs(dx)) {
        dragRef.current = null;
        return;
      }
      drag.active = true;
    }
    updateFromClientX(event.clientX);
  };

  const endDrag = () => {
    if (dragRef.current && dragRef.current.pointerType !== "mouse" && !dragRef.current.active) {
      // simples toque: posiciona onde tocou
      updateFromClientX(dragRef.current.startX);
    }
    dragRef.current = null;
  };

  return (
    <div className="compare-shell relative mx-auto">
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="relative aspect-[4/5] cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-2xl bg-muted shadow-soft"
      >
        <img
          src={afterPhoto.url}
          alt="Pet depois do uso contínuo do NutraHelp"
          loading="lazy"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <img
          src={beforePhoto.url}
          alt="Pet antes de usar o NutraHelp"
          loading="lazy"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        />

        <div
          aria-hidden={position <= 0}
          className="pointer-events-none absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <span className="eyebrow absolute top-4 left-4 rounded-md bg-card/85 px-2.5 py-1 text-ink shadow-card">
            Antes
          </span>
        </div>
        <div
          aria-hidden={position >= 100}
          className="pointer-events-none absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        >
          <span className="eyebrow absolute top-4 right-4 rounded-md bg-card/85 px-2.5 py-1 text-ink shadow-card">
            Depois
          </span>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-card shadow-card"
          style={{ left: `${position}%` }}
        >
          <span className="absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-card bg-primary text-primary-foreground shadow-soft">
            <ChevronsLeftRight className="h-5 w-5" aria-hidden="true" />
          </span>
        </div>

        <div className="absolute right-4 bottom-4 z-20 w-32 opacity-100 sm:w-40">
          <input
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={(event) => setPosition(Number(event.target.value))}
            aria-label="Comparar imagens antes e depois"
            className="h-1.5 w-full cursor-ew-resize appearance-none rounded-full bg-card/70 accent-primary"
          />
        </div>
      </div>
    </div>
  );
}

export function RoutineResultsSection() {
  return (
    <>
      <section className="bg-card py-10 md:py-12">
        <div className="container-x grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow text-primary">O que esperar</p>
            <h2 className="mx-auto mt-4 max-w-lg text-center font-display text-4xl leading-tight text-ink sm:text-5xl md:mx-0 md:text-left">
              Em quanto tempo vou ver os resultados?
            </h2>

            <ol className="relative mt-10 ml-2 border-l border-dotted border-primary/60 py-1 pl-8 sm:mt-12 sm:pl-10">
              {timeline.map((item, index) => (
                <Fragment key={item.label}>
                  <StepItem item={item} />
                  {index === 2 && (
                    <li className="mb-12 -ml-8 lg:hidden">
                      <Images />
                    </li>
                  )}
                </Fragment>
              ))}
            </ol>
          </div>

          <div className="hidden lg:sticky lg:top-28 lg:block">
            <Images />
          </div>
        </div>
      </section>
      <MarqueeStrip />
    </>
  );
}
