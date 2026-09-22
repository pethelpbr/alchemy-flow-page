export function VeterinaryAuthoritySection() {
  const cards = [
    {
      quote: "A pele e o pelo refletem muito do que acontece dentro do organismo. Por isso, cuidar da nutrição faz parte de uma rotina completa.",
    },
    {
      quote: "Suplementação não substitui tratamento. Ela entra como um complemento diário para ajudar o organismo a receber nutrientes importantes.",
    },
    {
      quote: "Cada pet tem uma necessidade diferente. Uma fórmula completa ajuda a complementar a alimentação e apoiar uma rotina mais saudável.",
    },
  ];

  return (
    <section className="bg-background px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Quem acompanha a fórmula
            </p>
            <h2 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">
              Desenvolvido com quem entende de saúde pet
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            A fórmula do NutraHelp foi pensada para complementar a rotina dos pets,
            unindo nutrientes essenciais para os principais desafios do dia a dia.
          </p>
        </div>

        <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible">
          {cards.map((card, index) => (
            <article key={index} className="w-[85vw] shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-white md:w-auto">
              <div className="flex h-52 items-center justify-center bg-secondary px-6 text-center text-sm text-muted-foreground">
                Foto de acompanhamento veterinário
              </div>
              <div className="p-6">
                <p className="font-display text-xl leading-relaxed text-foreground">
                  “{card.quote}”
                </p>
                <div className="mt-6 border-t border-border pt-4">
                  <p className="font-semibold text-foreground">Dr(a). [Nome]</p>
                  <p className="text-sm text-muted-foreground">CRMV-[UF] [número]</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 border-t border-border pt-6 text-sm text-muted-foreground">
          NutraHelp é um suplemento alimentar produzido em estabelecimento registrado no MAPA.
        </p>
      </div>
    </section>
  );
}
