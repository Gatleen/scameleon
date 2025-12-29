import React, { useState, useEffect } from "react";
import {
  Center,
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { Heart, Clock } from "lucide-react";

interface HaltScreenProps {
  nextHeartTime: number | null;
  onRefill: () => void;
  onBack: () => void;
}

const HaltScreen: React.FC<HaltScreenProps> = ({
  nextHeartTime,
  onRefill,
  onBack,
}) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (nextHeartTime === null) return;

    const timer = setInterval(() => {
      const diff = nextHeartTime - Date.now();
      if (diff <= 0) {
        onRefill();
        clearInterval(timer);
      } else {
        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${h}h ${m}m ${s}s`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [nextHeartTime, onRefill]);

  return (
    <Center minH="100vh" bg="gray.900" p={6}>
      <Box
        bg="white"
        rounded="3xl"
        p={8}
        maxW="sm"
        w="full"
        shadow="2xl"
        borderBottom="8px"
        borderColor="gray.200"
      >
        <Center
          w={24}
          h={24}
          bg="red.100"
          rounded="full"
          mx="auto"
          mb={6}
          animation="pulse"
        >
          <Icon as={Heart} boxSize={12} color="red.500" />
        </Center>
        <Heading as="h2" size="xl" color="gray.800" mb={2}>
          Oh no!
        </Heading>
        <Text fontSize="lg" fontWeight="bold" color="pink.500" mb={6}>
          You've run out of lives!
        </Text>
        <Text color="gray.500" mb={8}>
          Next heart refills in:
        </Text>

        <Center bg="gray.100" rounded="xl" p={4} mb={8}>
          <HStack
            spacing={2}
            color="gray.600"
            fontFamily="mono"
            fontSize="xl"
            fontWeight="bold"
          >
            <Icon as={Clock} boxSize={6} />
            <Text>{timeLeft || <Spinner size="sm" />}</Text>
          </HStack>
        </Center>

        <Button
          onClick={onBack}
          w="full"
          py={6}
          rounded="xl"
          fontWeight="bold"
          colorScheme="pink"
          shadow="lg"
          _active={{ transform: "scale(0.95)" }}
          mb={4}
        >
          Back to Dashboard
        </Button>
      </Box>
    </Center>
  );
};

export default HaltScreen;
