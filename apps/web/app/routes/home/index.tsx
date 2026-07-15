import { HeroSection } from "~/components/landings/hero-section";
import { LogoCloud } from "~/components/landings/logo-cloud";
import { StatsSection } from "~/components/landings/stats-section";
import { FeaturesSection } from "~/components/landings/features-section";
import { TestimonialsSection } from "~/components/landings/testimonials-section";
import { HowItWorks } from "~/components/landings/how-it-works";
import { ComparisonSection } from "~/components/landings/comparison-section";
import { CTASection } from "~/components/landings/cta-section";

export default function Route() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <LogoCloud />
      <StatsSection />
      <FeaturesSection />
      <HowItWorks />
      <TestimonialsSection />
      <ComparisonSection />
      <CTASection />
    </div>
  );
}
