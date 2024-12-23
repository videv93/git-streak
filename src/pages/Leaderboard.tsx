import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { StatsCard } from "@/components/StatsCard";
import { Trophy, Flame, CheckCircle } from "lucide-react";

interface UserStats {
  current_streak: number;
  longest_streak: number;
  total_check_ins: number;
}

const Leaderboard = () => {
  const { data: stats } = useQuery<UserStats[]>({
    queryKey: ["leaderboard-stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("streaks")
        .select("current_streak, longest_streak, total_check_ins")
        .order("current_streak", { ascending: false })
        .limit(10);

      if (error) throw error;
      return data || [];
    },
  });

  const aggregateStats = {
    totalCurrentStreak: stats?.reduce((sum, user) => sum + user.current_streak, 0) || 0,
    totalLongestStreak: stats?.reduce((sum, user) => sum + user.longest_streak, 0) || 0,
    totalCheckIns: stats?.reduce((sum, user) => sum + user.total_check_ins, 0) || 0,
  };

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Leaderboard</h1>
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <StatsCard
          title="Total Active Streaks"
          value={aggregateStats.totalCurrentStreak}
          icon={<Flame className="h-4 w-4 text-orange-400" />}
        />
        <StatsCard
          title="Combined Longest Streaks"
          value={aggregateStats.totalLongestStreak}
          icon={<Trophy className="h-4 w-4 text-yellow-400" />}
        />
        <StatsCard
          title="Total Check-ins"
          value={aggregateStats.totalCheckIns}
          icon={<CheckCircle className="h-4 w-4 text-green-400" />}
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Current Streak
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Longest Streak
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Check-ins
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {stats?.map((user, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">User {index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.current_streak}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.longest_streak}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.total_check_ins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
