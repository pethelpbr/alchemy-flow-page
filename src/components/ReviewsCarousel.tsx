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
import c1 from "@/assets/customer-1.jpg";
import c2 from "@/assets/customer-2.jpg";
import c3 from "@/assets/customer-3.jpg";

const reviews = [
  {
    text: "Produto incrível, virou parte da minha rotina. Tomo assim que acordo e nem penso mais no assunto.",
    name: "Marina L.",
    city: "São Paulo, SP",
    photo: c1,
  },
  {
    text: "Dissolve de verdade, sem grumos. O sabor é leve e a embalagem é linda na bancada.",
    name: "Rodrigo A.",
    city: "Curitiba, PR",
    photo: c2,
  },
  {
    text: "Comprei o kit de 3 e valeu muito a pena. Praticidade é o que eu mais precisava.",
    name: "Júlia F.",
    city: "Recife, PE",
    photo: c3,
  },
  {
    text: "Já testei várias marcas e essa é a primeira que consegui manter por meses seguidos.",
    name: "Camila R.",
    city: "Belo Horizonte, MG",
    photo: c1,
  },
  {
    text: "Consigo sentir a diferença na disposição desde a primeira semana. Recomendo demais.",
    name: "Fernanda T.",
    city: "Rio de Janeiro, RJ",
    photo: c2,
  },
  {
    text: "Finalmente um suplemento que não fica aquele gosto ruim na boca. Uso todo dia sem falta.",
    name: "Lucas M.",
    city: "Porto Alegre, RS",
    photo: c3,
  },
  {
    text: "Comentário provisório para apresentar uma nova experiência com o produto e completar o carrossel.",
    name: "Cliente Nutraflow",
    city: "Brasil",
    photo: c1,
  },
];

const breakdown = [
  { stars: 5, count: 2045 },
  { stars: 4, count: 242 },
  { stars: 3, count: 73 },
  { stars: 2, count: 36 },
  { stars: 1, count: 22 },
];

const totalReviews = breakdown.reduce((sum, row) => sum + row.count, 0);
const maxCount = Math.max(...breakdown.map((row) => row.count));

function RatingBreakdown() {
  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-[auto_1fr] lg:items-start sm:mt-16">
      <div className="flex items-start gap-4">
        <span className="font-display text-6xl leading-none text-ink sm:text-7xl">4,8</span>
        <div className="pt-1">
          <Stars size={24} />
          <p className="mt-1 text-base text-muted-foreground">+743 avaliações</p>
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
                    className={i < row.stars ? "fill-primary" : "fill-border"}
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

export function ReviewsCarousel() {
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
    <section id="avaliacoes" className="section scroll-mt-20 bg-sand/60">
      <div className="container-x">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="w-full text-center md:w-auto md:text-left">
              <p className="eyebrow">Avaliações</p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
                Experiências reais de quem já usa
              </h2>
            </div>

            <div className="flex items-center gap-4 pb-1">
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



        <Reveal>
          <RatingBreakdown />
        </Reveal>
      </div>
    </section>
  );
}
