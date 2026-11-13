import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Truck, CreditCard, Star, ChevronLeft, ChevronRight, ShoppingCart, Check, Stethoscope, Leaf, ShieldCheck } from "lucide-react";
import petHelpLogo from "@/assets/pethelp-logo.png.asset.json";
import nutraFoto from "@/assets/nutrahelp-foto.png.asset.json";
import pataFoto from "@/assets/patahelp-foto.png.asset.json";
import bocaFoto from "@/assets/bocahelp-foto.png.asset.json";
import bocaBanner from "@/assets/bocahelp-destaque-home.jpeg.asset.json";
import nutraWordmark from "@/assets/nutrahelp-wordmark.png.asset.json";
import bocaWordmark from "@/assets/bocahelp-wordmark.png.asset.json";
import pataWordmark from "@/assets/patahelp-wordmark.png.asset.json";
import sintoma1 from "@/assets/sintoma-1-nova.jpg.asset.json";
import sintoma3 from "@/assets/sintoma-3-sofa.jpg.asset.json";
import sintoma5 from "@/assets/sintoma-5-feridas.png.asset.json";
import sinalHalito from "@/assets/sinal-mau-halito-v4.png.asset.json";
import sinalPatas from "@/assets/sinal-patas-ressecadas-v4.webp.asset.json";
import sinalLambe from "@/assets/sinal-lambe-pata.png.asset.json";
import sintoma6 from "@/assets/sintoma-6-scooting.jpg.asset.json";
import vetFoto from "@/assets/vet-rivaldo-nova.png.asset.json";
import sobreFoto from "@/assets/lifestyle-1.jpg";
import patahelpLataThumb from "@/assets/patahelp-lata-thumb.png.asset.json";
import bocahelpCutoutThumb from "@/assets/bocahelp-cutout-thumb.png.asset.json";
import dorinhaAntes from "@/assets/dorinha-antes.png.asset.json";
import dorinhaDepois from "@/assets/dorinha-depois.png.asset.json";
import marleyAntes from "@/assets/pata-marley-antes-v3.jpg.asset.json";
import marleyDepois from "@/assets/pata-marley-depois.png.asset.json";
import pandoraAntes from "@/assets/pandora-antes.png.asset.json";
import pandoraDepois from "@/assets/pandora-depois.png.asset.json";
import bobAntes from "@/assets/bob-antes-enquadrado.png.asset.json";
import bobDepois from "@/assets/bob-depois-enquadrado.png.asset.json";
import { HomeHeader } from "@/components/home/HomeHeader";
import { MiniBanners } from "@/components/home/MiniBanners";
import { Footer } from "@/components/Footer";
import { MarqueeStrip } from "@/components/MarqueeStrip";
import { ProductVideoFeedback } from "@/components/ProductVideoFeedback";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";
import { blackFridayVariants } from "@/lib/product";

const title = "PetHelp | Loja oficial de suplementos para cães";
const description = "NutraHelp, PataHelp e BocaHelp: cuidado para a pele, as patinhas e a boca do seu pet. Compre na loja oficial PetHelp.";

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: HomeStore,
});

type Product = { id: string; name: string; headline: string; text: string; bullets: string[]; price: number; image: string; tone: string; page?: "/pele"; banner?: string; logo?: string; logoSize?: number };

// Verde exato do fundo da arte do BocaHelp: usada para preencher as sobras do quadro sem emenda.
const BANNER_TEAL = "#22B6B6";

