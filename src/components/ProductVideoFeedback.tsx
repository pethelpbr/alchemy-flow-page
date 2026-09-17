import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccordionBlock } from "@/components/ui/AccordionBlock";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { BuyButton } from "@/components/ui/BuyButton";
import customer1 from "@/assets/customer-1.jpg";
import customer2 from "@/assets/customer-2.jpg";
import customer3 from "@/assets/customer-3.jpg";

const feedbacks = [
  {
    image: customer1,
    name: "Marina",
    caption: "Virou parte da minha manhã",
    problem: "Coceira noturna",
    duration: "0:47",
    legend: "Coceira noturna · Tutora da Mel",
  },
  {
    image: customer2,
    name: "Rodrigo",
    caption: "Prático para todos os dias",
    problem: "Lambedura na pata",
    duration: "0:38",
    legend: "Lambedura na pata · Tutor do Thor",
  },
  {
    image: customer3,
    name: "Júlia",
    caption: "Leve e fácil de preparar",
    problem: "Queda de pelos",
    duration: "1:02",
    legend: "Queda de pelos · Tutora da Nina",
  },
];

function VideoTags({
  problem,
  duration,
  className,
}: {
  problem: string;
  duration: string;
  className?: string;
}) {
  return (
    <span className={cn("pointer-events-none absolute inset-0", className)}>
      <span className="absolute left-1.5 top-1.5 inline-flex max-w-[calc(100%-0.75rem)] items-center gap-1 rounded-full bg-card py-[3px] pl-1.5 pr-2 text-[7px] font-semibold leading-none text-ink shadow-card md:text-[10px]">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
        <span className="truncate">{problem}</span>
      </span>
      <span className="absolute bottom-1.5 right-1.5 rounded-full bg-ink/85 px-1.5 py-[3px] text-[7px] font-bold leading-none text-primary-foreground tabular-nums md:text-[10px]">
        {duration}
      </span>
    </span>
  );
}

const benefitPoints = [
  "Reduz coceiras e lambeduras excessivas",
  "Ajuda a acelerar a cicatrização de lesões e irritações",
  "Diminui a queda de pelo e contribui para o crescimento de fios mais fortes",
  "Reforça as defesas naturais",
  "Auxilia o equilíbrio da flora intestinal",
];

