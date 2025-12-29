// src/pages/Quiz.tsx

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChakraProvider,
  extendTheme,
  Box,
  Flex,
  useToast,
  Button,
  Container,
  Spinner,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Image,
  VStack,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";

// --- FIREBASE IMPORTS ---
//
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";

import {
  HEARTS_MAX,
  REFILL_TIME_MS,
  PASS_SCORE,
  WORLDS,
  BADGES,
  WORLD_VIDEOS,
} from "../data/GameConfig";
import type { View, LevelScores } from "../types";

// Components
import HUD from "../components/HeadsUpDisplay";
import HaltScreen from "../components/HaltScreen";
import ScamSmashHeader from "../components/headerCards/ScamSmashHeader";

// Screens
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import GameScreen from "../screens/GameScreen";

// Modals
import WorldIntroModal from "../modals/WorldIntroModal";
import LevelIntroModal from "../modals/LevelIntroModal";
import WorldCompleteModal from "../modals/WorldCompleteModal";
import GameCompleteModal from "../modals/GameCompleteModal";

// --- THEME ---
const theme = extendTheme({
  colors: {
    pink: { 50: "#FDF2F8", 500: "#EC4899", 600: "#DB2777" },
    emerald: { 500: "#10B981", 600: "#059669", 300: "#6EE7B7" },
    orange: { 500: "#F97316", 600: "#EA580C", 300: "#FDBA74" },
    red: { 500: "#EF4444", 600: "#DC2626", 300: "#FCA5A5" },
    teal: { 500: "#14B8A6", 600: "#0D9488", 300: "#5EEAD4" },
    violet: { 500: "#8B5CF6", 600: "#7C3AED", 300: "#C4B5FD" },
    yellow: { 50: "#FFFBEB", 400: "#FACC15", 500: "#EAB308", 800: "#924005" },
    gray: { 50: "#F9FAFB", 200: "#E5E7EB", 600: "#4B5563", 800: "#1F2937" },
  },
  styles: {
    global: {
      "html, body": {
        backgroundColor: "#f9f1e8", // Updated background color here
        fontFamily: "Inter, sans-serif",
      },
    },
  },
  components: {
    Button: { baseStyle: { borderRadius: "xl" } },
  },
});

interface QuizContentProps {
  onBadgeUnlock?: (badgeId: string) => void;
  onScoreUpdate?: (levelId: number, score: number) => void;
}

