import { Check, X } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { BRAND } from "@/lib/product";

const rows = [
  { common: "Menos praticidade no dia a dia", ours: "Dose única, pronta em 30 segundos" },
  { common: "Experiência simples e genérica", ours: "Sabor leve e textura sem grumos" },
  { common: "Menos diferenciais na fórmula", ours: "16 ativos com dose transparente" },
  { common: "Origem pouco clara", ours: "Laudo de pureza por lote" },
];

export function ComparisonSection() {
  return (
    <section className="section bg-sand/60">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Comparativo</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
            A diferença está no detalhe
          </h2>
        </Reveal>

        <Reveal className="mt-12">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-border bg-background/50 p-7">
              <h3 className="text-xl text-muted-foreground">Fórmula comum</h3>
              <ul className="mt-6 flex flex-col gap-4">
                {rows.map((r) => (
                  <li key={r.common} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <X size={16} strokeWidth={1.5} className="mt-0.5 shrink-0" />
                    {r.common}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-primary/25 bg-card p-7 shadow-card">
              <h3 className="text-xl text-ink">Fórmula {BRAND}</h3>
              <ul className="mt-6 flex flex-col gap-4">
                {rows.map((r) => (
                  <li key={r.ours} className="flex items-start gap-3 text-sm text-ink">
                    <Check size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-primary" />
                    {r.ours}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
