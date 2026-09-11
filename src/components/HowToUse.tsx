import { Reveal } from "@/components/ui/Reveal";
import galleryFlatlay from "@/assets/gallery-flatlay.jpg";
import galleryHand from "@/assets/gallery-hand.jpg";
import galleryDrink from "@/assets/gallery-drink.jpg";

const steps = [
  { n: "01", title: "Prepare", text: "200 ml de água gelada em um copo alto.", image: galleryFlatlay },
  { n: "02", title: "Misture", text: "Um dosador raso, mexa por 10 segundos.", image: galleryHand },
  { n: "03", title: "Consuma", text: "Beba pela manhã, antes ou depois do café.", image: galleryDrink },
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

      </div>
    </section>
  );
}
