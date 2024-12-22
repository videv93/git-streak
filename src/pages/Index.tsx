import { Hero } from "@/components/Hero";
import { FeatureOverview } from "@/components/FeatureOverview";
import { PricingPlans } from "@/components/PricingPlans";
import { Testimonials } from "@/components/Testimonials";
import { CallToAction } from "@/components/CallToAction";
import { Newsletter } from "@/components/Newsletter";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeatureOverview />
      <PricingPlans />
      <Testimonials />
      <CallToAction />
      <Newsletter />
    </div>
  );
};

export default Index;