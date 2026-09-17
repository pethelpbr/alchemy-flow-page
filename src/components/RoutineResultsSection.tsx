import { useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { MarqueeStrip } from "@/components/MarqueeStrip";
import beforePhoto from "@/assets/cachorro-ruim.png.asset.json";
import afterPhoto from "@/assets/cachorro-top.png.asset.json";

const timeline = [
  {
    badge: "Dias 1 a 7",
    label: "O começo é silencioso",
    text: "Você mistura na ração e ele come normal. Por fora, nada mudou ainda. Por dentro, os probióticos começam a ocupar espaço e os nutrientes começam a chegar na pele.",
  },
  {
    badge: "Dias 8 a 15",
    label: "Os primeiros sinais",
    text: "Menos pata batendo no chão de madrugada. Menos lambida na mesma pata. É pequeno, mas é o primeiro sinal de que está funcionando.",
  },
  {
    badge: "Dias 16 a 30",
    label: "A pele começa a mudar",
    text: "A vermelhidão diminui, as feridinhas de unha param de abrir de novo, o cheiro forte cede e a queda de pelo começa a reduzir. É aqui que a maioria decide continuar ou parar.",
  },
  {
    badge: "Dias 31 a 60",
    label: "O pelo volta",
    text: "O pelo novo nasce e começa a cobrir as falhas, mais forte e com mais brilho. Nenhum suplemento faz isso em um mês, porque a raiz do pelo não trabalha nessa velocidade.",
  },
  {
    badge: "A partir de 60 dias",
    label: "O normal dele",
    text: "Pelo parelho e pele tranquila, inclusive na virada de estação.",
  },
];

type Step = (typeof timeline)[number];

function StepItem({ item }: { item: Step }) {
  return (
    <li className="relative pb-12 last:pb-0 sm:pb-14">
      <span className="absolute top-1 left-[calc(-2rem+0.375rem)] h-3 w-3 rounded-full bg-primary sm:left-[calc(-2.5rem+0.375rem)]" />
      <span className="eyebrow inline-block rounded-lg bg-primary/12 px-3 py-1 text-primary">
        {item.badge}
      </span>
      <p className="mt-3 text-xl leading-snug font-medium text-ink sm:text-2xl">
        {item.label}
      </p>
      <p className="mt-1 max-w-md text-base leading-relaxed text-muted-foreground sm:text-base">
        {item.text}
      </p>
    </li>
  );
}

function Images() {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className="relative aspect-[4/5] touch-none select-none overflow-hidden rounded-2xl bg-muted shadow-soft">
        <img
          src={afterLifestyle}
          alt="Pet depois do uso contínuo do NutraHelp"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <img
          src={lifestyle}
          alt="Pet antes de usar o NutraHelp"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        />

        <span className="eyebrow absolute top-4 left-4 rounded-md bg-card/85 px-2.5 py-1 text-ink shadow-card">
          Antes
        </span>
        <span className="eyebrow absolute top-4 right-4 rounded-md bg-card/85 px-2.5 py-1 text-ink shadow-card">
          Depois
        </span>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-card shadow-card"
          style={{ left: `${position}%` }}
        >
          <span className="absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-card bg-primary text-primary-foreground shadow-soft">
            <ChevronsLeftRight className="h-5 w-5" aria-hidden="true" />
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label="Comparar imagens antes e depois"
          className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
    </div>
  );
}

export function RoutineResultsSection() {
  return (
    <>
      <section className="section bg-card">
        <div className="container-x grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow text-primary">Resultado na rotina</p>
            <h2 className="mt-4 max-w-lg font-display text-4xl leading-tight text-ink sm:text-5xl">
              O que muda ao longo das semanas
            </h2>

            <ol className="relative mt-10 ml-2 border-l border-dotted border-primary/60 py-1 pl-8 sm:mt-12 sm:pl-10">
              {timeline.map((item) => (
                <StepItem key={item.label} item={item} />
              ))}
            </ol>
          </div>

          <div className="lg:sticky lg:top-28">
            <Images />
          </div>
        </div>
      </section>
      <MarqueeStrip />
    </>
  );
}
