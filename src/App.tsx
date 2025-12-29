import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom"; // Import useNavigate

// --- Pages ---
import StartPage from "./pages/StartPage";
import CreateAccount from "./pages/CreateAccount";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Quiz from "./pages/Quiz";
import Simulations from "./pages/Simulations";
import Diary from "./pages/Diary";
import Store from "./pages/Store";
import Infographics from "./pages/Infographics";
import Articles from "./pages/Articles";
import Videos from "./pages/Videos";
import Settings from "./pages/Settings";
import DailyQuiz from "./pages/DailyQuiz";
import ForumUI from "./pages/Forum";
import Resources from "./pages/Resources";
import Report from "./pages/Report";
import Scamdex from "./pages/Scamdex";
import QuizPicker from "./pages/QuizPicker";
import UserProfile from "./pages/UserProfile";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Scales from "./pages/Scales";

// --- Types ---
// Define this locally or import from types.ts
type LevelScores = Record<number, number>;

function App() {
  const navigate = useNavigate(); // Hook to change pages via code

  // ==========================================
  // 1. CENTRAL STATE (The "Brain")
  // ==========================================

  // Badges State: Load from localStorage so progress is saved
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>(() => {
    const saved = localStorage.getItem("scameleon_badges");
    return saved ? JSON.parse(saved) : [];
  });

  // Scores State: Load from localStorage
  const [levelScores, setLevelScores] = useState<LevelScores>(() => {
    const saved = localStorage.getItem("scameleon_scores");
    return saved ? JSON.parse(saved) : {};
  });

  // ==========================================
  // 2. HANDLERS (The "Bridge")
  // ==========================================

  const handleBadgeUnlock = (badgeId: string) => {
    if (!unlockedBadges.includes(badgeId)) {
      const newBadges = [...unlockedBadges, badgeId];
      setUnlockedBadges(newBadges);
      localStorage.setItem("scameleon_badges", JSON.stringify(newBadges));
    }
  };

  const handleScoreUpdate = (levelId: number, score: number) => {
    setLevelScores((prev) => {
      const newScores = {
        ...prev,
        [levelId]: Math.max(prev[levelId] || 0, score),
      };
      localStorage.setItem("scameleon_scores", JSON.stringify(newScores));
      return newScores;
    });
  };

  // ==========================================
  // 3. RENDER ROUTES
  // ==========================================
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* --- MODIFIED ROUTE: QUIZ --- */}
      {/* We pass the state and handlers down to the Quiz */}
      <Route
        path="/quiz"
        element={
          <Quiz
            existingBadges={unlockedBadges}
            onBadgeUnlock={handleBadgeUnlock}
            onScoreUpdate={handleScoreUpdate}
          />
        }
      />

      <Route path="/simulations" element={<Simulations />} />
      <Route path="/diary" element={<Diary />} />
      <Route path="/store" element={<Store />} />
      <Route path="/infographics" element={<Infographics />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/dailyquiz" element={<DailyQuiz />} />
      <Route path="/forum" element={<ForumUI />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/report" element={<Report />} />
      <Route path="/scamdex" element={<Scamdex />} />
      <Route path="/quizpicker" element={<QuizPicker />} />
      <Route path="/privacypolicy" element={<PrivacyPolicy />} />
      <Route path="/termsconditions" element={<TermsConditions />} />
      <Route path="/scales" element={<Scales />} />

      {/* --- MODIFIED ROUTE: USER PROFILE --- */}
      {/* We pass the state down so it displays the correct progress */}
      <Route
        path="/userprofile"
        element={
          <UserProfile
            badges={unlockedBadges}
            scores={levelScores}
            // When user clicks "Back" in Profile, go back to Quiz
            onBack={() => navigate("/quiz")}
          />
        }
      />
    </Routes>
  );
}

export default App;
