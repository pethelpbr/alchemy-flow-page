import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { HeroSection } from "@/components/HeroSection";
import { MobileKitGallery } from "@/components/MobileKitGallery";
import { DesktopKitGallery } from "@/components/DesktopKitGallery";
import cardSinais from "@/assets/bf-card-01-sinais.png.asset.json";
import cardNutra from "@/assets/bf-card-02-nutra.webp.asset.json";
import cardPata from "@/assets/bf-card-04-pata.webp.asset.json";
import cardBoca from "@/assets/bf-card-06-boca.webp.asset.json";
import cardVet from "@/assets/bf-card-08-veterinario.webp.asset.json";
import cardFormulas from "@/assets/bf-card-09-formulas.webp.asset.json";
import cardUsoNutra from "@/assets/bf-card-10-uso-nutra.png.asset.json";
import cardUsoPata from "@/assets/bf-card-11-uso-pata.webp.asset.json";
import cardUsoBoca from "@/assets/bf-card-12-uso-boca.png.asset.json";
import galleryResultadosNutra from "@/assets/bf-gallery-resultados-nutra-v3.png.asset.json";
import galleryResultadosPata from "@/assets/bf-gallery-resultados-pata-v3.png.asset.json";
import galleryResultadosBoca from "@/assets/bf-gallery-resultados-boca-v3.png.asset.json";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";
import dorinhaAntes from "@/assets/dorinha-antes.png.asset.json";
import dorinhaDepois from "@/assets/dorinha-depois.png.asset.json";
import marleyAntes from "@/assets/pata-marley-antes-v2.png.asset.json";
import marleyDepois from "@/assets/pata-marley-depois.png.asset.json";
import bobAntes from "@/assets/bob-antes-enquadrado.png.asset.json";
import bobDepois from "@/assets/bob-depois-enquadrado.png.asset.json";
import pandoraAntes from "@/assets/pandora-antes.png.asset.json";
import pandoraDepois from "@/assets/pandora-depois.png.asset.json";
import bocahelpCutoutThumb from "@/assets/bocahelp-cutout-thumb.png.asset.json";
import patahelpLataThumb from "@/assets/patahelp-lata-thumb.png.asset.json";
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
import kit1Potes from "@/assets/kit-bf-1-potes.png.asset.json";
import badgeBlackFriday from "@/assets/badge-black-friday.png.asset.json";
import kit2Potes from "@/assets/kit-bf-2-potes-v3.png.asset.json";
import kit3Potes from "@/assets/kit-bf-3-potes-v6.png.asset.json";
import nutraFoto from "@/assets/nutrahelp-foto.png.asset.json";
import pataFoto from "@/assets/patahelp-foto.png.asset.json";
import { LazyLoopVideo } from "@/components/LazyLoopVideo";
import bocaMp4 from "@/assets/produto-boca-v2.mp4.asset.json";
import bocaWebm from "@/assets/produto-boca-v2.webm.asset.json";
import bocaPoster from "@/assets/produto-boca-v2-poster.jpg.asset.json";
import nutraMp4 from "@/assets/produto-nutra.mp4.asset.json";
import nutraWebm from "@/assets/produto-nutra.webm.asset.json";
import nutraPoster from "@/assets/produto-nutra-poster.jpg.asset.json";
import pataMp4 from "@/assets/produto-pata.mp4.asset.json";
import pataWebm from "@/assets/produto-pata.webm.asset.json";
import pataPoster from "@/assets/produto-pata-poster.jpg.asset.json";
import bocaFoto from "@/assets/bocahelp-foto.png.asset.json";
import pataLata from "@/assets/patahelp-lata.png.asset.json";
import bocaFrasco from "@/assets/bocahelp-frasco.jpg.asset.json";
import sinalCoceira from "@/assets/sinal-cocira.png.asset.json";
import sinalQueda from "@/assets/sinal-queda-pelos.png.asset.json";
import sinalLambePata from "@/assets/sinal-lambe-pata.png.asset.json";
import sinalPatasRessecadas from "@/assets/sinal-patas-ressecadas-v4.webp.asset.json";
import mosaicoPetsMobileV3 from "@/assets/mosaico-pets-mobile-v4.png.asset.json";
import mosaicoPetsDesktop from "@/assets/mosaico-pets-desktop-v2.png.asset.json";
import sinalTartaro from "@/assets/sinal-tartaro-dentes-v3.jpg.asset.json";
import sinalMauHalito from "@/assets/sinal-mau-halito-v4.png.asset.json";


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
    "bf-1": kit1Potes.url,
    "bf-2": kit2Potes.url,
    "bf-3": kit3Potes.url,
  }[selected.id];
  const shots = [
    { src: kitImage ?? kitCompleto.url, alt: `Kit Black Friday ${selected.label}` },
    { src: cardSinais.url, alt: "Seu pet está assim? Sinais de que precisa de cuidado" },
    { src: cardNutra.url, alt: "NutraHelp: só cuidar por fora não resolve" },
    { src: galleryResultadosNutra.url, alt: "Antes e depois do NutraHelp: o que muda em 60 dias" },
    { src: cardPata.url, alt: "PataHelp: mais que hidratação" },
    { src: galleryResultadosPata.url, alt: "Antes e depois do PataHelp: não é promessa, é resultado" },
    { src: cardBoca.url, alt: "BocaHelp: sem escova, sem briga" },
    { src: galleryResultadosBoca.url, alt: "Antes e depois do BocaHelp: o próximo pode ser o seu" },
    { src: cardVet.url, alt: "PetHelp recomendado por veterinários: Dr. Rivaldo Junior" },
    { src: cardFormulas.url, alt: "Fórmulas do NutraHelp, PataHelp e BocaHelp" },
    { src: cardUsoNutra.url, alt: "Como usar NutraHelp: misture na comida" },
    { src: cardUsoPata.url, alt: "Como usar PataHelp: massageie na pele" },
    { src: cardUsoBoca.url, alt: "Como usar BocaHelp: dilua na água", ratio: 1261 / 1260 },
  ];
  return (
    <div>
      <MobileKitGallery key={`mobile-${selected.id}`} shots={shots} />
      <DesktopKitGallery key={`desktop-${selected.id}`} shots={shots} badge={badgeBlackFriday.url} />
    </div>
  );
}

