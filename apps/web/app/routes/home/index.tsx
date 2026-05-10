import { HeroSection } from "~/components/landings/HeroSection";
import { LogoCloud } from "~/components/landings/LogoCloud";
import { StatsSection } from "~/components/landings/StatsSection";
import { FeaturesSection } from "~/components/landings/FeaturesSection";
import { TestimonialsSection } from "~/components/landings/TestimonialsSection";
import { HowItWorks } from "~/components/landings/HowItWorks";
import { ComparisonSection } from "~/components/landings/ComparisonSection";
import { CTASection } from "~/components/landings/CTASection";


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
