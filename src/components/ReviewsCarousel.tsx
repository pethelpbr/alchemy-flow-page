import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Stars } from "@/components/ui/Stars";
import c1 from "@/assets/customer-1.jpg";
import c2 from "@/assets/customer-2.jpg";
import c3 from "@/assets/customer-3.jpg";

const reviews = [
  {
    text: "Produto incrível, virou parte da minha rotina. Tomo assim que acordo e nem penso mais no assunto.",
    name: "Marina L.",
    city: "São Paulo, SP",
    photo: c1,
  },
  {
    text: "Dissolve de verdade, sem grumos. O sabor é leve e a embalagem é linda na bancada.",
    name: "Rodrigo A.",
    city: "Curitiba, PR",
    photo: c2,
  },
  {
    text: "Comprei o kit de 3 e valeu muito a pena. Praticidade é o que eu mais precisava.",
    name: "Júlia F.",
    city: "Recife, PE",
    photo: c3,
  },
  {
    text: "Já testei várias marcas e essa é a primeira que consegui manter por meses seguidos.",
    name: "Camila R.",
    city: "Belo Horizonte, MG",
    photo: c1,
  },
];

export function ReviewsCarousel() {
  const [index, setIndex] = useState(0);
  const move = (dir: number) =>
    setIndex((i) => (i + dir + reviews.length) % reviews.length);

  const trackRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const measure = () => {
      const card = trackRef.current?.firstElementChild as HTMLElement | undefined;
      if (!card) return;
      setStep(card.offsetWidth + 20);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);


  return (
    <section id="avaliacoes" className="section scroll-mt-24 bg-sand/60">
      <div className="container-x">
        <Reveal>
          <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <div>
              <p className="eyebrow">Avaliações</p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
                Quem já tornou isso um hábito
              </h2>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="font-display text-3xl text-ink">4,9</span>
                <Stars />
                <span className="text-sm text-muted-foreground">2.418 avaliações verificadas</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => move(-1)}
                aria-label="Anterior"
                className="grid h-11 w-11 place-items-center rounded-full border border-border text-ink transition-colors hover:border-primary"
              >
                <ArrowLeft size={16} strokeWidth={1.4} />
              </button>
              <button
                onClick={() => move(1)}
                aria-label="Próximo"
                className="grid h-11 w-11 place-items-center rounded-full border border-border text-ink transition-colors hover:border-primary"
              >
                <ArrowRight size={16} strokeWidth={1.4} />
              </button>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 overflow-hidden">
          <motion.div
            ref={trackRef}
            className="flex gap-5"
            animate={{ x: -index * step }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {reviews.map((r) => (
              <article
                key={r.name}
                className="w-full shrink-0 rounded-3xl border border-border bg-card p-8 md:w-[calc((100%-2.5rem)/3)]"
              >
                <Stars />
                <blockquote className="mt-5 font-display text-2xl leading-snug text-ink">
                  “{r.text}”
                </blockquote>
                <div className="mt-7 flex items-center gap-3">
                  <img
                    src={r.photo}
                    alt={r.name}
                    loading="lazy"
                    width={512}
                    height={512}
                    className="h-11 w-11 shrink-0 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">{r.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{r.city}</p>
                  </div>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
