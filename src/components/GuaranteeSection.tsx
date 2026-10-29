import { Reveal } from "@/components/ui/Reveal";
import guaranteeSeal from "@/assets/garantia-60-dias.png.asset.json";

export function GuaranteeSection() {
  return (
    <section className="bg-[#51402F] py-10 md:py-14">
      <div className="container-x">
        <Reveal>
          <div className="flex flex-col items-center gap-8 md:flex-row md:gap-10">
            <img
              src={guaranteeSeal.url}
              alt="Selo de garantia de 60 dias — 100% dinheiro de volta"
              className="h-32 w-32 shrink-0 object-contain md:h-36 md:w-36"
            />


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
