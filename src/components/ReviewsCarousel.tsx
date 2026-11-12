import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Stars } from "@/components/ui/Stars";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import lindaci from "@/assets/LINDACI_BARROS.jpg.asset.json";
import marcelo from "@/assets/MARCELO_ANDRADE.jpg.asset.json";
import mariaHelena from "@/assets/MARIA_HELENA.png.asset.json";
import marisa from "@/assets/MARISA_BUCKER.png.asset.json";
import rejane from "@/assets/REJANE_PEREIRA.jpg.asset.json";
import silvana from "@/assets/SILVANA_MUNIZ.png.asset.json";

const reviews = [
  {
    text: "Comecei a usar no meu golden e já percebi diferença na pelagem. O pelo está mais bonito e ele também aceitou super bem na comida. Vou continuar usando porque gostei bastante do resultado.",
    name: "Lindaci Barros",
    city: "São Paulo, SP",
    photo: lindaci.url,
  },
  {
    text: "Meu cachorro não deixa escovar os dentes de jeito nenhum, é uma luta toda vez kkk. Aí eu só coloco o produto na água e pronto, o hálito dele melhorou bastante.",
    name: "Marcelo Andrade",
    city: "Curitiba, PR",
    photo: marcelo.url,
  },
  {
    text: "Minha cachorra lambia muito as patinhas e já estavam bem ressecadas. Comecei a passar o PataHelp e gostei bastante, principalmente porque ela parou de ficar lambendo toda hora.",
    name: "Maria Helena",
    city: "Recife, PE",
    photo: mariaHelena.url,
  },
  {
    text: "Peguei o kit na promoção e valeu muito a pena. Já queria comprar o NutraHelp e acabei aproveitando pra testar os outros também. Aqui em casa estou usando os 3.",
    name: "Marisa Bucker",
    city: "Belo Horizonte, MG",
    photo: marisa.url,
  },
  {
    text: "Meu cachorro tinha um bafo muito forte e eu já tinha tentado de tudo. Comecei a colocar na água e em pouco tempo já senti uma diferença boa no hálito.",
    name: "Rejane Pereira",
    city: "Fortaleza, CE",
    photo: rejane.url,
  },
  {
    text: "Luna\u00a0estava soltando bastante pelo. Depois que comecei a usar o suplemento, fui percebendo a pele e o pelo bem mais bonitos. Gostei muito do resultado e vou continuar usando.",
    name: "Silvana Muniz",
    city: "Porto Alegre, RS",
    photo: silvana.url,
  },
];

const breakdown = [
  { stars: 5, count: 1288 },
  { stars: 4, count: 152 },
  { stars: 3, count: 46 },
  { stars: 2, count: 23 },
  { stars: 1, count: 13 },
];

const totalReviews = breakdown.reduce((sum, row) => sum + row.count, 0);
const maxCount = Math.max(...breakdown.map((row) => row.count));

function RatingBreakdown() {
  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-[auto_minmax(0,36rem)] lg:items-center lg:justify-center sm:mt-16">
      <div className="flex items-start gap-4">
        <span className="font-display text-6xl leading-none text-ink sm:text-7xl">4,8</span>
        <div className="pt-1">
          <Stars size={24} rating={4.78} />
          <p className="mt-1 text-base text-muted-foreground">1.522 avaliações</p>
        </div>
      </div>

      <div className="w-full max-w-xl space-y-2">
        {breakdown.map((row) => {
          const percent = (row.count / maxCount) * 100;
          return (
            <div key={row.stars} className="flex items-center gap-3">
              <div className="flex w-16 items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={26}
                    strokeWidth={0}
                    className={i < row.stars ? "fill-gift" : "fill-border"}
                  />
                ))}
              </div>
              <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-border/60">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-primary transition-all duration-700 ease-out"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="w-10 text-right text-base tabular-nums text-muted-foreground">
                {row.count.toLocaleString("pt-BR")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ReviewsCarousel({ className }: { className?: string }) {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateSelected = useCallback((carouselApi: CarouselApi) => {
    if (!carouselApi) return;
    setSelectedIndex(carouselApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    updateSelected(api);
    api.on("select", updateSelected);
    api.on("reInit", updateSelected);

    return () => {
      api.off("select", updateSelected);
      api.off("reInit", updateSelected);
    };
  }, [api, updateSelected]);

  return (
    <section id="avaliacoes" className={`section scroll-mt-20 bg-sand/60 ${className ?? ""}`}>
      <div className="container-x">
        <Reveal>
          <div className="text-center md:text-left">
            <p className="eyebrow text-primary!">Avaliações</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
              Quem comprou, aprovou!
            </h2>
          </div>
        </Reveal>

      </div>

      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "start", dragFree: true }}
        aria-label="Avaliações de clientes"
        className="mt-8 cursor-grab select-none active:cursor-grabbing"
      >
        <CarouselContent className="touch-pan-y">
          {reviews.map((r) => (
            <CarouselItem
              key={r.name}
              className="basis-[85%] sm:basis-[46%] lg:basis-[32%] xl:basis-1/3"
            >
              <article className="h-full rounded-2xl border border-border bg-card p-5 sm:p-6 lg:p-6">
                <Stars size={24} />
                <blockquote className="mt-4 font-display text-xl leading-snug text-ink lg:text-xl">
                  “{r.text}”
                </blockquote>
                <div className="mt-5 flex items-center gap-3">
                  <img
                    src={r.photo}
                    alt={r.name}
                    loading="lazy"
                    draggable={false}
                    width={512}
                    height={512}
                    className="h-9 w-9 shrink-0 rounded-full object-cover lg:h-10 lg:w-10"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">{r.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{r.city}</p>
                  </div>
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="container-x">
        <div className="mt-6 flex items-center justify-between gap-4 md:mt-8">
          <p className="text-xs text-muted-foreground" aria-live="polite">
            {String(selectedIndex + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}
          </p>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => api?.scrollPrev()}
              aria-label="Anterior"
              className="h-11 w-11 rounded-full border border-border text-ink transition-colors hover:border-primary"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => api?.scrollNext()}
              aria-label="Próximo"
              className="h-11 w-11 rounded-full border border-border text-ink transition-colors hover:border-primary"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <Reveal>
          <RatingBreakdown />
        </Reveal>
      </div>

    </section>
  );
}
