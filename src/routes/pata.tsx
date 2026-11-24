import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Check } from "lucide-react";

import { HeroSection } from "@/components/HeroSection";
import { MobileKitGallery } from "@/components/MobileKitGallery";
import { DesktopKitGallery } from "@/components/DesktopKitGallery";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";
import { StatsBanner } from "@/components/StatsBanner";
import { VeterinaryAuthoritySection } from "@/components/VeterinaryAuthoritySection";
import { GuaranteeSection } from "@/components/GuaranteeSection";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { FinalOffer } from "@/components/FinalOffer";
import { TrustBadgesStrip } from "@/components/TrustBadgesStrip";
import { FAQAccordion } from "@/components/FAQAccordion";
import { LazyLoopVideo } from "@/components/LazyLoopVideo";
import { LandingLayout } from "@/components/layout/LandingLayout";
import { useCart } from "@/lib/use-cart";
import { kitFromVariant, trackViewContent } from "@/lib/tracking";
import { pataVariants, pataAddonCatalog, type Variant } from "@/lib/product";
import { OfferProvider, type Offer } from "@/lib/offer-context";

import pataLata from "@/assets/patahelp-lata.png.asset.json";
import pataFoto from "@/assets/patahelp-foto.png.asset.json";
import sinalLambe from "@/assets/sinal-lambe-pata.png.asset.json";
import sinalPatas from "@/assets/sinal-patas-ressecadas-v4.webp.asset.json";
import pataMp4 from "@/assets/produto-pata.mp4.asset.json";
import pataWebm from "@/assets/produto-pata.webm.asset.json";
import pataPoster from "@/assets/produto-pata-poster.jpg.asset.json";
import patahelpLataThumb from "@/assets/patahelp-lata-thumb.png.asset.json";
import dorinhaAntes from "@/assets/dorinha-antes.png.asset.json";
import dorinhaDepois from "@/assets/dorinha-depois.png.asset.json";
import marleyAntes from "@/assets/pata-marley-antes-v3.jpg.asset.json";
import marleyDepois from "@/assets/pata-marley-depois.png.asset.json";
import estopinhaAntes from "@/assets/estopinha_antes.jpg.asset.json";
import estopinhaDepois from "@/assets/estopinha_depois_30.jpg.asset.json";

const title = "PataHelp | Balm para patas, focinho e pele de cães e gatos · PetHelp";
const description = "PataHelp da PetHelp: balm natural 3 em 1 que hidrata, acalma e protege patas, focinho e pele ressecada. Lambível e atóxico.";

export const Route = createFileRoute("/pata")({
  head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: PataPage,
});

const offer: Offer = {
  variants: pataVariants,
  showAddons: true,
  addons: pataAddonCatalog,
  buyLabel: "Quero meu PataHelp",
};

function PataGallery({ selected }: { selected: Variant }) {
  const shots = [
    { src: pataLata.url, alt: `PataHelp ${selected.label}` },
    { src: sinalLambe.url, alt: "Pet lambendo a pata" },
    { src: pataPoster.url, alt: "PataHelp sendo aplicado" },
    { src: sinalPatas.url, alt: "Patas ressecadas" },
    { src: pataFoto.url, alt: "PataHelp balm 40 g" },
  ];
  return (
    <div>
      <MobileKitGallery key={`m-${selected.id}`} shots={shots} />
      <DesktopKitGallery key={`d-${selected.id}`} shots={shots} />
    </div>
  );
}

const signs = [
  { title: "Lambe a pata sem parar", text: "De madrugada você escuta o barulho. O pelo da pata fica escuro e úmido.", img: sinalLambe.url },
  { title: "Patas e focinho ressecados", text: "A almofadinha fica áspera, com rachaduras, e o focinho perde a hidratação.", img: sinalPatas.url },
];