const products: Product[] = [
  { id: "nutrahelp", name: "NutraHelp", headline: "Pele forte, pelo bonito e zero coceira.", text: "Fortalece a imunidade, reduz coceiras e cuida do seu pet por dentro.", bullets: ["Reduz coceira e alergias", "Fecha falhas no pelo", "Fortalece a imunidade", "44 nutrientes em um pote"], price: 139, image: nutraFoto.url, tone: "bg-primary text-primary-foreground", page: "/pele", logo: nutraWordmark.url, logoSize: 54 },
  { id: "bocahelp", name: "BocaHelp", headline: "Boca cheirosa, dentes limpinhos e zero esforço.", text: "Reduz o mau hálito e o tártaro sem precisar escovar os dentes.", bullets: ["Acaba com o cheiro na boca", "Ajuda a controlar o tártaro", "Combate bactérias bucais", "É só colocar na água"], price: 49.9, image: bocaFoto.url, tone: "bg-secondary text-secondary-foreground", banner: bocaBanner.url, logo: bocaWordmark.url },
  { id: "patahelp", name: "PataHelp", headline: "Patinhas macias, focinho protegido.", text: "Hidrata, acalma e protege patas, focinho e pele com ingredientes naturais.", bullets: ["Reduz lambeduras", "Trata ressecamento e rachaduras", "Alivia irritações", "Cria barreira protetora"], price: 29.9, image: pataFoto.url, tone: "bg-gift text-gift-foreground", logo: pataWordmark.url },
];

// Ordem dos cards em "Campeões de venda": BocaHelp à esquerda, NutraHelp no meio, PataHelp à direita.
const CARDS_ORDER = ["bocahelp", "nutrahelp", "patahelp"];
const campeoesProducts = [...products].sort(
  (a, b) => CARDS_ORDER.indexOf(a.id) - CARDS_ORDER.indexOf(b.id),
);

const challenges = [
  { img: sintoma1.url, label: "Coceira sem parar" },
  { img: sintoma3.url, label: "Queda de pelo e falhas" },
  { img: sintoma5.url, label: "Feridas e irritações" },
  { img: sinalLambe.url, label: "Lambe as patas" },
  { img: sinalPatas.url, label: "Patas ressecadas" },
  { img: sinalHalito.url, label: "Mau hálito e tártaro" },
  { img: sintoma6.url, label: "Vive se esfregando" },
];

const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const parcela = (v: number, n = 6) => `${n}x ${brl(v / n)}`;
const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return <span className="flex text-gift">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className={`${className} fill-current`} />)}</span>;
}

function SectionTitle({ eyebrow, children }: { eyebrow?: string; children: React.ReactNode }) {
  return (
    <div className="text-center">
      {eyebrow && <p className="eyebrow text-primary!">{eyebrow}</p>}
      <h2 className={`${eyebrow ? "mt-3 " : ""}font-display text-3xl leading-tight text-ink md:text-5xl`}>{children}</h2>
    </div>
  );
}

