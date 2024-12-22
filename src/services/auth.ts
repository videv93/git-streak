import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const loginWithGithub = async () => {
  try {
    console.log("Initiating GitHub login with Supabase...");
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) {
      console.error("GitHub login error:", error.message);
      toast.error("Failed to login with GitHub");
      throw error;
    }

    console.log("GitHub login initiated:", data);
  } catch (error) {
    console.error("GitHub login error:", error);
    toast.error("Failed to login with GitHub");
  }
};