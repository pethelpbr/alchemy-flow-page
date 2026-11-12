import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ShieldCheck, Truck, Star } from "lucide-react";
import petHelpLogo from "@/assets/pethelp-logo.png.asset.json";
import nutraFoto from "@/assets/bf-gallery-nutra.png.asset.json";
import pataFoto from "@/assets/bf-gallery-pata.png.asset.json";
import bocaFoto from "@/assets/bf-gallery-boca.png.asset.json";
import kitFoto from "@/assets/kit-bf-3-potes-v6.png.asset.json";
import { Footer } from "@/components/Footer";
import { ProductVideoFeedback } from "@/components/ProductVideoFeedback";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";
import { VeterinaryAuthoritySection } from "@/components/VeterinaryAuthoritySection";
import { blackFridayVariants } from "@/lib/product";
import patahelpLataThumb from "@/assets/patahelp-lata-thumb.png.asset.json";
import bocahelpCutoutThumb from "@/assets/bocahelp-cutout-thumb.png.asset.json";
import dorinhaAntes from "@/assets/dorinha-antes.png.asset.json";
import dorinhaDepois from "@/assets/dorinha-depois.png.asset.json";
import marleyAntes from "@/assets/pata-marley-antes-v2.png.asset.json";
import marleyDepois from "@/assets/pata-marley-depois.png.asset.json";
import pandoraAntes from "@/assets/pandora-antes.png.asset.json";
import pandoraDepois from "@/assets/pandora-depois.png.asset.json";
import bobAntes from "@/assets/bob-antes-enquadrado.png.asset.json";
import bobDepois from "@/assets/bob-depois-enquadrado.png.asset.json";

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

const signs = [
  { product: "NutraHelp", area: "Pele e pelos", items: ["Coceira o dia inteiro", "Queda de pelo e falhas", "Pelo opaco e quebradiço", "Feridas e vermelhidão"] },
  { product: "PataHelp", area: "Patinhas e focinho", items: ["Lambe as patas sem parar", "Almofadinhas ressecadas ou rachadas", "Pele vermelha entre os dedos", "Focinho seco"] },
  { product: "BocaHelp", area: "Boca", items: ["Mau hálito forte", "Tártaro amarelado nos dentes", "Gengiva avermelhada", "Não deixa escovar os dentes"] },
];