function HeroCarousel() {
  const [i, setI] = useState(0);
  const touch = useRef<number | null>(null);
  const hover = useRef(false);
  useEffect(() => {
    const t = setInterval(() => { if (!hover.current && !document.hidden) setI((v) => (v + 1) % products.length); }, 8000);
    return () => clearInterval(t);
  }, []);
  const go = (d: number) => setI((v) => (v + d + products.length) % products.length);
  return (
    <section aria-label="Produtos em destaque" className="relative overflow-hidden" onMouseEnter={() => (hover.current = true)} onMouseLeave={() => (hover.current = false)}
      onTouchStart={(e) => (touch.current = e.touches[0]!.clientX)} onTouchEnd={(e) => { if (touch.current === null) return; const dx = e.changedTouches[0]!.clientX - touch.current; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); touch.current = null; }}>
      <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${i * 100}%)` }}>
        {products.map((p) => (
          <div key={p.id} className={`flex w-full shrink-0 items-center justify-center ${p.banner ? "" : p.tone}`} style={p.banner ? { backgroundColor: BANNER_TEAL } : undefined}>
            {p.banner ? (
              <Link to="/black-friday" aria-label="Ver BocaHelp" className="block w-full">
                <img src={p.banner} alt="BocaHelp: boca cheirosa, dentes limpinhos e zero esforço" className="block aspect-[900/762] w-full object-cover object-left md:hidden" loading="lazy" />
                <img src={p.banner} alt="" aria-hidden="true" className="hidden max-h-[760px] w-full object-cover md:block" loading="lazy" />
              </Link>
            ) : (
              <div className="container-x grid w-full items-center gap-8 py-10 md:grid-cols-[1.1fr_1fr_0.9fr] md:py-16">
                <div>
                  <p className="font-display text-5xl md:text-7xl">{p.name}</p>
                  <h1 className="mt-4 max-w-md font-display text-2xl leading-snug md:text-3xl">{p.headline}</h1>
                  {p.page
                    ? <Link to={p.page} className="mt-7 inline-block rounded-full bg-ink px-8 py-4 font-bold uppercase text-background hover:opacity-90">Ajude seu pet agora</Link>
                    : <button onClick={() => goTo("campeoes")} className="mt-7 rounded-full bg-ink px-8 py-4 font-bold uppercase text-background hover:opacity-90">Ajude seu pet agora</button>}
                </div>
                <img src={p.image} alt={p.name} className="mx-auto max-h-[220px] w-auto object-contain md:max-h-[470px]" />
                <ul className="hidden space-y-4 md:block">
                  {p.bullets.map((b) => <li key={b} className="flex items-center gap-3 font-bold"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-background/25"><Check className="h-4 w-4" /></span>{b}</li>)}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {products.map((p, n) => <button key={p.id} aria-label={`Ver ${p.name}`} onClick={() => setI(n)} className={`h-2 rounded-full bg-ink transition-all ${n === i ? "w-8" : "w-2 opacity-40"}`} />)}
      </div>
    </section>
  );
}

function ChallengesCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const scroll = (d: number) => ref.current?.scrollBy({ left: d * ref.current.clientWidth * 0.8, behavior: "smooth" });
  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const base = el.getBoundingClientRect().left - el.scrollLeft;
    let best = 0;
    let dist = Infinity;
    Array.from(el.children).forEach((node, n) => {
      const d = Math.abs((node as HTMLElement).getBoundingClientRect().left - base - el.scrollLeft);
      if (d < dist) { dist = d; best = n; }
    });
    setIndex(best);
  };
  return (
    <section className="py-14">
      <div className="container-x"><SectionTitle eyebrow="Sinais">Desafios de saúde</SectionTitle></div>
      <div ref={ref} onScroll={onScroll} className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:px-10">
        {challenges.map((c) => (
          <article key={c.label} className="relative w-[46%] shrink-0 snap-start overflow-hidden rounded-3xl sm:w-[30%] lg:w-[18%]">
            <img src={c.img} alt={c.label} className="aspect-[3/4] w-full object-cover" loading="lazy" draggable={false} />
            <div className="absolute inset-x-0 bottom-0 flex min-h-[17%] items-center justify-center bg-background/85 px-3 py-2.5 backdrop-blur-md">
              <p className="text-center font-bold text-ink">{c.label}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mx-auto mt-5 flex max-w-[1400px] items-center justify-between gap-4 px-5 md:px-10">
        <p className="text-xs text-muted-foreground" aria-live="polite">{String(index + 1).padStart(2, "0")} / {String(challenges.length).padStart(2, "0")}</p>
        <div className="flex gap-3">
          <button aria-label="Anterior" onClick={() => scroll(-1)} className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground"><ChevronLeft /></button>
          <button aria-label="Próximo" onClick={() => scroll(1)} className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground"><ChevronRight /></button>
        </div>
      </div>
    </section>
  );
}

function HomeStore() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex h-[42px] items-center justify-center gap-6 overflow-hidden whitespace-nowrap bg-primary px-4 font-body text-[12px] text-primary-foreground sm:gap-10 sm:text-[13px]">
        <span className="flex items-center gap-2"><Truck className="h-[17px] w-[17px]" /><span><strong className="font-extrabold">Frete grátis</strong> nos combos</span></span>
        <span className="hidden items-center gap-2 sm:flex"><ShieldCheck className="h-[17px] w-[17px]" /><span>Garantia de <strong className="font-extrabold">60 dias</strong></span></span>
        <span className="hidden items-center gap-2 md:flex"><CreditCard className="h-[17px] w-[17px]" /><span>Até <strong className="font-extrabold">10x sem juros</strong></span></span>
      </div>
      <HomeHeader goTo={goTo} />

      <main>
        <HeroCarousel />
        <MarqueeStrip items={["Desenvolvidos por veterinários", "+150 mil pets transformados", "Fórmulas seguras e naturais", "Registrado no MAPA", "Garantia de 60 dias"]} />
        <MiniBanners goTo={goTo} />

        <section id="campeoes" className="container-x scroll-mt-28 py-14">
          <SectionTitle>Campeões de venda</SectionTitle>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {campeoesProducts.map((p) => (
              <article key={p.id} className="flex flex-col rounded-3xl bg-card p-5 shadow-sm">
                {p.logo
                  ? <p className="flex h-12 items-center justify-center"><img src={p.logo} alt={p.name} className="w-auto object-contain" style={{ height: p.logoSize ?? 48 }} loading="lazy" /></p>
                  : <p className="text-center font-display text-3xl text-primary">{p.name}</p>}
                <div className="mt-3 grid aspect-square place-items-center rounded-2xl bg-background"><img src={p.image} alt={p.name} className="max-h-[85%] w-auto object-contain" loading="lazy" /></div>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><Stars className="h-3.5 w-3.5" />4,8</div>
                <p className="mt-2 text-2xl font-bold text-primary">{parcela(p.price)}</p>
                <p className="text-xs text-muted-foreground">ou {brl(p.price)} à vista</p>
                <p className="mt-3 flex-1 text-sm">{p.text}</p>
                {p.page
                  ? <Link to={p.page} className="mt-5 flex items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-bold uppercase text-primary-foreground hover:opacity-90">Comprar agora <ShoppingCart className="h-4 w-4" /></Link>
                  : <span className="mt-5 rounded-full border border-border py-3 text-center text-sm font-bold uppercase text-muted-foreground">Página em breve</span>}
              </article>
            ))}
          </div>
        </section>

        <ChallengesCarousel />

        <section id="depoimentos" className="scroll-mt-28 pt-14">
          <div className="container-x text-center">
            <p className="eyebrow text-primary!">Depoimentos</p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-ink md:text-5xl">Tutores que já passaram por isso</h2>
          </div>
          <div className="paw-band mt-8 bg-primary py-7 md:py-9">
            <ProductVideoFeedback onBuy={() => goTo("combos")} showDetails={false} storeLayout />
          </div>
        </section>

        <BeforeAfterSection title="Eles tinham um problema. Agora têm uma nova vida!" resultStyle onlyExtra extraCases={[
          { name: "Dorinha", quote: "A vermelhidão da barriga sumiu e a pele ficou lisa de novo.", before: dorinhaAntes.url, after: dorinhaDepois.url, fullImages: true, afterLabel: "30 dias", productPosition: "center", product: { name: "PataHelp", image: patahelpLataThumb.url }, productHeight: 42 },
          { name: "Marley", quote: "Ele parou de lamber a pata e o vermelho entre os coxins sumiu.", before: marleyAntes.url, after: marleyDepois.url, fullImages: true, afterLabel: "15 DIAS", productPosition: "center", product: { name: "PataHelp", image: patahelpLataThumb.url }, productHeight: 42 },
          { name: "Pandora", quote: "O tártaro diminuiu e os dentes clarearam.", before: pandoraAntes.url, after: pandoraDepois.url, fullImages: true, afterLabel: "30 DIAS", productPosition: "center", product: { name: "BocaHelp", image: bocahelpCutoutThumb.url }, productHeight: 68 },
          { name: "Bob", quote: "A gengiva desinchou e os dentes ficaram brancos de novo.", before: bobAntes.url, after: bobDepois.url, fullImages: true, afterLabel: "90 dias", productPosition: "center", product: { name: "BocaHelp", image: bocahelpCutoutThumb.url }, productHeight: 68 },
        ]} />

        <section id="combos" className="container-x scroll-mt-28 py-14">
          <SectionTitle eyebrow="Economize">Combos para economizar</SectionTitle>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {blackFridayVariants.map((v) => {
              const total = v.total ?? v.unitPrice * v.units;
              const off = v.compareAt ? Math.round((1 - total / v.compareAt) * 100) : 0;
              return (
                <article key={v.id} className={`relative flex flex-col rounded-3xl bg-card p-5 shadow-sm ${v.badge ? "ring-2 ring-primary" : ""}`}>
                  {off > 0 && <span className="absolute left-5 top-5 z-10 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">{off}% OFF</span>}
                  <img src={v.image} alt={v.label} className="aspect-square w-full rounded-2xl object-cover" loading="lazy" />
                  <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><Stars className="h-3.5 w-3.5" />{v.badge ?? "Combo"}</div>
                  <h3 className="mt-1 font-display text-2xl text-ink">{v.label}</h3>
                  <p className="whitespace-pre-line text-sm text-muted-foreground">{v.detail}</p>
                  <p className="mt-3 text-2xl font-bold text-primary">{parcela(total, v.installments ?? 6)}</p>
                  <p className="text-xs text-muted-foreground">{v.compareAt && <span className="line-through">{brl(v.compareAt)}</span>} {brl(total)} à vista</p>
                  <Link to="/black-friday" className="mt-5 rounded-full bg-primary py-3 text-center text-sm font-bold uppercase text-primary-foreground hover:opacity-90">Comprar agora</Link>
                </article>
              );
            })}
          </div>
        </section>

        <section id="especialistas" className="container-x grid scroll-mt-28 items-center gap-10 py-14 md:grid-cols-2">
          <img src={vetFoto.url} alt="Dr. Rivaldo Júnior, médico veterinário" className="aspect-[4/3] w-full rounded-3xl object-cover" loading="lazy" />
          <div>
            <p className="eyebrow text-primary!">Indicação</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-ink md:text-5xl">Recomendado por <span className="text-primary">especialistas</span></h2>
            <p className="mt-5 text-lg text-muted-foreground">Nossas fórmulas são indicadas por médicos veterinários para quem quer cuidar da coceira, das patinhas e da boca do pet todos os dias, de um jeito simples.</p>
            <p className="mt-3 text-sm font-bold text-ink">Dra. Ialy Raissa · CRMV-PE 5655 &nbsp;|&nbsp; Dr. Rivaldo Júnior · CRMV-PE 5731</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {[[Stethoscope, "Veterinários"], [Leaf, "Zootecnistas"], [ShieldCheck, "Registrado no MAPA"]].map(([Icon, l]) => {
                const I = Icon as typeof Leaf;
                return <span key={l as string} className="flex items-center gap-2 rounded-full border border-primary px-4 py-2 text-xs font-bold uppercase text-primary"><I className="h-4 w-4" />{l as string}</span>;
              })}
            </div>
          </div>
        </section>

        <section id="sobre" className="scroll-mt-28 bg-ink text-background">
          <div className="grid md:grid-cols-2">
            <img src={sobreFoto} alt="Tutora brincando com seu cachorro" className="h-full max-h-[620px] w-full object-cover" loading="lazy" />
            <div className="flex flex-col justify-center p-8 md:p-14">
              <p className="eyebrow text-primary!">Quem somos</p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl">Sobre nós</h2>
              <div className="mt-6 space-y-4 text-lg opacity-90">
                <p>Não somos apenas uma marca de suplementos, <strong className="text-primary">somos uma missão em forma de cuidado</strong>, criada para prolongar a vida, o conforto e a saúde dos pets que fazem parte da sua família.</p>
                <p>Nossos produtos são desenvolvidos por <strong className="text-primary">veterinários e especialistas em nutrição animal</strong>, com fórmulas completas, seguras e comprovadas, que unem o poder da ciência, da natureza e da inovação.</p>
                <p>Por isso, cada produto PetHelp nasceu para <strong className="text-primary">devolver aos pets o amor que eles nos dão todos os dias.</strong></p>
              </div>
            </div>
          </div>
        </section>

        <section className="container-x py-14">
          <div className="rounded-[2rem] bg-primary p-8 text-center text-primary-foreground md:p-14">
            <h2 className="font-display text-3xl md:text-5xl">Descubra o cuidado que seu pet precisa</h2>
            <p className="mt-3 text-lg">Faça o teste e ganhe um presente exclusivo!</p>
            <button onClick={() => goTo("campeoes")} className="mt-7 rounded-full bg-background px-8 py-4 font-bold uppercase text-primary hover:opacity-90">Começar meu quiz</button>
            <p className="mt-3 text-xs opacity-80">Quiz em breve</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
