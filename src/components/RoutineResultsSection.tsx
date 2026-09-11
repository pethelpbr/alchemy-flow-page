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
  { label: "Primeiro uso", text: "Sabor e textura reconhecidos na primeira dose." },
  { label: "Adaptação", text: "O ritual encontra um horário fixo no seu dia." },
  { label: "Uso contínuo", text: "A dose diária deixa de exigir lembrete." },
  { label: "Novo hábito", text: "O ritual passa a fazer parte da rotina." },
];

type Step = (typeof timeline)[number];

const ranges: [number, number][] = [
  [0.05, 0.2],
  [0.13, 0.28],
  [0.21, 0.36],
  [0.29, 0.44],
];

function StepItem({ item }: { item: Step }) {
  return (
    <li className="relative pb-9 last:pb-0 sm:pb-10">
      <span className="absolute -left-[2.38rem] top-1.5 h-3.5 w-3.5 rounded-full bg-primary ring-8 ring-card sm:-left-[2.62rem]" />
      <p className="text-lg font-semibold text-ink sm:text-xl">{item.label}</p>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
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
  const eased = (v: number) => {
    const t = Math.max(0, Math.min(1, (v - start) / (end - start)));
    return 1 - Math.pow(1 - t, 3);
  };

  const opacity = useTransform(progress, (v) => eased(v));
  const y = useTransform(progress, (v) => 12 * (1 - eased(v)));
  const scale = useTransform(progress, (v) => 0.98 + 0.02 * eased(v));

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

            <ol className="relative mt-10 ml-2 border-l border-border py-1 pl-8 sm:mt-12 sm:pl-10">
              {timeline.map((item, index) => (
                <ScrollStep
                  key={item.label}
                  item={item}
                  progress={progress}
                  range={ranges[index]!}
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

          <ol className="relative mt-10 ml-2 border-l border-border py-1 pl-8 sm:mt-12 sm:pl-10">
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

export function RoutineResultsSection() {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  if (isMobile || reduced) return <StaticResults />;
  return <StickyResults />;
}
