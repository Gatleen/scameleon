import React, { useState, useMemo } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Progress,
  VStack,
  HStack,
  Icon,
  Image,
  Tag,
  Center,
} from "@chakra-ui/react";
import { ArrowLeft, Award, CheckCircle2, XCircle } from "lucide-react";
import { getQuestions, LEVEL_TITLES } from "../data/GameConfig";

interface GameScreenProps {
  levelId: number;
  onExit: () => void;
  onLoseHeart: () => void;
  onComplete: (lvlId: number, score: number, perfectRun: boolean) => void;
  showToast: (msg: string, type: "success" | "error" | "info") => void;
  onCorrectAnswer: () => void;
  PASS_SCORE: number;
}

const GameScreen: React.FC<GameScreenProps> = ({
  levelId,
  onExit,
  onLoseHeart,
  onComplete,
  showToast,
  onCorrectAnswer,
  PASS_SCORE,
}) => {
  const questions = useMemo(() => getQuestions(levelId), [levelId]);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [heartsLostInLevel, setHeartsLostInLevel] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const currentQ = questions[qIndex];
  const progressValue = (qIndex / questions.length) * 100;

  const handleAnswer = (key: string) => {
    if (feedback) return;

    setSelectedKey(key);

    const isCorrect = currentQ.correctKey === key;

    if (isCorrect) {
      setScore((s) => s + 20);
      setFeedback("correct");
      onCorrectAnswer();
      showToast("Correct! +20pts", "success");
    } else {
      onLoseHeart();
      setHeartsLostInLevel((h) => h + 1);
      setFeedback("wrong");
      showToast("Wrong! -1 Heart", "error");
    }

    // Delay next
    setTimeout(() => {
      setFeedback(null);
      setSelectedKey(null);
      if (qIndex < questions.length - 1) {
        setQIndex((i) => i + 1);
      } else {
        // Level Finish
        const finalScore = isCorrect ? score + 20 : score;
        // Perfect run is only if final score is PASS_SCORE and hearts lost is 0
        const perfect = finalScore === PASS_SCORE && heartsLostInLevel === 0;
        onComplete(levelId, finalScore, perfect);
      }
    }, 1500);
  };

  // Chakra color mapping utility
  const getAnswerStyle = (ansKey: string) => {
    const isCorrect = ansKey === currentQ.correctKey;
    const isSelected = ansKey === selectedKey;

    if (!feedback) {
      return { colorScheme: "pink", variant: "outline" };
    } else {
      if (isCorrect) {
        return { colorScheme: "green", variant: "solid" };
      } else if (isSelected) {
        return { colorScheme: "red", variant: "solid" };
      } else {
        return { colorScheme: "gray", variant: "outline", opacity: 0.5 };
      }
    }
  };

  const feedbackColor = feedback === "correct" ? "green" : "red";

  return (
    <Flex direction="column" h="full" bg="gray.50">
      {/* Game Top Bar */}
      <Flex p={4} align="center" justify="space-between" bg="white" shadow="sm">
        <Button onClick={onExit} variant="ghost" p={2} size="sm">
          <Icon as={ArrowLeft} boxSize={5} color="gray.400" />
        </Button>
        <Text fontWeight="bold" color="gray.700">
          {LEVEL_TITLES[levelId]}
        </Text>
        <Box w={8} />
      </Flex>

      {/* Progress Bar */}
      <Progress
        value={progressValue}
        size="xs"
        colorScheme="pink"
        borderRadius="none"
      />

      {/* Content */}
      <Flex
        flex="1"
        direction="column"
        justify="center"
        p={6}
        position="relative"
      >
        <Box
          bg="white"
          rounded="3xl"
          p={6}
          shadow="xl"
          border="1px"
          borderColor="gray.100"
          position="relative"
          overflow="hidden"
        >
          {/* Level Image Placeholder */}
          <Box
            h="120px"
            bg="gray.100"
            rounded="xl"
            overflow="hidden"
            mb={4}
            position="relative"
          >
            <Image
              src={currentQ.imageUrl}
              alt={`Scenario for Level ${levelId}`}
              objectFit="cover"
              w="full"
              h="full"
              fallback={
                <Center w="full" h="full">
                  <Text color="gray.500">Image Placeholder</Text>
                </Center>
              }
            />
            <Tag
              position="absolute"
              top={2}
              right={2}
              colorScheme="gray"
              size="sm"
              borderRadius="full"
            >
              Q{qIndex + 1}/{questions.length}
            </Tag>
          </Box>

          <Box mb={6}>
            <Heading size="md" color="gray.800" lineHeight="short">
              {currentQ.q}
            </Heading>
          </Box>

          {/* Clarity: Pass Requirement */}
          <HStack
            bg="yellow.50"
            color="yellow.800"
            p={2}
            rounded="lg"
            fontSize="sm"
            fontWeight="bold"
            justify="center"
            mb={4}
          >
            <Icon as={Award} boxSize={4} />
            <Text>Goal: Score {PASS_SCORE} points to pass this level.</Text>
          </HStack>

          {/* Feedback Overlay */}
          <Box
            maxH={feedback ? "100px" : "0"}
            opacity={feedback ? 1 : 0}
            transition="all 0.3s"
            overflow="hidden"
            mb={feedback ? 4 : 0}
          >
            <Box
              p={4}
              rounded="xl"
              fontSize="sm"
              fontWeight="bold"
              bg={`${feedbackColor}.100`}
              color={`${feedbackColor}.800`}
            >
              <HStack align="flex-start">
                <Icon
                  as={feedback === "correct" ? CheckCircle2 : XCircle}
                  boxSize={5}
                />
                <VStack align="flex-start" spacing={0}>
                  <Text>
                    {feedback === "correct" ? "✅ Great job!" : "❌ Ops!"}
                  </Text>
                  <Text fontSize="xs" fontWeight="normal">
                    {currentQ.expl}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </Box>

          <VStack spacing={3}>
            {currentQ.answers.map((ans, idx) => {
              const { colorScheme, variant, opacity } = getAnswerStyle(ans.k);

              return (
                <Button
                  key={idx}
                  isDisabled={!!feedback}
                  onClick={() => handleAnswer(ans.k)}
                  w="full"
                  p={4}
                  h="auto" // Allows height to grow
                  rounded="xl"
                  colorScheme={colorScheme}
                  variant={variant}
                  fontWeight="bold"
                  // --- UPDATED FONT SIZE ---
                  // "md" on mobile, "lg" on desktop
                  fontSize={"md"}
                  // --- UPDATED TEXT WRAPPING ---
                  whiteSpace="normal"
                  textAlign="left"
                  justifyContent="flex-start"
                  shadow="sm"
                  opacity={opacity || 1}
                  _active={{ transform: "scale(0.95)" }}
                >
                  {ans.t}
                </Button>
              );
            })}
          </VStack>
        </Box>

        {/* Current Score Display */}
        <Center mt={6}>
          <HStack
            fontSize="xl"
            fontWeight="black"
            color="gray.600"
            bg="white"
            p={3}
            rounded="xl"
            shadow="md"
            border="1px"
            borderColor="pink.100"
          >
            <Text>Score:</Text>
            <Text color="pink.600">{score}</Text>
          </HStack>
        </Center>
      </Flex>
    </Flex>
  );
};

export default GameScreen;
