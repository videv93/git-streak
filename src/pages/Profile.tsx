import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ContributionGrid } from "@/components/ContributionGrid";
import { UserRound, Trophy, Award } from "lucide-react";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { ProfileAchievements } from "@/components/profile/ProfileAchievements";
import { toast } from "sonner";

interface ProfileData {
  username: string;
  full_name: string;
  avatar_url: string;
  github_username: string;
}

const Profile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [contributionData, setContributionData] = useState<number[]>(Array(365).fill(0));
  const [stats, setStats] = useState({
    currentStreak: 0,
    longestStreak: 0,
    totalCheckIns: 0,
  });

  useEffect(() => {
    fetchProfile();
    fetchContributions();
  }, [username]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single();

      if (error) throw error;
      if (data) setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error("Failed to load profile");
    }
  };

  const fetchContributions = async () => {
    try {
      const { data: checkIns, error } = await supabase
        .from('check_ins')
        .select('*')
        .eq('user_id', profile?.id)
        .order('check_in_date', { ascending: false })
        .limit(365);

      if (error) throw error;

      const contributions = Array(365).fill(0);
      checkIns?.forEach((checkIn) => {
        const daysAgo = Math.floor(
          (Date.now() - new Date(checkIn.check_in_date).getTime()) / (1000 * 60 * 60 * 24)
        );
        if (daysAgo >= 0 && daysAgo < 365) {
          contributions[daysAgo] = checkIn.commit_count || 1;
        }
      });

      setContributionData(contributions.reverse());
    } catch (error) {
      console.error('Error fetching contributions:', error);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <Card>
            <CardContent className="p-8 text-center">
              <UserRound className="mx-auto h-12 w-12 text-muted-foreground" />
              <h2 className="mt-4 text-xl font-semibold">Profile Not Found</h2>
              <p className="mt-2 text-muted-foreground">
                The profile you're looking for doesn't exist or has been removed.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid gap-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile.avatar_url} alt={profile.username} />
                  <AvatarFallback>{profile.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">{profile.full_name}</h1>
                  <p className="text-muted-foreground">@{profile.username}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <ProfileStats stats={stats} />

          {/* Contribution Graph */}
          <Card>
            <CardHeader>
              <CardTitle>Contribution History</CardTitle>
            </CardHeader>
            <CardContent>
              <ContributionGrid data={contributionData} />
            </CardContent>
          </Card>

          {/* Achievements */}
          <ProfileAchievements username={profile.username} />
        </div>
      </div>
    </div>
  );
};

export default Profile;