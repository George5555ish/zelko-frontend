import { LandingHero } from "@/components/LandingHero";
import { ManifestoSection } from "@/components/ManifestoSection";
import { FeatureMarquee } from "@/components/site/FeatureMarquee";
import { LoopSection } from "@/components/site/LoopSection";
import { SuggestionsSticky } from "@/components/site/SuggestionsSticky";
import { VersusSection } from "@/components/VersusSection";
import { LandingCTA } from "@/components/site/LandingCTA";
import { SiteFooter } from "@/components/site/SiteFooter";

export default function HomePage() {
  return (
    <main className="bg-[var(--background)]">
      <LandingHero />
      <FeatureMarquee />
      <SuggestionsSticky />
      <ManifestoSection />
      <LoopSection />
      <VersusSection />
      <LandingCTA />
      <SiteFooter />
    </main>
  );
}
