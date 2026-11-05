import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { HeroSection } from "@/components/HeroSection";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";
import { GuaranteeSection } from "@/components/GuaranteeSection";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { FinalOffer } from "@/components/FinalOffer";
import { TrustBadgesStrip } from "@/components/TrustBadgesStrip";
import { FAQAccordion } from "@/components/FAQAccordion";
import { BlackFridayTopStrip } from "@/components/BlackFridayTopStrip";
import { LandingLayout } from "@/components/layout/LandingLayout";
import { useCart } from "@/lib/use-cart";
import { blackFridayVariants, type Variant } from "@/lib/product";
import { OfferProvider, type Offer } from "@/lib/offer-context";
import { cn } from "@/lib/utils";
import { KitStatsSection, KitVetSection } from "@/components/kit-bf/PlaceholderSections";
import kitCompleto from "@/assets/kit-bf-completo.png.asset.json";
import kit2Potes from "@/assets/kit-bf-2-potes.png.asset.json";
import kit3Potes from "@/assets/kit-bf-3-potes-v2.png.asset.json";
import nutraFoto from "@/assets/nutrahelp-foto.png.asset.json";
import pataFoto from "@/assets/patahelp-foto.png.asset.json";
import bocaGif from "@/assets/gif-boca-v2.gif.asset.json";
import nutraGif from "@/assets/gif-nutra.gif.asset.json";
import pataGif from "@/assets/gif-pata.gif.asset.json";
import bocaFoto from "@/assets/bocahelp-foto.png.asset.json";
import pataLata from "@/assets/patahelp-lata.png.asset.json";
import bocaFrasco from "@/assets/bocahelp-frasco.jpg.asset.json";
import sinalCoceira from "@/assets/sinal-cocira.png.asset.json";
import sinalQueda from "@/assets/sinal-queda-pelos.png.asset.json";
import sinalLambePata from "@/assets/sinal-lambe-pata.png.asset.json";
import sinalPatasRessecadas from "@/assets/sinal-patas-ressecadas-v4.webp.asset.json";
import mosaicoPets from "@/assets/mosaico-pets-clientes.png.asset.json";
import mosaicoPetsMobile from "@/assets/mosaico-pets-clientes-mobile-v2.png.asset.json";
import mosaicoPetsMobileV3 from "@/assets/mosaico-pets-clientes-mobile-v3.png.asset.json";
import sinalTartaro from "@/assets/sinal-tartaro-dentes-v2.jpg.asset.json";


const title = "Kit Black Friday PetHelp | NutraHelp + PataHelp + BocaHelp";
const description =
  "Black Friday PetHelp: kit com NutraHelp, PataHelp e BocaHelp a partir de R$ 149,90. Cuidado completo por dentro e por fora para cães e gatos.";

export const Route = createFileRoute("/black-friday")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlackFridayPage,
});

const offer: Offer = {
  variants: blackFridayVariants,
  showAddons: false,
  buyLabel: "Quero meu kit Black Friday",
  bundleImages: [
    { src: pataLata.url, alt: "PataHelp" },
    { src: bocaFrasco.url, alt: "BocaHelp" },
  ],
};

const products = [
  { name: "NutraHelp", what: "Suplemento 8 em 1 com 44 nutrientes", detail: "Pele, pelos, intestino e imunidade, por dentro.", img: nutraFoto.url },
  { name: "PataHelp", what: "Balm pet 3 em 1 · 40g", detail: "Protege patas, focinho e pele.", img: pataFoto.url },
  { name: "BocaHelp", what: "Higiene bucal 3 em 1 · 250ml", detail: "Contra mau hálito e tártaro, sem precisar escovar.", img: bocaFoto.url },
];