const signs: { product: string; title: string; text: string; img?: string }[] = [
  { product: "NutraHelp", title: "Coceira frequente", text: "Se coça, até a pele ficar ferida. Também esfrega o bumbum no chão. ", img: sinalCoceira.url },
  { product: "NutraHelp", title: "Queda de pelos", text: "Pelo espalhado pela casa e falhas aparecendo na pelagem.", img: sinalQueda.url },
  { product: "PataHelp", title: "Lambe a pata", text: "De madrugada você escuta o barulho. O pelo da pata fica escuro e úmido.", img: sinalLambePata.url },
  { product: "PataHelp", title: "Patas ou focinho ressecados", text: "A pata fica áspera, com rachaduras, e o focinho ressecado.", img: sinalPatasRessecadas.url },
  { product: "BocaHelp", title: "Mau hálito", text: "Dá para sentir de longe, e vai piorando com o tempo.", img: sinalMauHalito.url },
  { product: "BocaHelp", title: "Tártaro nos dentes", text: "Aquela crosta amarelada na base do dente, junto da gengiva.", img: sinalTartaro.url },
];

function SignsSection() {
  return (
    <section className="section bf-light">
      <div className="container-x">
        <p className="text-center text-xs font-bold uppercase text-primary">Indicação</p>
        <h2 className="mt-3 text-center font-display text-4xl leading-tight text-foreground lg:text-5xl">
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
    <section className="relative overflow-hidden bg-[#1E1813]">
      <picture>
        <source media="(max-width: 767px)" srcSet={mosaicoPetsMobileV3.url} />
        <img
          src={mosaicoPetsDesktop.url}
          alt="Mosaico de fotos de pets de clientes"
          loading="lazy"
          className="block h-auto w-full"
        />
      </picture>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(760px 300px at 50% 50%, rgba(20,15,11,0.88) 0%, rgba(20,15,11,0.74) 48%, rgba(20,15,11,0.60) 100%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <p
          className="font-display font-bold leading-none tracking-tight text-[#FDFAF7] [text-shadow:0_2px_24px_rgba(0,0,0,0.5)]"
          style={{ fontSize: "clamp(28px, 4.5vw, 60px)" }}
        >
          +<span className="text-primary">150 mil</span> Pets transformados
        </p>
      </div>
    </section>
  );
}

const productDetails = [
  {
    ...products[0],
    video: { mp4: nutraMp4.url, webm: nutraWebm.url, poster: nutraPoster.url },
    what: "Suplemento multifuncional em pó 8 em 1, com 44 nutrientes.",
    ingredients: "Ômega 3, vitaminas, minerais, pré e probióticos",
    change: "Se coça e se lambe menos, e o pelos voltam a crescer sem falhas.",
    use: "misture na comida, uma vez por dia. Tem sabor de carne.",
  },
  {
    ...products[1],
    video: { mp4: pataMp4.url, webm: pataWebm.url, poster: pataPoster.url },
    what: "Balm natural para patas, focinho e pele ressecada.",
    ingredients: "Manteiga de karité, cera de abelha e óleos vegetais",
    change: "A pata ressecada de tanto lamber volta a ficar macia e as rachaduras cicatrizam.",
    use: "passe direto na região, quantas vezes precisar. É lambível e atóxico.",
  },
  {
    ...products[2],
    video: { mp4: bocaMp4.url, webm: bocaWebm.url, poster: bocaPoster.url },
    what: "Solução para higiene bucal de quem não consegue escovar os dentes do pet.",
    ingredients: "Clorexidina, extrato de menta e aloe vera",
    change: "O hálito melhora e a formação de tártaro diminui.",
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
            Cuida por dentro
            <br /> Protege por fora
          </h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
          {productDetails.map((p) => (
            <article key={p.name} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
              <LazyLoopVideo {...p.video} label={p.name ?? ""} className="aspect-square w-full object-cover" />
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
          title="Saúde completa para o pet que se coça, se lambe e tem mau hálito"
          eyebrow="Black Friday · 3 produtos · cães e gatos"
          intro="Tudo que ele precisa, pelo menor preço do ano."
          bullets={[
            "Reduz alergias, irritações e queda de pelo com o NutraHelp",
            "Alívio na pata lambida e no focinho ressecado com o PataHelp",
            "Hálito fresco e menos tártaro com o BocaHelp",
          ]}
        />
        {/* Âncora: a tarja fixa do celular aparece depois do hero (cartão de compra). */}
        <div id="duvidas-compra" />
        <StatsBand />
        <SignsSection />
        <KitContents />
        <KitStatsSection />
        <BeforeAfterSection
          className="bf-dark"
          title="Veja os resultados"
          resultStyle
          extraCases={[
            { name: "Dorinha", before: dorinhaAntes.url, after: dorinhaDepois.url, fullImages: true, afterLabel: "30 dias", productPosition: "center", product: { name: "PataHelp", image: patahelpLataThumb.url }, productHeight: 42 },
            { name: "Marley", before: marleyAntes.url, after: marleyDepois.url, fullImages: true, afterLabel: "15 DIAS", productPosition: "center", product: { name: "PataHelp", image: patahelpLataThumb.url }, productHeight: 42 },
            { name: "Pandora", before: pandoraAntes.url, after: pandoraDepois.url, fullImages: true, afterLabel: "30 DIAS", productPosition: "center", product: { name: "BocaHelp", image: bocahelpCutoutThumb.url }, productHeight: 68 },
            { name: "Bob", before: bobAntes.url, after: bobDepois.url, fullImages: true, afterLabel: "90 dias", productPosition: "center", product: { name: "BocaHelp", image: bocahelpCutoutThumb.url }, productHeight: 68 },
          ]}
        />
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
          heading={<>Só enquanto durar o estoque</>}
          subheading={null}
        />
        <TrustBadgesStrip className="bf-light" />
        <FAQAccordion items={kitFaqs} className="bf-light" />
      </LandingLayout>
    </OfferProvider>
  );
}