function BenefitList() {
  return (
    <ul className="space-y-2">
      {benefitPoints.map((text) => (
        <li key={text} className="flex items-start gap-2.5">
          <Check
            size={16}
            strokeWidth={3}
            className="mt-1 shrink-0 text-primary"
            aria-hidden
          />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}

const details = [
  {
    title: "O que é o NutraHelp?",
    content:
      "Um suplemento alimentar em pó para cães e gatos, com 44 nutrientes em uma fórmula 8 em 1. Reúne probióticos, prebióticos, ômega 3, vitaminas, minerais e aminoácidos para apoiar a saúde da pele, da pelagem e do intestino. Sabor carne, misturado na ração uma vez por dia.",
  },
  {
    title: "Para quem é?",
    content:
      "Para pets com coceira frequente, lambedura de patas, pele vermelha ou irritada, falhas na pelagem, queda excessiva de pelo, pelo opaco ou quebradiço, orelhas que incomodam de repetição e sensibilidades de pele. Também para pets em período de troca de pelos. Cães e gatos, todas as raças e portes, a partir de 3 meses.",
  },
  {
    title: "Benefícios",
    content: <BenefitList />,
  },
  {
    title: "Como usar",
    content:
      "Misture na ração ou na comida úmida, uma vez por dia, na dose indicada para o peso do seu pet. Todo dia, inclusive nos dias em que ele parece bem — o resultado vem do uso contínuo.",
  },
];

function Thumbnails({
  className,
  onSelect,
}: {
  className?: string;
  onSelect: (f: (typeof feedbacks)[number]) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({
    active: false,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = trackRef.current;
    if (!el) return;
    drag.current.active = true;
    drag.current.startX = e.clientX;
    drag.current.scrollLeft = el.scrollLeft;
    drag.current.moved = false;
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 6) drag.current.moved = true;
    if (drag.current.moved) {
      e.preventDefault();
      el.scrollLeft = drag.current.scrollLeft - dx;
    }
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    const wasActive = drag.current.active;
    drag.current.active = false;
    if (el?.hasPointerCapture(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }
    if (!el || !wasActive) return;
  };

  return (
    <div
      ref={trackRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={(e) => {
        if (drag.current.moved) {
          e.preventDefault();
          e.stopPropagation();
          drag.current.moved = false;
        }
      }}
      className={cn(
        "-mx-4 flex gap-2.5 overflow-x-auto scroll-smooth px-4 pb-1 [touch-action:pan-x_pan-y] [-webkit-overflow-scrolling:touch] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:overflow-visible md:px-0 md:pb-0",
        className,
      )}
    >
      {feedbacks.map((feedback) => (
        <div key={feedback.name} className="w-[62%] shrink-0 md:w-auto md:shrink">
          <Button
            type="button"
            variant="ghost"
            aria-label={`Assistir ao relato de ${feedback.name}`}
            onClick={() => onSelect(feedback)}
            className="group relative block h-auto w-full overflow-hidden rounded-xl p-0 shadow-none"
          >
            <img
              src={feedback.image}
              alt={`Relato de ${feedback.name}`}
              loading="lazy"
              draggable={false}
              className="aspect-[9/14] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-ink/15 transition-colors group-hover:bg-ink/25" />
            <VideoTags problem={feedback.problem} duration={feedback.duration} />
            <span className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-card/70 bg-card/80 text-primary shadow-card backdrop-blur-sm">
              <Play className="ml-0.5 h-4 w-4 fill-current" />
            </span>
          </Button>
          <p className="mt-1.5 truncate text-xs font-semibold text-ink md:hidden">
            {feedback.legend.split(" ").pop()}
          </p>
        </div>
      ))}
    </div>
  );
}

function IngredientsButton() {
  const scrollToIngredients = () => {
    document.querySelector("#ingredientes")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={scrollToIngredients}
      className="mt-4 h-12 w-full rounded-2xl border-primary/30 bg-card text-base text-ink hover:border-primary hover:bg-primary/5"
    >
      Ver tabela completa e ingredientes
    </Button>
  );
}

export function ProductVideoFeedback({ onBuy }: { onBuy: () => void }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [openDetail, setOpenDetail] = useState<number | null>(0);
  const selectedVideo = selectedIndex === null ? null : feedbacks[selectedIndex];

  const selectFeedback = (feedback: (typeof feedbacks)[number]) => {
    const index = feedbacks.indexOf(feedback);
    setSelectedIndex(index >= 0 ? index : 0);
  };

  const showPrevious = () => {
    setSelectedIndex((current) =>
      current === null ? 0 : (current - 1 + feedbacks.length) % feedbacks.length,
    );
  };

  const showNext = () => {
    setSelectedIndex((current) =>
      current === null ? 0 : (current + 1) % feedbacks.length,
    );
  };

  return (
    <div>
      <div>
        <h3 className="text-base font-semibold text-ink">Relatos de tutores que já passaram por isso</h3>
        <Thumbnails className="mt-4 grid-cols-3" onSelect={selectFeedback} />
        <IngredientsButton />
      </div>

      <div className="mt-7 pt-2">
        <AccordionBlock
          items={details}
          openIndex={openDetail}
          onOpenChange={setOpenDetail}
        />
      </div>

      <Dialog open={selectedVideo !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
        <DialogContent className="max-h-[94dvh] w-[calc(100%_-_1.25rem)] max-w-[420px] gap-0 overflow-hidden rounded-2xl border border-border bg-card p-2.5 shadow-soft sm:rounded-2xl [&>button]:right-5 [&>button]:top-5 [&>button]:z-20 [&>button]:text-ink [&>button]:opacity-100">
          {selectedVideo && (
            <>
              <div className="px-2 pb-3 pt-2">
                <DialogTitle className="pr-10 font-display text-xl font-bold text-ink">
                  Relatos de tutores que já passaram por isso
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Relatos em vídeo de clientes Nutraflow
                </DialogDescription>
                <div className="mt-4 flex gap-2.5">
                  {feedbacks.map((feedback, index) => (
                    <Button
                      key={feedback.name}
                      type="button"
                      variant="ghost"
                      aria-label={`Ver relato de ${feedback.name}`}
                      aria-pressed={selectedIndex === index}
                      onClick={() => setSelectedIndex(index)}
                      className={cn(
                        "h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 p-0 transition-opacity hover:opacity-90",
                        selectedIndex === index ? "border-primary" : "border-transparent",
                      )}
                    >
                      <img
                        src={feedback.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </Button>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-t-xl bg-muted">
                <img
                  src={selectedVideo.image}
                  alt={`Prévia do relato de ${selectedVideo.name}`}
                  className="h-[min(58dvh,570px)] w-full object-cover"
                />
                <span className="absolute inset-0 bg-ink/10" />
                <VideoTags
                  problem={selectedVideo.problem}
                  duration={selectedVideo.duration}
                  className="md:inset-1.5"
                />
                <Button
                  type="button"
                  variant="ghost"
                  aria-label="Relato anterior"
                  onClick={showPrevious}
                  className="absolute left-3 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-card/90 p-0 text-ink shadow-card hover:bg-card"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <span className="pointer-events-none absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink/85 text-primary-foreground shadow-card">
                  <Play className="ml-0.5 h-5 w-5 fill-current" />
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  aria-label="Próximo relato"
                  onClick={showNext}
                  className="absolute right-3 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-card/90 p-0 text-ink shadow-card hover:bg-card"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex items-center gap-3 rounded-b-xl bg-muted px-3 py-3">
                <p className="min-w-0 flex-1 truncate text-sm font-semibold text-ink">
                  {selectedVideo.legend}
                </p>
                <BuyButton
                  size="sm"
                  onClick={onBuy}
                  className="shrink-0 normal-case tracking-normal"
                >
                  Comprar agora
                </BuyButton>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
