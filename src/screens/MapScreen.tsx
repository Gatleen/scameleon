import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Icon,
  Image,
  VStack,
  Center,
  Tag,
  useTheme,
} from "@chakra-ui/react";
import { ArrowLeft, Lock, Star } from "lucide-react";
import { WORLDS, LEVEL_TITLES, PASS_SCORE } from "../data/GameConfig";
import type { LevelScores, World } from "../types";

interface MapScreenProps {
  currentWorldId: number;
  unlocked: number[];
  scores: LevelScores;
  onPlay: (levelId: number) => void;
  onBack: () => void;
}

const MapScreen: React.FC<MapScreenProps> = ({
  currentWorldId,
  unlocked,
  scores,
  onPlay,
  onBack,
}) => {
  const currentWorld = WORLDS.find((w) => w.id === currentWorldId) as World;
  const colorScheme = currentWorld.theme;

  // Custom coloring based on theme
  const themeColor = `${colorScheme}.500`;
  const themeColorHover = `${colorScheme}.300`;

  return (
    <Box pb={24}>
      <Flex p={4} align="center" justify="space-between" bg="white" shadow="sm">
        <Button onClick={onBack} variant="ghost" p={2} size="sm">
          <Icon as={ArrowLeft} boxSize={5} color="gray.400" />
        </Button>
        <Heading size="md" color="gray.800">
          {currentWorld.name} Levels
        </Heading>
        <Box w={8} />
      </Flex>

      <Box position="relative" py={12} px={6} minH="300px">
        <Box position="absolute" inset={0} zIndex={0} opacity={0.8}>
          <Image
            src={currentWorld.bgImage}
            alt={`${currentWorld.name} Background`}
            objectFit="cover"
            w="full"
            h="full"
          />
        </Box>

        <VStack spacing={8} position="relative" zIndex={1} align="center">
          {/* FIX: Replaced custom bgAlpha with standard Chakra bg property (blackAlpha.500) */}
          <Box
            backdropFilter="blur(2px)"
            bg="blackAlpha.500"
            p={2}
            rounded="xl"
            shadow="sm"
          >
            <Text fontSize="sm" color="whiteAlpha.800">
              Select a level in the {currentWorld.name}.
            </Text>
          </Box>

          {currentWorld.levels.map((lvlId) => {
            const isUnlocked = unlocked.includes(lvlId);
            const score = scores[lvlId];
            const passed = score >= PASS_SCORE;

            return (
              <VStack key={lvlId} spacing={2} align="center">
                <Button
                  onClick={() => isUnlocked && onPlay(lvlId)}
                  isDisabled={!isUnlocked}
                  w={20}
                  h={20}
                  rounded="2xl"
                  shadow="2xl"
                  transition="all 0.2s"
                  _active={{ transform: "scale(0.95)" }}
                  borderBottom="4px"
                  position="relative"
                  bg={
                    isUnlocked ? (passed ? "green.500" : "white") : "gray.200"
                  }
                  color={
                    isUnlocked ? (passed ? "white" : themeColor) : "gray.400"
                  }
                  borderColor={
                    isUnlocked
                      ? passed
                        ? "green.700"
                        : "gray.200"
                      : "gray.300"
                  }
                  _hover={
                    isUnlocked && !passed
                      ? { borderColor: themeColorHover, shadow: "xl" }
                      : {}
                  }
                >
                  {!isUnlocked ? (
                    <Icon as={Lock} boxSize={6} />
                  ) : passed ? (
                    <Icon as={Star} boxSize={8} color="white" fill="white" />
                  ) : (
                    <Text fontSize="2xl" fontWeight="black">
                      {lvlId}
                    </Text>
                  )}

                  {/* Score Badge */}
                  {isUnlocked && score !== undefined && (
                    <Tag
                      position="absolute"
                      top={-2}
                      right={-2}
                      size="sm"
                      colorScheme={passed ? "yellow" : "gray"}
                      fontWeight="bold"
                      shadow="md"
                      borderRadius="full"
                    >
                      {score}
                    </Tag>
                  )}
                </Button>
                {/* FIX: Replaced custom bgAlpha with standard Chakra bg property (blackAlpha.500) */}
                <Box
                  bg="blackAlpha.500"
                  backdropFilter="blur(2px)"
                  px={3}
                  py={1}
                  rounded="lg"
                  shadow="sm"
                >
                  <Text
                    fontSize="2xs"
                    fontWeight="bold"
                    color="white"
                    textAlign="center"
                  >
                    {LEVEL_TITLES[lvlId]}
                  </Text>
                </Box>
              </VStack>
            );
          })}
        </VStack>
      </Box>
      <Center p={8}>
        <Text
          fontSize="xs"
          color="gray.300"
          textTransform="uppercase"
          fontWeight="bold"
          letterSpacing="widest"
        >
          End of World {currentWorld.id}
        </Text>
      </Center>
    </Box>
  );
};

export default MapScreen;