const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function HomeStore() {
  const [open, setOpen] = useState(false);
  const nav = (
    <>
      <Link to="/pele" className="hover:text-primary">NutraHelp</Link>
      <a href="#patahelp" onClick={() => setOpen(false)} className="hover:text-primary">PataHelp</a>
      <a href="#bocahelp" onClick={() => setOpen(false)} className="hover:text-primary">BocaHelp</a>
      <a href="#combos" onClick={() => setOpen(false)} className="hover:text-primary">Combos</a>
      <a href="#sobre" onClick={() => setOpen(false)} className="hover:text-primary">Sobre nós</a>
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
        <section className="mx-auto max-w-6xl px-5 pt-10 md:pt-14">
          <p className="eyebrow text-primary!">Loja oficial PetHelp</p>
          <h1 className="mt-3 font-display text-4xl leading-tight md:text-6xl">Cuidado completo, da pele à boca.</h1>
          <div className="mt-4 flex items-center gap-2 text-sm"><span className="flex text-primary">{[0,1,2,3,4].map((i) => <Star key={i} className="h-4 w-4 fill-current" />)}</span>+150 mil pets atendidos</div>
        </section>
        <section aria-label="Nossos produtos em destaque" className="mt-8">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:px-[max(1.25rem,calc((100vw-72rem)/2+1.25rem))]">
            {products.map((p) => (
              <div key={p.id} className="grid w-[88%] shrink-0 snap-center overflow-hidden rounded-3xl bg-foreground text-background md:w-[80%] md:grid-cols-2">
                <img src={p.image} alt={p.name} className="aspect-square w-full object-cover" />
                <div className="flex flex-col justify-center p-6 md:p-12">
                  <p className="eyebrow text-primary!">{p.tagline}</p>
                  <h2 className="mt-2 font-display text-3xl md:text-5xl">{p.name}</h2>
                  <p className="mt-3 opacity-80 md:text-lg">{p.text}</p>
                  <p className="mt-5 text-2xl font-bold">{brl(p.price)}</p>
                  {p.page ? <Link to={p.page} className="mt-5 self-start rounded-full bg-primary px-7 py-3 font-bold uppercase text-primary-foreground">Conhecer</Link> : <button onClick={() => goTo(p.id)} className="mt-5 self-start rounded-full bg-primary px-7 py-3 font-bold uppercase text-primary-foreground">Ver produto</button>}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-1 text-center text-xs text-muted-foreground">Arraste para o lado para ver os produtos</p>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14">
          <p className="eyebrow text-center text-primary!">Sinais</p>
          <h2 className="mt-3 text-center font-display text-3xl md:text-5xl">Reconhece algum desses sinais?</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {signs.map((g) => (
              <div key={g.product} className="rounded-3xl border border-border bg-card p-6">
                <p className="text-xs font-bold uppercase text-primary">{g.area}</p>
                <ul className="mt-4 space-y-3">{g.items.map((i) => <li key={i} className="flex gap-2"><span className="text-primary">•</span>{i}</li>)}</ul>
                <p className="mt-5 text-sm text-muted-foreground">Indicado: <strong className="text-foreground">{g.product}</strong></p>
              </div>
            ))}
          </div>
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

        <ProductVideoFeedback onBuy={() => goTo("combos")} showDetails={false} />

        <BeforeAfterSection extraCases={[
          { name: "Dorinha", before: dorinhaAntes.url, after: dorinhaDepois.url, fullImages: true, afterLabel: "30 dias", productPosition: "center", product: { name: "PataHelp", image: patahelpLataThumb.url }, productHeight: 42 },
          { name: "Marley", before: marleyAntes.url, after: marleyDepois.url, fullImages: true, afterLabel: "15 DIAS", productPosition: "center", product: { name: "PataHelp", image: patahelpLataThumb.url }, productHeight: 42 },
          { name: "Pandora", before: pandoraAntes.url, after: pandoraDepois.url, fullImages: true, afterLabel: "30 DIAS", productPosition: "center", product: { name: "BocaHelp", image: bocahelpCutoutThumb.url }, productHeight: 68 },
          { name: "Bob", before: bobAntes.url, after: bobDepois.url, fullImages: true, afterLabel: "90 dias", productPosition: "center", product: { name: "BocaHelp", image: bocahelpCutoutThumb.url }, productHeight: 68 },
        ]} resultStyle />

        <section id="combos" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-14">
          <p className="eyebrow text-center text-primary!">Combos</p>
          <h2 className="mt-3 text-center font-display text-3xl md:text-5xl">Os três produtos juntos</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {blackFridayVariants.map((v) => (
              <div key={v.id} className={`relative flex flex-col rounded-3xl border bg-card p-6 ${v.badge ? "border-primary" : "border-border"}`}>
                {v.badge && <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase text-primary-foreground">{v.badge}</span>}
                <img src={v.image} alt={v.label} className="aspect-square w-full rounded-2xl object-cover" loading="lazy" />
                <h3 className="mt-4 font-display text-2xl">{v.label}</h3>
                <p className="whitespace-pre-line text-sm text-muted-foreground">{v.detail}</p>
                <div className="mt-3 flex items-baseline gap-2">{v.compareAt && <span className="text-sm text-muted-foreground line-through">{brl(v.compareAt)}</span>}<span className="text-2xl font-bold">{brl(v.total ?? v.unitPrice)}</span></div>
                <Link to="/black-friday" className="mt-5 rounded-full bg-primary py-3 text-center font-bold uppercase text-primary-foreground hover:opacity-90">Quero este combo</Link>
              </div>
            ))}
          </div>
        </section>

        <VeterinaryAuthoritySection />

        <section id="sobre" className="mx-auto max-w-4xl scroll-mt-28 px-5 py-16 text-center">
          <p className="eyebrow text-primary!">Sobre nós</p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl">Somos a PetHelp</h2>
          <p className="mt-5 text-lg text-muted-foreground">Nascemos para ajudar tutores que já tentaram de tudo. Criamos suplementos e cuidados para a pele, as patinhas e a boca, desenvolvidos com veterinários e registrados no MAPA. Mais de 150 mil pets já foram atendidos.</p>
          <div className="mt-10 grid gap-4 text-left text-sm sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl bg-card p-5"><Truck className="text-primary" />Frete grátis nos combos</div>
            <div className="flex items-center gap-3 rounded-2xl bg-card p-5"><ShieldCheck className="text-primary" />60 dias de garantia ou seu dinheiro de volta</div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
