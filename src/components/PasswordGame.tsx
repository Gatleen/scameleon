import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Progress,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { CheckCircle2, Gamepad2, Lock } from "lucide-react";
import React, { useEffect, useState } from "react";

// --- Internal Game Logic Component ---
const PasswordGameLogic: React.FC = () => {
  const [password, setPassword] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<
    { text: string; points: number; met: boolean }[]
  >([]);

  useEffect(() => {
    const criteria = [
      {
        test: password.length >= 12,
        text: "At least 12 characters",
        points: 20,
      },
      {
        test: /[A-Z]/.test(password),
        text: "Contains uppercase letter",
        points: 15,
      },
      {
        test: /[a-z]/.test(password),
        text: "Contains lowercase letter",
        points: 15,
      },
      { test: /[0-9]/.test(password), text: "Contains number", points: 15 },
      {
        test: /[^A-Za-z0-9]/.test(password),
        text: "Contains special character",
        points: 15,
      },
      {
        test: password.length >= 16,
        text: "Extra long (16+ chars)",
        points: 10,
      },
      {
        test: password.length > 0 && !/(.)\1/.test(password),
        text: "No consecutive repeated chars",
        points: 10,
      },
    ];

    const newFeedback = criteria.map((c) => ({ ...c, met: c.test }));
    const newScore = newFeedback
      .filter((f) => f.met)
      .reduce((sum, f) => sum + f.points, 0);
    setFeedback(newFeedback);
    setScore(newScore);
  }, [password]);

  const getScoreColor = () => {
    if (score < 40) return "red";
    if (score < 70) return "orange";
    if (score < 90) return "yellow";
    return "green";
  };

  const getScoreLabel = () => {
    if (score < 40) return "Weak";
    if (score < 70) return "Fair";
    if (score < 90) return "Good";
    return "Excellent";
  };

  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="md" fontWeight="bold">
        🎮 Password Strength Game
      </Text>
      <Text color="gray.600" fontSize="sm">
        Create the strongest password you can! Aim for 100 points.
      </Text>

      <Textarea
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Type your password here..."
        size="md"
        fontFamily="monospace"
      />

      <Box>
        <HStack justify="space-between" mb={2}>
          <Text fontWeight="bold" fontSize="sm">
            Strength: {getScoreLabel()}
          </Text>
          <Badge colorScheme={getScoreColor()} fontSize="sm" px={2} py={1}>
            {score}/100
          </Badge>
        </HStack>
        <Progress
          value={score}
          colorScheme={getScoreColor()}
          size="md"
          borderRadius="md"
        />
      </Box>

      <VStack align="stretch" spacing={2}>
        {feedback.map((item, idx) => (
          <HStack key={idx} spacing={3}>
            {item.met ? (
              <CheckCircle2 size={18} color="green" />
            ) : (
              <Box
                w="18px"
                h="18px"
                borderRadius="full"
                border="2px"
                borderColor="gray.300"
              />
            )}
            <Text color={item.met ? "green.600" : "gray.500"} fontSize="sm">
              {item.text} (+{item.points})
            </Text>
          </HStack>
        ))}
      </VStack>

      {score === 100 && (
        <Alert status="success" borderRadius="md" size="sm">
          <AlertIcon />
          <Box>
            <AlertTitle fontSize="sm">Perfect Score!</AlertTitle>
            <AlertDescription fontSize="xs">
              You've created an excellent password!
            </AlertDescription>
          </Box>
        </Alert>
      )}
    </VStack>
  );
};

// --- Main Card Component ---
const PasswordGameCard: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card shadow="lg" bg="#fefddbff" h="100%">
        <CardBody display="flex" alignItems="center" justifyContent="center">
          <VStack spacing={3} w="full">
            <Gamepad2 size={40} color="#e1be0cff" />
            <Heading size="md" textAlign="center">
              Password Challenge
            </Heading>
            <Text textAlign="center" color="gray.600" fontSize="sm">
              Learn to create secure passwords through an interactive game!
            </Text>
            <Button
              bgColor="#fee773ff"
              size="md"
              w="full"
              onClick={onOpen}
              _hover={{ bg: "#fedf40ff" }}
              leftIcon={<Lock size={18} />}
              mt={2}
            >
              Play Now
            </Button>
          </VStack>
        </CardBody>
      </Card>

      {/* Internal Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader>Password Strength Challenge</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <PasswordGameLogic />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PasswordGameCard;
