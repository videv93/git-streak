import { Users, Award, GitCommit, Trophy } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { StatsCard } from "./StatsCard";

export const StatsSection = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["platform-stats"],
    queryFn: async () => {
      console.log("Fetching platform statistics...");
      
      const [
        { count: totalUsers },
        { count: totalChallenges },
        { count: totalCheckIns },
        { count: activeStreaks }
      ] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("challenges").select("*", { count: "exact", head: true }),
        supabase.from("check_ins").select("*", { count: "exact", head: true }),
        supabase.from("streaks").select("*", { count: "exact", head: true }).gt("current_streak", 0),
      ]);

      console.log("Platform stats fetched:", {
        totalUsers,
        totalChallenges,
        totalCheckIns,
        activeStreaks,
      });

      return {
        totalUsers: totalUsers || 0,
        totalChallenges: totalChallenges || 0,
        totalCheckIns: totalCheckIns || 0,
        activeStreaks: activeStreaks || 0,
      };
    },
  });

  if (isLoading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const platformStats = [
    {
      title: "Active Users",
      value: stats?.totalUsers.toLocaleString() || "0",
      icon: <Users className="h-4 w-4 text-blue-400" />,
    },
    {
      title: "Active Challenges",
      value: stats?.totalChallenges.toLocaleString() || "0",
      icon: <Trophy className="h-4 w-4 text-blue-400" />,
    },
    {
      title: "Total Check-ins",
      value: stats?.totalCheckIns.toLocaleString() || "0",
      icon: <GitCommit className="h-4 w-4 text-blue-400" />,
    },
    {
      title: "Active Streaks",
      value: stats?.activeStreaks.toLocaleString() || "0",
      icon: <Award className="h-4 w-4 text-blue-400" />,
    },
  ];

  return (
    <section className="py-20 px-4 bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
          Platform Statistics
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {platformStats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};