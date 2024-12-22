import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Github, Moon, Sun } from "lucide-react";
import { loginWithGithub } from "@/services/auth";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useTheme } from "@/components/ThemeProvider";
import type { User } from "@supabase/supabase-js";

export const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleHomeClick = () => {
    navigate("/");
  }

  const handleGithubLogin = async () => {
    await loginWithGithub();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4 cursor-pointer" onClick={handleHomeClick}>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-green-400">
            GitStreak
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="rounded-full"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          {user ? (
            <Button 
              variant="default" 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Button>
          ) : (
            <Button 
              onClick={handleGithubLogin} 
              className="group bg-blue-600 hover:bg-blue-700"
            >
              <Github className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Login with GitHub
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};