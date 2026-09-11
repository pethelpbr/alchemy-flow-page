import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { useIsMobile } from "@/hooks/use-mobile";
import lifestyle from "@/assets/lifestyle-1.jpg";
import galleryDrink from "@/assets/gallery-drink.jpg";

const timeline = [
  {
    badge: "1ª semana",
    label: "A rotina começa",
    text: "Uma dose todos os dias, com ou sem treino. O primeiro passo é criar o hábito.",
  },
  {
    badge: "4ª semana",
    label: "A rotina se consolida",
    text: "Com o uso diário, a fórmula passa a acompanhar naturalmente o seu dia.",
  },
  {
    badge: "8ª semana",
    label: "Mais ritmo na rotina",
    text: "Com o ritual incorporado ao dia a dia, fica mais fácil manter a regularidade.",
  },
  {
    badge: "12ª semana",
    label: "Constância que acompanha a evolução",
    text: "Rotina, alimentação e cuidado trabalhando juntos, dia após dia, de forma consistente.",
  },
];

type Step = (typeof timeline)[number];

// Cada item entra suavemente em uma faixa do scroll, fica visível,
// e sai da mesma forma quando o usuário rola para cima.
const RANGES: [number, number][] = [
  [0.0, 0.13],
  [0.1, 0.23],
  [0.2, 0.33],
  [0.3, 0.43],
];

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function StepItem({ item }: { item: Step }) {
  return (
    <li className="relative pb-20 last:pb-0 sm:pb-28">
      <span className="absolute top-1 left-[calc(-2rem+0.375rem)] h-3 w-3 rounded-full bg-primary sm:left-[calc(-2.5rem+0.375rem)]" />
      <span className="eyebrow inline-block rounded-full bg-primary/12 px-3 py-1 text-primary">
        {item.badge}
      </span>
      <p className="mt-3 text-xl leading-snug font-medium text-ink sm:text-2xl">
        {item.label}
      </p>
      <p className="mt-1 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
        {item.text}
      </p>
    </li>
  );
}

function ScrollStep({
  item,
  progress,
  range,
}: {
  item: Step;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const [start, end] = range;

  const opacity = useTransform(progress, (v) => {
    const t = Math.max(0, Math.min(1, (v - start) / (end - start)));
    return smoothstep(t);
  });
  const y = useTransform(opacity, (o) => 10 * (1 - o));
  const scale = useTransform(opacity, (o) => 1 - 0.015 * (1 - o));

  return (
    <motion.div style={{ opacity, y, scale }}>
      <StepItem item={item} />
    </motion.div>
  );
}

function Images({ scale }: { scale?: MotionValue<number> }) {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <motion.div
        {...(scale ? { style: { scale } } : {})}
        className="relative aspect-4/5 w-full"
      >
        <div className="absolute top-0 right-0 h-4/5 w-4/5 overflow-hidden rounded-xl shadow-soft">
          <img
            src={lifestyle}
            alt="Mulher preparando sua bebida Nutraflow durante a rotina"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute bottom-0 left-0 h-[62%] w-[72%] overflow-hidden rounded-xl border-8 border-card shadow-card sm:border-[10px]">
          <img
            src={galleryDrink}
            alt="Bebida Nutraflow pronta para consumo"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute right-3 bottom-10 max-w-40 rounded-lg border border-border bg-card px-4 py-3 shadow-card sm:right-0 sm:max-w-48 sm:px-5 sm:py-4">
          <p className="eyebrow text-primary">Uma dose por dia</p>
          <p className="mt-1 font-accent text-lg leading-snug text-ink sm:text-xl">
            Consistência que cabe na rotina
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function StickyResults() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: progress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const imageScale = useTransform(progress, [0, 1], [1, 1.05]);

  return (
    <div ref={wrapperRef} className="relative h-[150vh] bg-card">
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden py-20">
        <div className="container-x grid w-full items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow text-primary">Resultado na rotina</p>
              <h2 className="mt-4 max-w-lg font-display text-4xl leading-tight text-ink sm:text-5xl">
                O que muda ao longo das semanas
              </h2>
            </Reveal>

            <ol className="relative mt-10 ml-2 border-l border-dotted border-primary/60 py-1 pl-8 sm:mt-12 sm:pl-10">
              {timeline.map((item, index) => (
                <ScrollStep
                  key={item.label}
                  item={item}
                  progress={progress}
                  range={RANGES[index]!}
                />
              ))}
            </ol>
          </div>

          <Images scale={imageScale} />
        </div>
      </div>
    </div>
  );
}

function StaticResults() {
  return (
    <section className="section overflow-hidden bg-card">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow text-primary">Resultado na rotina</p>
            <h2 className="mt-4 max-w-lg font-display text-4xl leading-tight text-ink sm:text-5xl">
              O que muda ao longo das semanas
            </h2>
          </Reveal>

          <ol className="relative mt-10 ml-2 border-l border-dotted border-primary/60 py-1 pl-8 sm:mt-12 sm:pl-10">
            {timeline.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.08}>
                <StepItem item={item} />
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal>
          <Images />
        </Reveal>
      </div>
    </section>
  );
}

function MarqueeStrip() {
  const items = [
    "ENERGIA",
    "FOCO",
    "DISPOSIÇÃO",
    "BEM-ESTAR",
    "NUTRIÇÃO",
    "EQUILÍBRIO",
    "ROTINA",
  ];

  const content = (
    <>
      {items.map((word) => (
        <span key={word} className="flex items-center gap-6 sm:gap-8">
          <span className="whitespace-nowrap font-display text-sm font-bold uppercase tracking-[0.22em] text-white sm:text-base">
            {word}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
        </span>
      ))}
    </>
  );

  return (
    <div className="relative overflow-hidden bg-primary py-3 sm:py-4">
      <motion.div
        className="flex w-max items-center gap-6 sm:gap-8"
        animate={{ x: [0, "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 22,
            ease: "linear",
          },
        }}
      >
        {content}
        {content}
      </motion.div>
    </div>
  );
}

export function RoutineResultsSection() {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  return (
    <>
      {isMobile || reduced ? <StaticResults /> : <StickyResults />}
      <MarqueeStrip />
    </>
  );
}
