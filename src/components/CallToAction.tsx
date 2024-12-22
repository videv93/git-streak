import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export const CallToAction = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-600/10 to-blue-400/10 dark:from-blue-950/50 dark:to-blue-900/50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-300 dark:to-blue-500">
          Ready to Start Your Coding Journey?
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Join thousands of developers building better coding habits with GitStreak.
        </p>
        <Button 
          size="lg" 
          className="group bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 dark:from-blue-500 dark:to-blue-300 dark:hover:from-blue-600 dark:hover:to-blue-400"
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
};