function SignsSection() {
  return (
    <section className="section">
      <div className="container-x">
        <p className="text-center text-xs font-bold uppercase text-primary!">Indicação</p>
        <h2 className="mt-3 text-center font-display text-4xl leading-tight text-foreground lg:text-5xl">
          Reconhece algum
          <br className="sm:hidden" /> desses sinais?
        </h2>
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
          {signs.map((s) => (
            <article key={s.title} className="overflow-hidden rounded-2xl border border-border bg-card">
              <img src={s.img} alt={s.title} loading="lazy" className="aspect-[4/3] w-full border-b border-border object-cover" />
              <div className="p-5">
                <h3 className="font-display text-xl text-foreground">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const benefits = [
  { t: "Hidrata", d: "Devolve a maciez da almofadinha e do focinho ressecado." },
  { t: "Acalma", d: "Alivia a irritação que faz o pet lamber a pata o tempo todo." },
  { t: "Protege", d: "Cria uma barreira contra chão quente, frio e produtos de limpeza." },
];

function ProductSection() {
  return (
    <section className="section bg-sand">
      <div className="container-x grid items-center gap-10 md:grid-cols-2">
        <LazyLoopVideo mp4={pataMp4.url} webm={pataWebm.url} poster={pataPoster.url} label="PataHelp" className="aspect-square w-full rounded-3xl object-cover" />
        <div>
          <p className="text-xs font-bold uppercase text-primary!">Balm 3 em 1 · 40 g</p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-foreground lg:text-5xl">Patinhas macias, focinho protegido.</h2>
          <p className="mt-4 text-muted-foreground">Manteiga de karité, cera de abelha e óleos vegetais. Ingredientes naturais, lambível e atóxico: se ele lamber, não faz mal.</p>
          <ul className="mt-6 space-y-4">
            {benefits.map((b) => (
              <li key={b.t} className="flex gap-3">
                <Check className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <p className="text-foreground"><strong>{b.t}.</strong> {b.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const steps = [
  { n: "01", t: "Limpe a região", d: "Patas e focinho secos e limpos." },
  { n: "02", t: "Passe uma camada fina", d: "Massageie até a pele absorver." },
  { n: "03", t: "Repita quando precisar", d: "De 2 a 3 vezes por dia, sem limite." },
];

function HowToUse() {
  return (
    <section className="section">
      <div className="container-x">
        <p className="text-center text-xs font-bold uppercase text-primary!">Como usar</p>
        <h2 className="mt-3 text-center font-display text-4xl leading-tight text-foreground lg:text-5xl">É só passar e massagear</h2>
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-border bg-card p-6">
              <p className="font-display text-3xl text-primary">{s.n}</p>
              <h3 className="mt-2 font-display text-xl text-foreground">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  { q: "Serve para o meu pet?", a: "Cães e gatos, de todas as raças e tamanhos." },
  { q: "E se ele lamber?", a: "Pode lamber. O PataHelp é feito com ingredientes naturais, lambível e atóxico." },
  { q: "Onde posso passar?", a: "Nas patas, no focinho e em áreas de pele ressecada ou irritada." },
  { q: "Em quanto tempo vejo resultado?", a: "Muitos tutores notam a pata mais macia nas primeiras semanas de uso diário." },
  { q: "E se eu não gostar?", a: "Você tem 60 dias de garantia. Devolvemos o valor integral." },
];

function PataPage() {
  const cart = useCart(pataVariants, pataAddonCatalog);
  const { selected, setSelected, checkout, addonIds, toggleAddon } = cart;

  const viewed = useRef(false);
  useEffect(() => {
    if (viewed.current) return;
    viewed.current = true;
    trackViewContent(kitFromVariant(selected));
  }, [selected]);

  return (
    <OfferProvider offer={offer}>
      <LandingLayout cart={cart}>
        <HeroSection
          selected={selected}
          onSelect={setSelected}
          onBuy={checkout}
          addonIds={addonIds}
          onToggleAddon={toggleAddon}
          showDetails={false}
          gallery={<PataGallery selected={selected} />}
          title="Alívio para a pata lambida e o focinho ressecado"
          eyebrow="PataHelp · balm 3 em 1 · cães e gatos"
          intro="Hidrata, acalma e protege patas, focinho e pele com ingredientes naturais."
          bullets={["Reduz as lambeduras", "Trata ressecamento e rachaduras", "Lambível e atóxico"]}
        />
        <div id="duvidas-compra" />
        <SignsSection />
        <ProductSection />
        <BeforeAfterSection
          onlyExtra
          resultStyle
          title="Veja os resultados"
          extraCases={[
            { name: "Marley", quote: "Ele parou de lamber a pata e o vermelho entre os coxins sumiu.", before: marleyAntes.url, after: marleyDepois.url, fullImages: true, afterLabel: "15 DIAS", productPosition: "center", product: { name: "PataHelp", image: patahelpLataThumb.url }, productHeight: 42 },
            { name: "Dorinha", quote: "A vermelhidão da barriga sumiu e a pele ficou lisa de novo.", before: dorinhaAntes.url, after: dorinhaDepois.url, fullImages: true, afterLabel: "30 dias", productPosition: "center", product: { name: "PataHelp", image: patahelpLataThumb.url }, productHeight: 42 },
            { name: "Estopinha", quote: "O focinho estava ressecado e rachado, mas recuperou a hidratação.", before: estopinhaAntes.url, after: estopinhaDepois.url, fullImages: true, afterLabel: "30 dias", productPosition: "center", product: { name: "PataHelp", image: patahelpLataThumb.url }, productHeight: 42 },
          ]}
        />
        <HowToUse />
        <StatsBanner />
        <VeterinaryAuthoritySection />
        <GuaranteeSection />
        <ReviewsCarousel />
        <FinalOffer selected={selected} onSelect={setSelected} addonIds={addonIds} onToggleAddon={toggleAddon} unboxed heading={<>Hoje à noite ele vai lamber a pata de novo.<br />Ou não.</>} subheading="Uma camada fina, duas vezes por dia, e a pata volta a ficar macia." />
        <TrustBadgesStrip />
        <FAQAccordion items={faqs} />
      </LandingLayout>
    </OfferProvider>
  );
}
