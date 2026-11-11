import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Shot = { src: string; alt: string; ratio?: number };

export function DesktopKitGallery({ shots, badge }: { shots: Shot[]; badge: string }) {
  const [active, setActive] = useState(0);
  const [scrolledLeft, setScrolledLeft] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, captured: false, moved: false, x: 0, left: 0 });
  const current = shots[active];

  useEffect(() => {
    const strip = stripRef.current;
    const thumb = strip?.children.item(active);
    if (!strip || !(thumb instanceof HTMLElement)) return;
    const bounds = strip.getBoundingClientRect();
    const item = thumb.getBoundingClientRect();
    if (item.left >= bounds.left + 28 && item.right <= bounds.right - 80) return;
    strip.scrollTo({ left: thumb.offsetLeft - (strip.clientWidth - thumb.clientWidth) / 2, behavior: "smooth" });
  }, [active]);

  if (!current) return null;

  return (
    <div role="region" aria-label="Galeria Black Friday no computador" className="hidden w-full flex-col gap-3 md:flex">
      <motion.div initial={false} animate={{ aspectRatio: current.ratio ?? 1 }} transition={{ duration: 0.5 }} className="relative mx-auto w-[min(100%,720px,calc(100svh-220px))] overflow-hidden rounded-2xl">
        <motion.img key={current.src} src={current.src} alt={current.alt} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="block h-auto w-full" />
        {active === 0 && <img src={badge} alt="Black Friday" className="absolute left-4 top-4 h-8 w-auto" />}
      </motion.div>
      <div className="relative w-full min-w-0">
        <Button variant="outline" size="icon" title="Imagem anterior" aria-label="Imagem anterior" onClick={() => setActive((active - 1 + shots.length) % shots.length)} className="absolute left-0 top-1/2 z-20 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-border/60 bg-card/80 text-ink/70 backdrop-blur-md">
          <ArrowLeft strokeWidth={1.4} />
        </Button>
        <div ref={stripRef} onScroll={(e) => setScrolledLeft(e.currentTarget.scrollLeft > 4)}
          onPointerDown={(e) => { drag.current = { active: true, captured: false, moved: false, x: e.clientX, left: e.currentTarget.scrollLeft }; }}
          onPointerMove={(e) => {
            const state = drag.current;
            if (!state.active) return;
            const dx = e.clientX - state.x;
            if (Math.abs(dx) > 4) {
              state.moved = true;
              if (!state.captured) { e.currentTarget.setPointerCapture(e.pointerId); state.captured = true; }
            }
            if (state.captured) e.currentTarget.scrollLeft = state.left - dx;
          }}
          onPointerUp={(e) => { drag.current.active = false; if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId); }}
          onPointerCancel={(e) => { drag.current.active = false; if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId); }}
          className="relative flex w-full min-w-0 cursor-grab gap-2 overflow-x-auto pb-1 pl-7 pr-20 touch-pan-x select-none active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {shots.map((shot, i) => (
            <Button key={shot.src} variant="ghost" aria-label={`Ver imagem ${i + 1}`} aria-pressed={active === i}
              onClick={(e) => { if (drag.current.moved) { e.preventDefault(); drag.current.moved = false; return; } setActive(i); }}
              className={cn("h-20 w-20 shrink-0 overflow-hidden rounded-xl border p-0 transition-opacity", active === i ? "border-primary/60 opacity-100" : "border-transparent opacity-60")}>
              <img src={shot.src} alt="" loading="lazy" draggable={false} className="block h-auto w-full" />
            </Button>
          ))}
        </div>
        <div className={cn("pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-linear-to-r from-background via-background/80 to-transparent", scrolledLeft ? "opacity-100" : "opacity-0")} />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-linear-to-l from-background via-background/80 to-transparent" />
        <Button variant="outline" size="icon" title="Próxima imagem" aria-label="Próxima imagem" onClick={() => setActive((active + 1) % shots.length)} className="absolute right-0 top-1/2 z-20 h-10 w-10 -translate-y-1/2 translate-x-1/2 rounded-full border-border/50 bg-card/70 text-ink/60 backdrop-blur-md">
          <ArrowRight strokeWidth={1.4} />
        </Button>
      </div>
    </div>
  );
}