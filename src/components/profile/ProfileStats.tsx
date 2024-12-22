import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, GitCommit, Calendar } from "lucide-react";

interface ProfileStatsProps {
  stats: {
    currentStreak: number;
    longestStreak: number;
    totalCheckIns: number;
  };
}

export const ProfileStats = ({ stats }: ProfileStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          <CardTitle className="text-sm font-medium">Longest Streak</CardTitle>
          <Calendar className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.longestStreak} days</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Check-ins</CardTitle>
          <GitCommit className="h-4 w-4 text-secondary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalCheckIns}</div>
        </CardContent>
      </Card>
    </div>
  );
};