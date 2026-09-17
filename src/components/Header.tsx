import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { BuyButton } from "@/components/ui/BuyButton";
import { MarqueeStrip } from "@/components/MarqueeStrip";
import { cn } from "@/lib/utils";
import petHelpLogo from "@/assets/pethelp-logo.png.asset.json";

const links = [
  { label: "Benefícios", href: "#beneficios" },
  { label: "Como funciona", href: "#como-usar" },
  { label: "Avaliações", href: "#avaliacoes" },
  { label: "FAQ", href: "#faq" },
];

export function Header({ onBuy }: { onBuy: () => void }) {
  const [scrollY, setScrollY] = useState(0);
  const [open, setOpen] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [marqueeH, setMarqueeH] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const measure = () => setMarqueeH(marqueeRef.current?.offsetHeight ?? 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const scrolled = scrollY > 24;

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div ref={marqueeRef}>
        <MarqueeStrip tone="gift" size="slim" />
      </div>
      <header
        style={{ top: Math.max(0, marqueeH - scrollY) }}
        className={cn(
          "fixed inset-x-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled
            ? "border-b border-border/70 bg-background/95 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
      <div className="container-x grid grid-cols-[auto_1fr_auto] items-center gap-4 py-3 lg:grid-cols-[1fr_auto_1fr]">
        <button
          aria-label="Abrir menu"
          onClick={() => setOpen(true)}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-ink lg:hidden"
        >
          <Menu size={18} strokeWidth={1.5} />
        </button>

        <a
          href="#topo"
          className="flex min-w-0 justify-center lg:justify-start"
        >
          <img
            src={petHelpLogo.url}
            alt="PetHelp"
            className="h-6 w-auto object-contain lg:h-8"
          />
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="text-[13px] text-muted-foreground transition-colors hover:text-ink"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <BuyButton
          size="sm"
          onClick={onBuy}
          className="hidden justify-self-end lg:inline-flex"
        >
          Comprar agora
        </BuyButton>

        <span aria-hidden className="h-10 w-10 shrink-0 lg:hidden" />
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-ink/25 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 right-0 z-50 flex w-[82%] max-w-sm flex-col bg-background p-7 lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
            >
              <div className="flex items-center justify-between">
                <img src={petHelpLogo.url} alt="PetHelp" className="h-7 w-auto object-contain" />
                <button
                  aria-label="Fechar menu"
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>
              <nav className="mt-12 flex flex-col gap-6">
                {links.map((l) => (
                  <button
                    key={l.href}
                    onClick={() => go(l.href)}
                    className="text-left font-display text-3xl text-ink"
                  >
                    {l.label}
                  </button>
                ))}
              </nav>
              <BuyButton
                size="lg"
                className="mt-auto"
                onClick={() => {
                  setOpen(false);
                  onBuy();
                }}
              >
                Comprar agora
              </BuyButton>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      </header>
    </>
  );
}
