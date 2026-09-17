import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Zap, HeartPulse, Brain, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { useIsMobile } from "@/hooks/use-mobile";
import benefitsBg from "@/assets/benefits-bg.jpg";

const benefits = [
  {
    icon: Zap,
    title: "Noites inteiras",
    text: "Menos pata batendo no chão de madrugada, menos lambida na mesma pata. Ele dorme — e você também.",
  },
  {
    icon: HeartPulse,
    title: "Pele mais calma",
    text: "Menos vermelhidão e menos irritação. As feridinhas de unha param de abrir de novo no mesmo lugar.",
  },
  {
    icon: Brain,
    title: "Pelo que volta",
    text: "Menos queda, fio mais forte e as falhas começando a fechar. Menos pelo pela casa.",
  },
  {
    icon: Sparkles,
    title: "O cão de antes",
    text: "Mais disposição, mais brincadeira, menos tempo parado se coçando no canto.",
  },
];

type Benefit = (typeof benefits)[number];

function BenefitCard({ b }: { b: Benefit }) {
  return (
    <article className="h-full rounded-xl border border-card/15 bg-card/10 p-6 backdrop-blur-md transition-colors duration-500 hover:bg-card/15 md:p-7">
      <b.icon strokeWidth={1.4} className="h-5 w-5 text-primary md:h-6 md:w-6" />
      <h3 className="mt-5 text-base tracking-[0.14em] text-card uppercase md:mt-5 md:text-[22px] md:tracking-[0.1em]">{b.title}</h3>
      <p className="mt-3 text-base leading-relaxed text-card/75 md:mt-4 md:text-[18px] md:leading-relaxed">{b.text}</p>
    </article>
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
            {benefits.map((b) => (
              <BenefitCard key={b.title} b={b} />
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
          {benefits.map((b) => (
            <BenefitCard key={b.title} b={b} />
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
