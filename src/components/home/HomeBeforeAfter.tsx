import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CarouselApi } from "@/components/ui/carousel";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import nutraCard from "@/assets/antes-depois-nutra-home.jpg.asset.json";
import pataCard from "@/assets/antes-depois-pata-home.jpg.asset.json";
import bocaCard from "@/assets/antes-depois-boca-home.jpg.asset.json";

const cards = [
  {
    name: "NutraHelp",
    image: nutraCard.url,
    alt: "Antes e depois com NutraHelp: as falhas do pelo fecham e a pelagem volta a ficar bonita em 90 dias",
  },
  {
    name: "PataHelp",
    image: pataCard.url,
    alt: "Antes e depois com PataHelp: a pata com alergia e feridas sara e o cachorro para de lamber em 30 dias",
  },
  {
    name: "BocaHelp",
    image: bocaCard.url,
    alt: "Antes e depois com BocaHelp: os dentes com tártaro ficam limpos e o hálito melhora em 60 dias",
  },
];

export function HomeBeforeAfter() {
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
    <section id="resultados" className="scroll-mt-8 bg-background px-6 py-10 md:py-12" aria-labelledby="home-before-after-title">
      <div className="mx-auto max-w-6xl">
        <h2 id="home-before-after-title" className="text-center font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
          Eles tinham um problema. Agora têm uma nova vida!
        </h2>

        <Carousel
          setApi={setApi}
          opts={{ align: "start", dragFree: true }}
          aria-label="Resultados antes e depois"
          className="mt-8 cursor-grab select-none active:cursor-grabbing"
        >
          <CarouselContent className="-ml-5 touch-pan-y">
            {cards.map((c) => (
              <CarouselItem key={c.name} className="basis-[88%] pl-5 md:basis-[52%] lg:basis-[46%]">
                <img
                  src={c.image}
                  alt={c.alt}
                  loading="lazy"
                  draggable={false}
                  className="aspect-square w-full rounded-xl border border-border object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-3 flex items-center justify-between gap-3 md:mt-8">
          <p className="text-[13px] font-medium tracking-[0.08em] text-foreground" aria-live="polite">
            {String(selectedIndex + 1).padStart(2, "0")} / {String(cards.length).padStart(2, "0")}
          </p>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => api?.scrollPrev()}
              aria-label="Resultado anterior"
              className="h-11 w-11 rounded-full border border-border text-foreground transition-colors hover:border-primary"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => api?.scrollNext()}
              aria-label="Próximo resultado"
              className="h-11 w-11 rounded-full border border-border text-foreground transition-colors hover:border-primary"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
