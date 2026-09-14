import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { BRAND } from "@/lib/product";
import { cn } from "@/lib/utils";
import comparisonBg from "@/assets/comparison-bg.jpg";

const rows = [
  { feature: "Blend com 16 ativos naturais", common: "Geralmente não contém" },
  { feature: "Dose única, pronta em 30 segundos", common: "Pode variar" },
  { feature: "Sabor leve e textura sem grumos", common: "Normalmente sem sabor" },
  { feature: "Dose transparente de cada ativo", common: "Nem sempre informado" },
  { feature: "Laudo de pureza por lote", common: "Pode variar" },
];

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
          <h2 className="mx-auto max-w-2xl text-center font-display text-4xl leading-tight text-background sm:text-5xl">
            Mais completa que uma fórmula comum
          </h2>
        </Reveal>

        <Reveal className="mt-12 sm:mt-16">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-stretch gap-0">
              {/* Left column labels (desktop only) */}
              <div className="hidden flex-1 flex-col sm:flex">
                <div className="h-[72px]" />
                {rows.map((row) => (
                  <div
                    key={`left-${row.feature}`}
                    className="flex flex-1 items-center border-b border-background/15 bg-ink/40 px-7 py-5 backdrop-blur-sm last:border-b-0"
                  >
                    <p className="text-base font-medium text-background">{row.feature}</p>
                  </div>
                ))}
                <div className="h-9" />
              </div>

              {/* Center brand card */}
              <div className="w-full shrink-0 rounded-3xl bg-background px-4 pb-5 pt-6 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.55)] sm:w-auto sm:px-8">
                <p className="pb-6 text-center font-display text-base font-bold text-ink sm:pb-7 sm:text-lg">
                  {BRAND}
                </p>
                <div className="flex flex-col">
                  {rows.map((row, i) => (
                    <div
                      key={`center-${row.feature}`}
                      className={cn(
                        "flex min-h-[64px] items-center justify-center py-4 sm:min-h-[72px] sm:py-5",
                        i !== rows.length - 1 && "border-b border-border/40",
                      )}
                    >
                      <span className="grid size-7 place-items-center rounded-full bg-primary sm:size-8">
                        <Check size={15} strokeWidth={3} className="text-primary-foreground" />
                      </span>
                    </div>
                  ))}
                </div>
                <div className="h-4 sm:h-5" />
              </div>

              {/* Right column labels */}
              <div className="flex flex-1 flex-col">
                <div className="flex h-[72px] items-end justify-center pb-4">
                  <p className="text-base font-semibold text-background">Fórmula comum</p>
                </div>
                {rows.map((row) => (
                  <div
                    key={`right-${row.feature}`}
                    className="flex flex-1 items-center justify-center border-b border-background/15 bg-ink/40 px-3 py-4 text-center backdrop-blur-sm last:border-b-0 sm:px-6 sm:py-5"
                  >
                    <p className="text-[11px] text-background/75 sm:text-base">{row.common}</p>
                  </div>
                ))}
                <div className="h-9" />
              </div>
            </div>

            {/* Mobile feature labels below each row */}
            <div className="mt-4 flex flex-col gap-3 sm:hidden">
              {rows.map((row) => (
                <div key={`mobile-${row.feature}`} className="flex items-center gap-3 rounded-xl bg-ink/40 px-4 py-3 backdrop-blur-sm">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary">
                    <Check size={13} strokeWidth={3} className="text-primary-foreground" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-background">{row.feature}</p>
                    <p className="text-xs text-background/60">Fórmula comum: {row.common}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
