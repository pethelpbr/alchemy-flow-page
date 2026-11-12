import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ShieldCheck, Truck, Star } from "lucide-react";
import petHelpLogo from "@/assets/pethelp-logo.png.asset.json";
import nutraFoto from "@/assets/bf-gallery-nutra.png.asset.json";
import pataFoto from "@/assets/bf-gallery-pata.png.asset.json";
import bocaFoto from "@/assets/bf-gallery-boca.png.asset.json";
import kitFoto from "@/assets/kit-bf-3-potes-v6.png.asset.json";
import { Footer } from "@/components/Footer";

const title = "PetHelp | Loja oficial de suplementos para cães";
const description = "Conheça NutraHelp, PataHelp e BocaHelp: cuidado para a pele, as patinhas e a boca do seu pet. Compre na loja oficial PetHelp.";

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: HomeStore,
});

type Product = { id: string; name: string; tagline: string; text: string; price: number; compareAt?: number; image: string; page?: "/pele" };

const products: Product[] = [
  { id: "nutrahelp", name: "NutraHelp", tagline: "Pele e pelos", text: "44 nutrientes em um pote para acabar com a coceira, fechar falhas e devolver o brilho do pelo.", price: 139, image: nutraFoto.url, page: "/pele" },
  { id: "patahelp", name: "PataHelp", tagline: "Patinhas e focinho", text: "Hidrata e protege almofadinhas, focinho e pele ressecada ou irritada.", price: 29.9, compareAt: 59.9, image: pataFoto.url },
  { id: "bocahelp", name: "BocaHelp", tagline: "Hálito e tártaro", text: "Higiene bucal sem escovar: reduz o mau hálito e ajuda a controlar o tártaro.", price: 49.9, compareAt: 89.9, image: bocaFoto.url },
];

const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function HomeStore() {
  const [open, setOpen] = useState(false);
  const nav = (
    <>
      <Link to="/pele" className="hover:text-primary">NutraHelp</Link>
      <a href="#patahelp" onClick={() => setOpen(false)} className="hover:text-primary">PataHelp</a>
      <a href="#bocahelp" onClick={() => setOpen(false)} className="hover:text-primary">BocaHelp</a>
      <Link to="/black-friday" className="text-primary">Black Friday</Link>
    </>
  );
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="bg-gift py-2 text-center text-xs font-bold uppercase tracking-wide text-gift-foreground">Frete grátis nos combos · Garantia de 60 dias</div>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link to="/home"><img src={petHelpLogo.url} alt="PetHelp" className="h-8 w-auto" /></Link>
          <nav className="hidden gap-8 text-sm font-bold uppercase md:flex">{nav}</nav>
          <button className="md:hidden" aria-label="Abrir menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
        {open && <nav className="flex flex-col gap-4 border-t border-border px-5 py-5 text-sm font-bold uppercase md:hidden">{nav}</nav>}
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 md:grid-cols-2 md:py-20">
          <div>
            <p className="eyebrow text-primary!">Loja oficial PetHelp</p>
            <h1 className="mt-3 font-display text-4xl leading-tight md:text-6xl">Cuidado completo, da pele à boca.</h1>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">Três produtos, cada um para uma necessidade do seu pet. Escolha por onde começar.</p>
            <div className="mt-6 flex items-center gap-2 text-sm"><span className="flex text-primary">{[0,1,2,3,4].map((i) => <Star key={i} className="h-4 w-4 fill-current" />)}</span>+150 mil pets atendidos</div>
            <a href="#produtos" className="mt-8 inline-block rounded-full bg-primary px-8 py-4 font-bold uppercase text-primary-foreground hover:opacity-90">Ver produtos</a>
          </div>
          <img src={kitFoto.url} alt="NutraHelp, PataHelp e BocaHelp" className="w-full rounded-3xl" />
        </section>

        <section id="produtos" className="mx-auto max-w-6xl px-5 py-12">
          <p className="eyebrow text-center text-primary!">Nossos produtos</p>
          <h2 className="mt-3 text-center font-display text-3xl md:text-5xl">Escolha o cuidado do seu pet</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {products.map((p) => (
              <article key={p.id} id={p.id} className="flex scroll-mt-28 flex-col overflow-hidden rounded-3xl border border-border bg-card">
                <img src={p.image} alt={p.name} className="aspect-square w-full object-cover" loading="lazy" />
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-bold uppercase text-primary">{p.tagline}</p>
                  <h3 className="mt-1 font-display text-2xl">{p.name}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.text}</p>
                  <div className="mt-4 flex items-baseline gap-2">
                    {p.compareAt && <span className="text-sm text-muted-foreground line-through">{brl(p.compareAt)}</span>}
                    <span className="text-2xl font-bold">{brl(p.price)}</span>
                  </div>
                  {p.page ? (
                    <Link to={p.page} className="mt-5 rounded-full bg-primary py-3 text-center font-bold uppercase text-primary-foreground hover:opacity-90">Conhecer o {p.name}</Link>
                  ) : (
                    <span className="mt-5 rounded-full border border-border py-3 text-center font-bold uppercase text-muted-foreground">Página em breve</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-16">
          <Link to="/black-friday" className="block rounded-3xl bg-foreground p-8 text-center text-background md:p-12">
            <p className="eyebrow text-primary!">Black Friday</p>
            <p className="mt-3 font-display text-3xl md:text-4xl">Kit com os três produtos com até 67% OFF</p>
            <span className="mt-6 inline-block rounded-full bg-primary px-8 py-3 font-bold uppercase text-primary-foreground">Ver o kit</span>
          </Link>
          <div className="mt-10 grid gap-4 text-sm sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl bg-card p-5"><Truck className="text-primary" />Frete grátis nos combos</div>
            <div className="flex items-center gap-3 rounded-2xl bg-card p-5"><ShieldCheck className="text-primary" />60 dias de garantia ou seu dinheiro de volta</div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
