import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SymptomsSection } from "@/components/SymptomsSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { VideoTestimonialsSection } from "@/components/VideoTestimonialsSection";
import { RoutineResultsSection } from "@/components/RoutineResultsSection";
import { StorySection } from "@/components/StorySection";
import { FormulaTechSection } from "@/components/FormulaTechSection";
import { StatsBanner } from "@/components/StatsBanner";

import { ComparisonSection } from "@/components/ComparisonSection";
import { ActivesCarousel } from "@/components/ActivesCarousel";
import { HowToUse } from "@/components/HowToUse";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { FinalOffer } from "@/components/FinalOffer";
import { TrustBadgesStrip } from "@/components/TrustBadgesStrip";
import { FAQAccordion } from "@/components/FAQAccordion";
import { StickyMobileBuy } from "@/components/StickyMobileBuy";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/use-cart";

const title = "Nutraflow Daily Greens | Suplemento diário premium";
const description =
  "Fórmula premium de dose única: energia e equilíbrio em um ritual de 30 segundos. 30 dias de garantia, envio rápido e entrega para todo o Brasil.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { selected, setSelected, checkout, addonIds, toggleAddon, addonsExtra } = useCart();

  const goToOffer = () => {
    document.querySelector("#comprar")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onBuy={goToOffer} />
      <main>
        <HeroSection
          selected={selected}
          onSelect={setSelected}
          onBuy={checkout}
          addonIds={addonIds}
          onToggleAddon={toggleAddon}
        />
        <SymptomsSection />
        <BenefitsSection />
        <VideoTestimonialsSection onBuy={checkout} />
        <RoutineResultsSection />
        <StorySection />
        <FormulaTechSection />
        <StatsBanner />
        <ComparisonSection />
        <HowToUse />
        <ActivesCarousel />
        <ReviewsCarousel />
        <TrustBadgesStrip />
        <FinalOffer
          selected={selected}
          onSelect={setSelected}
          onBuy={checkout}
          addonIds={addonIds}
          onToggleAddon={toggleAddon}
        />
        <FAQAccordion />
      </main>
      <Footer />
      <StickyMobileBuy selected={selected} onBuy={goToOffer} addonsExtra={addonsExtra} />
    </div>
  );
}
