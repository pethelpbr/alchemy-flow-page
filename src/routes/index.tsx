import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SymptomsSection } from "@/components/SymptomsSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { RoutineResultsSection } from "@/components/RoutineResultsSection";

import { ItchingOriginsPage } from "@/components/ItchingOriginsPage";
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
import { StickyMobileBuy } from "@/components/StickyMobileBuy";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/use-cart";

const title = "NutraHelp | Suplemento para cães e gatos · PetHelp";
const description = "Conheça NutraHelp da PetHelp: suplemento com 44 nutrientes para apoiar a pele, os pelos e o intestino de cães e gatos.";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Index,
});

function Index() {
  const { selected, setSelected, checkout, addonIds, toggleAddon, addonsExtra } = useCart();
  const goToOffer = () => document.querySelector("#comprar")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="min-h-screen bg-background">
      <Header onBuy={goToOffer} />
      <main>
        <HeroSection selected={selected} onSelect={setSelected} onBuy={checkout} addonIds={addonIds} onToggleAddon={toggleAddon} />
        <SymptomsSection />
        <BenefitsSection />
        <ItchingOriginsPage />

        <RoutineResultsSection />
        <BeforeAfterSection />
        <StatsBanner />
        <ActivesCarousel />
        <HealthBenefitsSection />
        <VeterinaryAuthoritySection />
        <GuaranteeSection />
        <ReviewsCarousel />
        <FinalOffer selected={selected} onSelect={setSelected} addonIds={addonIds} onToggleAddon={toggleAddon} />
        <TrustBadgesStrip />
        <FAQAccordion />
      </main>
      <Footer />
      <StickyMobileBuy selected={selected} onBuy={goToOffer} addonsExtra={addonsExtra} />
    </div>
  );
}
