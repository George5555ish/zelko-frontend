import { LandingHero } from "@/components/LandingHero";
import { AnalysisShowcaseSection } from "@/components/landing/AnalysisShowcaseSection";
import { FaceMeshScanSection } from "@/components/landing/FaceMeshScanSection";
import { ReportPreviewSection } from "@/components/landing/ReportPreviewSection";
import { TowardYourLookSection } from "@/components/landing/TowardYourLookSection";
import { OutfitStudioSection } from "@/components/landing/OutfitStudioSection";
import { ManifestoSection } from "@/components/ManifestoSection";
import { FeatureMarquee } from "@/components/site/FeatureMarquee";
import { LoopSection } from "@/components/site/LoopSection";
import { SuggestionsSticky } from "@/components/site/SuggestionsSticky";
import { VersusSection } from "@/components/VersusSection";
import { LandingCTA } from "@/components/site/LandingCTA";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ProNeedsReportBanner } from "@/components/site/ProNeedsReportBanner";
import { SectionReveal } from "@/components/site/SectionReveal";

export default function HomePage() {
  return (
    <main className="bg-[var(--background)]">
      <ProNeedsReportBanner />
      <LandingHero />
      <SectionReveal>
        <AnalysisShowcaseSection />
      </SectionReveal>
      <SectionReveal>
        <FaceMeshScanSection />
      </SectionReveal>
      <SectionReveal>
        <ReportPreviewSection />
      </SectionReveal>
      <SectionReveal>
        <TowardYourLookSection />
      </SectionReveal>
      <SectionReveal>
        <OutfitStudioSection />
      </SectionReveal>
      <SectionReveal>
        <FeatureMarquee />
      </SectionReveal>
      <SectionReveal>
        <SuggestionsSticky />
      </SectionReveal>
      <SectionReveal>
        <ManifestoSection />
      </SectionReveal>
      <SectionReveal>
        <LoopSection />
      </SectionReveal>
      <SectionReveal>
        <VersusSection />
      </SectionReveal>
      <SectionReveal>
        <LandingCTA />
      </SectionReveal>
      <SiteFooter />
    </main>
  );
}
