import { MainHero } from "@/components/MainHero";
import { ManifestoSection } from "@/components/ManifestoSection";
import { FeatureMarquee } from "@/components/site/FeatureMarquee";
import { LoopSection } from "@/components/site/LoopSection";
import { VersusSection } from "@/components/VersusSection";
import { LandingCTA } from "@/components/site/LandingCTA";
import { SiteFooter } from "@/components/site/SiteFooter";
import "@/app/landing/landing.css";

export default function MainLandingPage() {
  return (
    <main className="bg-[var(--background)]">
      <MainHero />
      <FeatureMarquee />
      <ManifestoSection />
      <LoopSection />
      <VersusSection />
      <LandingCTA />
      <SiteFooter />
    </main>
  );
}
