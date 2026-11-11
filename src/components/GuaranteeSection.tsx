import { Reveal } from "@/components/ui/Reveal";
import guaranteeSeal from "@/assets/garantia-60-dias.png.asset.json";

export function GuaranteeSection({ tone = "brown" }: { tone?: "brown" | "yellow" }) {
  const yellow = tone === "yellow";
  return (
    <section className={`py-10 md:py-14 ${yellow ? "bf-yellow" : "bg-[#51402F]"}`}>
      <div className="container-x">
        <Reveal>
          <div className="flex flex-col items-center gap-8 md:flex-row md:gap-10">
            <img
              src={guaranteeSeal.url}
              alt="Selo de garantia de 60 dias — 100% dinheiro de volta"
              className="h-32 w-32 shrink-0 object-contain md:h-36 md:w-36"
            />


            <div className={`max-w-3xl text-center md:text-left ${yellow ? "text-[#3A2E22]" : "text-white"}`}>
              <h2 className="font-display text-3xl leading-tight md:text-4xl">
                Se não funcionar, o dinheiro volta
              </h2>

              <p className={`mt-4 text-sm leading-relaxed md:text-base ${yellow ? "text-[#5A4C38]" : "text-white/85"}`}>
                Use por dois meses, na dose certa para o peso do seu pet. Se ele(a) não se adaptar ao produto ou os resultados não forem visíveis, devolvemos 100% do valor.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