const QuizContent: React.FC<QuizContentProps> = ({
  onBadgeUnlock,
  onScoreUpdate,
}) => {
  const toast = useToast();
  const navigate = useNavigate();

  // --- Auth & Loading State ---
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- New Intro Pop-up State ---
  const [showStartModal, setShowStartModal] = useState(true);

  // --- Game State ---
  const [view, setView] = useState<View>("home");
  const [hearts, setHearts] = useState<number>(HEARTS_MAX);
  const [nextHeartTime, setNextHeartTime] = useState<number | null>(null);
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([1]);
  const [levelScores, setLevelScores] = useState<LevelScores>({});
  const [currentLevel, setCurrentLevel] = useState<number | null>(null);
  const [currentWorldId, setCurrentWorldId] = useState<number>(WORLDS[0].id);
  const [playedWorlds, setPlayedWorlds] = useState<number[]>([]);

  // Modals & Navigation
  const [introWorldId, setIntroWorldId] = useState<number | null>(null);
  const [introLevelId, setIntroLevelId] = useState<number | null>(null);
  const [worldCompleteId, setWorldCompleteId] = useState<number | null>(null);
  const [gameFinished, setGameFinished] = useState(false);

  // Gameplay Session State
  const [consecutiveClean, setConsecutiveClean] = useState<number>(0);
  const [consecutiveAnswers, setConsecutiveAnswers] = useState<number>(0);
  const [myBadges, setMyBadges] = useState<string[]>([]);

  // --- 1. LOAD DATA ---
  //
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        try {
          const docSnap = await getDoc(doc(db, "users", user.uid));
          if (docSnap.exists()) {
            const data = docSnap.data();
            const progress = data.gameProgress || {};
            setHearts(progress.hearts ?? HEARTS_MAX);
            setNextHeartTime(progress.nextHeartTime ?? null);
            setUnlockedLevels(progress.unlockedLevels ?? [1]);
            setLevelScores(progress.levelScores ?? {});
            setPlayedWorlds(progress.playedWorlds ?? []);
            setGameFinished(progress.gameFinished ?? false);
            setMyBadges(data.badges || []);
          }
        } catch (error) {
          console.error("Error fetching game data:", error);
        }
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // --- 2. SAVE HELPER ---
  const saveProgressToFirebase = useCallback(
    async (updates: any) => {
      if (!userId) return;
      try {
        const dotNotationUpdates: any = {};
        Object.keys(updates).forEach((key) => {
          dotNotationUpdates[`gameProgress.${key}`] = updates[key];
        });
        await updateDoc(doc(db, "users", userId), dotNotationUpdates);
      } catch (error) {
        console.error("Error saving progress:", error);
      }
    },
    [userId]
  );

  // --- Utilities ---
  const showToast = useCallback(
    (msg: string, status: "success" | "error" | "info") => {
      toast({
        title: msg,
        status: status === "success" ? "success" : "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    },
    [toast]
  );

  const refillHearts = useCallback(() => {
    setHearts(HEARTS_MAX);
    setNextHeartTime(null);
    showToast("Hearts Refilled!", "success");
    saveProgressToFirebase({ hearts: HEARTS_MAX, nextHeartTime: null });
  }, [showToast, saveProgressToFirebase]);

  const loseHeart = useCallback(() => {
    setHearts((h) => {
      const newHearts = Math.max(0, h - 1);
      saveProgressToFirebase({ hearts: newHearts });
      return newHearts;
    });
    setConsecutiveAnswers(0);
    setConsecutiveClean(0);
  }, [saveProgressToFirebase]);

  // --- Effects ---
  useEffect(() => {
    if (hearts === 0 && !nextHeartTime) {
      const refillTime = Date.now() + REFILL_TIME_MS;
      setNextHeartTime(refillTime);
      saveProgressToFirebase({ nextHeartTime: refillTime });
    }
    const timer = setInterval(() => {
      if (nextHeartTime && Date.now() >= nextHeartTime) refillHearts();
    }, 1000);
    return () => clearInterval(timer);
  }, [hearts, nextHeartTime, refillHearts, saveProgressToFirebase]);

  // Handle auto-switch to Halt view if hearts run out
  useEffect(() => {
    if (hearts === 0 && view !== "halt") setView("halt");
  }, [hearts, view]);

  // --- Logic Handlers ---
  const triggerUnlock = useCallback(
    async (badgeId: string) => {
      if (!myBadges.includes(badgeId)) {
        const badgeName =
          BADGES.find((b) => b.id === badgeId)?.name || "New Badge";
        showToast(`Badge Unlocked: ${badgeName}!`, "success");
        setMyBadges((prev) => [...prev, badgeId]);
        if (onBadgeUnlock) onBadgeUnlock(badgeId);
        if (userId) {
          await updateDoc(doc(db, "users", userId), {
            badges: arrayUnion(badgeId),
          });
        }
      }
    },
    [myBadges, showToast, onBadgeUnlock, userId]
  );

  const startGame = (lvlId: number) => {
    if (hearts <= 0) {
      setView("halt");
      return;
    }
    setIntroLevelId(lvlId);
  };

  //
  const handleLevelComplete = useCallback(
    (lvlId: number, score: number, perfectRun: boolean) => {
      const newScores = {
        ...levelScores,
        [lvlId]: Math.max(levelScores[lvlId] || 0, score),
      };
      setLevelScores(newScores);
      if (onScoreUpdate) onScoreUpdate(lvlId, score);

      let newUnlockedLevels = [...unlockedLevels];
      let newPlayedWorlds = [...playedWorlds];

      if (perfectRun) {
        const newClean = consecutiveClean + 1;
        setConsecutiveClean(newClean);
        if (newClean >= 5) triggerUnlock("clean5");
        if (lvlId === 17) triggerUnlock("heart_protector");
      } else {
        setConsecutiveClean(0);
      }

      if (score >= PASS_SCORE) {
        if (!unlockedLevels.includes(lvlId + 1) && lvlId < 20) {
          newUnlockedLevels.push(lvlId + 1);
          setUnlockedLevels(newUnlockedLevels);
        }

        if (lvlId === 20) {
          triggerUnlock("guardian");
          if (score === PASS_SCORE) triggerUnlock("terminator");
          setGameFinished(true);
          setCurrentLevel(null);
          saveProgressToFirebase({
            levelScores: newScores,
            unlockedLevels: newUnlockedLevels,
            gameFinished: true,
          });
          return;
        }

        const currentWorld = WORLDS.find((w) => w.levels.includes(lvlId));
        if (
          currentWorld &&
          lvlId === currentWorld.levels[currentWorld.levels.length - 1]
        ) {
          triggerUnlock(`world${currentWorld.id}`);
          setWorldCompleteId(currentWorld.id);
          setCurrentLevel(null);
          if (!newPlayedWorlds.includes(currentWorld.id)) {
            newPlayedWorlds.push(currentWorld.id);
            setPlayedWorlds(newPlayedWorlds);
          }
          saveProgressToFirebase({
            levelScores: newScores,
            unlockedLevels: newUnlockedLevels,
            playedWorlds: newPlayedWorlds,
          });
          return;
        }
      }

      setCurrentLevel(null);
      setView("map");
      saveProgressToFirebase({
        levelScores: newScores,
        unlockedLevels: newUnlockedLevels,
      });
    },
    [
      consecutiveClean,
      unlockedLevels,
      levelScores,
      playedWorlds,
      triggerUnlock,
      onScoreUpdate,
      saveProgressToFirebase,
    ]
  );

  // --- RENDER ---
  if (isLoading) {
    return (
      <Flex
        minH="100vh"
        w="full"
        align="center"
        justify="center"
        bg="#f9f1e8" // Updated background color
      >
        <Flex direction="column" align="center" gap={4}>
          <Spinner size="xl" color="blue.500" thickness="4px" />
          <Text color="gray.600" fontWeight="medium">
            Loading Game Data...
          </Text>
        </Flex>
      </Flex>
    );
  }

  // NOTE: I removed the early return for HaltScreen so the Pop-up can render on top of it.
  // The Halt logic is now handled inside the main render block.

  return (
    <Flex
      direction="column"
      minH="100vh"
      w="full"
      align="center"
      bg="#f9f1e8" // Updated background color
    >
      {/* --- START GAME POP-UP (Appears every load) --- */}
      <Modal
        isOpen={showStartModal}
        onClose={() => setShowStartModal(false)}
        isCentered
        closeOnOverlayClick={false}
        size="md"
      >
        <ModalOverlay backdropFilter="blur(8px)" />
        <ModalContent
          borderRadius="2xl"
          border="4px solid"
          borderColor="orange.500"
          p={4}
          textAlign="center"
        >
          <ModalHeader fontSize="2xl" fontWeight="bold" color="orange.600">
            Can you defeat The ScamVillains?
          </ModalHeader>
          <ModalBody>
            <VStack spacing={6}>
              <Box
                bg="orange.50"
                p={4}
                borderRadius="xl"
                border="2px dashed"
                borderColor="orange.200"
                w="full"
              >
                {/* Ensure you have this image in your project or update the path! */}
                <Image
                  src="src/assets/QuizWorlds/TheScamvillains.png"
                  alt="The ScamVillains"
                  maxH="200px"
                  mx="auto"
                  fallbackSrc="https://via.placeholder.com/300x200?text=ScamVillains"
                />
              </Box>
              <Button
                colorScheme="orange"
                size="lg"
                w="full"
                fontSize="xl"
                onClick={() => setShowStartModal(false)}
                _hover={{ transform: "scale(1.05)", shadow: "lg" }}
              >
                Go!
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* --- HEADER --- */}
      <Container maxW="container.lg" pt={6} pb={2}>
        <Flex direction="column" gap={4}>
          <Button
            leftIcon={<ChevronLeftIcon />}
            variant="link"
            color="gray.600"
            alignSelf="flex-start"
            onClick={() => navigate("/dashboard")}
            _hover={{ color: "blue.500" }}
          >
            Back to Dashboard
          </Button>
          <ScamSmashHeader
            title="Scam Smash"
            imageSrc="src/assets/PageCharacters/ScameleonScamSmash.png"
          />
        </Flex>
      </Container>

      {/* --- MAIN GAME CONTAINER --- */}
      <Box
        w="full"
        maxW="md"
        bg="white"
        shadow={{ base: "none", md: "2xl" }}
        rounded={{ md: "3xl" }}
        overflow="hidden"
        position="relative"
        h={{ base: "80vh", md: "750px" }}
        mt={4}
        mb={8}
      >
        <Flex direction="column" h="full" position="relative">
          <Box position="absolute" top="0" left="0" right="0" zIndex="sticky">
            <HUD lives={hearts} badges={myBadges.length} />
          </Box>

          <Box
            flex="1"
            overflowY="auto"
            pt="90px"
            pb="20px"
            position="relative"
            w="full"
          >
            {/* --- VIEW ROUTER --- */}
            {/*  */}
            {/* If hearts are 0 OR view is halt, show HaltScreen. 
                Otherwise show the Game Views. */}
            {view === "halt" || hearts === 0 ? (
              <HaltScreen
                nextHeartTime={nextHeartTime}
                onRefill={refillHearts}
                onBack={() => navigate("/dashboard")}
              />
            ) : (
              <>
                {view === "home" && (
                  <HomeScreen
                    setView={setView}
                    unlockedLevels={unlockedLevels}
                    levelScores={levelScores}
                    handleWorldCardClick={(id) => {
                      setCurrentWorldId(id);
                      !playedWorlds.includes(id)
                        ? setIntroWorldId(id)
                        : setView("map");
                    }}
                  />
                )}

                {view === "map" && (
                  <MapScreen
                    currentWorldId={currentWorldId}
                    unlocked={unlockedLevels}
                    scores={levelScores}
                    onPlay={startGame}
                    onBack={() => setView("home")}
                  />
                )}

                {view === "game" && currentLevel !== null && (
                  <GameScreen
                    levelId={currentLevel}
                    onExit={() => {
                      setCurrentLevel(null);
                      setView("map");
                    }}
                    onLoseHeart={loseHeart}
                    onComplete={handleLevelComplete}
                    showToast={showToast}
                    onCorrectAnswer={() => {
                      const newStreak = consecutiveAnswers + 1;
                      setConsecutiveAnswers(newStreak);
                      if (newStreak >= 10) triggerUnlock("sharp10");
                    }}
                    PASS_SCORE={PASS_SCORE}
                  />
                )}
              </>
            )}
          </Box>

          {/* --- INTERNAL MODALS --- */}
          {introWorldId !== null && (
            <WorldIntroModal
              world={WORLDS.find((w) => w.id === introWorldId)!}
              videoData={
                WORLD_VIDEOS[introWorldId as keyof typeof WORLD_VIDEOS]
              }
              onClose={(id) => {
                const newPlayed = [...playedWorlds, id];
                setPlayedWorlds(newPlayed);
                saveProgressToFirebase({ playedWorlds: newPlayed });
                setIntroWorldId(null);
                setView("map");
              }}
            />
          )}

          {introLevelId !== null && (
            <LevelIntroModal
              levelId={introLevelId}
              onStart={() => {
                setCurrentLevel(introLevelId);
                setView("game");
                setIntroLevelId(null);
              }}
              onCancel={() => setIntroLevelId(null)}
              PASS_SCORE={PASS_SCORE}
            />
          )}

          {worldCompleteId !== null && (
            <WorldCompleteModal
              world={WORLDS.find((w) => w.id === worldCompleteId)!}
              onClose={() => {
                setWorldCompleteId(null);
                setView("home");
              }}
            />
          )}

          <GameCompleteModal
            isOpen={gameFinished}
            onBackToDashboard={() => navigate("/dashboard")}
          />
        </Flex>
      </Box>
    </Flex>
  );
};

const Quiz: React.FC<QuizContentProps> = (props) => (
  <ChakraProvider theme={theme}>
    <QuizContent {...props} />
  </ChakraProvider>
);

export default Quiz;
