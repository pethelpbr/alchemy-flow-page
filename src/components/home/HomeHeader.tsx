import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronRight, Menu, Search, ShoppingCart, X } from "lucide-react";
import petHelpLogo from "@/assets/pethelp-logo.png.asset.json";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const EASE_SOFT = "cubic-bezier(0.32, 0.72, 0, 1)";

function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(m.matches);
    const on = () => setR(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return r;
}

type Props = { goTo: (id: string) => void };

export function HomeHeader({ goTo }: Props) {
  const [search, setSearch] = useState(false);
  const [menu, setMenu] = useState(false);
  const [q, setQ] = useState("");
  const reduced = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const mInputRef = useRef<HTMLInputElement>(null);
  const openBtn = useRef<HTMLButtonElement>(null);
  const mOpenBtn = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [fullW, setFullW] = useState(196);

  /* The bar's right edge is fixed, so the open width is the space between the
     menu's last item and that edge. Measuring it keeps the width animation
     honest instead of easing a max-width that the layout then clamps. */
  useEffect(() => {
    const measure = () => {
      const w = wrapRef.current;
      const n = navRef.current;
      if (!w || !n) return;
      const target = Math.round(w.getBoundingClientRect().right - n.getBoundingClientRect().right - 26);
      setFullW(Math.max(196, target));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const isDesktop = () => window.matchMedia("(min-width: 1024px)").matches;
  const open = () => {
    setSearch(true);
    requestAnimationFrame(() => (isDesktop() ? inputRef : mInputRef).current?.focus({ preventScroll: true }));
  };
  const close = () => {
    setSearch(false);
    setQ("");
    requestAnimationFrame(() => (isDesktop() ? openBtn : mOpenBtn).current?.focus({ preventScroll: true }));
  };

  useEffect(() => {
    if (!search) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [search]);

  const t = (ms: number, ease: string) => (reduced ? "none" : `${ms}ms ${ease}`);
  const wrapStyle = { width: search ? fullW : 196, transition: reduced ? "none" : `width ${t(search ? 520 : 420, EASE_SOFT)}` };

  const links: { id: string; label: string; cls: string }[] = [
    { id: "campeoes", label: "NutraHelp", cls: "text-primary" },
    { id: "campeoes", label: "PataHelp", cls: "text-secondary" },
    { id: "campeoes", label: "BocaHelp", cls: "text-terracotta" },
    { id: "combos", label: "Combos", cls: "text-ink" },
    { id: "depoimentos", label: "Depoimentos", cls: "text-ink" },
    { id: "sobre", label: "Sobre", cls: "text-ink" },
  ];
  const go = (id: string) => { setMenu(false); goTo(id); };

  const form = (ref: React.RefObject<HTMLInputElement | null>, idSuffix: string) => (
    <form role="search" action="/busca" method="get" className="relative flex h-[46px] w-full items-center gap-2.5 rounded-full border border-primary bg-card pl-[18px] pr-1.5">
      <Search className="h-[19px] w-[19px] flex-none text-terracotta" strokeWidth={2.2} />
      <label htmlFor={`busca-${idSuffix}`} className="sr-only">Buscar produto</label>
      <input
        ref={ref}
        id={`busca-${idSuffix}`}
        name="q"
        type="text"
        inputMode="search"
        autoComplete="off"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        tabIndex={search ? 0 : -1}
        placeholder="NutraHelp, coceira, mau hálito, tártaro..."
        className="min-w-0 flex-1 border-none bg-transparent font-body text-[15px] text-ink outline-none placeholder:text-muted-foreground"
      />
      <button type="button" aria-label="Fechar busca" onClick={close} tabIndex={search ? 0 : -1} className="grid h-[34px] w-[34px] flex-none place-items-center rounded-full bg-muted text-muted-foreground">
        <X className="h-4 w-4" strokeWidth={2.6} />
      </button>
    </form>
  );

  const cart = (
    <button type="button" aria-label="Ver combos" onClick={() => go("combos")} className="grid h-[46px] w-[46px] flex-none place-items-center rounded-full bg-gift/60 text-terracotta">
      <ShoppingCart className="h-[21px] w-[21px]" />
    </button>
  );

  /* CTA "Descubra o produto ideal": stays visible while the search is open; the
     search field grows leftward into the space freed by the nav. */
  const cta = (
    <span className="hidden overflow-hidden xl:block">
      <button type="button" onClick={() => go("campeoes")} className="flex h-[50px] items-center gap-3 rounded-full bg-shipping pl-6 pr-2 font-body text-[15px] font-semibold text-shipping-foreground hover:opacity-90">
        <span className="whitespace-nowrap">Descubra o <strong className="font-extrabold">produto ideal</strong></span>
        <span aria-hidden className="grid h-[32px] w-[32px] place-items-center rounded-full bg-shipping-foreground text-shipping"><ChevronRight className="h-4 w-4" strokeWidth={3} /></span>
      </button>
    </span>
  );

  return (
    <header className="sticky top-0 z-40 h-[78px] border-b border-border bg-background">
      {/* Desktop */}
      <div className="hidden h-full items-center gap-[26px] px-11 lg:flex">
        <Link to="/home" className="flex-none"><img src={petHelpLogo.url} alt="PetHelp" className="h-8 w-auto" /></Link>
        <nav ref={navRef} className="flex flex-none items-center gap-[18px] whitespace-nowrap">
          {links.map((l) => (
            <button key={l.label} onClick={() => go(l.id)} className={`font-body text-sm font-semibold hover:opacity-75 ${l.cls}`}>{l.label}</button>
          ))}
        </nav>
        <div ref={wrapRef} className="ml-auto flex-none min-w-0" style={wrapStyle}>
          <div className="relative h-[46px] w-full">
            <button
              ref={openBtn}
              type="button"
              onClick={open}
              aria-hidden={search}
              tabIndex={search ? -1 : 0}
              className={`absolute inset-0 flex items-center gap-2.5 rounded-full border border-border bg-card px-[18px] font-body text-[15px] text-muted-foreground ${search ? "pointer-events-none opacity-0" : "opacity-100"}`}
              style={{ transition: reduced ? "none" : `opacity ${search ? 140 : 200}ms linear ${search ? 0 : 120}ms` }}
            >
              <Search className="h-[19px] w-[19px] flex-none" strokeWidth={2.2} /> Buscar
            </button>
            <div
              className={`absolute inset-0 ${search ? "" : "pointer-events-none"}`}
              style={{ opacity: search ? 1 : 0, transition: reduced ? "none" : `opacity ${search ? 220 : 160}ms linear ${search ? 140 : 0}ms` }}
            >
              {form(inputRef, "header")}
            </div>
          </div>
        </div>
        <div className="flex flex-none items-center gap-4">{cart}{cta}</div>
      </div>

      {/* Mobile */}
      <div className="relative flex h-full items-center justify-between px-4 lg:hidden">
        {search ? (
          <div className="flex w-full items-center">{form(mInputRef, "mobile")}</div>
        ) : (
          <>
            <button aria-label={menu ? "Fechar menu" : "Abrir menu"} onClick={() => setMenu(!menu)} className="grid h-[46px] w-[46px] place-items-center text-ink">{menu ? <X /> : <Menu />}</button>
            <Link to="/home" className="absolute left-1/2 -translate-x-1/2"><img src={petHelpLogo.url} alt="PetHelp" className="h-7 w-auto" /></Link>
            <div className="flex items-center gap-1">
              <button ref={mOpenBtn} aria-label="Buscar" onClick={() => { setMenu(false); open(); }} className="grid h-[46px] w-[46px] place-items-center text-ink"><Search className="h-5 w-5" /></button>
              {cart}
            </div>
          </>
        )}
        {menu && !search && (
          <nav className="absolute left-0 right-0 top-full flex flex-col gap-4 border-b border-border bg-background px-5 py-5">
            {links.map((l) => <button key={l.label} onClick={() => go(l.id)} className={`text-left font-body text-base font-semibold ${l.cls}`}>{l.label}</button>)}
          </nav>
        )}
      </div>
    </header>
  );
}
