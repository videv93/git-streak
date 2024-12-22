import { Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const Newsletter = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-600/5 to-blue-400/5">
      <div className="max-w-2xl mx-auto text-center">
        <Mail className="h-12 w-12 text-blue-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
          Stay Updated
        </h2>
        <p className="text-muted-foreground mb-8">
          Get the latest updates about new features and community highlights.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-1 border-blue-200/20 bg-blue-500/5 focus:border-blue-500 focus:ring-blue-500"
          />
          <Button 
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
};