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

export const feedbacks = [
  {
    image: customer1,
    name: "Marina",
    caption: "Virou parte da minha manhã",
    problem: "Coceira noturna",
    duration: "0:47",
  },
  {
    image: customer2,
    name: "Rodrigo",
    caption: "Prático para todos os dias",
    problem: "Lambedura na pata",
    duration: "0:38",
  },
  {
    image: customer3,
    name: "Júlia",
    caption: "Leve e fácil de preparar",
    problem: "Queda de pelos",
    duration: "1:02",
  },
];

export function VideoTags({
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
      <span className="absolute left-1.5 top-1.5 inline-flex max-w-[calc(100%-0.75rem)] items-center gap-1.5 rounded-full bg-card py-1.5 pl-2 pr-2.5 text-[10px] font-semibold leading-none text-ink shadow-card md:text-[13px]">
        <span className="h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden />
        <span className="truncate">{problem}</span>
      </span>
      <span className="absolute bottom-1.5 right-1.5 rounded-full bg-ink/85 px-2 py-1.5 text-[10px] font-bold leading-none text-primary-foreground tabular-nums md:text-[13px]">
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
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (!drag.current.moved && Math.abs(dx) > 6) {
      drag.current.moved = true;
      // Só captura o ponteiro quando vira arrasto de verdade,
      // para não "engolir" o clique simples que abre o vídeo.
      el.setPointerCapture(e.pointerId);
    }
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
              className="aspect-[9/14] w-full object-cover"
            />
            <span className="absolute inset-0 rounded-xl border border-transparent bg-ink/15 transition-colors group-hover:border-primary" />
            <VideoTags problem={feedback.problem} duration={feedback.duration} />
            <span className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-card/70 bg-card/80 text-primary shadow-card backdrop-blur-sm">
              <Play className="ml-0.5 h-4 w-4 fill-current" />
            </span>
          </Button>
        </div>
      ))}
    </div>
  );
}

const guaranteeLevels: [string, string][] = [
  ["Cromo (mín.)", "10,0000 mg/kg"],
  ["Iodo (mín.)", "62,0000 mg/kg"],
  ["Magnésio (mín.)", "41,9000 g/kg"],
  ["Cobalto (mín.)", "200,0000 mg/kg"],
  ["Zinco (mín.)", "700,0000 mg/kg"],
  ["Ferro (mín.)", "600,0000 mg/kg"],
  ["Manganês (mín.)", "520,0000 mg/kg"],
  ["Selênio (mín.)", "135,0000 mg/kg"],
  ["Cálcio (mín./máx.)", "186,0000 / 207,0000 g/kg"],
  ["Enxofre (mín.)", "9.900,0000 mg/kg"],
  ["Fósforo (mín.)", "1.850,0000 mg/kg"],
  ["Ômega 3 (mín.)", "750,0000 mg/kg"],
  ["Extrato de Yucca (mín.)", "2.000,0000 mg/kg"],
  ["Sulfato de Condroitina (mín.)", "4.900,0000 mg/kg"],
  ["Taurina (mín.)", "10,8000 g/kg"],
  ["Cobre (mín.)", "500,0000 mg/kg"],
  ["L-Treonina (mín.)", "98,5000 mg/kg"],
  ["L-Glutamina (mín.)", "20,0000 mg/kg"],
  ["L-Ácido Glutâmico (mín.)", "20,0000 mg/kg"],
  ["Flúor (máx.)", "18,5000 mg/kg"],
  ["Vitamina A (mín.)", "100.000,0000 UI/kg"],
  ["Vitamina B1 (mín.)", "980,0000 mg/kg"],
  ["Vitamina B2 (mín.)", "800,0000 mg/kg"],
  ["Vitamina B3 (mín.)", "990,0000 mg/kg"],
  ["Vitamina B6 (mín.)", "980,0000 mg/kg"],
  ["Vitamina B12 (mín.)", "100,0000 µg/kg"],
  ["Vitamina C (mín.)", "891,0000 mg/kg"],
  ["Vitamina D3 (mín.)", "100.000,0000 UI/kg"],
  ["Vitamina E (mín.)", "100,0000 UI/kg"],
  ["Vitamina K3 (mín.)", "200,4000 mg/kg"],
  ["Biotina (mín.)", "20,0000 mg/kg"],
  ["Inositol (mín.)", "980,0000 mg/kg"],
  ["Colina (mín.)", "652,0000 mg/kg"],
  ["Lisina (mín.)", "3.900,0000 mg/kg"],
  ["Metionina (mín.)", "3.960,0000 mg/kg"],
  ["Triptofano (mín.)", "1.534,5000 mg/kg"],
  ["Proteína Bruta (mín.)", "30,0000 g/kg"],
  ["Aroma de Carne de Panela (mín.)", "2.000,0000 mg/kg"],
  ["Beta Glucanas (mín.)", "3.000,0000 mg/kg"],
  ["Mananoligossacarídeo (mín.)", "1.700,0000 mg/kg"],
  ["Saccharomyces cerevisiae (mín.)", "1,0000 x 10E09 ufc/kg"],
  ["Bacillus subtilis (mín.)", "2,0000 x 10E09 ufc/kg"],
  ["Bacillus cereus (mín.)", "2,0000 x 10E09 ufc/kg"],
  ["Lactobacillus acidophilus (mín.)", "1,0000 x 10E09 ufc/kg"],
  ["Enterococcus faecium (mín.)", "1,0000 x 10E09 ufc/kg"],
];

