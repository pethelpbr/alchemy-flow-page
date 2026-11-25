import failedTreatments from "@/assets/itching-origins-banner.png.asset.json";
import previousAttemptsImage from "@/assets/failed-treatments.jpg";
import intestineIcon from "@/assets/icon-intestino.png.asset.json";
import skinBarrierIcon from "@/assets/icon-barreira-pele.png.asset.json";

const pill = "inline-flex items-center rounded-full border px-[13px] py-[7px] text-[13.5px] leading-none";
const lightPill = `${pill} border-border bg-card text-ink`;
const darkPill = `${pill} border-background/35 bg-background/15 text-background`;

export function PataItchingOriginsSection() {
  return (
    <section className="bg-background-secondary px-6 pb-12 pt-10 md:pb-16 md:pt-14">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-[13px] text-[12px] font-semibold uppercase tracking-[0.14em] text-primary">
            Por que sempre volta
          </p>
          <h2 className="mb-3 font-display text-[34px] font-bold leading-[1.08] tracking-[-0.015em] text-ink sm:whitespace-nowrap sm:text-[length:clamp(34px,calc((100vw_-_48px)/17.5),42px)]">
            A coceira tem dois lugares de origem
          </h2>
          <p className="mb-[30px] text-[16px] leading-[1.58] text-muted-foreground sm:text-[17.5px]">
            Tratar só uma delas não basta. Por isso melhora e nunca resolve.
          </p>
        </div>

        <div className="mb-5 grid grid-cols-1 gap-6 md:grid-cols-2">
          <article className="flex flex-col rounded-2xl border border-border bg-card p-7 sm:p-[30px_32px]">
            <div className="mb-4 flex items-center gap-[14px]">
              <img src={intestineIcon.url} alt="" aria-hidden="true" className="h-10 w-auto shrink-0" />
              <h3 className="font-display text-[24px] font-bold leading-[1.15] text-ink sm:text-[26px]">O intestino</h3>
            </div>
            <p className="mb-[22px] text-[15.5px] leading-[1.58] text-muted-foreground sm:text-[16.5px]">
              É no intestino que fica a maior parte da defesa do organismo. Quando a flora está desequilibrada, o corpo passa a reagir a coisas que antes não incomodavam — e quem sofre é a pele.
            </p>
            <p className="mb-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-terracotta">O que você já tentou aqui</p>
            <div className="mb-[18px] flex flex-wrap gap-[7px]">
              <span className={lightPill}>Troca de ração</span>
              <span className={lightPill}>Probiótico avulso</span>
              <span className={lightPill}>Comida natural</span>
            </div>
            <p className="mt-auto text-[15px] font-bold leading-[1.5] text-primary sm:text-[16px]">Mexe no intestino, mas não repõe o que falta na pele.</p>
          </article>

          <article className="flex flex-col rounded-2xl border border-border bg-card p-7 sm:p-[30px_32px]">
            <div className="mb-4 flex items-center gap-[14px]">
              <img src={skinBarrierIcon.url} alt="" aria-hidden="true" className="h-10 w-auto shrink-0" />
              <h3 className="font-display text-[24px] font-bold leading-[1.15] text-ink sm:text-[26px]">A barreira da pele</h3>
            </div>
            <p className="mb-[22px] text-[15.5px] leading-[1.58] text-muted-foreground sm:text-[16.5px]">
              É a camada que protege o corpo por fora. Quando a barreira está enfraquecida, poeira e ácaro irritam a pele e abrem brecha para bactérias e fungos.
            </p>
            <p className="mb-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-terracotta">O que você já tentou aqui</p>
            <div className="mb-[18px] flex flex-wrap gap-[7px]">
              <span className={lightPill}>Shampoos</span>
              <span className={lightPill}>Pomadas</span>
              <span className={lightPill}>Sprays</span>
            </div>
            <p className="mt-auto text-[15px] font-bold leading-[1.5] text-primary sm:text-[16px]">Age por fora, mas não reconstrói a pele por dentro.</p>
          </article>
        </div>

        <div className="relative mb-[38px] h-[260px] overflow-hidden rounded-2xl bg-ink sm:h-[230px]">
          <img src={previousAttemptsImage} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover md:hidden" />
          <img src={failedTreatments.url} alt="Produtos e tentativas de cuidado para coceira" className="absolute inset-0 hidden h-full w-full object-cover md:block" />
          <div className="absolute inset-0 bg-ink/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-8">
            <div className="max-w-[600px]">
              <p className="mb-2 font-display text-[21px] font-bold leading-[1.14] text-background sm:text-[23px]">Nem no intestino, nem na pele</p>
              <div className="mb-2 flex flex-wrap gap-[7px]">
                <span className={darkPill}>Antialérgico</span>
                <span className={darkPill}>Corticoide</span>
                <span className={darkPill}>Antibiótico</span>
              </div>
              <p className="text-[14px] leading-[1.5] text-background/85 sm:text-[15px]">Desligam a reação enquanto você usa. Não mexem em nenhuma das duas origens, por isso a coceira volta quando o tratamento acaba.</p>
            </div>
          </div>
        </div>

        <div className="mb-[26px] flex items-center gap-5">
          <span className="h-px flex-1 bg-border" />
          <span className="text-center text-[11px] font-bold uppercase tracking-[0.12em] text-primary sm:whitespace-nowrap sm:text-[13px]">O PataHelp cuida da pele por fora</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <article className="rounded-2xl bg-ink p-6 sm:p-[26px_28px]">
            <span className="inline-block rounded-full bg-gift px-[11px] py-1.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-gift-foreground">No contato com a pele</span>
            <h3 className="mb-[9px] mt-[14px] font-display text-[24px] font-bold leading-[1.15] text-background sm:text-[26px]">Acalma e hidrata</h3>
            <p className="text-[15.5px] leading-[1.55] text-background/85 sm:text-[16.5px]">Óleos de calêndula, coco e jojoba ajudam a acalmar a irritação e a devolver a maciez à pele ressecada.</p>
          </article>

          <article className="rounded-2xl bg-ink p-6 sm:p-[26px_28px]">
            <span className="inline-block rounded-full bg-gift px-[11px] py-1.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-gift-foreground">Na proteção diária</span>
            <h3 className="mb-[9px] mt-[14px] font-display text-[24px] font-bold leading-[1.15] text-background sm:text-[26px]">Nutre e protege</h3>
            <p className="text-[15.5px] leading-[1.55] text-background/85 sm:text-[16.5px]">Manteiga de karité, cera de abelha e vitamina E formam uma camada nutritiva que protege patas, focinho e pele.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
