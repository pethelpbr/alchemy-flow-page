import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import activeGreentea from "@/assets/active-greentea.jpg";
import activeCreatine from "@/assets/active-creatine.jpg";
import activeOrange from "@/assets/active-orange.jpg";
import activeGreencoffee from "@/assets/active-greencoffee.jpg";
import activeGinger from "@/assets/active-ginger.jpg";
import activeGuarana from "@/assets/active-guarana.jpg";
import activesBackground from "@/assets/actives-background-clean.jpg";

const actives = [
  {
    image: activeGreentea,
    name: "Chá verde",
    description:
      "Fonte de cafeína suave e de antioxidantes, acompanha o blend da manhã.",
  },
  {
    image: activeCreatine,
    name: "Creatina monohidratada (3 g)",
    description:
      "O suplemento mais estudado do esporte. Energia rápida para o músculo e apoio à massa magra.",
  },
  {
    image: activeOrange,
    name: "Laranja moro",
    description:
      "Laranja sanguínea italiana, rica em antocianinas, que reforçam a ação antioxidante.",
  },
  {
    image: activeGreencoffee,
    name: "Café verde",
    description:
      "Fonte natural de cafeína e de ácido clorogênico, para energia estável, sem pico.",
  },
  {
    image: activeGinger,
    name: "Gengibre",
    description:
      "Raiz de sabor marcante, tradicional na manhã, integra o blend de ativos naturais.",
  },
  {
    image: activeGuarana,
    name: "Guaraná",
    description:
      "Estimula o estado de alerta, o foco e a disposição, com ação antioxidante.",
  },
  {
    image: activeGreentea,
    name: "Novo ativo",
    description:
      "Conteúdo provisório para o próximo ingrediente que fará parte da apresentação da fórmula.",
  },
];

export function ActivesCarousel() {
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
    <section className="relative isolate overflow-hidden bg-foreground py-12 sm:py-16">
      <img
        src={activesBackground}
        alt=""
        loading="lazy"
        width={1920}
        height={1080}
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-foreground/75" />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl tracking-wide text-primary-foreground sm:text-4xl">
            ATIVOS QUE VIRAM CUIDADO
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-primary-foreground/75">
            Cada ingrediente tem uma função na fórmula, sem excesso e sem enrolação.
          </p>
        </div>
      </div>

      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "start", dragFree: true }}
        aria-label="Ativos da fórmula"
        className="mt-12 cursor-grab select-none active:cursor-grabbing"
      >
        <CarouselContent className="touch-pan-y">
          {actives.map((active) => (
            <CarouselItem
              key={active.name}
              className="basis-[76%] sm:basis-[46%] lg:basis-[28%] xl:basis-1/4"
            >
              <article className="relative overflow-hidden rounded-xl">
                <img
                  src={active.image}
                  alt={active.name}
                  loading="lazy"
                  draggable={false}
                  className="aspect-[3/4] w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 flex h-[36%] flex-col justify-start gap-2 bg-primary-foreground/10 px-5 py-5 backdrop-blur-md lg:h-[36%]">
                  <h3 className="min-h-[2.5em] font-display text-[13px] leading-tight tracking-[0.12em] text-primary-foreground uppercase lg:text-[18px]">
                    {active.name}
                  </h3>
                  <p className="min-h-[4.2em] text-[13px] leading-snug text-primary-foreground/90 line-clamp-3 lg:text-[16px] lg:leading-snug">
                    {active.description}
                  </p>
                </div>
              </article>

            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mx-auto mt-8 flex max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-8">
          <p className="text-xs text-primary-foreground/60" aria-live="polite">
            {String(selectedIndex + 1).padStart(2, "0")} / {String(actives.length).padStart(2, "0")}
          </p>
          <div className="flex gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => api?.scrollPrev()}
            aria-label="Anterior"
            className="h-11 w-11 rounded-full border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => api?.scrollNext()}
            aria-label="Próximo"
            className="h-11 w-11 rounded-full border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
          </div>
        </div>
    </section>
  );
}
