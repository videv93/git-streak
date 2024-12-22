import { Check } from "lucide-react";
import { Button } from "./ui/button";

export const PricingPlans = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
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
    <section className="py-20 px-4 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-slate-700 bg-slate-800/50"
            >
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold mb-6">
                {plan.price}
                <span className="text-sm text-slate-400">/month</span>
              </p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full" variant={index === 1 ? "default" : "outline"}>
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};