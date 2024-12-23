import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, GitCommit, Calendar, Award } from "lucide-react";
import { toast } from "sonner";
import { postGithubCheckIn } from "@/services/github";
import { handleCheckIn } from "@/services/streaks";
import { ContributionGrid } from "@/components/ContributionGrid";
import type { User } from "@supabase/supabase-js";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [stats, setStats] = useState({
    currentStreak: 0,
    longestStreak: 0,
    todayCommits: 0,
    achievements: 0,
  });
  const [contributionData, setContributionData] = useState<number[]>(Array(365).fill(0));

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/");
        return;
      }
      setUser(session.user);
      fetchStats(session.user.id);
      fetchContributions(session.user.id);
    });
  }, [navigate]);

  const fetchStats = async (userId: string) => {
    try {
      const { data: streakData } = await supabase
        .from('streaks')
        .select()
        .eq('user_id', userId)
        .single();

      const { data: achievementsData } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', userId);

      setStats({
        currentStreak: streakData?.current_streak || 0,
        longestStreak: streakData?.longest_streak || 0,
        todayCommits: 0,
        achievements: achievementsData?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchContributions = async (userId: string) => {
    try {
      const { data: checkIns } = await supabase
        .from('check_ins')
        .select('*')
        .eq('user_id', userId)
        .order('check_in_date', { ascending: false })
        .limit(365);

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

  const handleCheckInClick = async () => {
    if (!user) return;
    setIsChecking(true);

    try {
      // Update Supabase
      const result = await handleCheckIn(user.id);
      
      if (result.status === 'already_checked_in') {
        toast.error("You've already checked in today!");
        return;
      }

      // Post to GitHub repository
      await postGithubCheckIn(user.id);

      // Update local stats and contributions
      await fetchStats(user.id);
      await fetchContributions(user.id);

      // Create celebration animation element
      const celebration = document.createElement('div');
      celebration.className = 'fixed inset-0 flex items-center justify-center z-50 pointer-events-none';
      celebration.innerHTML = `
        <div class="animate-bounce text-6xl">
          🎉
        </div>
      `;
      document.body.appendChild(celebration);

      toast.success("Successfully checked in! Keep up the great work! 🚀");

      // Remove celebration after animation
      setTimeout(() => {
        document.body.removeChild(celebration);
      }, 2000);
    } catch (error) {
      console.error('Check-in error:', error);
      toast.error("Failed to check in. Please try again.");
    } finally {
      setIsChecking(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user.user_metadata.user_name || user.email}</h1>
          <p className="text-muted-foreground">Track your coding journey and maintain your streak!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Trophy className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.currentStreak} days</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Commits</CardTitle>
              <GitCommit className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayCommits}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Longest Streak</CardTitle>
              <Calendar className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.longestStreak} days</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              <Award className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.achievements}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Contribution History</CardTitle>
          </CardHeader>
          <CardContent>
            <ContributionGrid data={contributionData} />
          </CardContent>
        </Card>

        <div className="mb-8">
          <Button 
            size="lg" 
            className="w-full md:w-auto"
            onClick={handleCheckInClick}
            disabled={isChecking}
          >
            {isChecking ? "Checking in..." : "Check-in Today"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
