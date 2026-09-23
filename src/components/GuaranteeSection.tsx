import { Reveal } from "@/components/ui/Reveal";

export function GuaranteeSection() {
  return (
    <section className="bg-[#51402F] py-10 md:py-14">
      <div className="container-x">
        <Reveal>
          <div className="flex flex-col items-center gap-8 md:flex-row md:gap-10">
            <div className="flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-full bg-[#F7CF63] text-[#51402F] md:h-32 md:w-32">
              <span className="font-display text-5xl leading-none md:text-6xl">60</span>
              <span className="mt-1 text-[8px] font-bold uppercase tracking-[0.18em]">dias de garantia</span>
            </div>

            <div className="max-w-3xl text-center text-white md:text-left">
              <h2 className="font-display text-3xl leading-tight md:text-4xl">
                Você tem 60 dias para ver resultado. Ou o seu dinheiro de volta.
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-white/85 md:text-base">
                Use por dois meses, na dose certa para o peso do seu pet. Se não virar diferença,
                você fala com a gente no WhatsApp e devolvemos 100% do valor.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
