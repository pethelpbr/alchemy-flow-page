import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
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

export function KitCompleteBanner({ goTo }: { goTo: (id: string) => void }) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  const sceneRef = useRef<HTMLDivElement | null>(null);

  // Parallax: progresso da cena na tela (0 → 1) vira a variável --kp.
  useEffect(() => {
    const el = sceneRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      el.style.setProperty("--kp", p.toFixed(4));
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
  }, []);

  // A cena se monta uma única vez, quando entra na tela.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={`container-x pt-14 ${shown ? "kit-in" : ""}`}>
      {/* Título centralizado */}
      <div className="kit-anim kit-reveal mx-auto max-w-[60ch] text-center">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-kit-eyebrow">O kit completo</p>
        <h2 className="mt-3 font-display text-[clamp(30px,7vw,44px)] leading-[1.08] tracking-[-0.02em] text-kit-ink">
          Por dentro, por fora
          <br />e <span className="text-kit-accent">na boca</span>
        </h2>
        <p className="mx-auto mt-4 max-w-[54ch] text-[17px] leading-[1.55] text-kit-body">
          Cada um age numa frente diferente do mesmo problema. Juntos, o resultado aparece mais rápido — e sai mais
          barato do que comprar um por um.
        </p>
      </div>

      {/* Cena: céu, nuvens, morros, mascotes e o trio */}
      <div ref={sceneRef} className="kit-scene relative mt-10 h-[280px] overflow-hidden rounded-[24px] md:h-[400px]">
        {CLOUDS.map((c) => (
          <span
            key={c.cls}
            className={`kit-anim kit-cloud absolute bg-card ${c.cls}`}
            style={{ "--kit-cloud-o": c.opacity, transitionDelay: "140ms" } as unknown as CSSProperties}
          />
        ))}

        <span className="kit-anim kit-hill-back" />
        <span className="kit-anim kit-hill-front" style={{ transitionDelay: "80ms" }} />

        <div className="kit-products-wrap absolute inset-x-0 bottom-[22px] flex justify-center md:bottom-[34px]">
          <img
            src={kitTrio.url}
            alt="BocaHelp, NutraHelp e PataHelp juntos"
            loading="lazy"
            className="kit-anim kit-pop kit-products w-auto max-w-[92%] object-contain"
            style={{ transitionDelay: "220ms" }}
          />
        </div>

        <img
          src={dogMascot.url}
          alt="Ilustração de um cachorro sentado"
          loading="lazy"
          className="kit-anim kit-pop kit-dog w-auto object-contain"
          style={{ transitionDelay: "300ms" }}
        />
        <img
          src={catMascot.url}
          alt="Ilustração de uma gata sentada"
          loading="lazy"
          className="kit-anim kit-pop kit-cat w-auto object-contain"
          style={{ transitionDelay: "300ms" }}
        />

        <span className="kit-bush kit-bush-left" aria-hidden="true" />
        <span className="kit-bush kit-bush-right" aria-hidden="true" />
      </div>

      {/* As três frentes */}
      <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
        {PILLARS.map(({ title, titleClass, circleClass, detail, text, Icon, delay }) => (
          <div
            key={title}
            className="kit-anim kit-reveal flex flex-col items-center text-center"
            style={{ transitionDelay: delay }}
          >
            <span className={`flex h-[66px] w-[66px] items-center justify-center rounded-full ${circleClass}`}>
              <Icon detail={detail} />
            </span>
            <h3 className={`mt-4 font-display text-[22px] leading-tight ${titleClass}`}>{title}</h3>
            <p className="mt-2 max-w-[34ch] text-[15px] leading-relaxed text-kit-body">{text}</p>
          </div>
        ))}
      </div>

      {/* Chamada final */}
      <div className="kit-anim kit-reveal mt-10 flex flex-col items-center" style={{ transitionDelay: "620ms" }}>
        <button
          type="button"
          onClick={() => goTo("combos")}
          className="inline-flex h-[56px] items-center justify-center rounded-full bg-kit-accent px-[38px] text-[15px] font-extrabold uppercase tracking-[0.04em] text-primary-foreground transition-opacity hover:opacity-90"
        >
          Montar meu kit
        </button>
        <p className="mt-3 text-sm text-kit-note">Frete grátis · garantia de 60 dias</p>
      </div>
    </section>
  );
}
