import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import activeGreentea from "@/assets/active-greentea.jpg";
import activeCreatine from "@/assets/active-creatine.jpg";
import activeOrange from "@/assets/active-orange.jpg";
import activeGreencoffee from "@/assets/active-greencoffee.jpg";
import activeGinger from "@/assets/active-ginger.jpg";
import activeGuarana from "@/assets/active-guarana.jpg";

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
];

export function ActivesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 16 : 320;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="bg-[#241d16] py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl tracking-wide text-white sm:text-4xl">
            ATIVOS QUE VIRAM CUIDADO
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/70">
            Cada ingrediente tem uma função na fórmula, sem excesso e sem enrolação.
          </p>
        </div>

        <div
          ref={trackRef}
          className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {actives.map((a) => (
            <article
              key={a.name}
              data-card
              className="relative w-[260px] shrink-0 snap-start overflow-hidden rounded-3xl sm:w-[300px]"
            >
              <img
                src={a.image}
                alt={a.name}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 pt-14">
                <h3 className="font-display text-sm tracking-[0.12em] text-white uppercase">
                  {a.name}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/85">
                  {a.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Anterior"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Próximo"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#241d16] transition-colors hover:bg-white/85"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
