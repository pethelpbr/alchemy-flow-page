import { useEffect, useRef, useState } from "react";
import kitTrio from "@/assets/kit-trio-crop.png.asset.json";
import dogMascot from "@/assets/mascote-cachorro.png.asset.json";
import catMascot from "@/assets/mascote-gata.png.asset.json";

/* ---------- Ícones desenhados à mão (SVG inline, sem biblioteca) ---------- */

function PotIcon({ detail }: { detail: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M7.5 13h17v11.6a3.6 3.6 0 0 1-3.6 3.6h-9.8a3.6 3.6 0 0 1-3.6-3.6z"
        fill="#fff"
        stroke="#4A3B2F"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect x="9.5" y="5" width="13" height="6.4" rx="2.2" fill="#fff" stroke="#4A3B2F" strokeWidth="2" />
      <rect x="11.2" y="16.6" width="9.6" height="8" rx="2.2" fill={detail} />
      <path d="M16 23.2c0-2.3 1.7-4.1 3.9-4.4-.2 2.6-1.7 4.4-3.9 4.4z" fill="#fff" />
    </svg>
  );
}

function PawIcon({ detail }: { detail: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <ellipse cx="7.6" cy="15.4" rx="3" ry="3.9" transform="rotate(-18 7.6 15.4)" fill={detail} stroke="#4A3B2F" strokeWidth="1.7" />
      <ellipse cx="13.2" cy="9.4" rx="3" ry="4" fill="#4A3B2F" />
      <ellipse cx="19.6" cy="9.4" rx="3" ry="4" fill={detail} stroke="#4A3B2F" strokeWidth="1.7" />
      <ellipse cx="24.8" cy="15" rx="3" ry="3.9" transform="rotate(18 24.8 15)" fill="#4A3B2F" />
      <path
        d="M16.1 15.6c4.5 0 8.2 3.3 8.2 7 0 3-2.4 4.9-5.2 4.9-1.5 0-2.1-.6-3-.6s-1.6.6-3.1.6c-2.8 0-5.1-1.9-5.1-4.9 0-3.7 3.7-7 8.2-7z"
        fill="#4A3B2F"
      />
    </svg>
  );
}

function ToothIcon({ detail }: { detail: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M16 5.2c-2.3 0-3.3 1.4-5.4 1.4-2.5 0-4.3 1.9-4.3 4.5 0 3.5 1.6 5.5 2.5 9.1.8 3.1 1.2 5.9 2.8 5.9 1.8 0 1.5-4.7 4.4-4.7s2.6 4.7 4.4 4.7c1.6 0 2-2.8 2.8-5.9.9-3.6 2.5-5.6 2.5-9.1 0-2.6-1.8-4.5-4.3-4.5-2.1 0-3.1-1.4-5.4-1.4z"
        fill="#fff"
        stroke="#4A3B2F"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M11.4 10.6c.7-1 1.8-1.7 3-1.9" stroke={detail} strokeWidth="2.3" strokeLinecap="round" />
      <path d="M25.4 4.2l.8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8z" fill={detail} />
    </svg>
  );
}

const PILLARS = [
  {
    title: "Por dentro",
    titleClass: "text-kit-accent",
    circleClass: "bg-kit-cream",
    detail: "#F2661E",
    text: "O NutraHelp leva 44 nutrientes para onde a coceira começa: a alimentação.",
    Icon: PotIcon,
    delay: "380ms",
  },
  {
    title: "Por fora",
    titleClass: "text-kit-pink",
    circleClass: "bg-kit-blush",
    detail: "#E8529B",
    text: "O PataHelp cuida da pata lambida, do focinho rachado e da pele ressecada.",
    Icon: PawIcon,
    delay: "460ms",
  },
  {
    title: "Na boca",
    titleClass: "text-kit-teal",
    circleClass: "bg-kit-mint",
    detail: "#15969A",
    text: "O BocaHelp cuida do hálito e do tártaro sem ninguém precisar escovar.",
    Icon: ToothIcon,
    delay: "540ms",
  },
];

