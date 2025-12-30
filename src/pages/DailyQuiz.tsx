import React, { useState, useEffect } from "react";
import {
  VStack,
  Text,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Box,
  useColorModeValue,
  Image,
  Spinner,
  Badge,
  Flex,
  Container,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DailyQuizHeader from "../components/headerCards/DailyQuizHeader";
import NavigationBarItems from "../components/NavigationBar";
import Footer from "../components/Footer";
import { db, auth } from "../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

// 🔹 IMPORT awardScales AND SCALE REWARDS
import { awardScales } from "../utils/awardScales";
import { SCALE_REWARDS } from "../constants/scalesRewards";

// --- FIXED IMAGE IMPORTS ---
import correctImg from "../assets/DailyQuizCorrect.png";
import wrongImg from "../assets/DailyQuizWrong.png";
import quizHeaderChar from "../assets/PageCharacters/ScameleonQuizDaily.png";

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizResult {
  answered: boolean;
  selectedIndex: number;
  isCorrect: boolean;
}

const DailyQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [dayKey, setDayKey] = useState("");
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [showFeedback, setShowFeedback] = useState({
    visible: false,
    isCorrect: false,
  });

  const toast = useToast();
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");

  // Gradient variable
  const backgroundColor = "#f9f1e8";

  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchDailyQuestion = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "dailyQuiz"));
        const allQuestions = querySnapshot.docs.map(
          (doc) => doc.data() as Question
        );

        if (allQuestions.length > 0) {
          const now = new Date();
          const daysSinceEpoch = Math.floor(
            now.getTime() / (1000 * 60 * 60 * 24)
          );
          const dailyIndex = daysSinceEpoch % allQuestions.length;

          setCurrentQuestion(allQuestions[dailyIndex]);
          const todayKey = `quiz_status_${daysSinceEpoch}`;
          setDayKey(todayKey);

          const savedStatus = localStorage.getItem(todayKey);
          if (savedStatus) setQuizResult(JSON.parse(savedStatus));
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDailyQuestion();
  }, []);

  const handleAnswer = async (selectedIndex: number) => {
    if (quizResult || !currentQuestion || !currentUser) return;

    const isCorrect = selectedIndex === currentQuestion.correctIndex;
    const result = { answered: true, selectedIndex, isCorrect };

    // --- FIX 2: UPDATE UI IMMEDIATELY (Optimistic Update) ---
    // We update state first so the user sees the result instantly.
    localStorage.setItem(dayKey, JSON.stringify(result));
    setQuizResult(result);
    setShowFeedback({ visible: true, isCorrect });

    // --- Background Database Sync ---
    try {
      const today = new Date().toISOString().split("T")[0];
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();

        // If the DB says we already played today, stop here (don't award points twice)
        if (data.lastDailyQuizDate === today) {
          console.log("Daily quiz already recorded for today.");
          return;
        }

        // Award Scales
        await awardScales(
          currentUser.uid,
          isCorrect
            ? SCALE_REWARDS.DAILY_QUIZ_CORRECT
            : SCALE_REWARDS.DAILY_QUIZ_WRONG,
          "Daily quiz completed"
        );

        // Update Date
        await updateDoc(userRef, {
          lastDailyQuizDate: today,
        });
      }
    } catch (error) {
      console.error("Error syncing quiz result:", error);
      // We don't revert the UI because the user technically "played" locally
    }
  };

  if (loading) {
    return (
      <Flex
        h="100vh"
        w="full"
        align="center"
        justify="center"
        bg={backgroundColor}
      >
        <VStack spacing={4}>
          <Spinner size="xl" color="orange.500" thickness="4px" />
          <Text color="orange.800" fontWeight="bold">
            Fetching today's challenge...
          </Text>
        </VStack>
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      minH="100vh"
      bg={backgroundColor}
      overflowX="hidden"
    >
      {/* 1. Navigation */}
      <Box mt={{ base: 2, md: 4 }}>
        <NavigationBarItems />
      </Box>

      {/* 2. Main Content Container */}
      <Container maxW="container.lg" flex="1" py={8} px={{ base: 4, md: 8 }}>
        <VStack spacing={8} align="center" w="full">
          {/* Header */}
          <DailyQuizHeader title="Daily Quiz" imageSrc={quizHeaderChar} />

          {/* Quiz Card */}
          <Box
            bg={cardBg}
            w="full"
            maxW="500px"
            p={{ base: 6, md: 8 }}
            rounded="3xl"
            shadow="xl"
            position="relative"
            borderWidth="1px"
            borderColor="orange.100"
          >
            {quizResult && (
              <Badge
                colorScheme={quizResult.isCorrect ? "green" : "red"}
                position="absolute"
                top={4}
                right={6}
                rounded="full"
                px={3}
              >
                {quizResult.isCorrect ? "Correct" : "Incorrect"}
              </Badge>
            )}

            <VStack spacing={6} align="stretch">
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight="bold"
                textAlign="center"
                color={textColor}
                lineHeight="tall"
              >
                {currentQuestion
                  ? currentQuestion.question
                  : "No question found."}
              </Text>

              <VStack spacing={3} w="full">
                {currentQuestion?.options.map((opt, i) => {
                  const isSelected = quizResult?.selectedIndex === i;
                  const isCorrectAnswer = i === currentQuestion.correctIndex;

                  let btnBg = "yellow.500";
                  let btnHoverBg = "yellow.600";

                  if (quizResult) {
                    if (isCorrectAnswer) {
                      btnBg = "green.500";
                      btnHoverBg = "green.500";
                    } else if (isSelected) {
                      btnBg = "red.500";
                      btnHoverBg = "red.500";
                    } else {
                      btnBg = "gray.300";
                      btnHoverBg = "gray.300";
                    }
                  }

                  return (
                    <Button
                      key={i}
                      w="full"
                      h="auto"
                      py={4}
                      bg={btnBg}
                      color="white"
                      _hover={{
                        bg: btnHoverBg,
                        transform: quizResult ? "none" : "translateY(-2px)",
                      }}
                      _active={{ bg: "yellow.700" }}
                      rounded="2xl"
                      isDisabled={!!quizResult}
                      onClick={() => handleAnswer(i)}
                      whiteSpace="normal"
                      textAlign="center"
                      lineHeight="shorter"
                      _disabled={{ opacity: 1, cursor: "not-allowed" }}
                    >
                      {opt}
                    </Button>
                  );
                })}
              </VStack>

              {quizResult && currentQuestion && (
                <Box
                  p={4}
                  bg="blue.50"
                  rounded="2xl"
                  borderLeft="4px solid"
                  borderColor="blue.400"
                  mt={2}
                >
                  <Text fontSize="sm" fontWeight="bold" color="blue.600">
                    Explanation:
                  </Text>
                  <Text fontSize="sm" color="gray.700">
                    {currentQuestion.explanation}
                  </Text>
                </Box>
              )}
            </VStack>
          </Box>
        </VStack>
      </Container>

      {/* 3. Footer */}
      <Box width="100%" mt="auto">
        <Footer />
      </Box>

      {/* Feedback Modal */}
      <Modal
        isOpen={showFeedback.visible}
        onClose={() => setShowFeedback({ ...showFeedback, visible: false })}
        isCentered
        size="lg"
      >
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent rounded="2xl" overflow="hidden" mx={4}>
          <ModalHeader
            textAlign="center"
            bg={showFeedback.isCorrect ? "green.100" : "red.100"}
          >
            <Text
              color={showFeedback.isCorrect ? "green.700" : "red.700"}
              fontWeight="bold"
            >
              {showFeedback.isCorrect ? "🎉 Good Job!" : "⚠️ Try Again!"}
            </Text>
          </ModalHeader>
          <ModalBody p={0} display="flex" justifyContent="center" bg="gray.50">
            <Image
              src={showFeedback.isCorrect ? correctImg : wrongImg}
              alt="Feedback"
              objectFit="contain"
              w="100%"
              maxH="400px"
            />
          </ModalBody>
          <ModalFooter bg="gray.50">
            <Button
              as={Link}
              to="/dashboard"
              bgColor="#9792cb"
              color="white"
              rounded="xl"
              onClick={() =>
                setShowFeedback({ ...showFeedback, visible: false })
              }
            >
              Back to Dashboard
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default DailyQuiz;
