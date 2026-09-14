import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { BRAND } from "@/lib/product";
import { BuyButton } from "@/components/ui/BuyButton";
import { cn } from "@/lib/utils";

const links = [
  { label: "Benefícios", href: "#beneficios" },
  { label: "Como funciona", href: "#como-usar" },
  { label: "Avaliações", href: "#avaliacoes" },
  { label: "FAQ", href: "#faq" },
];

export function Header({ onBuy }: { onBuy: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b bg-card transition-all duration-500",
        scrolled
          ? "border-border/70 shadow-card"
          : "border-border/50",
      )}
    >
      <div className="container-x grid h-[72px] grid-cols-[1fr_auto_1fr] items-center gap-2 sm:h-[84px]">
        <button
          aria-label="Abrir menu"
          onClick={() => setOpen(true)}
          className="grid h-11 w-11 place-items-center text-ink transition-colors hover:text-primary"
        >
          <Menu className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.5} />
        </button>

        <a
          href="#topo"
          className="whitespace-nowrap text-center font-sans text-xl font-semibold uppercase text-ink sm:text-[28px]"
        >
          {BRAND}
        </a>

        <div className="flex shrink-0 items-center justify-end gap-0.5 sm:gap-3">
          <button
            aria-label="Pesquisar no menu"
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center text-ink transition-colors hover:text-primary"
          >
            <Search className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.6} />
          </button>
          <a
            href="#avaliacoes"
            aria-label="Ver avaliações"
            className="grid h-10 w-10 place-items-center text-ink transition-colors hover:text-primary"
          >
            <UserRound className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.6} />
          </a>
          <button
            aria-label="Comprar agora"
            onClick={onBuy}
            className="grid h-10 w-10 place-items-center text-ink transition-colors hover:text-primary"
          >
            <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.6} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-ink/25 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 flex w-[82%] max-w-sm flex-col bg-background p-7"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg tracking-[0.3em] uppercase">{BRAND}</span>
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
  );
}
