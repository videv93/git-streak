import { Hero } from "@/components/Hero";
import { FeatureOverview } from "@/components/FeatureOverview";
import { PricingPlans } from "@/components/PricingPlans";
import { Testimonials } from "@/components/Testimonials";
import { CallToAction } from "@/components/CallToAction";
import { Newsletter } from "@/components/Newsletter";
import { StatsSection } from "@/components/StatsSection";

const Index = () => {
  return (
    <div className="min-h-screen pt-16">
      <Hero />
      <FeatureOverview />
      <PricingPlans />
      <StatsSection />
      <Testimonials />
      <CallToAction />
      <Newsletter />
    </div>
  );
};

export default Index;
