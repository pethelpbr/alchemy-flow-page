import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Instagram, Play, Share2 } from "lucide-react";
import amoraVideo from "@/assets/depoimento-amora.mp4.asset.json";
import amoraCover from "@/assets/depoimento-amora-capa.jpg.asset.json";
import mikeVideo from "@/assets/depoimento-mike.mp4.asset.json";
import mikeCover from "@/assets/depoimento-mike-capa.jpg.asset.json";
import depo1Video from "@/assets/depoimento-1.mp4.asset.json";
import depo1Cover from "@/assets/depoimento-1-capa.jpg.asset.json";
import depo3Video from "@/assets/depoimento-3.mp4.asset.json";
import depo3Cover from "@/assets/depoimento-3-capa.jpg.asset.json";
import depo2Video from "@/assets/depoimento-2.mp4.asset.json";
import depo2Cover from "@/assets/depoimento-2-capa.jpg.asset.json";
import nutraThumb from "@/assets/nutrahelp-pote-thumb.png.asset.json";
import pataThumb from "@/assets/patahelp-lata-thumb.png.asset.json";
import bocaThumb from "@/assets/bocahelp-cutout.png.asset.json";

type Item = { video: string; cover: string; name: string; problem: string; product: string; thumb: string; price: number; page?: "/pele" };

const items: Item[] = [
  { video: amoraVideo.url, cover: amoraCover.url, name: "Amora", problem: "Lágrima ácida", product: "NutraHelp", thumb: nutraThumb.url, price: 139, page: "/pele" },
  { video: mikeVideo.url, cover: mikeCover.url, name: "Mike", problem: "Dermatite", product: "NutraHelp", thumb: nutraThumb.url, price: 139, page: "/pele" },
  { video: depo1Video.url, cover: depo1Cover.url, name: "Marina", problem: "Mau hálito", product: "BocaHelp", thumb: bocaThumb.url, price: 49.9 },
  { video: depo3Video.url, cover: depo3Cover.url, name: "Júlia", problem: "Queda de pelos", product: "NutraHelp", thumb: nutraThumb.url, price: 139, page: "/pele" },
  { video: depo2Video.url, cover: depo2Cover.url, name: "Rodrigo", problem: "Dermatite", product: "NutraHelp", thumb: nutraThumb.url, price: 139, page: "/pele" },
];

const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function Card({ it, onBuy }: { it: Item; onBuy: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const toggle = () => {
    const v = ref.current; if (!v) return;
    if (v.paused) { void v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };
  const share = `https://wa.me/?text=${encodeURIComponent(`Olha o resultado do ${it.name} com ${it.product}: https://site.pethelpoficial.com.br/`)}`;
  const btn = "flex h-9 w-9 items-center justify-center rounded-full bg-ink/40 text-background backdrop-blur-md transition hover:bg-ink/60";
  return (
    <article className="relative aspect-[9/16] w-[78vw] max-w-[300px] shrink-0 snap-start overflow-hidden rounded-3xl bg-ink shadow-card sm:w-[280px]">
      <video ref={ref} src={it.video} poster={it.cover}  loop playsInline preload="metadata" onClick={toggle} className="absolute inset-0 h-full w-full cursor-pointer object-cover" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink/60 to-transparent" />
      <div className="absolute inset-x-3 top-3 flex items-center justify-between">
        <span className="flex items-center gap-2 rounded-full bg-ink/40 py-1 pl-1 pr-3 text-xs font-semibold text-background backdrop-blur-md">
          <img src={it.cover} alt="" className="h-7 w-7 rounded-full object-cover" />{it.name}
        </span>
        <a href={share} target="_blank" rel="noreferrer" aria-label="Compartilhar no WhatsApp" className={btn}><Share2 className="h-4 w-4" /></a>
      </div>
      <span className="absolute left-3 top-14 rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-primary-foreground">{it.problem}</span>
      {!playing && (
        <button onClick={toggle} aria-label="Reproduzir" className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background/85 text-primary shadow-card"><Play className="ml-0.5 h-6 w-6 fill-current" /></button>
      )}
      <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-2xl border border-background/40 bg-background/75 p-2 backdrop-blur-xl">
        <img src={it.thumb} alt={it.product} className="h-12 w-12 shrink-0 rounded-xl bg-card object-contain p-1" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-ink">{it.product}</p>
          <p className="text-xs text-muted-foreground">{brl(it.price)}</p>
        </div>
        {it.page
          ? <Link to={it.page} className="rounded-full bg-primary px-3.5 py-2 text-xs font-extrabold uppercase text-primary-foreground">Comprar</Link>
          : <button onClick={onBuy} className="rounded-full bg-primary px-3.5 py-2 text-xs font-extrabold uppercase text-primary-foreground">Ver kits</button>}
      </div>
    </article>
  );
}

export function ShoppableVideos({ onBuy }: { onBuy: () => void }) {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => track.current?.scrollBy({ left: d * 300, behavior: "smooth" });
  const arrow = "hidden h-11 w-11 items-center justify-center rounded-full bg-background text-ink shadow-card transition hover:scale-105 md:flex";
  return (
    <div className="mx-auto max-w-[1400px]">
      <div className="flex items-center justify-between px-5 md:px-10">
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold text-primary-foreground">
          <Instagram className="h-5 w-5" /> @pethelpoficial
        </a>
        <div className="flex gap-2">
          <button onClick={() => scroll(-1)} aria-label="Anterior" className={arrow}><ChevronLeft className="h-5 w-5" /></button>
          <button onClick={() => scroll(1)} aria-label="Próximo" className={arrow}><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>
      <div ref={track} className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 [overscroll-behavior-x:contain] [scrollbar-width:none] md:scroll-px-10 md:px-10 [&::-webkit-scrollbar]:hidden">
        {items.map((it) => <Card key={it.name} it={it} onBuy={onBuy} />)}
      </div>
    </div>
  );
}
