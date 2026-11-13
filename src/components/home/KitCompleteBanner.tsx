import kitTrio from "@/assets/kit-bf-completo.png.asset.json";

export function KitCompleteBanner({ goTo }: { goTo: (id: string) => void }) {
  return (
    <section className="container-x pt-14">
      <div className="flex min-h-[340px] flex-col items-center gap-10 overflow-hidden rounded-[20px] bg-night px-8 py-12 md:flex-row md:justify-between md:gap-16 md:px-20 md:py-14">
        <div className="w-full md:w-[580px] md:max-w-[56%]">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-night-eyebrow">Kit completo</p>
          <h2 className="mt-3 font-display text-[30px] leading-[1.1] tracking-[-0.02em] text-night-foreground md:text-[38px]">
            Os três juntos funcionam melhor
          </h2>
          <p className="mt-4 max-w-[460px] text-base leading-relaxed text-night-muted">
            Boca, pele e intestino não são problemas separados — e no kit sai mais barato do que comprar um por um.
          </p>
          <button
            type="button"
            onClick={() => goTo("combos")}
            className="mt-6 inline-flex h-[52px] items-center justify-center rounded-full bg-primary px-8 text-[15px] font-extrabold uppercase tracking-[0.04em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            Montar meu kit
          </button>
        </div>
        {/* A foto do trio é quadrada: o cartão quadrado mostra a arte inteira, sem recorte nem emenda. */}
        <div className="relative h-[250px] w-[250px] shrink-0 overflow-hidden rounded-2xl bg-clay md:h-[260px] md:w-[260px]">
          <img
            src={kitTrio.url}
            alt="NutraHelp, PataHelp e BocaHelp juntos"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
