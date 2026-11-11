import vetRivaldo from "@/assets/vet-rivaldo-kit-bf-final-v2.png.asset.json";

// Seções do kit Black Friday com conteúdo provisório ([PREENCHER]) para editar depois.

function Tag({ children }: { children: string }) {
  return (
    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary">
      {children}
    </span>
  );
}

function Slot({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted p-4 text-center text-xs font-bold uppercase text-muted-foreground ${className}`}
    >
      {label}
    </div>
  );
}

const stats = [
  { product: "NutraHelp", percentage: 96, text: "notaram o pet se coçando e se lambendo menos" },
  { product: "PataHelp", percentage: 97, text: "viram irritações e feridas cicatrizando mais rápido" },
  { product: "BocaHelp", percentage: 98, text: "notaram o hálito mais fresco" },
];

export function KitStatsSection() {
  return (
    <section className="bg-primary">
      <div className="container-x py-10 md:py-12">
        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-white/25">
          {stats.map((s) => (
            <div key={s.product} className="text-center">
              <p className="font-display text-5xl leading-none text-white">{s.percentage}%</p>
              <p className="mx-auto mt-2 max-w-[230px] text-sm text-[#FFEBD9]">{s.text}</p>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#7A2E02]">{s.product}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


export function KitVetSection() {
  return (
    <section className="section bf-light">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl text-foreground lg:text-5xl">Por que veterinários indicam</h2>
        </div>
        <div className="bf-card-tinted mx-auto mt-10 grid max-w-4xl items-center gap-6 rounded-2xl border border-border bg-card p-6 md:grid-cols-[240px_1fr]">
          <img
            src={vetRivaldo.url}
            alt="Dr. Rivaldo Júnior, médico veterinário"
            className="aspect-square w-full rounded-xl object-cover"
          />
          <div>
            <p className="text-lg italic text-foreground">
              “As maiores queixas que chegam no meu consultório são coceira, lambedura excessiva e mau
              hálito. Indico os produtos da PetHelp porque é o que eu vejo funcionar na prática.”
            </p>
            <p className="mt-4 font-bold text-foreground">Dr. Rivaldo Jr</p>
            <p className="text-sm text-muted-foreground">CRMV 5731-PE</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function KitTestimonialsSection() {
  return (
    <section className="section bf-light">
      <div className="container-x">
        <h2 className="text-center font-display text-4xl text-foreground lg:text-5xl">Experiências reais de quem já usa</h2>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          <strong className="text-foreground">[4,8]</strong> <span className="text-primary">★★★★★</span> · [Nº] avaliações — preencher com o número real
        </p>
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <article key={i} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-primary">★★★★★</p>
              <p className="mt-2 text-sm italic text-foreground">“[DEPOIMENTO REAL DE CLIENTE — copiar da avaliação, sem editar.]”</p>
              <p className="mt-3 text-sm font-bold text-foreground">[NOME]</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
