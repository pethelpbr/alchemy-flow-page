import kitTrio from "@/assets/kit-bf-completo.png.asset.json";

export function KitCompleteBanner({ goTo }: { goTo: (id: string) => void }) {
  return (
    <section className="container-x pt-14">
      <div className="flex min-h-[300px] flex-col items-center gap-8 overflow-hidden rounded-[20px] bg-night px-6 py-10 md:flex-row md:justify-between md:px-14 md:py-0">
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
        <div className="flex w-full flex-1 items-center justify-center md:h-[250px]">
          <img
            src={kitTrio.url}
            alt="NutraHelp, PataHelp e BocaHelp juntos"
            className="max-h-[220px] w-auto max-w-full object-contain md:max-h-[250px]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
