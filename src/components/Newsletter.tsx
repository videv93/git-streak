import { Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const Newsletter = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-600/5 to-blue-400/5 dark:from-blue-950/50 dark:to-blue-900/50">
      <div className="max-w-2xl mx-auto text-center">
        <Mail className="h-12 w-12 text-blue-400 dark:text-blue-300 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-300 dark:to-blue-500">
          Stay Updated
        </h2>
        <p className="text-muted-foreground mb-8">
          Get the latest updates about new features and community highlights.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-1 border-blue-200/20 bg-blue-500/5 focus:border-blue-500 focus:ring-blue-500 dark:border-blue-400/20 dark:bg-blue-950/30 dark:focus:border-blue-400"
          />
          <Button 
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 dark:from-blue-500 dark:to-blue-300 dark:hover:from-blue-600 dark:hover:to-blue-400"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
};