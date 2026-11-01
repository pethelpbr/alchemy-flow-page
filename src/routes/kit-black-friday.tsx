import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { HeroSection } from "@/components/HeroSection";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";
import { StatsBanner } from "@/components/StatsBanner";
import { ActivesCarousel } from "@/components/ActivesCarousel";
import { HealthBenefitsSection } from "@/components/HealthBenefitsSection";
import { GuaranteeSection } from "@/components/GuaranteeSection";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { VeterinaryAuthoritySection } from "@/components/VeterinaryAuthoritySection";
import { FinalOffer } from "@/components/FinalOffer";
import { TrustBadgesStrip } from "@/components/TrustBadgesStrip";
import { FAQAccordion } from "@/components/FAQAccordion";
import { LandingLayout } from "@/components/layout/LandingLayout";
import { useCart } from "@/lib/use-cart";
import { blackFridayVariants, type Variant } from "@/lib/product";
import { OfferProvider, type Offer } from "@/lib/offer-context";
import { cn } from "@/lib/utils";
import kitCompleto from "@/assets/kit-bf-completo.png.asset.json";
import kit2Potes from "@/assets/kit-bf-2-potes.png.asset.json";
import nutraFoto from "@/assets/nutrahelp-foto.png.asset.json";
import pataFoto from "@/assets/patahelp-foto.png.asset.json";
import bocaFoto from "@/assets/bocahelp-foto.png.asset.json";
import pataLata from "@/assets/patahelp-lata.png.asset.json";
import bocaFrasco from "@/assets/bocahelp-frasco.jpg.asset.json";

const title = "Kit Black Friday PetHelp | NutraHelp + PataHelp + BocaHelp";
const description =
  "Black Friday PetHelp: kit com NutraHelp, PataHelp e BocaHelp a partir de R$ 149,90. Cuidado completo por dentro e por fora para cães e gatos.";

export const Route = createFileRoute("/kit-black-friday")({
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
  const shots = [kitCompleto.url, nutraFoto.url, pataFoto.url, bocaFoto.url];
  const [i, setI] = useState(0);
  useEffect(() => {
    if (selected.id === "bf-1") setI(0);
  }, [selected.id]);
  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl">
        <img src={shots[i]} alt="Produto do kit Black Friday" className="aspect-square w-full object-cover" />
        <span className="absolute left-4 top-4 rounded-full bg-primary px-4 py-1.5 text-xs font-bold uppercase text-primary-foreground">
          Black Friday
        </span>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-3">
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

function KitContents() {
  return (
    <section className="section bg-background">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase text-primary">O que vem no kit</p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-foreground lg:text-5xl">
            Cuidado completo,
            <br className="sm:hidden" /> por dentro e por fora.
          </h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
          {products.map((p) => (
            <article key={p.name} className="overflow-hidden rounded-2xl border border-border bg-card">
              <img src={p.img} alt={p.name} loading="lazy" className="aspect-square w-full object-cover" />
              <div className="p-5">
                <h3 className="font-display text-2xl text-foreground">{p.name}</h3>
                <p className="mt-1 text-sm font-bold text-primary">{p.what}</p>
                <p className="mt-2 text-sm text-muted-foreground">{p.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlackFridayPage() {
  const cart = useCart(blackFridayVariants);
  const { selected, setSelected, checkout, addonIds, toggleAddon } = cart;

  return (
    <OfferProvider offer={offer}>
      <LandingLayout cart={cart} className="theme-bf">
        <HeroSection
          selected={selected}
          onSelect={setSelected}
          onBuy={checkout}
          addonIds={addonIds}
          onToggleAddon={toggleAddon}
          gallery={<KitGallery selected={selected} />}
          title="Kit Black Friday — NutraHelp + PataHelp + BocaHelp"
          eyebrow="Black Friday · 3 produtos · cães e gatos"
          intro="O cuidado completo do seu pet num kit só: o NutraHelp cuida de dentro para fora com 44 nutrientes, o PataHelp protege patas, focinho e pele, e o BocaHelp combate o mau hálito e o tártaro."
          bullets={[
            "Pele, pelos e intestino com o NutraHelp",
            "Patas, focinho e pele protegidos com o PataHelp",
            "Hálito fresco e menos tártaro com o BocaHelp",
          ]}
        />
        <KitContents />
        <StatsBanner />
        <BeforeAfterSection />
        <ActivesCarousel />
        <HealthBenefitsSection />
        <VeterinaryAuthoritySection />
        <GuaranteeSection />
        <ReviewsCarousel />
        <FinalOffer
          selected={selected}
          onSelect={setSelected}
          addonIds={addonIds}
          onToggleAddon={toggleAddon}
          heading={<>Black Friday PetHelp.<br />Só enquanto durar.</>}
          subheading="NutraHelp, PataHelp e BocaHelp no mesmo kit, com frete grátis."
        />
        <TrustBadgesStrip />
        <FAQAccordion />
      </LandingLayout>
    </OfferProvider>
  );
}
