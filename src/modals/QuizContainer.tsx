import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";

// --- Import your components ---
// Adjust these paths based on where you actually saved them!
import Quiz from "../pages/Quiz";
import UserProfile from "../pages/UserProfile";
import type { LevelScores } from "../types";

export default function GameContainer() {
  // --- STATE ---
  const [view, setView] = useState<"game" | "profile">("game");

  // Load Badges from LocalStorage
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>(() => {
    const saved = localStorage.getItem("scameleon_badges");
    return saved ? JSON.parse(saved) : [];
  });

  // Load Scores from LocalStorage
  const [levelScores, setLevelScores] = useState<LevelScores>(() => {
    const saved = localStorage.getItem("scameleon_scores");
    return saved ? JSON.parse(saved) : {};
  });

  // --- HANDLERS ---

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

  return (
    <Box minH="100vh" bg="gray.50">
      {view === "game" ? (
        <Quiz
          // Data passed down
          existingBadges={unlockedBadges}
          // Functions passed up
          onBadgeUnlock={handleBadgeUnlock}
          onScoreUpdate={handleScoreUpdate}
          // Navigation
          onOpenProfile={() => setView("profile")}
        />
      ) : (
        <UserProfile
          // Data passed down
          badges={unlockedBadges}
          scores={levelScores}
          // Navigation
          onBack={() => setView("game")}
        />
      )}
    </Box>
  );
}
