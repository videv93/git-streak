import { Check } from "lucide-react";
import { Button } from "./ui/button";

export const PricingPlans = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for individual developers starting their coding journey",
      features: [
        "Basic check-in functionality",
        "Streak tracking",
        "Public profile",
        "Basic GitHub integration",
        "Community features",
      ],
    },
    {
      name: "Pro",
      price: "$5",
      description: "For developers who want advanced features and analytics",
      features: [
        "Advanced analytics",
        "Streak protection",
        "API access",
        "Custom badges",
        "Ad-free experience",
        "Priority support",
      ],
    },
    {
      name: "Team",
      price: "$10",
      description: "Best for development teams and organizations",
      period: "per user/month",
      features: [
        "Team dashboard",
        "Organization features",
        "Private leaderboards",
        "Admin controls",
        "Analytics",
        "Custom branding",
      ],
    },
  ];

  return (
    <section className="py-20 px-4 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Choose the plan that best fits your needs. All plans include access to our core features.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`p-8 rounded-lg border ${
                index === 1
                  ? "border-primary bg-primary/10 relative overflow-hidden"
                  : "border-slate-700 bg-slate-800/50"
              }`}
            >
              {index === 1 && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm rounded-bl-lg">
                  Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-slate-400 mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-slate-400">
                    {plan.period || "/month"}
                  </span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${
                  index === 1 ? "bg-primary" : "bg-slate-700 hover:bg-slate-600"
                }`}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};