import React from "react";
import {
  Flex,
  HStack,
  VStack,
  Icon,
  Text,
  Heading,
  Box,
  useTheme,
} from "@chakra-ui/react";
import { Heart, Shield } from "lucide-react";

interface HUDProps {
  lives: number;
  badges: number;
}

const HUD: React.FC<HUDProps> = ({ lives, badges }) => {
  return (
    <Flex
      bg="whiteAlpha.90"
      backdropFilter="blur(8px)"
      p={3}
      pb={4}
      borderBottomRadius="3xl"
      shadow="sm"
      borderColor="pink.100"
      borderBottomWidth="1px"
      justify="space-between"
      align="center"
      w="full"
    >
      <HStack
        bg="red.50"
        px={3}
        py={1.5}
        borderRadius="full"
        border="1px"
        borderColor="red.100"
      >
        <Icon as={Heart} boxSize={5} color="red.500" fill="red.500" />
        <Text fontWeight="black" color="red.600">
          {lives}
        </Text>
      </HStack>

      <VStack spacing={0} align="center">
        <Heading
          fontSize="2xl"
          fontWeight="extrabold"
          bgGradient="linear(to-r, #cd345aff, #4c90bdff)"
          bgClip="text"
        >
          SCAM SMASH
        </Heading>
      </VStack>

      <HStack
        bg="yellow.50"
        px={3}
        py={1.5}
        borderRadius="full"
        border="1px"
        borderColor="yellow.100"
      >
        <Icon as={Shield} boxSize={5} color="yellow.500" fill="yellow.500" />
        <Text fontWeight="black" color="yellow.600">
          {badges}
        </Text>
      </HStack>
    </Flex>
  );
};

export default HUD;
