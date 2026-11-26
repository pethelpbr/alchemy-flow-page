import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { HeroSection } from "@/components/HeroSection";
import { MobileKitGallery } from "@/components/MobileKitGallery";
import { DesktopKitGallery } from "@/components/DesktopKitGallery";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { PataItchingOriginsSection } from "@/components/PataItchingOriginsSection";
import { RoutineResultsSection } from "@/components/RoutineResultsSection";
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
  // Rótulo do NutraHelp ("Cuida da pele, pelos e intestino") cabe em uma linha só a 14 px.
  addonNameSizeClass: "lg:text-[14px]",
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
  { title: "Lambeduras e coceiras", text: "Ele lambe e coça a mesma região várias vezes ao dia. Você tenta distrair, mas logo ele volta." },
  { title: "Desconforto ao andar", text: "Ele evita apoiar a pata, anda com cuidado ou para no meio do passeio. Brincar já não parece tão confortável." },
  { title: "Ressecamento e rachaduras", text: "As almofadinhas ficam ásperas e rachadas. O focinho também perde a maciez e começa a descamar." },
  { title: "Feridas e queimaduras", text: "Você percebe machucados nas patas ou na pele. Depois do contato com o chão quente, ele fica sensível ao toque." },
  { title: "Escurecimento e falha no pelo", text: "O pelo da região lambida vai ficando escuro e úmido. Aos poucos, aparecem áreas com menos pelo." },
  { title: "Vermelhidão e irritação na pele", text: "Entre os dedos, na barriga ou nas dobrinhas, a pele fica vermelha e sensível. Ele tenta aliviar lambendo ou se coçando." },
];

const pataTriedEverything = {
  lead: "Foi pomada atrás de pomada, foi remédio que só resolveu por um tempo, foi a bota que ele não deixa tirar.",
  body: " É acordar de madrugada com o barulho da lambedura. É ver ele tirando a pata do chão de dor e não poder fazer nada. É se sentir o pior tutor do mundo por já não aguentar mais. ",
  cardsTitle: "É isso que muda com o PataHelp",
  benefits: [
    { title: "Pisa firme de novo", text: "As almofadinhas voltam a ficar macias e ele apoia a pata sem hesitar no meio do passeio." },
    { title: "Lambe menos", text: "Com a irritação acalmada, a lambedura deixa de ser o passatempo dele." },
    { title: "Focinho macio", text: "A rachadura do focinho fecha e ele volta a encostar o nariz em você sem incomodo." },
    { title: "Volta a brincar", text: "Sem dor na pata, ele corre, brinca e aceita o passeio sem parar no meio da calçada." },
  ],
};

function SignsSection() {
  return (
    <section className="bg-background py-10 md:py-12 lg:py-6">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <p className="eyebrow text-primary!">Indicação</p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl lg:mt-2 lg:text-4xl">
            Reconhece algum desses sinais?
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-5 lg:grid-cols-3 lg:gap-3">
          {signs.map((s) => (
            <article key={s.title} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
              <div aria-hidden="true" className="aspect-4/3 w-full bg-muted lg:aspect-auto lg:h-[min(18vh,152px)]" />
              <div className="flex flex-1 flex-col gap-1.5 p-4 lg:p-3">
                <h3 className="text-[20px] font-bold leading-snug text-primary lg:text-[18px]">{s.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground lg:leading-snug">{s.text}</p>
              </div>
            </article>
          ))}
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

const pataResults = {
  timeline: [
    {
      badge: "Primeiras semanas",
      label: "O alívio começa",
      text: "Ele lambe e coça menos a pata. As almofadinhas já ficam menos ásperas quando você toca.",
    },
    {
      badge: "Depois do 1º mês",
      label: "A pele se recupera",
      text: "As rachaduras do focinho fecham e as feridas das patas cicatrizam. Ele volta a apoiar o peso sem hesitar.",
    },
    {
      badge: "Entre o 2º e o 3º mês",
      label: "Menos lambedura",
      text: "A lambedura vira exceção, não rotina. O pelo da região lambida clareia e começa a preencher as falhas.",
    },
    {
      badge: "A partir do 4º mês",
      label: "Pata saudável de novo",
      text: "As almofadinhas estão macias e resistentes. Agora é só manter o uso contínuo — para evitar que as crises voltem.",
    },
  ],
};

function ProductSection() {
  return (
    <section className="section bg-sand">
      <div className="container-x grid items-center gap-10 md:grid-cols-2 lg:gap-16">
        <LazyLoopVideo mp4={pataMp4.url} webm={pataWebm.url} poster={pataPoster.url} label="PataHelp" className="aspect-square w-full rounded-3xl object-cover" />
        <div>
          <p className="text-xs font-bold uppercase text-primary!">Como usar</p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-foreground lg:text-5xl">Aplique e massageie</h2>
          <div className="mt-8 space-y-3">
            {steps.map((s) => (
              <div key={s.n} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5">
                <p className="w-9 shrink-0 font-display text-3xl leading-none text-primary">{s.n}</p>
                <div>
                  <h3 className="font-display text-xl text-foreground">{s.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
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
          gallery={<PataGallery selected={selected} />}
          title="Alívio para a pata lambida e o focinho ressecado"
          eyebrow="PataHelp · balm 3 em 1 · cães e gatos"
          intro="Hidrata, acalma e protege patas, focinho e pele com ingredientes naturais."
          bullets={["Reduz as lambeduras", "Trata ressecamento e rachaduras", "Lambível e atóxico"]}
        />
        <SignsSection />
        <BenefitsSection content={pataTriedEverything} />
        <PataItchingOriginsSection />
        <ProductSection />
        <RoutineResultsSection content={pataResults} />
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
