import { Reveal } from "@/components/ui/Reveal";
import ingredients from "@/assets/ingredients.jpg";
import galleryDrink from "@/assets/gallery-drink.jpg";
import galleryFlatlay from "@/assets/gallery-flatlay.jpg";

const items = [
  {
    image: ingredients,
    name: "Cúrcuma longa",
    description: "Raiz padronizada em curcuminoides, extraída a frio.",
    benefit: "Auxilia na rotina de performance.",
  },
  {
    image: galleryDrink,
    name: "Matcha cerimonial",
    description: "Folha jovem moída em pedra, colheita única.",
    benefit: "Energia sem o pico do café.",
  },
  {
    image: galleryFlatlay,
    name: "Blend de minerais",
    description: "Magnésio, zinco e vitaminas do complexo B quelados.",
    benefit: "Componente escolhido para complementar a fórmula.",
  },
];

export function IngredientsSection() {
  return (
    <section id="ingredientes" className="section scroll-mt-24">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Fórmula</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
            O que existe dentro da fórmula?
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
            Cada ativo entra por um motivo. Doses transparentes, rastreabilidade de origem e
            laudo de pureza por lote.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.name} delay={i * 0.08}>
              <article className="h-full overflow-hidden rounded-3xl border border-border bg-card">
                <img
                  src={it.image}
                  alt={it.name}
                  loading="lazy"
                  className="aspect-4/3 w-full object-cover"
                />
                <div className="p-7">
                  <h3 className="text-2xl text-ink">{it.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {it.description}
                  </p>
                  <p className="mt-5 border-t border-border pt-4 text-sm text-primary">
                    {it.benefit}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
