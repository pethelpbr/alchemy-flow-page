import formulaIngredients from "@/assets/formula-ingredients.jpg";

const items = [
  { name: "Vitaminas", amount: "13" },
  { name: "Minerais", amount: "13" },
  { name: "Aminoácidos", amount: "7" },
  { name: "Probióticos", amount: "5" },
  { name: "Prebióticos", amount: "2" },
];

export function FormulaTechSection() {
  return (
    <section id="tecnologia" className="scroll-mt-20 py-10 md:py-12">
      <div className="container-x">
        <div className="grid items-stretch gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow text-primary">O que tem dentro de cada dose</p>
            <h2 className="mx-auto mt-3 max-w-md text-center font-display text-4xl leading-tight text-ink sm:text-5xl md:mx-0 md:text-left">
              Tecnologia por trás da fórmula
            </h2>

            <div className="mt-6 lg:hidden">
              <img
                src={formulaIngredients}
                alt="Ingredientes da fórmula NutraHelp em pequenos recipientes de vidro"
                loading="lazy"
                width={1200}
                height={800}
                className="h-auto w-full rounded-2xl object-cover shadow-soft"
              />
            </div>

            <ul className="mx-auto mt-8 max-w-md lg:max-w-xl">
              <li className="relative py-1">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-8 top-0 h-px bg-border"
                />
              </li>
              {items.map((item) => (
                <li
                  key={item.name}
                  className="relative grid grid-cols-[1fr_40px_1fr] items-center gap-0 py-4"
                >
                  <span className="translate-x-10 text-center text-[16px] font-bold text-ink">{item.name}</span>
                  <span className="w-10 shrink-0 text-center font-display text-[28px] font-bold leading-none text-primary">
                    {item.amount}
                  </span>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-border"
                  />
                </li>
              ))}

              <li className="relative py-4 text-center">
                <span className="text-[16px] font-bold text-ink">
                  + Ômega 3, Condroitina, Yucca e Proteína
                </span>
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-border"
                />
              </li>

              <li className="py-4 text-center">
                <span className="text-[13px] leading-relaxed text-muted-foreground">
                  Registrado no MAPA &middot; Sem corticoide &middot; A partir de 3 meses
                </span>
              </li>
            </ul>
          </div>

          <div className="hidden h-full min-h-0 lg:block">
            <img
              src={formulaIngredients}
              alt="Ingredientes da fórmula NutraHelp em pequenos recipientes de vidro"
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
