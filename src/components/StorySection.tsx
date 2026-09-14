import { Reveal } from "@/components/ui/Reveal";
import lifestyle from "@/assets/lifestyle-1.jpg";

const points = [
  { label: "O produto", text: "Pó fino de dissolução imediata, sem grumos e sem gosto residual." },
  { label: "A fórmula", text: "16 ativos entre botânicos, vitaminas e minerais em dose diária única." },
  { label: "O consumo", text: "1 dosador em 200 ml de água gelada, uma vez ao dia." },
];

export function StorySection() {
  return (
    <section className="section bg-sand/60">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        <Reveal>
          <img
            src={lifestyle}
            alt="Mulher preparando a bebida em uma cozinha iluminada"
            loading="lazy"
            width={1200}
            height={1408}
            className="aspect-4/5 w-full rounded-3xl object-cover"
          />
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">A rotina real</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
              Nem sempre conseguimos manter uma rotina perfeita.
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              <span className="font-sans text-lg font-medium text-ink">Entre trabalho, deslocamento e vida pessoal,</span>{" "}
              a nutrição costuma ser a primeira coisa
              a ficar para depois. Criamos uma fórmula prática para facilitar seu dia — sem
              preparo, sem complicação, sem excesso de potes na bancada.
            </p>
          </Reveal>

          <div className="mt-10 divide-y divide-border border-y border-border">
            {points.map((p, i) => (
              <Reveal key={p.label} delay={i * 0.08}>
                <div className="grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)] gap-4 py-5">
                  <span className="eyebrow pt-1">{p.label}</span>
                  <p className="text-base leading-relaxed text-ink">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
