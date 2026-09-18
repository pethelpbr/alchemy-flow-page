import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import antesMel from "@/assets/sintoma-2.jpg";
import depoisMel from "@/assets/depois-1.jpg";
import antesThor from "@/assets/sintoma-1.jpg";
import depoisThor from "@/assets/depois-2.jpg";
import antesNina from "@/assets/sintoma-4.jpg";
import depoisNina from "@/assets/depois-3.jpg";
import antesBento from "@/assets/sintoma-5.jpg";
import depoisBento from "@/assets/depois-4.jpg";
import antesAmora from "@/assets/sintoma-6.jpg";
import depoisAmora from "@/assets/depois-5.jpg";
import antesZeca from "@/assets/antes-gato.jpg";
import depoisZeca from "@/assets/depois-gato.jpg";

type Case = {
  name: string;
  breed: string;
  weeks: string;
  quote: string;
  before: string;
  after: string;
};

const cases: Case[] = [
  {
    name: "Mel",
    breed: "Shih Tzu",
    weeks: "8 semanas",
    quote: "O pelo voltou a crescer nas falhas da lombar.",
    before: antesMel,
    after: depoisMel,
  },
  {
    name: "Thor",
    breed: "Golden",
    weeks: "10 semanas",
    quote: "A pata parou de ficar úmida e o pelo escuro clareou.",
    before: antesThor,
    after: depoisThor,
  },
  {
    name: "Nina",
    breed: "Vira-lata",
    weeks: "12 semanas",
    quote: "A falha do flanco fechou por completo.",
    before: antesNina,
    after: depoisNina,
  },
  {
    name: "Bento",
    breed: "Cocker",
    weeks: "9 semanas",
    quote: "A orelha parou de incomodar e ele voltou a dormir a noite toda.",
    before: antesBento,
    after: depoisBento,
  },
  {
    name: "Amora",
    breed: "Lhasa",
    weeks: "8 semanas",
    quote: "A barriga desinflamou e o pelo do dorso ficou mais denso.",
    before: antesAmora,
    after: depoisAmora,
  },
  {
    name: "Zeca",
    breed: "Gato SRD",
    weeks: "11 semanas",
    quote: "Parou de lamber a barriga e o pelo preencheu de novo.",
    before: antesZeca,
    after: depoisZeca,
  },
];

function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-card/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-foreground shadow-sm">
      {children}
    </span>
  );
}

export function BeforeAfterSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snaps, setSnaps] = useState<number[]>(() => cases.map((_, i) => i));

  const updateSelected = useCallback((carouselApi: CarouselApi) => {
    if (!carouselApi) return;
    setSelectedIndex(carouselApi.selectedScrollSnap());
    setSnaps(carouselApi.scrollSnapList());
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
    <section className="bg-background py-10 md:py-12" aria-labelledby="before-after-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="before-after-title"
            className="font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl"
          >
            A pele do seu pet pode voltar a ser pele
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Fotos que os próprios tutores mandaram. A etiqueta escura no meio mostra quanto tempo
            passou entre uma e outra.
          </p>
        </div>

        <Carousel
          setApi={setApi}
          opts={{ align: "start", dragFree: true }}
          aria-label="Resultados antes e depois"
          className="mt-8 cursor-grab select-none active:cursor-grabbing"
        >
          <CarouselContent className="-ml-5 touch-pan-y">
            {cases.map((c) => (
              <CarouselItem
                key={c.name}
                className="basis-[92%] pl-5 sm:basis-[54%] lg:basis-[38%]"
              >
                <article className="flex h-full flex-col">
                  <div className="relative overflow-hidden rounded-xl border border-border">
                    <div className="grid grid-cols-2">
                      <div className="relative">
                        <img
                          src={c.before}
                          alt={`${c.name} antes do NutraHelp`}
                          loading="lazy"
                          draggable={false}
                          width={736}
                          height={912}
                          className="aspect-[3/4] h-full w-full object-cover"
                        />
                        <div className="absolute left-2.5 top-2.5">
                          <Tag>Antes</Tag>
                        </div>
                      </div>
                      <div className="relative border-l-2 border-card">
                        <img
                          src={c.after}
                          alt={`${c.name} depois do NutraHelp`}
                          loading="lazy"
                          draggable={false}
                          width={736}
                          height={912}
                          className="aspect-[3/4] h-full w-full object-cover"
                        />
                        <div className="absolute left-2.5 top-2.5">
                          <Tag>Depois</Tag>
                        </div>
                      </div>
                    </div>
                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gift px-3 py-1 text-[11px] font-bold text-gift-foreground">
                      {c.weeks}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-foreground">
                    <span className="font-bold">{c.name}</span>{" "}
                    <span className="text-muted-foreground">{c.breed}</span>
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.quote}</p>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2" aria-label="Selecionar resultado">
            {cases.map((c, index) => (
              <button
                key={c.name}
                type="button"
                onClick={() => api?.scrollTo(index)}
                aria-label={`Ver resultado de ${c.name}`}
                aria-current={selectedIndex === index}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  selectedIndex === index
                    ? "w-6 bg-primary"
                    : "w-2.5 bg-border hover:bg-primary/50"
                }`}
              />
            ))}
          </div>

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
