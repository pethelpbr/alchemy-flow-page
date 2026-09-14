import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Zap, HeartPulse, Brain, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { useIsMobile } from "@/hooks/use-mobile";
import benefitsBg from "@/assets/benefits-bg.jpg";

const benefits = [
  {
    icon: Zap,
    title: "Energia constante",
    text: "Uma dose pela manhã para começar o dia com disposição estável.",
  },
  {
    icon: HeartPulse,
    title: "Corpo em equilíbrio",
    text: "Nutrientes selecionados que complementam a alimentação real.",
  },
  {
    icon: Brain,
    title: "Foco na rotina",
    text: "Pensado para quem tem dias cheios e pouco tempo para preparar.",
  },
  {
    icon: Sparkles,
    title: "Ritual prazeroso",
    text: "Sabor leve de menta e matcha que se dissolve por completo na água.",
  },
];

type Benefit = (typeof benefits)[number];

const ranges: [number, number][] = [
  [0.06, 0.3],
  [0.22, 0.46],
  [0.38, 0.62],
  [0.54, 0.78],
];

function BenefitCard({ b }: { b: Benefit }) {
  return (
    <article className="h-full rounded-2xl border border-card/15 bg-card/10 p-6 backdrop-blur-md transition-colors duration-500 hover:bg-card/15 md:p-7">
      <b.icon strokeWidth={1.4} className="h-5 w-5 text-primary md:h-6 md:w-6" />
      <h3 className="mt-5 text-base tracking-[0.14em] text-card uppercase md:mt-5 md:text-[22px] md:tracking-[0.1em]">{b.title}</h3>
      <p className="mt-3 text-base leading-relaxed text-card/75 md:mt-4 md:text-[18px] md:leading-relaxed">{b.text}</p>
    </article>
  );
}

function ScrollCard({
  b,
  progress,
  range,
}: {
  b: Benefit;
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
      <BenefitCard b={b} />
    </motion.div>
  );
}

function StickyBenefits() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: progress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(progress, [0, 1], [1, 1.08]);
  const veil = useTransform(progress, [0, 1], [0.75, 1]);

  return (
    <div ref={wrapperRef} id="beneficios" className="relative h-[250vh] scroll-mt-20">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.img
          src={benefitsBg}
          alt="Nutraflow Daily Greens sobre mesa de madeira ao lado de uma bebida gelada"
          loading="lazy"
          width={1920}
          height={1088}
          style={{ scale }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <motion.div
          style={{ opacity: veil }}
          className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.18_0.02_60/0.92)_0%,oklch(0.18_0.02_60/0.55)_45%,oklch(0.18_0.02_60/0.35)_100%)]"
        />

        <div className="container-x relative flex h-full flex-col justify-between gap-12 py-20 md:py-24">
          <Reveal className="max-w-xl">
            <p className="eyebrow text-primary">Benefícios</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-card sm:text-5xl lg:text-6xl">
              Por que esse produto virou parte da rotina?
            </h2>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <ScrollCard key={b.title} b={b} progress={progress} range={ranges[i]!} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StaticBenefits() {
  return (
    <section id="beneficios" className="relative scroll-mt-20 overflow-hidden">
      <img
        src={benefitsBg}
        alt="Nutraflow Daily Greens sobre mesa de madeira ao lado de uma bebida gelada"
        loading="lazy"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.18_0.02_60/0.92)_0%,oklch(0.18_0.02_60/0.55)_45%,oklch(0.18_0.02_60/0.35)_100%)]" />

      <div className="container-x relative flex min-h-[42rem] flex-col justify-between gap-16 py-20 md:min-h-[46rem] md:py-28">
        <Reveal className="max-w-xl">
          <p className="eyebrow text-primary">Benefícios</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-card sm:text-5xl lg:text-6xl">
            Por que esse produto virou parte da rotina?
          </h2>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08}>
              <BenefitCard b={b} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BenefitsSection() {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  if (isMobile || reduced) return <StaticBenefits />;
  return <StickyBenefits />;
}
