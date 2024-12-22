import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trophy, Medal } from "lucide-react";

interface User {
  id: string;
  rank: number;
  username: string;
  currentStreak: number;
  longestStreak: number;
  totalCheckIns: number;
}

const users: User[] = [
  {
    id: "1",
    rank: 1,
    username: "codeMaster",
    currentStreak: 65,
    longestStreak: 120,
    totalCheckIns: 365,
  },
  {
    id: "2",
    rank: 2,
    username: "devNinja",
    currentStreak: 45,
    longestStreak: 90,
    totalCheckIns: 280,
  },
  {
    id: "3",
    rank: 3,
    username: "gitHero",
    currentStreak: 30,
    longestStreak: 60,
    totalCheckIns: 200,
  },
];

const Leaderboard = () => {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly" | "allTime">("weekly");

  const handleUsernameClick = (username: string) => {
    navigate(`/profile/${username}`);
  };

  return (
    <div className="container mx-auto py-8 pt-20">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground">
            See who's leading the pack in consistent coding
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={timeframe === "weekly" ? "default" : "outline"}
            onClick={() => setTimeframe("weekly")}
          >
            Weekly
          </Button>
          <Button
            variant={timeframe === "monthly" ? "default" : "outline"}
            onClick={() => setTimeframe("monthly")}
          >
            Monthly
          </Button>
          <Button
            variant={timeframe === "allTime" ? "default" : "outline"}
            onClick={() => setTimeframe("allTime")}
          >
            All Time
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Rank</TableHead>
                <TableHead>Username</TableHead>
                <TableHead className="text-right">Current Streak</TableHead>
                <TableHead className="text-right">Longest Streak</TableHead>
                <TableHead className="text-right">Total Check-ins</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {user.rank === 1 ? (
                        <Trophy className="h-4 w-4 text-yellow-500" />
                      ) : user.rank === 2 ? (
                        <Medal className="h-4 w-4 text-gray-400" />
                      ) : user.rank === 3 ? (
                        <Medal className="h-4 w-4 text-amber-700" />
                      ) : (
                        user.rank
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleUsernameClick(user.username)}
                      className="text-primary hover:underline"
                    >
                      {user.username}
                    </button>
                  </TableCell>
                  <TableCell className="text-right">{user.currentStreak}</TableCell>
                  <TableCell className="text-right">{user.longestStreak}</TableCell>
                  <TableCell className="text-right">{user.totalCheckIns}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;