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
import activePrebioticos from "@/assets/active-prebioticos.png.asset.json";
import activeCreatine from "@/assets/active-creatine.jpg";
import activeOrange from "@/assets/active-orange.jpg";
import activeGreencoffee from "@/assets/active-greencoffee.jpg";
import activeGinger from "@/assets/active-ginger.jpg";
import activeGuarana from "@/assets/active-guarana.jpg";
import activesBackground from "@/assets/actives-background-clean.jpg";

const actives: { image: string; name: string; description: string; focus?: string }[] = [
  {
    image: activePrebioticos.url,
    name: "Probióticos e prebióticos",
    description:
      "5 cepas boas mais o alimento delas. Sem o prebiótico, o probiótico chega e não se fixa.",
    focus: "50% 100%",
  },
  {
    image: activeCreatine,
    name: "Zinco",
    description:
      "Participa da formação da pele e da cicatrização. É o que mais costuma faltar quando o pet vive com a pele irritada.",
  },
  {
    image: activeOrange,
    name: "Biotina",
    description:
      "Entra na produção da queratina, que é o material do fio de pelo.",
  },
  {
    image: activeGreencoffee,
    name: "Ômega 3",
    description:
      "O organismo não fabrica sozinho, só recebe pela comida. Ajuda na maciez e no brilho do pelo.",
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

const nutrients = [["13", "vitaminas"], ["13", "minerais"], ["7", "aminoácidos"], ["5", "probióticos"], ["2", "prebióticos"]];

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
    <section className="relative isolate overflow-hidden bg-foreground py-10 md:py-12">
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
        <div className="mx-auto max-w-2xl text-center md:mx-0 md:text-left">
          <p className="eyebrow text-gift">O que tem dentro de cada dose</p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-primary-foreground sm:text-5xl">
            44 nutrientes. Um pote.
          </h2>
        </div>

        <div className="mt-6 rounded-2xl border border-primary-foreground/15 bg-ink px-6 py-6 text-primary-foreground">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-[repeat(5,1fr)_1.4fr] lg:items-center">
            {nutrients.map(([amount, label]) => (
              <div key={label} className="text-center">
                <strong className="block font-display text-4xl leading-none text-gift">{amount}</strong>
                <span className="text-xs">{label}</span>
              </div>
            ))}
            <div className="col-span-2 border-t border-primary-foreground/20 pt-4 text-center text-xs sm:col-span-1 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
              + ômega 3, condroitina, yucca e proteína
            </div>
          </div>
        </div>

        <p className="mt-3 text-center text-xs leading-relaxed text-primary-foreground/75 md:text-left">
          13 + 13 + 7 + 5 + 2 + 4 = <strong className="text-primary">44.</strong> Todos declarados na tabela de níveis de garantia, nenhum arredondado para fechar a conta.
        </p>
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
                  style={active.focus ? { objectPosition: active.focus } : undefined}
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
            className="h-11 w-11 rounded-full border border-primary-foreground/30 text-primary-foreground transition-colors hover:border-primary-foreground"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => api?.scrollNext()}
            aria-label="Próximo"
            className="h-11 w-11 rounded-full border border-primary-foreground/30 text-primary-foreground transition-colors hover:border-primary-foreground"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
          </div>
        </div>
    </section>
  );
}
