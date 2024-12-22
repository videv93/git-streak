import { Hero } from "@/components/Hero";
import { ContributionGrid } from "@/components/ContributionGrid";
import { StatsCard } from "@/components/StatsCard";
import { Flame, GitCommit, Star, Trophy } from "lucide-react";

const Index = () => {
  // Mock data for the contribution grid (365 days)
  const mockData = Array.from({ length: 365 }, () => 
    Math.floor(Math.random() * 12)
  );

  return (
    <div className="min-h-screen">
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Your Coding Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Current Streak"
            value="12 days"
            icon={<Flame className="h-4 w-4 text-orange-500" />}
          />
          <StatsCard
            title="Total Commits"
            value="1,234"
            icon={<GitCommit className="h-4 w-4 text-blue-500" />}
          />
          <StatsCard
            title="Longest Streak"
            value="30 days"
            icon={<Trophy className="h-4 w-4 text-yellow-500" />}
          />
          <StatsCard
            title="Achievement Points"
            value="850"
            icon={<Star className="h-4 w-4 text-purple-500" />}
          />
        </div>

        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold mb-4">Contribution History</h3>
          <ContributionGrid data={mockData} />
        </div>
      </div>
    </div>
  );
};

export default Index;