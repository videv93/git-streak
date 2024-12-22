import { supabase } from "@/lib/supabase";

const REPO_NAME = "gitstreak-checkins";
const REPO_DESCRIPTION = "My coding journey tracked by GitStreak";

export const postGithubCheckIn = async (userId: string) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const accessToken = session?.provider_token;

    if (!accessToken) {
      throw new Error("No GitHub access token found");
    }

    // First, try to get the repository
    let repo = await getRepository(accessToken);
    
    // If repo doesn't exist, create it
    if (!repo) {
      repo = await createRepository(accessToken);
    }

    // Create check-in content
    const date = new Date().toISOString().split('T')[0];
    const message = `# Check-in for ${date}\n\n✅ Checked in on GitStreak!\n\nKeeping the streak going! 🔥`;
    
    // Create or update the check-in file
    await createOrUpdateFile(accessToken, repo.full_name, `checkins/${date}.md`, message);

    return true;
  } catch (error) {
    console.error("GitHub post error:", error);
    throw error;
  }
};

const getRepository = async (accessToken: string) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const username = session?.user?.user_metadata?.user_name;
    
    if (!username) {
      throw new Error("No GitHub username found");
    }

    const response = await fetch(`https://api.github.com/repos/${username}/${REPO_NAME}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error("Failed to get repository");
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting repository:", error);
    return null;
  }
};

const createRepository = async (accessToken: string) => {
  const response = await fetch("https://api.github.com/user/repos", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: REPO_NAME,
      description: REPO_DESCRIPTION,
      private: false,
      has_issues: false,
      has_projects: false,
      has_wiki: false,
      auto_init: true,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create repository");
  }

  return await response.json();
};

const createOrUpdateFile = async (
  accessToken: string,
  repoFullName: string,
  path: string,
  content: string
) => {
  // First, try to get the file to check if it exists
  let sha: string | undefined;
  try {
    const fileResponse = await fetch(
      `https://api.github.com/repos/${repoFullName}/contents/${path}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (fileResponse.ok) {
      const fileData = await fileResponse.json();
      sha = fileData.sha;
    }
  } catch (error) {
    console.error("Error checking file existence:", error);
  }

  // Create or update the file
  const response = await fetch(
    `https://api.github.com/repos/${repoFullName}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Check-in for ${new Date().toISOString().split('T')[0]}`,
        content: Buffer.from(content).toString('base64'),
        sha: sha, // Include sha if updating existing file
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create/update file");
  }

  return await response.json();
};