export function HealthBenefitsSection() {
  const items = [
    { title: "Pele e pelos", text: "Zinco, biotina e ômega 3 — o que te trouxe até aqui.", featured: true },
    { title: "Intestino e digestão", text: "Pré e probióticos e extrato de yucca: cocô mais firme e com menos odor." },
    { title: "Imunidade", text: "Vitaminas A, C, D e E: sistema imunológico mais forte." },
    { title: "Articulações e ossos", text: "Condroitina, enxofre e minerais para suporte e mobilidade." },
    { title: "Coração", text: "Taurina e nutrientes que auxiliam a saúde cardiovascular." },
    { title: "Cérebro", text: "Vitaminas do complexo B e nutrientes para memória e atenção." },
    { title: "Comportamento", text: "Triptofano e nutrientes para uma rotina mais tranquila." },
    { title: "Energia", text: "Ferro e nutrientes para mais disposição no dia a dia." },
  ];

  return (
    <section className="bg-background px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">8 em 1, não só um suplemento de pele</p>
        <h2 className="max-w-5xl font-display text-4xl leading-tight text-ink sm:text-5xl">
          Você veio pela pele. Ele cuida de mais sete coisas.
        </h2>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <article key={item.title} className={`rounded-xl border p-5 ${item.featured ? "bg-[#51402F] text-white" : "bg-white"}`}>
              <h3 className="font-display text-lg font-semibold">{item.title}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${item.featured ? "text-white/90" : "text-muted-text"}`}>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
