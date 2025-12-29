import React from "react";
import {
  Box,
  Center,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Icon,
  Image,
} from "@chakra-ui/react";
import ModalWrapper from "./ModalWrapper";
import { Trophy } from "lucide-react";
import type { World } from "../types";
import { PLAYER_NAME } from "../data/GameConfig";

interface WorldCompleteModalProps {
  world: World;
  onClose: () => void;
}

const WorldCompleteModal: React.FC<WorldCompleteModalProps> = ({
  world,
  onClose,
}) => {
  const colorScheme = world.theme;

  // 1. Map world IDs to your specific filenames in the public folder
  const victoryImages: Record<number, string> = {
    1: "PhishytheFishDefeated.png",
    2: "DustytheDuneWormDefeated.png",
    3: "ClawstheCrabDefeated.png",
    4: "WebWidowtheSpiderDefeated.png",
    5: "SvanatheSwanDefeated.png",
  };

  // 2. Build the path using your "DefeatedScamVillains" folder
  // Note: We do NOT include "/public" in the string, as the browser treats public as the root /
  const fileName = victoryImages[world.id];
  const imagePath = `/DefeatedScamVillains/${fileName}`;

  // Helper for background placeholder colors
  const placeholderColors: Record<string, string> = {
    emerald: "green.300",
    orange: "orange.300",
    red: "red.300",
    teal: "teal.300",
    purple: "purple.300",
  };

  return (
    <ModalWrapper title="World Cleared!" onClose={onClose}>
      {/* Header Banner */}
      <Box
        p={4}
        bg={`${colorScheme}.500`}
        color="white"
        fontWeight="extrabold"
        textAlign="center"
      >
        <HStack justify="center" spacing={2} pt={2}>
          <Icon as={Trophy} boxSize={6} />
          <Text fontSize="xl">WORLD CLEARED!</Text>
        </HStack>
      </Box>

      <VStack p={6} align="stretch" textAlign="center" spacing={6}>
        {/* Image Display */}
        <Box
          h="180px"
          bg={placeholderColors[colorScheme] || "gray.300"}
          rounded="xl"
          overflow="hidden"
          shadow="inner"
        >
          <Image
            src={imagePath}
            alt={`${world.name} Boss Defeated`}
            objectFit="cover"
            w="full"
            h="full"
            fallback={
              <Center h="full">
                <Text color="white" fontWeight="bold">
                  Victory in {world.name}!
                </Text>
              </Center>
            }
          />
        </Box>

        <VStack spacing={2}>
          <Heading size="lg" color={`${colorScheme}.600`}>
            You survived the {world.name}!
          </Heading>
          <Text fontSize="lg" fontWeight="medium" color="gray.700">
            Congratulations, <b>{PLAYER_NAME}</b>! You are one step closer to
            becoming a Scam Terminator.
          </Text>
        </VStack>

        <Button
          onClick={onClose}
          colorScheme={colorScheme}
          size="lg"
          fontWeight="bold"
          shadow="md"
          _active={{ transform: "scale(0.95)" }}
        >
          Continue to World Select
        </Button>
      </VStack>
    </ModalWrapper>
  );
};

export default WorldCompleteModal;