/* Nuvens: cada uma tem posição/tamanho no CSS e opacidade final aqui. */
const CLOUDS = [
  { cls: "kit-cloud-1", opacity: 0.9 },
  { cls: "kit-cloud-2", opacity: 0.72 },
  { cls: "kit-cloud-3", opacity: 0.85 },
  { cls: "kit-cloud-4", opacity: 0.78 },
];

/* Arbusto em SVG (folhas sobrepostas), espelhado para o lado direito. */
function Bush({ flip }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 400 560" preserveAspectRatio="none" className="h-full w-full" style={flip ? { transform: "scaleX(-1)" } : undefined} aria-hidden="true">
      <path d="M0 560V60c60-30 120 10 140 70 40-40 110-30 130 30 50-20 110 20 110 90 20 30 20 80 0 110 20 40 10 100-30 130 10 40-10 70-30 70z" fill="#cfa96c" />
      <path d="M0 560V180c50-20 100 10 115 60 45-30 105-5 115 50 45 0 80 45 70 95 30 30 25 90-15 115 0 30-15 50-35 60z" fill="#ddbd86" />
      <path d="M0 560V330c40-10 80 15 90 55 40-15 85 15 85 60 35 20 40 75 5 115z" fill="#e9cf9f" />
    </svg>
  );
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const range = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

