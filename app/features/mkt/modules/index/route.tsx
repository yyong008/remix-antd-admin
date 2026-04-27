import { Layout } from "antd";
import { HeroSection } from "./components/HeroSection";
import { LogoCloud } from "./components/LogoCloud";
import { StatsSection } from "./components/StatsSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { HowItWorks } from "./components/HowItWorks";
import { ComparisonSection } from "./components/ComparisonSection";
import { CTASection } from "./components/CTASection";

const { Content } = Layout;

export function Route() {
  return (
    <Content style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
      <HeroSection />

      <div style={{ borderTop: "1px solid #e5e5e5", paddingTop: "24px" }} />

      <LogoCloud />

      <div style={{ borderTop: "1px solid #e5e5e5", paddingTop: "24px" }} />

      <StatsSection />

      <div style={{ borderTop: "1px solid #e5e5e5", paddingTop: "24px" }} />

      <FeaturesSection />

      <div style={{ borderTop: "1px solid #e5e5e5", paddingTop: "24px" }} />

      <TestimonialsSection />

      <div style={{ borderTop: "1px solid #e5e5e5", paddingTop: "24px" }} />

      <HowItWorks />

      <div style={{ borderTop: "1px solid #e5e5e5", paddingTop: "24px" }} />

      <ComparisonSection />

      <div style={{ borderTop: "1px solid #e5e5e5", paddingTop: "24px" }} />

      <CTASection />
    </Content>
  );
}
