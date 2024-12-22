import { supabase } from "@/lib/supabase";

export const postGithubCheckIn = async (userId: string) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const accessToken = session?.provider_token;

    if (!accessToken) {
      throw new Error("No GitHub access token found");
    }

    // Create a check-in message
    const message = `✅ Checked in on GitStreak!\n\nKeep the streak going! 🔥`;
    
    // Post to GitHub as a gist
    const response = await fetch("https://api.github.com/gists", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: "GitStreak Daily Check-in",
        public: true,
        files: {
          "check-in.md": {
            content: message,
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to post to GitHub");
    }

    return true;
  } catch (error) {
    console.error("GitHub post error:", error);
    throw error;
  }
};