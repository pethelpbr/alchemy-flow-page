import { Zap, HeartPulse, Brain, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
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

export function BenefitsSection() {
  return (
    <section id="beneficios" className="relative scroll-mt-24 overflow-hidden">
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
              <article className="h-full rounded-2xl border border-card/15 bg-card/10 p-6 backdrop-blur-md transition-colors duration-500 hover:bg-card/15">
                <b.icon size={20} strokeWidth={1.4} className="text-primary" />
                <h3 className="mt-5 text-sm tracking-[0.14em] text-card uppercase">{b.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-card/75">{b.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
