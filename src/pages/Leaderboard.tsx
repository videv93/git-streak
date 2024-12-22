import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Trophy, User } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface LeaderboardUser {
  id: string;
  username: string;
  full_name: string;
  current_streak: number;
  longest_streak: number;
  total_check_ins: number;
}

const Leaderboard = () => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          username,
          full_name,
          streaks!inner (
            current_streak,
            longest_streak,
            total_check_ins
          )
        `)
        .order('streaks.longest_streak', { ascending: false })
        .limit(100);

      if (error) throw error;

      const formattedData = data.map(user => ({
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        current_streak: user.streaks.current_streak,
        longest_streak: user.streaks.longest_streak,
        total_check_ins: user.streaks.total_check_ins
      }));

      setUsers(formattedData);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      toast.error("Failed to load leaderboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = (username: string) => {
    navigate(`/profile/${username}`);
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">
              <div className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-500" />
                Global Leaderboard
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Rank</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead className="text-right">Current Streak</TableHead>
                    <TableHead className="text-right">Longest Streak</TableHead>
                    <TableHead className="text-right">Total Check-ins</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user, index) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleUserClick(user.username)}
                          className="flex items-center gap-2 hover:text-primary"
                        >
                          <User className="h-4 w-4" />
                          {user.full_name}
                          <span className="text-sm text-muted-foreground">
                            @{user.username}
                          </span>
                        </button>
                      </TableCell>
                      <TableCell className="text-right">{user.current_streak}</TableCell>
                      <TableCell className="text-right">{user.longest_streak}</TableCell>
                      <TableCell className="text-right">{user.total_check_ins}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;