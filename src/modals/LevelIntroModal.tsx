import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Icon,
} from "@chakra-ui/react";
import ModalWrapper from "./ModalWrapper";
import { Zap, Star, Play } from "lucide-react";
import { LEVEL_TITLES, PLAYER_NAME } from "../data/GameConfig";

interface LevelIntroModalProps {
  levelId: number;
  onStart: () => void;
  onCancel: () => void;
  PASS_SCORE: number;
}

const LevelIntroModal: React.FC<LevelIntroModalProps> = ({
  levelId,
  onStart,
  onCancel,
  PASS_SCORE,
}) => {
  const levelName = LEVEL_TITLES[levelId];
  return (
    <ModalWrapper title="Mission Briefing" onClose={onCancel}>
      <VStack p={6} align="stretch" textAlign="center" spacing={4}>
        <Icon
          as={Zap}
          boxSize={12}
          color="yellow.500"
          mx="auto"
          fill="yellow.100"
        />
        <Heading size="lg" color="gray.800">
          Level {levelId}: {levelName}
        </Heading>
        <Text fontSize="lg" fontWeight="bold" color="pink.500">
          Can you beat the next challenge, {PLAYER_NAME}?
        </Text>

        <HStack
          bg="pink.50"
          border="1px"
          borderColor="pink.200"
          color="pink.700"
          p={3}
          rounded="lg"
          fontSize="sm"
          fontWeight="bold"
          justify="center"
        >
          <Icon as={Star} boxSize={4} fill="pink.300" />
          <Text>You must score {PASS_SCORE} points to pass!</Text>
        </HStack>

        <HStack spacing={3} mt={4}>
          <Button
            onClick={onCancel}
            flex="1"
            colorScheme="gray"
            variant="outline"
            size="lg"
          >
            Back to Map
          </Button>
          <Button
            onClick={onStart}
            flex="1"
            colorScheme="pink"
            size="lg"
            fontWeight="bold"
            shadow="lg"
            _active={{ transform: "scale(0.95)" }}
            leftIcon={<Icon as={Play} boxSize={5} />}
          >
            Start Level
          </Button>
        </HStack>
      </VStack>
    </ModalWrapper>
  );
};

export default LevelIntroModal;
