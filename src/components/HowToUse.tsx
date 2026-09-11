import { Reveal } from "@/components/ui/Reveal";
import galleryFlatlay from "@/assets/gallery-flatlay.jpg";
import galleryHand from "@/assets/gallery-hand.jpg";
import galleryDrink from "@/assets/gallery-drink.jpg";

const steps = [
  { n: "01", title: "Prepare", text: "200 ml de água gelada em um copo alto.", image: galleryFlatlay },
  { n: "02", title: "Misture", text: "Um dosador raso, mexa por 10 segundos.", image: galleryHand },
  { n: "03", title: "Consuma", text: "Beba pela manhã, antes ou depois do café.", image: galleryDrink },
];

const timeline = [
  { label: "Primeiro uso", text: "Sabor e textura reconhecidos na primeira dose." },
  { label: "Adaptação", text: "O ritual encontra um horário fixo no seu dia." },
  { label: "Uso contínuo", text: "A dose diária deixa de exigir lembrete." },
  { label: "Novo hábito", text: "O ritual passa a fazer parte da rotina." },
];

export function HowToUse() {
  return (
    <section id="como-usar" className="section scroll-mt-24">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Como usar</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Três passos, todos os dias
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div>
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="aspect-4/5 w-full rounded-3xl object-cover"
                />
                <div className="mt-6 flex items-baseline gap-4">
                  <span className="font-display text-3xl text-clay">{s.n}</span>
                  <div>
                    <h3 className="text-xl text-ink">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <p className="eyebrow">Resultado na rotina</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-ink">
              O que muda ao longo das semanas
            </h2>
          </Reveal>

          <ol className="relative border-l border-border pl-8">
            {timeline.map((t, i) => (
              <Reveal key={t.label} delay={i * 0.08}>
                <li className="relative pb-10 last:pb-0">
                  <span className="absolute -left-[2.31rem] top-1.5 h-2 w-2 rounded-full bg-primary" />
                  <h3 className="text-xl text-ink">{t.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
