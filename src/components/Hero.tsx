import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { loginWithGithub } from "@/services/auth";

export const Hero = () => {
  const handleGithubLogin = async () => {
    await loginWithGithub();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 top-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute right-10 bottom-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-green-400 animate-fade-in">
        Build Your Coding Streak
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 animate-fade-in delay-200">
        Track your daily coding progress, maintain streaks, and stay motivated with GitStreak. Join thousands of developers building better coding habits.
      </p>
      <Button 
        size="lg" 
        className="group bg-blue-600 hover:bg-blue-700 animate-fade-in delay-300"
        onClick={handleGithubLogin}
      >
        <Github className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
        Connect with GitHub
      </Button>
    </div>
  );
};