const qualitativeComposition =
  "Levedura de Cana de Açúcar Inativada e Desidratada, Ômega 3 (0,5%), Sulfato de Condroitina (0,5%), Calcário Magnesiano, Flor de Enxofre, Fosfato Bicálcico, Óxido de Magnésio, Cromo Aminoácido Quelato, Iodato de Cálcio, Selenito de Sódio, Sulfato de Cobalto, Sulfato de Cobre, Sulfato de Ferro, Sulfato de Manganês, Sulfato de Zinco Monohidratado, Vitamina A, Vitamina B1, Vitamina B2, Vitamina B6, Vitamina B12, Vitamina C, Vitamina D3, Vitamina E, Vitamina K3, Niacina, Biotina, Inositol, Cloreto de Colina, L-Lisina, DL-Metionina, L-Glutamina, L-Ácido Glutâmico, Taurina, Treonina, Triptofano, Extrato de Yucca, Aroma de Carne de Panela, Aditivo Prebiótico (1%) e Aditivo Probiótico (0,5%).";

function GuaranteeTableDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onOpenAutoFocus={(event) => event.preventDefault()}
        className="flex max-h-[92dvh] w-[calc(100%_-_1.25rem)] max-w-[720px] flex-col gap-0 overflow-hidden rounded-2xl border border-border bg-card p-0 shadow-soft [&>button]:right-4 [&>button]:top-4 [&>button]:text-ink [&>button]:opacity-100"
      >
        <div className="border-b border-border px-6 py-5">
          <DialogTitle className="pr-10 font-display text-lg font-bold uppercase tracking-wide text-ink sm:text-xl">
            Informação nutricional
          </DialogTitle>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="border-b border-border bg-muted px-4 py-3 text-center">
              <p className="text-sm font-bold uppercase tracking-wide text-ink">
                Níveis de garantia por kg do produto
              </p>
            </div>
            <ul className="grid sm:grid-cols-2">
              {guaranteeLevels.map(([name, value], index) => (
                <li
                  key={name}
                  className={cn(
                    "flex items-baseline justify-between gap-4 border-border px-4 py-2 text-sm",
                    index % 2 === 0 && "bg-muted/40",
                    Math.floor(index / 2) % 2 === 0
                      ? "md:bg-muted/40"
                      : "md:bg-transparent",
                    index % 2 === 1 && "sm:border-l sm:border-border",
                    "border-b sm:[&:nth-last-child(-n+2)]:border-b-0",
                  )}
                >
                  <span className="font-semibold text-ink">{name}</span>
                  <span className="shrink-0 tabular-nums text-muted-foreground">{value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 overflow-hidden rounded-xl border border-border bg-card">
            <div className="border-b border-border bg-muted px-4 py-3 text-center">
              <p className="text-sm font-bold uppercase tracking-wide text-ink">
                Composição qualitativa
              </p>
            </div>
            <div className="px-4 pb-3 pt-1.5">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {qualitativeComposition}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function IngredientsButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
        className="mt-4 h-12 w-full rounded-2xl border-primary/30 bg-card text-base text-ink hover:border-primary hover:bg-card hover:text-ink"
      >
        Ver tabela completa e ingredientes
      </Button>
      <GuaranteeTableDialog open={open} onOpenChange={setOpen} />
    </>
  );
}

export function VideoFeedbackDialog({
  selectedIndex,
  onSelectedIndexChange,
  onBuy,
}: {
  selectedIndex: number | null;
  onSelectedIndexChange: (index: number | null) => void;
  onBuy: () => void;
}) {
  const selectedVideo = selectedIndex === null ? null : feedbacks[selectedIndex];

  const showPrevious = () => {
    onSelectedIndexChange(
      selectedIndex === null ? 0 : (selectedIndex - 1 + feedbacks.length) % feedbacks.length,
    );
  };

  const showNext = () => {
    onSelectedIndexChange(
      selectedIndex === null ? 0 : (selectedIndex + 1) % feedbacks.length,
    );
  };

  return (
    <Dialog open={selectedVideo !== null} onOpenChange={(open) => !open && onSelectedIndexChange(null)}>
      <DialogContent className="max-h-[94dvh] w-[calc(100%_-_1.25rem)] max-w-[420px] gap-0 overflow-hidden rounded-2xl border border-border bg-card p-2.5 shadow-soft sm:rounded-2xl [&>button]:right-5 [&>button]:top-5 [&>button]:z-20 [&>button]:text-ink [&>button]:opacity-100">
        {selectedVideo && (
          <>
            <div className="px-2 pb-3 pt-2">
              <DialogTitle className="pr-10 font-display text-xl font-bold text-ink">
                Relatos de tutores que já passaram por isso
              </DialogTitle>
              <DialogDescription className="sr-only">
                Relatos em vídeo de clientes PetHelp
              </DialogDescription>
              <div className="mt-2.5 flex gap-2.5">
                {feedbacks.map((feedback, index) => (
                  <Button
                    key={feedback.name}
                    type="button"
                    variant="ghost"
                    aria-label={`Ver relato de ${feedback.name}`}
                    aria-pressed={selectedIndex === index}
                    onClick={() => onSelectedIndexChange(index)}
                    className={cn(
                      "h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 p-0 transition-opacity hover:opacity-90",
                      selectedIndex === index ? "border-primary" : "border-transparent",
                    )}
                  >
                    <img src={feedback.image} alt="" className="h-full w-full object-cover" />
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
                className="absolute left-3 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full border border-transparent bg-card/90 p-0 text-ink shadow-card transition-colors hover:border-primary"
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
                className="absolute right-3 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full border border-transparent bg-card/90 p-0 text-ink shadow-card transition-colors hover:border-primary"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center gap-3 rounded-b-xl bg-muted px-3 py-3">
              <p className="min-w-0 flex-1 truncate text-base font-semibold text-ink">
                {selectedVideo.problem}
              </p>
              <BuyButton
                size="md"
                onClick={onBuy}
                className="shrink-0 normal-case tracking-normal text-[15px]"
              >
                Comprar agora
              </BuyButton>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function ProductVideoFeedback({ onBuy }: { onBuy: () => void }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [openDetail, setOpenDetail] = useState<number | null>(0);

  const selectFeedback = (feedback: (typeof feedbacks)[number]) => {
    const index = feedbacks.indexOf(feedback);
    setSelectedIndex(index >= 0 ? index : 0);
  };

  return (
    <div>
      <div>
        <h3 className="text-base font-semibold text-ink">Relatos de tutores que já passaram por isso</h3>
        <Thumbnails className="mt-2 grid-cols-3" onSelect={selectFeedback} />
        <IngredientsButton />
      </div>

      <div className="mt-7 pt-2">
        <AccordionBlock
          items={details}
          openIndex={openDetail}
          onOpenChange={setOpenDetail}
        />
      </div>

      <VideoFeedbackDialog
        selectedIndex={selectedIndex}
        onSelectedIndexChange={setSelectedIndex}
        onBuy={onBuy}
      />
    </div>
  );
}
