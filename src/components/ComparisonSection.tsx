import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import comparisonBg from "@/assets/comparison-bg.jpg";

const rows = [
  { used: "Shampoo medicamentoso", action: "Superfície da pele", duration: "Dias", daily: "Não", flora: "Não", barrier: "Não" },
  { used: "Pomada", action: "Onde passou", duration: "Horas a dias", daily: "Não", flora: "Não", barrier: "Não" },
  { used: "Antialérgicos caros", action: "No sintoma", duration: "Enquanto usa", daily: "Uso controlado", flora: "Não", barrier: "Não" },
  { used: "Troca de ração", action: "Alimentação", duration: "Variável", daily: "Sim", flora: "Em parte", barrier: "Em parte" },
  { used: "Suplemento só de pelo", action: "Fio e pele", duration: "Uso contínuo", daily: "Sim", flora: "Não", barrier: "Sim" },
  { used: "NutraHelp", action: "Flora, pele e pelo", duration: "Uso contínuo", daily: "Sim", flora: "Sim", barrier: "Sim", featured: true },
];

const columns = [
  { key: "action", label: "Onde age" },
  { key: "duration", label: "Quanto dura" },
  { key: "daily", label: "Todo dia" },
  { key: "flora", label: "Cuida da flora" },
  { key: "barrier", label: "Cuida da barreira" },
] as const;

export function ComparisonSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image + overlay */}
      <img
        src={comparisonBg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1920}
        height={1024}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-ink/60" />

      <div className="container-x relative section">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-center font-display text-4xl leading-tight text-background sm:text-5xl">
            O que você já tentou, e o que falta em cada um
          </h2>
        </Reveal>

        <Reveal className="mt-12 hidden sm:block sm:mt-16">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-background/20 shadow-soft">
            <div className="grid grid-cols-[1.35fr_1fr_0.85fr_0.8fr_0.85fr_0.9fr] bg-ink/70 backdrop-blur-sm">
              <div className="px-5 py-5 text-xs font-bold uppercase text-background">O que você usou</div>
              {columns.map((column) => (
                <div key={column.key} className="px-3 py-5 text-xs font-bold uppercase text-background">
                  {column.label}
                </div>
              ))}
            </div>
            {rows.map((row) => (
              <div
                key={row.used}
                className={`grid grid-cols-[1.35fr_1fr_0.85fr_0.8fr_0.85fr_0.9fr] border-t border-background/15 ${
                  row.featured ? "bg-background text-ink" : "bg-ink/45 text-background backdrop-blur-sm"
                }`}
              >
                <div className={`px-5 py-5 text-sm ${row.featured ? "font-bold" : "font-medium"}`}>{row.used}</div>
                {columns.map((column) => (
                  <div key={column.key} className="flex items-center px-3 py-5 text-sm leading-snug">
                    {row.featured && (column.key === "daily" || column.key === "flora" || column.key === "barrier") ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary">
                          <Check size={13} strokeWidth={3} className="text-primary-foreground" />
                        </span>
                        {row[column.key]}
                      </span>
                    ) : row[column.key]}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-10 sm:hidden">
          <div className="mx-auto grid max-w-md gap-3">
            {rows.map((row) => (
              <div
                key={row.used}
                className={`overflow-hidden rounded-xl border ${
                  row.featured ? "border-primary bg-background text-ink shadow-soft" : "border-background/15 bg-ink/45 text-background backdrop-blur-sm"
                }`}
              >
                <div className={`px-4 py-3 text-base font-bold ${row.featured ? "font-display" : ""}`}>{row.used}</div>
                <div className={`grid grid-cols-2 border-t ${row.featured ? "border-border" : "border-background/15"}`}>
                  {columns.map((column) => (
                    <div key={column.key} className="min-w-0 px-4 py-3 odd:border-r odd:border-inherit">
                      <p className={`text-[10px] font-bold uppercase ${row.featured ? "text-terracotta" : "text-background/65"}`}>
                        {column.label}
                      </p>
                      <p className="mt-1 text-sm leading-snug">{row[column.key]}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  );
}
