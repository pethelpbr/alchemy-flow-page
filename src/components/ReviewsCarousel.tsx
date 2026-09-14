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
];

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
    <section id="avaliacoes" className="section scroll-mt-24 bg-sand/60">
      <div className="container-x">
        <Reveal>
          <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <div>
              <p className="eyebrow">Avaliações</p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
                Quem já tornou isso um hábito
              </h2>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="font-display text-3xl text-ink">4,9</span>
                <Stars />
                <span className="text-sm text-muted-foreground">2.418 avaliações verificadas</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Carousel
          setApi={setApi}
          opts={{ loop: true, align: "start", dragFree: true }}
          aria-label="Avaliações de clientes"
          className="mt-12 cursor-grab select-none active:cursor-grabbing"
        >
          <CarouselContent className="touch-pan-y">
            {reviews.map((r) => (
              <CarouselItem
                key={r.name}
                className="basis-[85%] sm:basis-[46%] lg:basis-[32%] xl:basis-1/3"
              >
                <article className="h-full rounded-3xl border border-border bg-card p-8">
                  <Stars />
                  <blockquote className="mt-5 font-display text-2xl leading-snug text-ink">
                    “{r.text}”
                  </blockquote>
                  <div className="mt-7 flex items-center gap-3">
                    <img
                      src={r.photo}
                      alt={r.name}
                      loading="lazy"
                      draggable={false}
                      width={512}
                      height={512}
                      className="h-11 w-11 shrink-0 rounded-full object-cover"
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

        <div className="mt-8 flex items-center justify-between gap-4">
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
              className="h-11 w-11 rounded-full border border-border text-ink hover:bg-ink/5"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={() => api?.scrollNext()}
              aria-label="Próximo"
              className="h-11 w-11 rounded-full bg-ink text-background hover:bg-ink/90"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
