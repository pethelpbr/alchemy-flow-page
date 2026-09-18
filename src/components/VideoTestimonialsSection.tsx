import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BuyButton } from "@/components/ui/BuyButton";
import {
  feedbacks,
  VideoFeedbackDialog,
  VideoTags,
} from "@/components/ProductVideoFeedback";

export function VideoTestimonialsSection({ onBuy }: { onBuy: () => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const scrollCards = (direction: -1 | 1) => {
    trackRef.current?.scrollBy({
      left: direction * Math.max(trackRef.current.clientWidth * 0.75, 280),
      behavior: "smooth",
    });
  };

  return (
    <section className="section bg-background" aria-labelledby="video-testimonials-title">
      <div className="container-x">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-3xl">
            <p className="eyebrow text-primary">Relatos reais</p>
            <h2
              id="video-testimonials-title"
              className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl"
            >
              Tutores que já passaram por isso
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Vídeos gravados pelos próprios tutores, no celular, dentro de casa. Sem roteiro e sem ator.
            </p>
          </div>

          <div className="hidden shrink-0 gap-3 sm:flex">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Relato anterior"
              onClick={() => scrollCards(-1)}
              className="h-11 w-11 rounded-full border-border bg-background text-ink hover:border-primary hover:bg-background"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Próximo relato"
              onClick={() => scrollCards(1)}
              className="h-11 w-11 rounded-full border-ink bg-ink text-primary-foreground hover:border-primary hover:bg-ink"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0"
        >
          {feedbacks.map((feedback, index) => (
            <article key={feedback.name} className="w-[82%] shrink-0 snap-start sm:w-[48%] md:w-auto">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setSelectedIndex(index)}
                aria-label={`Assistir ao relato sobre ${feedback.problem}`}
                className="group relative block h-auto w-full overflow-hidden rounded-xl p-0 shadow-none"
              >
                <img
                  src={feedback.image}
                  alt={`Relato sobre ${feedback.problem}`}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover md:aspect-[9/12]"
                />
                <span className="absolute inset-0 rounded-xl border border-transparent bg-ink/10 transition-colors group-hover:border-primary" />
                <VideoTags problem={feedback.problem} duration={feedback.duration} />
                <span className="pointer-events-none absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-card">
                  <Play className="ml-1 h-6 w-6 fill-current" />
                </span>
              </Button>
              <h3 className="mt-3 text-lg font-bold text-ink">{feedback.problem}</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">Relato de tutor · uso contínuo</p>
            </article>
          ))}
        </div>

        <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
            Todos os vídeos são de tutores reais, publicados com autorização.
          </p>
          <BuyButton size="lg" onClick={onBuy} className="w-full sm:w-auto">
            Quero cuidar da pele do meu pet
          </BuyButton>
        </div>
      </div>

      <VideoFeedbackDialog
        selectedIndex={selectedIndex}
        onSelectedIndexChange={setSelectedIndex}
        onBuy={onBuy}
      />
    </section>
  );
}