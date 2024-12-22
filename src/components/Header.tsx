import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Github } from "lucide-react";
import { loginWithGithub } from "@/services/auth";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

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

  const handleGithubLogin = async () => {
    await loginWithGithub();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            GitStreak
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <Button variant="default" onClick={() => navigate("/dashboard")}>
              Dashboard
            </Button>
          ) : (
            <Button onClick={handleGithubLogin} className="group">
              <Github className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Login with GitHub
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};