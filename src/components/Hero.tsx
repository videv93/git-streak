import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { loginWithGithub } from "@/services/auth";

export const Hero = () => {
  const handleGithubLogin = async () => {
    await loginWithGithub();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
        Build Your Coding Streak
      </h1>
      <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-8">
        Track your daily coding progress, maintain streaks, and stay motivated with GitStreak. Join thousands of developers building better coding habits.
      </p>
      <Button 
        size="lg" 
        className="group"
        onClick={handleGithubLogin}
      >
        <Github className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
        Connect with GitHub
      </Button>
    </div>
  );
};