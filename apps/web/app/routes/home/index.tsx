import { HeroSection } from "~/components/landings/hero-section";
import { LogoCloud } from "~/components/landings/logo-cloud";
import { StatsSection } from "~/components/landings/stats-section";
import { FeaturesSection } from "~/components/landings/features-section";
import { TestimonialsSection } from "~/components/landings/testimonials-section";
import { HowItWorks } from "~/components/landings/how-it-works";
import { ComparisonSection } from "~/components/landings/comparison-section";
import { CTASection } from "~/components/landings/cta-section";

function SectionDivider() {
  return <div className="border-t border-border py-6" />;
}

export default function Route() {
  return (
    <div className="max-w-5xl mx-auto py-10">
      <HeroSection />
      <SectionDivider />
      <LogoCloud />
      <SectionDivider />
      <StatsSection />
      <SectionDivider />
      <FeaturesSection />
      <SectionDivider />
      <TestimonialsSection />
      <SectionDivider />
      <HowItWorks />
      <SectionDivider />
      <ComparisonSection />
      <SectionDivider />
      <CTASection />
    </div>
  );
}
