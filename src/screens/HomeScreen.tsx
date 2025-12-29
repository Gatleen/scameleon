import React from "react";
import {
  Box,
  Flex,
  VStack,
  Heading,
  Text,
  Button,
  Icon,
  Image,
  Tag,
  Center,
} from "@chakra-ui/react";
import { Lock } from "lucide-react";
import { WORLDS, PASS_SCORE } from "../data/GameConfig";
import type { LevelScores, View, World } from "../types";

interface HomeScreenProps {
  setView: React.Dispatch<React.SetStateAction<View>>;
  unlockedLevels: number[];
  levelScores: LevelScores;
  handleWorldCardClick: (worldId: number) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  unlockedLevels,
  levelScores,
  handleWorldCardClick,
}) => {
  const isLevelPassed = (lvl: number) => levelScores[lvl] >= PASS_SCORE;

  return (
    <Box p={4} bg="gray.50" minH="full">
      <Center mb={8}>
        <VStack spacing={1}>
          <Heading size="xl" color="gray.800">
            Choose Your World
          </Heading>
          <Text color="gray.500" fontSize="sm">
            Select a world to start your defense training.
          </Text>
        </VStack>
      </Center>

      <VStack spacing={6}>
        {WORLDS.map((world: World) => {
          const isUnlocked = world.levels.some((lvl) =>
            unlockedLevels.includes(lvl)
          );
          const isFullyCompleted = world.levels.every(isLevelPassed);

          let isPlayable = world.id === 1;
          if (world.id > 1) {
            const prevWorld = WORLDS[world.id - 2];
            isPlayable = prevWorld.levels.every(isLevelPassed);
          }
          if (isUnlocked) isPlayable = true;

          const colorScheme = world.theme;
          const isDisabled = !isPlayable;

          return (
            <Box
              key={world.id}
              bg="white"
              rounded="xl"
              overflow="hidden"
              shadow="xl"
              border="2px"
              borderColor={isDisabled ? "gray.200" : `${colorScheme}.300`}
              cursor={isDisabled ? "not-allowed" : "pointer"}
              opacity={isDisabled ? 0.6 : 1}
              transition="all 0.2s"
              _hover={
                !isDisabled
                  ? { borderColor: `${colorScheme}.500`, shadow: "2xl" }
                  : {}
              }
              onClick={() => isPlayable && handleWorldCardClick(world.id)} // World Card Click
              w="full"
            >
              <Box h="120px" position="relative" overflow="hidden">
                <Image
                  src={world.bgImage}
                  alt={world.name}
                  objectFit="cover"
                  w="full"
                  h="full"
                  transition="opacity 0.3s"
                  _groupHover={!isDisabled ? { opacity: 0.8 } : {}}
                />
                <Flex
                  direction="column"
                  justify="flex-end"
                  p={4}
                  position="absolute"
                  inset={0}
                  bgGradient="linear(to-t, blackAlpha.600, transparent)"
                >
                  <Icon
                    as={world.icon}
                    boxSize={8}
                    color="white"
                    textShadow="0 1px 2px rgba(0,0,0,0.5)"
                  />
                  <Heading
                    size="md"
                    color="white"
                    textShadow="0 1px 2px rgba(0,0,0,0.5)"
                  >
                    {world.name}
                  </Heading>
                </Flex>
              </Box>
              <Flex p={3} justify="space-between" align="center">
                <Text fontSize="xs" color="gray.600" maxW="70%">
                  {world.desc}
                </Text>
                <Button
                  isDisabled={isDisabled}
                  size="sm"
                  colorScheme={isFullyCompleted ? "green" : "pink"}
                  shadow="md"
                  onClick={(e) => {
                    e.stopPropagation();
                    isPlayable && handleWorldCardClick(world.id);
                  }} // Button Click
                  _active={{ transform: "scale(0.95)" }}
                >
                  {isFullyCompleted ? (
                    "COMPLETED"
                  ) : isDisabled ? (
                    <Icon as={Lock} boxSize={3} />
                  ) : (
                    `WORLD ${world.id}`
                  )}
                </Button>
              </Flex>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
};

export default HomeScreen;
