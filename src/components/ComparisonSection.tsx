import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { BRAND } from "@/lib/product";
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

        {/* DESKTOP — unchanged */}
        <Reveal className="mt-12 hidden sm:block sm:mt-16">
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-0 sm:grid-cols-[1.2fr_0.9fr_1.2fr]">
              <div />
              <div className="rounded-t-3xl bg-background px-4 pb-5 pt-6 text-center shadow-[0_24px_50px_-20px_rgba(0,0,0,0.55)] sm:px-8">
                <p className="font-display text-base font-bold text-ink sm:text-lg">{BRAND}</p>
              </div>
              <div className="px-3 pb-4 text-center sm:px-6">
                <p className="text-base font-semibold text-background sm:text-base">Fórmula comum</p>
              </div>
            </div>

            {/* Rows */}
            <div className="overflow-hidden rounded-2xl rounded-t-none sm:rounded-3xl sm:rounded-t-none">
              {rows.map((row) => (
                <div
                  key={row.feature}
                  className="grid grid-cols-[1fr_auto_1fr] items-stretch sm:grid-cols-[1.2fr_0.9fr_1.2fr]"
                >
                  <div className="flex items-center border-b border-background/15 bg-ink/40 px-4 py-4 backdrop-blur-sm last:border-b-0 sm:px-7 sm:py-5">
                    <p className="text-xs font-medium text-background sm:text-base">{row.feature}</p>
                  </div>
                  <div className="flex items-center justify-center bg-background px-4 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.55)] sm:px-8">
                    <span className="grid size-7 place-items-center rounded-full bg-primary sm:size-8">
                      <Check size={15} strokeWidth={3} className="text-primary-foreground" />
                    </span>
                  </div>
                  <div className="flex items-center justify-center border-b border-background/15 bg-ink/40 px-3 py-4 text-center backdrop-blur-sm last:border-b-0 sm:px-6 sm:py-5">
                    <p className="text-[11px] text-background/75 sm:text-base">{row.common}</p>
                  </div>
                </div>
              ))}
              {/* Bottom cap of the brand card */}
              <div className="grid grid-cols-[1fr_auto_1fr] items-stretch sm:grid-cols-[1.2fr_0.9fr_1.2fr]">
                <div />
                <div className="rounded-b-3xl bg-background py-4 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.55)]" />
                <div />
              </div>
            </div>
          </div>
        </Reveal>

        {/* MOBILE — reference style */}
        <Reveal className="mt-10 sm:hidden">
          <div className="relative mx-auto max-w-md">
            {/* Product labels */}
            <div className="relative mb-1 flex items-end justify-center gap-2">
              <div className="z-10 w-[45%] rounded-t-3xl bg-background px-3 pb-4 pt-5 text-center shadow-[0_24px_50px_-20px_rgba(0,0,0,0.55)]">
                <p className="font-display text-base font-bold text-ink">{BRAND}</p>
              </div>
              <div className="w-[45%] rounded-t-2xl bg-ink/40 px-3 pb-3 pt-4 text-center backdrop-blur-sm">
                <p className="text-sm font-semibold text-background/90">Fórmula comum</p>
              </div>
            </div>

            {/* Table body */}
            <div className="relative overflow-hidden rounded-2xl">
              {/* Center brand pill */}
              <div className="absolute bottom-0 left-1/2 top-0 z-10 w-[24%] -translate-x-1/2 rounded-3xl bg-background shadow-[0_24px_50px_-20px_rgba(0,0,0,0.55)]" />

              <div className="relative z-0">
                {rows.map((row, i) => (
                  <div key={row.feature} className="grid grid-cols-[1fr_24%_1fr] items-stretch">
                    <div
                      className={`flex items-center border-b border-background/15 bg-ink/50 px-3 py-4 backdrop-blur-sm ${
                        i === 0 ? "rounded-tl-2xl" : ""
                      } ${i === rows.length - 1 ? "rounded-bl-2xl border-b-0" : ""}`}
                    >
                      <p className="text-xs font-medium leading-snug text-background">{row.feature}</p>
                    </div>
                    <div className="z-20 flex items-center justify-center px-1 py-4">
                      <span className="grid size-7 place-items-center rounded-full bg-primary">
                        <Check size={14} strokeWidth={3} className="text-primary-foreground" />
                      </span>
                    </div>
                    <div
                      className={`flex items-center justify-center border-b border-background/15 bg-ink/50 px-2 py-4 text-center backdrop-blur-sm ${
                        i === 0 ? "rounded-tr-2xl" : ""
                      } ${i === rows.length - 1 ? "rounded-br-2xl border-b-0" : ""}`}
                    >
                      <p className="text-[11px] leading-snug text-background/80">{row.common}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
