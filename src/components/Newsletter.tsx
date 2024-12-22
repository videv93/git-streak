import { Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const Newsletter = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-purple-600/5 to-pink-500/5">
      <div className="max-w-2xl mx-auto text-center">
        <Mail className="h-12 w-12 text-purple-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
          Stay Updated
        </h2>
        <p className="text-muted-foreground mb-8">
          Get the latest updates about new features and community highlights.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-1 border-purple-200/20 bg-purple-500/5 focus:border-purple-500 focus:ring-purple-500"
          />
          <Button 
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
};