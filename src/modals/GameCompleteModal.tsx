import React from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Image,
  Text,
  VStack,
  Heading,
  Center,
} from "@chakra-ui/react";
import { LayoutDashboard } from "lucide-react";

// 1. IMPORT THE IMAGE: This tells the build tool to process the file
// Adjust the "../" based on your file structure depth
import victoryImage from "../assets/QuizWorlds/AllDefeated.png";

interface GameCompleteModalProps {
  isOpen: boolean;
  onBackToDashboard: () => void;
}

const GameCompleteModal: React.FC<GameCompleteModalProps> = ({
  isOpen,
  onBackToDashboard,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onBackToDashboard}
      isCentered
      size="xl"
      closeOnOverlayClick={false}
    >
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent rounded="3xl" p={6} textAlign="center">
        <ModalBody>
          <VStack spacing={6}>
            <Heading size="2xl" color="pink.500" fontWeight="extrabold">
              CONGRATULATIONS!
            </Heading>

            <Text fontSize="xl" fontWeight="bold" color="gray.600">
              You defeated the ScamVillains!
            </Text>

            <Box
              w="full"
              h="300px"
              bg="gray.100"
              rounded="2xl"
              overflow="hidden"
              border="4px dashed"
              borderColor="pink.200"
            >
              {/* 2. USE THE VARIABLE: Pass the imported variable to src */}
              <Image
                src={victoryImage}
                alt="Victory Scene"
                w="full"
                h="full"
                objectFit="cover"
                fallback={
                  <Center h="full" flexDir="column" color="gray.400">
                    <Text fontSize="4xl">🏆</Text>
                    <Text>Victory Image Here</Text>
                  </Center>
                }
              />
            </Box>

            <Text fontSize="md" color="gray.500">
              You have mastered all the skills to stay safe online.
            </Text>
          </VStack>
        </ModalBody>

        <ModalFooter justifyContent="center" pb={4}>
          <Button
            size="lg"
            colorScheme="pink"
            leftIcon={<LayoutDashboard size={20} />}
            onClick={onBackToDashboard}
            w="full"
            maxW="sm"
            shadow="lg"
            _hover={{ transform: "translateY(-2px)", shadow: "xl" }}
          >
            Back to Dashboard
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GameCompleteModal;