function KitGallery({ selected }: { selected: Variant }) {
  const kitImage = {
    "bf-1": kitCompleto.url,
    "bf-2": kit2Potes.url,
    "bf-3": kit3Potes.url,
  }[selected.id];
  const shots = [nutraFoto.url, pataFoto.url, bocaFoto.url];
  const [i, setI] = useState<number | null>(null);
  useEffect(() => {
    setI(null);
  }, [selected.id]);
  const activeSrc = i === null && kitImage ? kitImage : shots[i ?? 0];
  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl">
        <img src={activeSrc} alt="Produto do kit Black Friday" className="aspect-square w-full object-cover" />
        <span className="absolute left-4 top-4 rounded-full bg-primary px-4 py-1.5 text-xs font-bold uppercase text-primary-foreground">
          Black Friday
        </span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {shots.map((s, idx) => (
          <button
            key={s}
            type="button"
            onClick={() => setI(idx)}
            className={cn("overflow-hidden rounded-xl border-2 transition-colors", idx === i ? "border-primary" : "border-transparent")}
          >
            <img src={s} alt="" className="aspect-square w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

const signs: { product: string; title: string; text: string; img?: string }[] = [
  { product: "NutraHelp", title: "Coceira frequente", text: "Coça, morde e se esfrega nos móveis, e piora de noite.", img: sinalCoceira.url },
  { product: "NutraHelp", title: "Queda de pelos", text: "Pelo espalhado pela casa e falhas aparecendo na pelagem.", img: sinalQueda.url },
  { product: "PataHelp", title: "Lambe a pata", text: "De madrugada você escuta o barulho. O pelo da pata fica escuro e úmido.", img: sinalLambePata.url },
  { product: "PataHelp", title: "Patas ou focinho ressecados", text: "A pata fica áspera, com rachaduras, e o focinho ressecado.", img: sinalPatasRessecadas.url },
  { product: "BocaHelp", title: "Mau hálito", text: "Dá para sentir de longe, e vai piorando com o tempo." },
  { product: "BocaHelp", title: "Tártaro nos dentes", text: "Aquela crosta amarelada na base do dente, junto da gengiva.", img: sinalTartaro.url },
];

function SignsSection() {
  return (
    <section className="section bf-light">
      <div className="container-x">
        <h2 className="text-center font-display text-4xl leading-tight text-foreground lg:text-5xl">
          Reconhece algum
          <br className="sm:hidden" /> desses sinais?
        </h2>
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {signs.map((s) => (
            <article key={s.title} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
              {s.img ? (
                <img src={s.img} alt={s.title} loading="lazy" className="aspect-[4/3] w-full border-b border-border object-cover" />
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center border-b border-border bg-muted p-4 text-center text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                  Foto · {s.title}
                </div>
              )}
              <div className="p-5">
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary">
                  {s.product}
                </span>
                <h3 className="mt-3 font-display text-xl text-foreground">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsBand() {
  return (
    <section className="relative overflow-hidden bg-[#1E1813] sm:h-[240px] lg:h-[280px]">
      <img
        src={mosaicoPets.url}
        alt="Mosaico de fotos de pets de clientes"
        loading="lazy"
        className="absolute inset-0 hidden h-full w-full object-cover object-center lg:block"
      />
      <img
        src={mosaicoPetsMobile.url}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 hidden h-full w-full object-cover object-center sm:block lg:hidden"
      />
      <img
        src={mosaicoPetsMobileV3.url}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="block h-auto w-full sm:hidden"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(760px 300px at 50% 50%, rgba(20,15,11,0.88) 0%, rgba(20,15,11,0.74) 48%, rgba(20,15,11,0.60) 100%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <p className="font-display text-[clamp(36px,11vw,50px)] font-bold leading-none tracking-tight text-[#FDFAF7] [text-shadow:0_2px_24px_rgba(0,0,0,0.5)] sm:text-6xl lg:text-7xl">
          +<span className="text-primary">150 mil</span> Pets transformados
        </p>
      </div>
    </section>
  );
}

const productDetails = [
  {
    ...products[0],
    img: nutraGif.url,
    what: "Suplemento multifuncional em pó 8 em 1, com 44 nutrientes.",
    ingredients: "Ômega 3, biotina, pré e probióticos",
    change: "Se coça e se lambe menos, e o pelo volta a crescer nas falhas.",
    use: "misture na comida, uma vez por dia. Tem sabor de carne.",
  },
  {
    ...products[1],
    img: pataGif.url,
    what: "Balm natural para patas, focinho e áreas ressecadas.",
    ingredients: "Manteiga de karité, cera de abelha e óleos vegetais",
    change: "A pata ressecada de tanto lamber volta a ficar macia e as rachaduras fecham.",
    use: "passe direto na região, quantas vezes precisar. É lambível e atóxico.",
  },
  {
    ...products[2],
    img: bocaGif.url,
    what: "Solução para higiene bucal de quem não consegue escovar os dentes do pet.",
    ingredients: "Clorexidina, extrato de menta e aloe vera",
    change: "O hálito melhora e a formação de tártaro desacelera.",
    use: "10 ml para cada litro de água. Não tem gosto, o pet nem percebe.",
  },
];

function KitContents() {
  return (
    <section id="produtos" className="section bf-beige scroll-mt-8">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase text-primary">Conheça os produtos</p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-foreground lg:text-5xl">
            Cada um cuida de uma parte.
            <br /> Juntos, cobrem o pet inteiro.
          </h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
          {productDetails.map((p) => (
            <article key={p.name} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
              <img src={p.img} alt={p.name} loading="lazy" className="aspect-square w-full object-cover" />
              <div className="flex flex-1 flex-col gap-4 p-5">
                <div>
                  <h3 className="font-display text-2xl text-foreground">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.what}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-primary">Ingredientes principais</p>
                  <p className="mt-1 text-sm text-foreground">{p.ingredients}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-primary">O que muda</p>
                  <p className="mt-1 text-sm text-foreground">{p.change}</p>
                </div>
                <p className="mt-auto rounded-xl bg-muted p-3 text-sm text-foreground">
                  <strong>Como usar:</strong> {p.use}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const kitFaqs = [
  { q: "Serve para o meu pet?", a: "Cães e gatos, de todas as raças e tamanhos, a partir de 3 meses de idade." },
  { q: "Dá para usar os três ao mesmo tempo?", a: "Dá. O NutraHelp vai na comida, o BocaHelp na água e o PataHelp passa direto na pata. Podem ser usados no mesmo dia, sem problema." },
  { q: "Meu pet não tem todos esses sinais. Vale levar o kit?", a: "Vale. Os três produtos são de uso diário e também servem para prevenir, em pet saudável. E no kit cada um sai por uma fração do preço avulso." },
  { q: "E se eu não gostar?", a: "Você tem 60 dias de garantia. Devolvemos o valor integral." },
  { q: "Em quanto tempo chega?", a: "[PRAZO REAL POR REGIÃO — PREENCHER]" },
];

function BlackFridayPage() {
  const cart = useCart(blackFridayVariants);
  const { selected, setSelected, checkout, addonIds, toggleAddon } = cart;

  return (
    <OfferProvider offer={offer}>
      <LandingLayout cart={cart} className="theme-bf" topStrip={<BlackFridayTopStrip />}>
        <HeroSection
          selected={selected}
          onSelect={setSelected}
          onBuy={checkout}
          addonIds={addonIds}
          onToggleAddon={toggleAddon}
          showDetails={false}
          gallery={<KitGallery selected={selected} />}
          title="Cuide do seu pet por dentro, da boca e das patas"
          eyebrow="Black Friday · 3 produtos · cães e gatos"
          intro="Os três produtos da PetHelp em um kit só, pelo menor preço do ano."
          bullets={[
            "Menos coceira, menos lambedura e menos queda de pelo com o NutraHelp",
            "Patas e focinho hidratados e protegidos com o PataHelp",
            "Hálito fresco e menos tártaro com o BocaHelp",
          ]}
        />
        {/* Âncora: a tarja fixa do celular aparece depois do hero (cartão de compra). */}
        <div id="duvidas-compra" />
        <StatsBand />
        <SignsSection />
        <KitContents />
        <KitStatsSection />
        <BeforeAfterSection className="bf-dark" />
        <KitVetSection />
        <GuaranteeSection tone="yellow" />
        <ReviewsCarousel className="bf-light" />
        <FinalOffer
          selected={selected}
          onSelect={setSelected}
          addonIds={addonIds}
          onToggleAddon={toggleAddon}
          className="bf-brown"
          unboxed
          heading={<>Escolha seu kit</>}
          subheading="Quanto mais NutraHelp, maior o desconto. Frete grátis em todos."
        />
        <TrustBadgesStrip className="bf-light" />
        <FAQAccordion items={kitFaqs} className="bf-light" />
      </LandingLayout>
    </OfferProvider>
  );
}
