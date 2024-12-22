import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Achievement {
  id: string;
  name: string;
  description: string;
  badge_url: string;
}

interface ProfileAchievementsProps {
  username: string;
}

export const ProfileAchievements = ({ username }: ProfileAchievementsProps) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    fetchAchievements();
  }, [username]);

  const fetchAchievements = async () => {
    try {
      const { data, error } = await supabase
        .from('user_achievements')
        .select(`
          achievements (
            id,
            name,
            description,
            badge_url
          )
        `)
        .eq('user_id', username);

      if (error) throw error;

      if (data) {
        const formattedAchievements = data.map((item: any) => item.achievements);
        setAchievements(formattedAchievements);
      }
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  if (achievements.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5" />
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="flex items-center gap-3 p-4 rounded-lg border bg-card"
            >
              <img
                src={achievement.badge_url}
                alt={achievement.name}
                className="w-12 h-12"
              />
              <div>
                <h3 className="font-semibold">{achievement.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};