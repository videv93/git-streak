import { Calendar, ChartBar, Shield, Users } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

export const FeatureOverview = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <Calendar className="h-6 w-6 text-blue-400" />,
      title: "Streak Tracking",
      description: "Track your daily coding progress and maintain your streak",
    },
    {
      icon: <ChartBar className="h-6 w-6 text-blue-400" />,
      title: "Advanced Analytics",
      description: "Get detailed insights into your coding patterns and progress",
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-400" />,
      title: "Streak Protection",
      description: "Keep your streak alive even when life gets in the way",
    },
    {
      icon: <Users className="h-6 w-6 text-blue-400" />,
      title: "Team Features",
      description: "Collaborate with your team and track group progress",
    },
  ];

  return (
    <section className="py-20 px-4 bg-background relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-300 dark:to-blue-500">
          Features
        </h2>
        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "p-6 rounded-lg border border-blue-200/20 bg-blue-500/5 hover:bg-blue-500/10 transition-all duration-500 dark:border-blue-400/20 dark:bg-blue-950/30 dark:hover:bg-blue-950/50 transform hover:-translate-y-1",
                inView ? "animate-fade-in" : "opacity-0",
                // Add staggered delay based on index
                index === 0 ? "delay-0" :
                index === 1 ? "delay-100" :
                index === 2 ? "delay-200" :
                "delay-300"
              )}
            >
              <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-300 dark:to-blue-500">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};