import { Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const Newsletter = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <Mail className="h-12 w-12 text-primary mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-slate-400 mb-8">
          Get the latest updates about new features and community highlights.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-1"
          />
          <Button type="submit">Subscribe</Button>
        </form>
      </div>
    </section>
  );
};