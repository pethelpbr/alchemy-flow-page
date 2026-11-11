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

export type BeforeAfterCase = {
  name: string;
  weeks?: string;
  quote?: string;
  before: string;
  after: string;
  fullImages?: boolean;
  afterLabel?: string;
  productPosition?: "center" | "bottom";
  product?: { name: string; image: string };
};

const cases: BeforeAfterCase[] = [
  {
    name: "Mel",
    weeks: "8 semanas",
    quote: "O pelo voltou a crescer nas falhas da lombar.",
    before: antesMel,
    after: depoisMel,
  },
  {
    name: "Thor",
    weeks: "10 semanas",
    quote: "A pata parou de ficar úmida e o pelo escuro clareou.",
    before: antesThor,
    after: depoisThor,
  },
  {
    name: "Nina",
    weeks: "12 semanas",
    quote: "A falha do flanco fechou por completo.",
    before: antesNina,
    after: depoisNina,
  },
  {
    name: "Bento",
    weeks: "9 semanas",
    quote: "A orelha parou de incomodar e ele voltou a dormir a noite toda.",
    before: antesBento,
    after: depoisBento,
  },
  {
    name: "Amora",
    weeks: "8 semanas",
    quote: "A barriga desinflamou e o pelo do dorso ficou mais denso.",
    before: antesAmora,
    after: depoisAmora,
  },
  {
    name: "Zeca",
    weeks: "11 semanas",
    quote: "Parou de lamber a barriga e o pelo preencheu de novo.",
    before: antesZeca,
    after: depoisZeca,
  },
];

function Tag({ children, result = false }: { children: string; result?: boolean }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] shadow-sm ${result ? "bg-gift text-gift-foreground" : "bg-card/95 text-foreground"}`}>
      {children}
    </span>
  );
}

export function BeforeAfterSection({ className, title = "Antes e depois de quem já usou", extraCases, resultStyle = false }: { className?: string; title?: string; extraCases?: BeforeAfterCase[]; resultStyle?: boolean }) {
  const displayedCases = extraCases ? [...extraCases, ...cases.slice(1)] : cases;
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
    <section id="resultados" className={`scroll-mt-8 bg-background px-6 py-10 md:py-12 ${className ?? ""}`} aria-labelledby="before-after-title">
      <div className="mx-auto max-w-6xl">
        <div className="w-full text-center">
          <h2
            id="before-after-title"
            className="font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl"
          >
            {title}
          </h2>
        </div>

        <Carousel
          setApi={setApi}
          opts={{ align: "start", dragFree: true }}
          aria-label="Resultados antes e depois"
          className="mt-8 cursor-grab select-none active:cursor-grabbing"
        >
          <CarouselContent className="-ml-5 touch-pan-y">
            {displayedCases.map((c) => (
              <CarouselItem
                key={c.name}
                className={c.fullImages ? "basis-[78%] pl-5 sm:basis-[38%] lg:basis-[28%]" : "basis-[92%] pl-5 sm:basis-[54%] lg:basis-[38%]"}
              >
                <article className="flex h-full flex-col">
                  <div className="relative overflow-hidden rounded-xl border border-border">
                    <div className={c.fullImages ? "grid aspect-square grid-cols-2" : "grid grid-cols-2"}>
                      <div className="relative">
                        <img
                          src={c.before}
                          alt={`${c.name} antes do ${c.product?.name ?? "NutraHelp"}`}
                          loading="lazy"
                          draggable={false}
                          width={c.fullImages ? 883 : 736}
                          height={c.fullImages ? 1782 : 912}
                          className={c.fullImages ? "absolute inset-0 block h-full w-full" : "aspect-[3/4] h-full w-full object-cover"}
                        />
                        <div className="absolute left-2.5 top-2.5">
                          <Tag>Antes</Tag>
                        </div>
                      </div>
                      <div className={c.fullImages || resultStyle ? "relative" : "relative border-l-2 border-card"}>
                        <img
                          src={c.after}
                          alt={`${c.name} depois do ${c.product?.name ?? "NutraHelp"}`}
                          loading="lazy"
                          draggable={false}
                          width={c.fullImages ? 882 : 736}
                          height={c.fullImages ? 1784 : 912}
                          className={c.fullImages ? "absolute inset-0 block h-full w-full" : "aspect-[3/4] h-full w-full object-cover"}
                        />
                        <div className="absolute left-2.5 top-2.5">
                          <Tag result={resultStyle}>{c.afterLabel ?? (resultStyle ? c.weeks ?? "Depois" : "Depois")}</Tag>
                        </div>
                      </div>
                    </div>
                    {resultStyle && <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 bg-background" />}
                    {c.product && (
                      <img src={c.product.image} alt={c.product.name} loading="lazy" draggable={false} className={c.productPosition === "center" ? "absolute left-1/2 top-1/2 h-auto w-16 -translate-x-1/2 -translate-y-1/2" : "absolute bottom-2 left-1/2 h-auto w-20 -translate-x-1/2"} />
                    )}
                    {c.weeks && !resultStyle && <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gift px-3 py-1 text-[11px] font-bold text-gift-foreground">
                      {c.weeks}
                    </span>}
                  </div>
                  <p className="mt-3 text-sm font-bold text-foreground">{c.name}</p>
                  {c.quote && <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.quote}</p>}
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-3 md:mt-8 flex items-center justify-between gap-3">
            <p className="text-[13px] font-medium tracking-[0.08em] text-foreground" aria-live="polite">
              {String(selectedIndex + 1).padStart(2, "0")} / {String(displayedCases.length).padStart(2, "0")}
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
