import { useEffect, useRef, useState } from "react";

type Props = { mp4?: string; webm?: string; poster?: string; label: string; className?: string };

/** Silent looping video that behaves like a GIF; downloads only when near the viewport. */
export function LazyLoopVideo({ mp4, webm, poster, label, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setLoad(true);
          el.play().catch(() => {});
        } else if (!el.paused) {
          el.pause();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (load) {
      ref.current?.load();
      ref.current?.play().catch(() => {});
    }
  }, [load]);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay
      preload="none"
      aria-label={label}
      className={className}
    >
      {load && <source src={webm} type="video/webm" />}
      {load && <source src={mp4} type="video/mp4" />}
    </video>
  );
}
