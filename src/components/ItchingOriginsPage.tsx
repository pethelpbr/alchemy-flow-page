import { useEffect } from "react";
import previousAttemptsImage from "@/assets/failed-treatments.jpg";
import failedTreatments from "@/assets/itching-origins-banner.png.asset.json";
import galleryHand from "@/assets/gallery-hand.jpg";

function IntestineIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <path d="M7 3v5a3 3 0 0 0 3 3h1a3 3 0 0 1 3 3v2a3 3 0 0 0 3 3" />
      <path d="M17 3v4a2 2 0 0 1-2 2h-1" />
      <path d="M7 21v-3a2 2 0 0 1 2-2h1" />
    </svg>
  );
}

function SkinBarrierIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <path d="M3 8h18" />
      <path d="M3 13h18" />
      <path d="M3 18h18" />
      <path d="M9 8V4" />
      <path d="M15 8V5" />
    </svg>
  );
}

const pill = "inline-flex items-center rounded-full border px-[13px] py-[7px] text-[13.5px] leading-none";
const lightPill = `${pill} border-[#E0D5C0] bg-white text-[#4A403A]`;
const darkPill = `${pill} border-white/35 bg-white/[0.14] text-[#FDFAF7]`;

export function ItchingOriginsPage() {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <section className="bg-[#F7F1E8] py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-[72px]">
        <p className="mb-[13px] text-[12px] font-semibold uppercase tracking-[0.14em] text-[#FF6A1B]">
          Por que sempre volta
        </p>
        <h2 className="mb-3 max-w-[720px] font-display text-[34px] font-bold leading-[1.08] tracking-[-0.015em] text-[#504333] sm:text-[42px]">
          A coceira tem dois lugares de origem
        </h2>
        <p className="mb-[30px] max-w-[850px] text-[16px] leading-[1.58] text-[#3D3530] sm:text-[17.5px]">
          Tudo que você já tentou alcança no máximo uma delas. Por isso melhora e nunca resolve.
        </p>

        <div className="mb-5 grid grid-cols-1 gap-6 md:grid-cols-2">
          <article className="flex flex-col rounded-2xl border border-[#E0D5C0] bg-white p-7 sm:p-[30px_32px]">
            <div className="mb-4 flex items-center gap-[14px] text-[#B43F02]">
              <IntestineIcon />
              <h3 className="font-display text-[24px] font-bold leading-[1.15] text-[#504333] sm:text-[26px]">O intestino</h3>
            </div>
            <p className="mb-[22px] text-[15.5px] leading-[1.58] text-[#3D3530] sm:text-[16.5px]">
              É de lá que vem a maior parte da defesa do organismo. Quando a flora desequilibra, o corpo passa a reagir a coisas que não reagiria, e a pele é onde essa reação aparece.
            </p>
            <p className="mb-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-[#8A6A3A]">O que você já tentou aqui</p>
            <div className="mb-[18px] flex flex-wrap gap-[7px]">
              <span className={lightPill}>Troca de ração</span>
              <span className={lightPill}>Probiótico avulso</span>
              <span className={lightPill}>Comida natural</span>
            </div>
            <p className="mt-auto text-[15px] font-bold leading-[1.5] text-[#B43F02] sm:text-[16px]">Mexe no intestino, mas não repõe o que falta na pele.</p>
          </article>

          <article className="flex flex-col rounded-2xl border border-[#E0D5C0] bg-white p-7 sm:p-[30px_32px]">
            <div className="mb-4 flex items-center gap-[14px] text-[#B43F02]">
              <SkinBarrierIcon />
              <h3 className="font-display text-[24px] font-bold leading-[1.15] text-[#504333] sm:text-[26px]">A barreira da pele</h3>
            </div>
            <p className="mb-[22px] text-[15.5px] leading-[1.58] text-[#3D3530] sm:text-[16.5px]">
              É a proteção natural que segura o que vem de fora. Quando ela enfraquece, poeira, pólen e ácaro passam a entrar e irritar.
            </p>
            <p className="mb-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-[#8A6A3A]">O que você já tentou aqui</p>
            <div className="mb-[18px] flex flex-wrap gap-[7px]">
              <span className={lightPill}>Shampoos</span>
              <span className={lightPill}>Pomadas</span>
              <span className={lightPill}>Sprays</span>
            </div>
            <p className="mt-auto text-[15px] font-bold leading-[1.5] text-[#B43F02] sm:text-[16px]">Age por fora, mas não reconstrói a pele por dentro.</p>
          </article>
        </div>

        <div className="relative mb-[38px] h-[260px] overflow-hidden rounded-2xl bg-[#3A2F25] sm:h-[230px]">
          <img src={failedTreatmentsMobile.url} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover blur-[2px] md:hidden" />
          <img src={failedTreatments.url} alt="Produtos e tentativas de cuidado para coceira" className="absolute inset-0 h-full w-full object-cover scale-[0.97] md:scale-100" />
          <div className="absolute inset-0 bg-[rgba(45,37,29,0.42)]" />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(45,37,29,0.84)_0%,rgba(45,37,29,0.62)_32%,rgba(45,37,29,0.18)_58%,rgba(45,37,29,0)_80%)]" />
          <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-8">
            <div className="max-w-[600px]">
              <p className="mb-2 font-display text-[21px] font-bold leading-[1.14] text-[#FDFAF7] sm:text-[23px]">Nem no intestino, nem na pele</p>
              <div className="mb-2 flex flex-wrap gap-[7px]">
                <span className={darkPill}>Antialérgico</span>
                <span className={darkPill}>Corticoide</span>
                <span className={darkPill}>Antibiótico</span>
              </div>
              <p className="text-[14px] leading-[1.5] text-[#E6DBCC] sm:text-[15px]">Desligam a reação enquanto você usa. Não mexem em nenhuma das duas origens, por isso a coceira volta quando o tratamento acaba.</p>
            </div>
          </div>
        </div>

        <div className="mb-[26px] flex items-center gap-5">
          <span className="h-px flex-1 bg-[#E0D5C0]" />
          <span className="whitespace-nowrap text-center text-[11px] font-bold uppercase tracking-[0.12em] text-[#B43F02] sm:text-[13px]">O NutraHelp alcança os dois</span>
          <span className="h-px flex-1 bg-[#E0D5C0]" />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <article className="rounded-2xl bg-[#504333] p-6 sm:p-[26px_28px]">
            <span className="inline-block rounded-full bg-[#FFDF78] px-[11px] py-1.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#504333]">No intestino</span>
            <h3 className="mb-[9px] mt-[14px] font-display text-[24px] font-bold leading-[1.15] text-[#FDFAF7] sm:text-[26px]">Equilibra a flora</h3>
            <p className="text-[15.5px] leading-[1.55] text-[#E0D5C6] sm:text-[16.5px]">5 cepas probióticas e 2 prebióticos ocupam o lugar das bactérias ruins. Com o intestino em ordem, a pele reage menos.</p>
          </article>

          <article className="rounded-2xl bg-[#504333] p-6 sm:p-[26px_28px]">
            <span className="inline-block rounded-full bg-[#FFDF78] px-[11px] py-1.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#504333]">Na pele</span>
            <h3 className="mb-[9px] mt-[14px] font-display text-[24px] font-bold leading-[1.15] text-[#FDFAF7] sm:text-[26px]">Reconstrói a barreira</h3>
            <p className="text-[15.5px] leading-[1.55] text-[#E0D5C6] sm:text-[16.5px]">Zinco, biotina, ômega 3 e aminoácidos são o material que a pele usa para refazer a proteção e produzir novos pelos.</p>
          </article>
        </div>

        <div className="flex flex-col gap-6 rounded-2xl bg-[#EFE6C9] p-5 sm:flex-row sm:items-center sm:gap-7 sm:p-6 sm:px-7">
          <div className="h-[180px] w-full shrink-0 overflow-hidden rounded-[10px] bg-[#E0D3B4] sm:h-[140px] sm:w-[280px]">
            <img src={galleryHand} alt="NutraHelp sendo misturado à alimentação" className="h-full w-full object-cover" />
          </div>
          <div className="flex-1">
            <p className="mb-1.5 font-display text-[22px] font-bold leading-[1.25] text-[#504333] sm:text-[24px]">Os dois na mesma dose, uma vez por dia.</p>
            <p className="text-[15.5px] leading-[1.5] text-[#3D3530] sm:text-[16.5px]">Misturado na ração, sabor carne. Sem comprimido para disfarçar e sem briga.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
