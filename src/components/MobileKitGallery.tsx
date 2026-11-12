import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import galleryDragIcon from "@/assets/gallery-drag-icon.png.asset.json";

type GalleryShot = { src: string; alt: string };

const AUTOPLAY_MS = 15000;
const RESUME_DELAY_MS = 4500;
const MIN_ZOOM = 1;
const MAX_ZOOM = 4;

export function MobileKitGallery({ shots }: { shots: GalleryShot[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const animationRef = useRef<{ stop: () => void } | undefined>(undefined);
  const interacting = useRef(false);
  const aligning = useRef(false);
  const interacted = useRef(false);
  const startIndex = useRef(0);
  const pausedUntil = useRef(0);
  const drag = useRef({ x: 0, y: 0, left: 0, active: false, captured: false });
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef({ active: false, startDist: 0, startScale: 1, cx: 0, cy: 0, startTx: 0, startTy: 0 });
  const zoom = useRef({ scale: 1, tx: 0, ty: 0 });
  const [active, setActive] = useState(0);
  const progress = useMotionValue(100 / shots.length);
  const progressWidth = useTransform(progress, (value) => `${value}%`);

  const nearestSlide = (el: HTMLDivElement) => {
    let index = 0;
    let distance = Infinity;
    Array.from(el.children).forEach((slide, i) => {
      if (!(slide instanceof HTMLElement)) return;
      const nextDistance = Math.abs(slide.offsetLeft - el.scrollLeft);
      if (nextDistance < distance) { index = i; distance = nextDistance; }
    });
    return index;
  };

  const applyZoom = (index: number) => {
    const img = imgRefs.current[index];
    if (!img) return;
    const { scale, tx, ty } = zoom.current;
    img.style.transform = scale > 1.001 ? `translate(${tx}px, ${ty}px) scale(${scale})` : "";
  };

  const clampZoomPan = (index: number) => {
    const img = imgRefs.current[index];
    if (!img) return;
    const { scale } = zoom.current;
    const maxX = (img.offsetWidth * (scale - 1)) / 2;
    const maxY = (img.offsetHeight * (scale - 1)) / 2;
    zoom.current.tx = Math.max(-maxX, Math.min(maxX, zoom.current.tx));
    zoom.current.ty = Math.max(-maxY, Math.min(maxY, zoom.current.ty));
  };

  const resetZoom = () => {
    zoom.current = { scale: 1, tx: 0, ty: 0 };
    pinch.current.active = false;
    imgRefs.current.forEach((img) => { if (img) img.style.transform = ""; });
  };

  const settle = () => {
    const el = trackRef.current;
    if (!el || interacting.current || aligning.current) return;
    const nearest = nearestSlide(el);
    const index = Math.max(startIndex.current - 1, Math.min(startIndex.current + 1, nearest));
    startIndex.current = index;
    const slide = el.children.item(index);
    if (!(slide instanceof HTMLElement)) return;
    setActive(index);
    resetZoom();
    aligning.current = true;
    el.style.scrollSnapType = "none";
    const finish = () => {
      aligning.current = false;
      el.style.scrollSnapType = "none";
      progress.set(((index + 1) / shots.length) * 100);
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.scrollLeft = slide.offsetLeft;
      finish();
      return;
    }
    animationRef.current = animate(el.scrollLeft, slide.offsetLeft, {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (left) => { el.scrollLeft = left; },
      onComplete: finish,
    });
  };

  const goStep = (dx: number) => {
    const el = trackRef.current;
    interacting.current = false;
    pausedUntil.current = Date.now() + RESUME_DELAY_MS;
    clearTimeout(timerRef.current);
    if (!el) return;
    const width = el.children.item(0) instanceof HTMLElement ? (el.children.item(0) as HTMLElement).offsetWidth : el.clientWidth;
    const dir = Math.abs(dx) > Math.min(50, width * 0.15) ? (dx < 0 ? 1 : -1) : 0;
    const index = Math.max(0, Math.min(shots.length - 1, startIndex.current + dir));
    startIndex.current = index;
    const slide = el.children.item(index);
    if (!(slide instanceof HTMLElement)) return;
    setActive(index);
    resetZoom();
    aligning.current = true;
    const finish = () => {
      aligning.current = false;
      progress.set(((index + 1) / shots.length) * 100);
    };
    animationRef.current = animate(el.scrollLeft, slide.offsetLeft, {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (left) => { el.scrollLeft = left; },
      onComplete: finish,
    });
  };

  const start = (el: HTMLDivElement) => {
    interacted.current = true;
    startIndex.current = nearestSlide(el);
    animationRef.current?.stop();
    aligning.current = false;
    interacting.current = true;
    clearTimeout(timerRef.current);
    el.style.scrollSnapType = "none";
  };

  const startPinch = (el: HTMLDivElement) => {
    const points = Array.from(pointers.current.values());
    if (points.length < 2) return;
    const a = points[0]!;
    const b = points[1]!;
    const rect = el.getBoundingClientRect();
    pinch.current = {
      active: true,
      startDist: Math.hypot(a.x - b.x, a.y - b.y),
      startScale: zoom.current.scale,
      cx: (a.x + b.x) / 2 - rect.left,
      cy: (a.y + b.y) / 2 - rect.top,
      startTx: zoom.current.tx,
      startTy: zoom.current.ty,
    };
    drag.current.active = false;
  };

  const movePinch = (el: HTMLDivElement) => {
    if (!pinch.current.active) return;
    const points = Array.from(pointers.current.values());
    if (points.length < 2) return;
    const a = points[0]!;
    const b = points[1]!;
    const dist = Math.hypot(a.x - b.x, a.y - b.y);
    if (pinch.current.startDist <= 0) return;
    const index = startIndex.current;
    const img = imgRefs.current[index];
    const nextScale = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, pinch.current.startScale * (dist / pinch.current.startDist)));
    const k = nextScale / pinch.current.startScale;
    const ox = img ? img.offsetWidth / 2 : 0;
    const oy = img ? img.offsetHeight / 2 : 0;
    const ax = pinch.current.cx - ox;
    const ay = pinch.current.cy - oy;
    zoom.current.scale = nextScale;
    zoom.current.tx = ax - (ax - pinch.current.startTx) * k;
    zoom.current.ty = ay - (ay - pinch.current.startTy) * k;
    if (nextScale <= MIN_ZOOM) { zoom.current.tx = 0; zoom.current.ty = 0; }
    else clampZoomPan(index);
    applyZoom(index);
    pausedUntil.current = Date.now() + RESUME_DELAY_MS;
  };

  const endPinch = () => {
    if (!pinch.current.active) return;
    pinch.current.active = false;
    if (zoom.current.scale < 1.05) {
      resetZoom();
      applyZoom(startIndex.current);
    } else {
      clampZoomPan(startIndex.current);
      applyZoom(startIndex.current);
    }
    pausedUntil.current = Date.now() + RESUME_DELAY_MS;
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const toStart = () => {
      if (interacted.current) return;
      el.scrollLeft = 0;
      setActive(0);
      progress.set(100 / shots.length);
    };
    toStart();
    const raf = requestAnimationFrame(toStart);
    const timer = setTimeout(toStart, 400);
    window.addEventListener("load", toStart);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      window.removeEventListener("load", toStart);
    };
  }, [shots, progress]);

  useEffect(() => () => {
    clearTimeout(timerRef.current);
    animationRef.current?.stop();
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault();
    };
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => el.removeEventListener("touchmove", onTouchMove);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || shots.length < 2) return;
    const id = setInterval(() => {
      if (interacting.current || aligning.current || document.hidden) return;
      if (zoom.current.scale > 1.001) return;
      if (Date.now() < pausedUntil.current) return;
      const current = nearestSlide(el);
      const next = (current + 1) % shots.length;
      const slide = el.children.item(next);
      if (!(slide instanceof HTMLElement)) return;
      interacted.current = true;
      aligning.current = true;
      el.style.scrollSnapType = "none";
      resetZoom();
      const finish = () => {
        aligning.current = false;
        el.style.scrollSnapType = "none";
        setActive(next);
        progress.set(((next + 1) / shots.length) * 100);
      };
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        el.scrollLeft = slide.offsetLeft;
        finish();
        return;
      }
      animationRef.current = animate(el.scrollLeft, slide.offsetLeft, {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (left) => { el.scrollLeft = left; },
        onComplete: finish,
      });
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [shots, progress]);

  return (
    <div className="relative -mx-4 w-[calc(100%+2rem)] overflow-hidden md:hidden">
      <div
        ref={trackRef}
        role="region"
        aria-label="Fotos do kit Black Friday"
        aria-roledescription="carrossel"
        className="relative flex w-full items-start touch-pan-y gap-1 overflow-x-hidden pr-[10%] select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={(e) => {
          const el = e.currentTarget;
          if (!interacted.current) { el.scrollLeft = 0; return; }
          const index = nearestSlide(el);
          setActive(index);
          const slide = el.children.item(index);
          const next = el.children.item(index + 1);
          const previous = el.children.item(index - 1);
          if (slide instanceof HTMLElement) {
            const step = next instanceof HTMLElement ? next.offsetLeft - slide.offsetLeft
              : previous instanceof HTMLElement ? slide.offsetLeft - previous.offsetLeft : slide.offsetWidth;
            const position = index + (el.scrollLeft - slide.offsetLeft) / step;
            progress.set(Math.max(100 / shots.length, Math.min(100, ((position + 1) / shots.length) * 100)));
          }
          clearTimeout(timerRef.current);
          if (!interacting.current && !aligning.current) timerRef.current = setTimeout(settle, 100);
        }}
        onPointerDown={(e) => {
          if (e.pointerType === "mouse" && e.button !== 0) return;
          const el = e.currentTarget;
          pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
          if (pointers.current.size >= 2) {
            interacting.current = true;
            clearTimeout(timerRef.current);
            startPinch(el);
            return;
          }
          start(el);
          drag.current = { x: e.clientX, y: e.clientY, left: el.scrollLeft, active: true, captured: false };
        }}
        onPointerMove={(e) => {
          if (pointers.current.has(e.pointerId)) pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
          if (pinch.current.active) { movePinch(e.currentTarget); return; }
          if (!drag.current.active) return;
          const dx = e.clientX - drag.current.x;
          const dy = e.clientY - drag.current.y;
          if (zoom.current.scale > 1.001) {
            zoom.current.tx += dx;
            zoom.current.ty += dy;
            drag.current.x = e.clientX;
            drag.current.y = e.clientY;
            clampZoomPan(startIndex.current);
            applyZoom(startIndex.current);
            pausedUntil.current = Date.now() + RESUME_DELAY_MS;
            return;
          }
          if (e.pointerType === "mouse" && Math.abs(dx) > 4 && !drag.current.captured) {
            e.currentTarget.setPointerCapture(e.pointerId);
            drag.current.captured = true;
          }
          if (e.pointerType !== "mouse" || drag.current.captured) e.currentTarget.scrollLeft = drag.current.left - dx;
        }}
        onPointerUp={(e) => {
          pointers.current.delete(e.pointerId);
          if (pinch.current.active) { endPinch(); return; }
          if (!drag.current.active) return;
          drag.current.active = false;
          if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
          if (zoom.current.scale > 1.001) { interacting.current = false; pausedUntil.current = Date.now() + RESUME_DELAY_MS; return; }
          goStep(e.clientX - drag.current.x);
        }}
        onPointerCancel={(e) => {
          pointers.current.delete(e.pointerId);
          if (pinch.current.active) { endPinch(); return; }
          if (!drag.current.active) return;
          drag.current.active = false;
          goStep(e.clientX - drag.current.x);
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse" && drag.current.active && !drag.current.captured && zoom.current.scale <= 1.001) { drag.current.active = false; goStep(0); }
        }}
      >
        {shots.map((shot, i) => (
          <div key={shot.src} className="relative w-full shrink-0 snap-start overflow-hidden" aria-label={`Foto ${i + 1} de ${shots.length}`} aria-current={active === i ? "true" : undefined}>
            <img
              ref={(node) => { imgRefs.current[i] = node; }}
              src={shot.src}
              alt={shot.alt}
              draggable={false}
              className="block h-auto w-full origin-center will-change-transform"
            />
            {i === 0 && (
              <div className="pointer-events-none absolute right-2 top-[3%] grid h-12 w-12 place-items-center rounded-full bg-card">
                <img src={galleryDragIcon.url} alt="" aria-hidden="true" className="h-[34px] w-[34px]" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div role="progressbar" aria-label="Progresso das fotos" aria-valuemin={1} aria-valuemax={shots.length} aria-valuenow={active + 1} className="h-1 w-full bg-muted">
        <motion.div className="h-full bg-primary" style={{ width: progressWidth }} />
      </div>
    </div>
  );
}
