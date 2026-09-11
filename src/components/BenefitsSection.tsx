import { Zap, HeartPulse, Brain, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

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
    <section id="beneficios" className="section scroll-mt-24">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Benefícios</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Por que esse produto virou parte da rotina?
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08}>
              <article className="h-full rounded-3xl border border-border bg-card p-7 transition-shadow duration-500 hover:shadow-card">
                <b.icon size={22} strokeWidth={1.2} className="text-primary" />
                <h3 className="mt-6 text-xl text-ink">{b.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
