import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, Calendar } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Challenge {
  id: string;
  title: string;
  description: string;
  status: "active" | "completed" | "upcoming";
  start_date: string;
  end_date: string;
  _count?: {
    participants: number;
  }
}

const Challenges = () => {
  const [activeTab, setActiveTab] = useState<"active" | "upcoming" | "completed">("active");
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChallenges();
  }, [activeTab]);

  const fetchChallenges = async () => {
    try {
      const { data, error } = await supabase
        .from('challenges')
        .select(`
          *,
          _count {
            participants: challenge_participants(count)
          }
        `)
        .eq('status', activeTab);

      if (error) throw error;
      setChallenges(data || []);
    } catch (error) {
      console.error('Error fetching challenges:', error);
      toast.error("Failed to load challenges");
    } finally {
      setLoading(false);
    }
  };

  const joinChallenge = async (challengeId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please login to join challenges");
        return;
      }

      const { error } = await supabase
        .from('challenge_participants')
        .insert({
          challenge_id: challengeId,
          user_id: user.id
        });

      if (error) {
        if (error.code === '23505') { // Unique violation
          toast.error("You've already joined this challenge");
        } else {
          throw error;
        }
      } else {
        toast.success("Successfully joined the challenge!");
        fetchChallenges(); // Refresh the list
      }
    } catch (error) {
      console.error('Error joining challenge:', error);
      toast.error("Failed to join challenge");
    }
  };

  return (
    <div className="container mx-auto py-8 pt-20">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Community Challenges</h1>
          <p className="text-muted-foreground">
            Join coding challenges and compete with other developers
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={activeTab === "active" ? "default" : "outline"}
            onClick={() => setActiveTab("active")}
          >
            Active
          </Button>
          <Button
            variant={activeTab === "upcoming" ? "default" : "outline"}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </Button>
          <Button
            variant={activeTab === "completed" ? "default" : "outline"}
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading challenges...</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {challenges.map((challenge) => (
              <Card key={challenge.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle>{challenge.title}</CardTitle>
                    <Badge
                      variant={
                        challenge.status === "active"
                          ? "default"
                          : challenge.status === "upcoming"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {challenge.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">{challenge.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{challenge._count?.participants || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(challenge.end_date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    {challenge.status === "active" && (
                      <Button
                        size="sm"
                        onClick={() => joinChallenge(challenge.id)}
                      >
                        Join Challenge
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Challenges;