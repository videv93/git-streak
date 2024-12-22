import { Link } from "react-router-dom";
import { Trophy, LayoutDashboard, Flag } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2" to="/">
            <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold text-xl">
              GitStreak
            </h1>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-6 md:justify-end">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/dashboard"
              className="transition-colors hover:text-foreground/80 text-foreground flex items-center gap-2"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              to="/community/leaderboard"
              className="transition-colors hover:text-foreground/80 text-foreground flex items-center gap-2"
            >
              <Trophy className="h-4 w-4" />
              Leaderboard
            </Link>
            <Link
              to="/community/challenges"
              className="transition-colors hover:text-foreground/80 text-foreground flex items-center gap-2"
            >
              <Flag className="h-4 w-4" />
              Challenges
            </Link>
          </nav>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}