export function KitCompleteBanner({ goTo }: { goTo: (id: string) => void }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const L = {
    clouds: useRef<HTMLDivElement | null>(null),
    background: useRef<HTMLDivElement | null>(null),
    midground: useRef<HTMLDivElement | null>(null),
    foreground: useRef<HTMLDivElement | null>(null),
    grassL: useRef<HTMLDivElement | null>(null),
    grassR: useRef<HTMLDivElement | null>(null),
    header: useRef<HTMLDivElement | null>(null),
    cards: useRef<HTMLDivElement | null>(null),
  };
  const [reduced, setReduced] = useState(false);

  // Linha do tempo presa à rolagem, como na referência: a cena fica fixa
  // enquanto o título sobe, a vegetação se abre e as camadas se encaixam;
  // no fim aparecem os três cards e o botão.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return;
    }
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    const set = (r: { current: HTMLElement | null }, t: string, o?: number) => {
      if (!r.current) return;
      r.current.style.transform = t;
      if (o !== undefined) r.current.style.opacity = String(o);
    };
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = clamp01(-rect.top / total);
      const enter = ease(range(p, 0, 0.45));
      const split = ease(range(p, 0.12, 0.5));
      set(L.clouds, `translate(${(-6 * enter).toFixed(2)}%, 0)`);
      set(L.background, `translate(0, ${(30 - 30 * enter).toFixed(2)}%)`);
      set(L.midground, `translate(0, calc(${(35 - 35 * enter).toFixed(2)}% - ${(22 * ease(range(p, 0.6, 0.85))).toFixed(2)}vh)) scale(${(1 - 0.25 * ease(range(p, 0.6, 0.85))).toFixed(3)})`);
      set(L.foreground, `translate(0, ${(30 - 30 * enter).toFixed(2)}%) scale(${(1 + 0.12 * range(p, 0.4, 1)).toFixed(3)})`);
      set(L.grassL, `translate(${(-100 * split).toFixed(2)}%, 0)`);
      set(L.grassR, `translate(${(100 * split).toFixed(2)}%, 0)`);
      set(L.header, `translate(0, ${(-120 * ease(range(p, 0.2, 0.55))).toFixed(2)}%)`, 1 - range(p, 0.4, 0.55));
      const c = ease(range(p, 0.62, 0.85));
      set(L.cards, `translate(0, ${(40 - 40 * c).toFixed(2)}px)`, c);
      if (L.cards.current) L.cards.current.style.pointerEvents = c > 0.5 ? "auto" : "none";
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={sectionRef} className={`kit-ingredients relative ${reduced ? "" : "h-[320vh]"}`}>
      <div className={`kit-scene ${reduced ? "relative h-[100svh]" : "sticky top-0 h-[100svh]"} overflow-hidden`}>
        {/* Nuvens */}
        <div ref={L.clouds} className="absolute inset-0 will-change-transform">
          {CLOUDS.map((c) => (
            <span key={c.cls} className={`kit-cloud absolute bg-card ${c.cls}`} style={{ opacity: c.opacity }} />
          ))}
        </div>

        {/* Fundo: morro de trás */}
        <div ref={L.background} className="absolute inset-0 will-change-transform">
          <span className="kit-hill-back" />
        </div>

        {/* Título (sobe como rolagem natural, atrás dos produtos) */}
        <div ref={L.header} className="absolute inset-x-0 top-[12vh] z-[1] px-5 will-change-transform">
          <div className="mx-auto max-w-[900px] text-center">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-kit-eyebrow">O kit completo</p>
            <h2 className="mt-3 font-display text-[clamp(34px,8vw,72px)] leading-[1.04] tracking-[-0.02em] text-kit-ink">
              Por dentro, por fora
              <br />e <span className="text-kit-accent">na boca</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[54ch] text-[17px] leading-[1.55] text-kit-body">
              Cada um age numa frente diferente do mesmo problema. Juntos, o resultado aparece mais rápido — e sai mais
              barato do que comprar um por um.
            </p>
          </div>
        </div>

        {/* Meio: os três produtos */}
        <div ref={L.midground} className="absolute inset-x-0 bottom-[18vh] z-[2] flex origin-bottom justify-center will-change-transform">
          <img src={kitTrio.url} alt="BocaHelp, NutraHelp e PataHelp juntos" loading="lazy" className="h-[34vh] max-h-[420px] w-auto max-w-[92%] object-contain" />
        </div>

        {/* Frente: morro e mascotes */}
        <div ref={L.foreground} className="absolute inset-0 z-[3] origin-bottom will-change-transform">
          <span className="kit-hill-front" />
          <img src={dogMascot.url} alt="Ilustração de um cachorro sentado" loading="lazy" className="kit-dog w-auto object-contain" />
          <img src={catMascot.url} alt="Ilustração de uma gata sentada" loading="lazy" className="kit-cat w-auto object-contain" />
        </div>

        {/* Vegetação que se abre para revelar a cena */}
        {!reduced && (
          <div className="pointer-events-none absolute inset-0 z-[4]">
            <div ref={L.grassL} className="absolute bottom-0 left-0 h-[62%] w-[55%] will-change-transform">
              <Bush />
            </div>
            <div ref={L.grassR} className="absolute bottom-0 right-0 h-[62%] w-[55%] will-change-transform">
              <Bush flip />
            </div>
          </div>
        )}

        {/* Cards e botão (aparecem no fim) */}
        <div
          ref={L.cards}
          className="absolute inset-x-0 bottom-0 z-[5] px-4 pb-5 md:pb-8"
          style={reduced ? undefined : { opacity: 0, pointerEvents: "none" }}
        >
          <div className="mx-auto grid max-w-[1100px] gap-3 rounded-[24px] bg-card/90 p-5 shadow-lg backdrop-blur-md md:grid-cols-3 md:gap-8 md:p-8">
            {PILLARS.map(({ title, titleClass, circleClass, detail, text, Icon }) => (
              <div key={title} className="flex items-center gap-4 text-left md:flex-col md:text-center">
                <span className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full md:h-[66px] md:w-[66px] ${circleClass}`}>
                  <Icon detail={detail} />
                </span>
                <div>
                  <h3 className={`font-display text-[18px] leading-tight md:mt-1 md:text-[22px] ${titleClass}`}>{title}</h3>
                  <p className="mt-1 max-w-[34ch] text-[13px] leading-snug text-kit-body md:text-[15px] md:leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
            <div className="flex flex-col items-center md:col-span-3">
              <button
                type="button"
                onClick={() => goTo("combos")}
                className="inline-flex h-[50px] items-center justify-center rounded-full bg-kit-accent px-[38px] text-[15px] font-extrabold uppercase tracking-[0.04em] text-primary-foreground transition-opacity hover:opacity-90 md:h-[56px]"
              >
                Montar meu kit
              </button>
              <p className="mt-2 text-sm text-kit-note">Frete grátis · garantia de 60 dias</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
