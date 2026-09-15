import formulaIngredients from "@/assets/formula-ingredients.jpg";

const items = [
  { name: "Cúrcuma longa", amount: "500mg" },
  { name: "Matcha cerimonial", amount: "250mg" },
  { name: "Blend de minerais", amount: "300mg" },
  { name: "Vitamina C", amount: "45mg" },
];

export function FormulaTechSection() {
  return (
    <section id="tecnologia" className="section scroll-mt-20">
      <div className="container-x">
        <div className="grid items-stretch gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow text-primary">O que tem dentro de cada dose</p>
            <h2 className="mt-3 max-w-md font-display text-4xl leading-tight text-ink sm:text-5xl">
              Tecnologia por trás da fórmula
            </h2>

            <div className="mt-6 lg:hidden">
              <img
                src={formulaIngredients}
                alt="Ingredientes da fórmula Nutraflow em pequenos recipientes de vidro"
                loading="lazy"
                width={1200}
                height={800}
                className="h-auto w-full rounded-2xl object-cover shadow-soft"
              />
            </div>

            <ul className="mt-8">
              {items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-baseline justify-between border-b border-border py-4 first:border-t"
                >
                  <span className="text-[15px] font-medium text-ink">{item.name}</span>
                  <span className="text-[15px] font-medium text-primary">{item.amount}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              Cada ativo entra por um motivo. Doses transparentes, rastreabilidade de origem e
              laudo de pureza por lote.
            </p>
          </div>

          <div className="hidden h-full min-h-0 lg:block">
            <img
              src={formulaIngredients}
              alt="Ingredientes da fórmula Nutraflow em pequenos recipientes de vidro"
              loading="lazy"
              width={1200}
              height={800}
              className="h-full w-full rounded-2xl object-cover shadow-soft"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
