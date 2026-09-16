import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { brl } from "@/lib/product";
import { BuyButton } from "@/components/ui/BuyButton";
import customer1 from "@/assets/customer-1.jpg";
import customer2 from "@/assets/customer-2.jpg";
import customer3 from "@/assets/customer-3.jpg";
import lifestyle from "@/assets/lifestyle-1.jpg";

const feedbacks = [
  { image: customer1, name: "Marina", caption: "Virou parte da minha manhã" },
  { image: customer2, name: "Rodrigo", caption: "Prático para todos os dias" },
  { image: customer3, name: "Júlia", caption: "Leve e fácil de preparar" },
  { image: lifestyle, name: "Camila", caption: "Meu novo ritual diário" },
];

const details = [
  {
    title: "O que é o Daily Greens?",
    content:
      "Uma fórmula em pó de uso diário que reúne ingredientes selecionados em uma dose prática para acompanhar sua rotina.",
  },
  {
    title: "Para quem é?",
    content:
      "Para adultos que buscam praticidade e querem complementar uma rotina equilibrada. Gestantes, lactantes e pessoas em tratamento devem consultar um profissional.",
  },
  {
    title: "Benefícios",
    content:
      "Uma forma simples de incluir ativos selecionados no dia a dia, com preparo rápido, sabor leve e doses transparentes.",
  },
  {
    title: "Como usar",
    content:
      "Dissolva um dosador raso em 200 ml de água gelada, misture por 10 segundos e consuma uma vez ao dia.",
  },
];

function Thumbnails({
  className,
  onSelect,
}: {
  className?: string;
  onSelect: (f: (typeof feedbacks)[number]) => void;
}) {
  return (
    <div className={cn("grid gap-2.5", className)}>
      {feedbacks.map((feedback) => (
        <Button
          key={feedback.name}
          type="button"
          variant="ghost"
          aria-label={`Assistir ao relato de ${feedback.name}`}
          onClick={() => onSelect(feedback)}
          className="group relative h-auto overflow-hidden rounded-lg p-0 shadow-none"
        >
          <img
            src={feedback.image}
            alt={`Relato de ${feedback.name}`}
            loading="lazy"
            className="aspect-[9/14] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-ink/15 transition-colors group-hover:bg-ink/25" />
          <span className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-card/70 bg-card/80 text-primary shadow-card backdrop-blur-sm">
            <Play className="ml-0.5 h-4 w-4 fill-current" />
          </span>
        </Button>
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

function DetailsAccordion({
  openDetail,
  setOpenDetail,
}: {
  openDetail: number | null;
  setOpenDetail: (i: number | null) => void;
}) {
  return (
    <div className="border-y border-border">
      {details.map((detail, index) => {
        const isOpen = openDetail === index;
        return (
          <div
            key={detail.title}
            className="border-b border-border last:border-b-0"
          >
            <Button
              type="button"
              variant="ghost"
              aria-expanded={isOpen}
              onClick={() => setOpenDetail(isOpen ? null : index)}
              className="h-auto w-full justify-between rounded-none px-1 py-5 text-left text-lg font-semibold text-ink hover:bg-transparent hover:text-primary"
            >
              <span className="whitespace-normal">{detail.title}</span>
              <ChevronDown
                className={cn("transition-transform duration-300", isOpen && "rotate-180")}
              />
            </Button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-1 pb-5 pr-8 text-lg leading-relaxed text-muted-foreground">
                    {detail.content}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function ProductVideoFeedback({
  productName,
  currentPrice,
  onBuy,
}: {
  productName: string;
  currentPrice: number;
  onBuy: () => void;
}) {
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
        <h3 className="text-base font-semibold text-ink">Vídeos de quem já usa</h3>
        <Thumbnails className="mt-4 grid-cols-4" onSelect={selectFeedback} />
        <IngredientsButton />
      </div>

      <div className="mt-7 pt-2">
        <DetailsAccordion openDetail={openDetail} setOpenDetail={setOpenDetail} />
      </div>

      <Dialog open={selectedVideo !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
        <DialogContent className="max-h-[94dvh] w-[calc(100%_-_1.25rem)] max-w-[420px] gap-0 overflow-hidden rounded-2xl border border-border bg-card p-2.5 shadow-soft sm:rounded-2xl [&>button]:right-5 [&>button]:top-5 [&>button]:z-20 [&>button]:text-ink [&>button]:opacity-100">
          {selectedVideo && (
            <>
              <div className="px-2 pb-3 pt-2">
                <DialogTitle className="pr-10 font-display text-xl font-bold uppercase text-ink">
                  Vídeo feedbacks
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
                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-bold text-ink">{productName}</p>
                  <p className="mt-0.5 flex flex-wrap items-baseline gap-1.5 text-xs">
                    <span className="font-bold text-ink">{brl(currentPrice)}</span>
                  </p>
                  <p className="sr-only">{selectedVideo.caption}, por {selectedVideo.name}</p>
                </div>
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
