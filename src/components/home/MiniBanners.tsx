import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import kitTrio from "@/assets/kit-bf-completo.png.asset.json";
import nutraFoto from "@/assets/nutrahelp-foto.png.asset.json";
import bocaFoto from "@/assets/bocahelp-foto.png.asset.json";

type Banner = {
  eyebrow: string;
  title: string;
  cta: string;
  card: string;
  eyebrowColor: string;
  titleColor: string;
  ctaColor: string;
  image: string;
  alt: string;
  to?: "/pele" | "/black-friday";
  scroll?: string;
};

const banners: Banner[] = [
  {
    eyebrow: "Combo",
    title: "Leve os 3 e economize",
    cta: "Ver kits",
    card: "bg-ink",
    eyebrowColor: "text-gift",
    titleColor: "text-background",
    ctaColor: "text-gift",
    image: kitTrio.url,
    alt: "BocaHelp, NutraHelp e PataHelp juntos",
    scroll: "combos",
  },
  {
    eyebrow: "Mais vendido",
    title: "NutraHelp 8 em 1",
    cta: "Ver produto",
    card: "bg-gift/25",
    eyebrowColor: "text-terracotta",
    titleColor: "text-ink",
    ctaColor: "text-terracotta",
    image: nutraFoto.url,
    alt: "Pote de NutraHelp",
    to: "/pele",
  },
  {
    eyebrow: "Lançamento",
    title: "BocaHelp, sem escovar",
    cta: "Ver produto",
    card: "bg-boca/10",
    eyebrowColor: "text-boca",
    titleColor: "text-ink",
    ctaColor: "text-boca",
    image: bocaFoto.url,
    alt: "Frasco de BocaHelp",
    to: "/black-friday",
  },
];

export function MiniBanners({ goTo }: { goTo: (id: string) => void }) {
  return (
    <section className="container-x py-8 md:py-10">
      <div className="grid gap-4 md:grid-cols-3">
        {banners.map((b) => {
          const inner = (
            <>
              <div className="relative z-10 flex w-[54%] flex-col justify-center p-5 md:p-6">
                <p className={`text-[11px] font-extrabold uppercase tracking-[0.14em] ${b.eyebrowColor}`}>{b.eyebrow}</p>
                <h3 className={`mt-2 font-display text-[22px] leading-[1.12] md:text-[26px] ${b.titleColor}`}>{b.title}</h3>
                <span className={`mt-3 inline-flex items-center gap-1.5 text-[13px] font-bold ${b.ctaColor}`}>
                  {b.cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
              <div className="h-full w-[46%] overflow-hidden bg-clay">
                <img
                  src={b.image}
                  alt={b.alt}
                  loading="lazy"
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
            </>
          );
          const cls = `group relative flex h-[200px] overflow-hidden rounded-3xl md:h-[240px] ${b.card}`;
          return b.to ? (
            <Link key={b.eyebrow} to={b.to} className={cls}>
              {inner}
            </Link>
          ) : (
            <button key={b.eyebrow} type="button" onClick={() => b.scroll && goTo(b.scroll)} className={`${cls} text-left`}>
              {inner}
            </button>
          );
        })}
      </div>
    </section>
  );
}
