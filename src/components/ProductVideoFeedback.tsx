import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
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
          className="group relative h-auto overflow-hidden rounded-xl p-0 shadow-none"
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
      className="mt-4 h-12 w-full rounded-full border-primary/30 bg-card text-sm text-ink hover:border-primary hover:bg-primary/5"
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
              className="h-auto w-full justify-between rounded-none px-1 py-5 text-left text-[15px] font-semibold text-ink hover:bg-transparent hover:text-primary"
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
                  <p className="px-1 pb-5 pr-8 text-sm leading-relaxed text-muted-foreground">
                    {detail.content}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

export function ProductVideoFeedback() {
  const [selectedVideo, setSelectedVideo] = useState<(typeof feedbacks)[number] | null>(null);
  const [openDetail, setOpenDetail] = useState<number | null>(null);

  return (
    <div className="mt-8 border-t border-border pt-7">
      <h3 className="text-base font-semibold text-ink">Vídeos de quem já usa</h3>

      <Thumbnails className="mt-4 grid-cols-4" onSelect={setSelectedVideo} />
      <IngredientsButton />
      <div className="mt-7">
        <DetailsAccordion openDetail={openDetail} setOpenDetail={setOpenDetail} />
      </div>


      <Dialog open={selectedVideo !== null} onOpenChange={(open) => !open && setSelectedVideo(null)}>
        <DialogContent className="max-w-sm overflow-hidden rounded-2xl border-0 bg-card p-0">
          {selectedVideo && (
            <>
              <div className="relative">
                <img
                  src={selectedVideo.image}
                  alt={`Prévia do relato de ${selectedVideo.name}`}
                  className="aspect-[9/14] max-h-[70vh] w-full object-cover"
                />
                <span className="absolute inset-0 grid place-items-center bg-ink/20">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-card/90 text-primary shadow-soft">
                    <Play className="ml-1 h-6 w-6 fill-current" />
                  </span>
                </span>
              </div>
              <div className="p-5">
                <DialogTitle className="text-xl text-ink">Relato de {selectedVideo.name}</DialogTitle>
                <DialogDescription className="mt-1">{selectedVideo.caption}</DialogDescription>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
