import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, Calendar } from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  description: string;
  participants: number;
  duration: string;
  status: "active" | "completed" | "upcoming";
}

const challenges: Challenge[] = [
  {
    id: "1",
    title: "30 Days of Code",
    description: "Code every day for 30 days straight",
    participants: 156,
    duration: "30 days",
    status: "active",
  },
  {
    id: "2",
    title: "Open Source Sprint",
    description: "Contribute to 5 different open source projects",
    participants: 89,
    duration: "14 days",
    status: "upcoming",
  },
  {
    id: "3",
    title: "Bug Squash Week",
    description: "Fix as many bugs as you can in one week",
    participants: 234,
    duration: "7 days",
    status: "completed",
  },
];

const Challenges = () => {
  const [activeTab, setActiveTab] = useState<"active" | "upcoming" | "completed">("active");

  const filteredChallenges = challenges.filter((challenge) => challenge.status === activeTab);

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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredChallenges.map((challenge) => (
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
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{challenge.participants}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{challenge.duration}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Challenges;