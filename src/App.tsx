import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import Leaderboard from "@/pages/community/Leaderboard";
import Challenges from "@/pages/community/Challenges";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/community/leaderboard" element={<Leaderboard />} />
          <Route path="/community/challenges" element={<Challenges />} />
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;