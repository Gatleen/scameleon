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

// Adjust path as needed based on your file structure
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
      // FIX 1: Use 'xs' (Extra Small) for mobile to prevent width overflow
      size={{ base: "xs", sm: "sm", md: "xl" }}
      closeOnOverlayClick={false}
      scrollBehavior="inside"
    >
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent
        rounded="3xl"
        // FIX 2: Reduce padding on mobile to save space
        p={{ base: 3, md: 6 }}
        textAlign="center"
        mx={{ base: 4, md: 0 }}
        my="auto" // Vertically center better on small screens
      >
        <ModalBody>
          {/* FIX 3: Tighter spacing on mobile */}
          <VStack spacing={{ base: 3, md: 6 }}>
            {/* FIX 4: Smaller Heading on mobile to prevent wrapping/cutoff */}
            <Heading
              size={{ base: "lg", md: "2xl" }}
              color="pink.500"
              fontWeight="extrabold"
              lineHeight="shorter"
            >
              CONGRATULATIONS!
            </Heading>

            <Text
              fontSize={{ base: "sm", md: "xl" }}
              fontWeight="bold"
              color="gray.600"
            >
              You defeated the ScamVillains!
            </Text>

            <Box
              w="full"
              // FIX 5: Shorter container on mobile
              h={{ base: "150px", md: "300px" }}
              bg="gray.50"
              rounded="2xl"
              overflow="hidden"
              border="2px dashed"
              borderColor="pink.200"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Image
                src={victoryImage}
                alt="Victory Scene"
                w="full"
                h="full"
                // FIX 6: CRITICAL - Use 'contain' so the image is NEVER cut off
                objectFit="contain"
                fallback={
                  <Center h="full" flexDir="column" color="gray.400">
                    <Text fontSize="2xl">🏆</Text>
                    <Text fontSize="xs">Victory Image</Text>
                  </Center>
                }
              />
            </Box>

            <Text fontSize={{ base: "xs", md: "md" }} color="gray.500">
              You have mastered all the skills to stay safe online.
            </Text>
          </VStack>
        </ModalBody>

        <ModalFooter justifyContent="center" pt={0} pb={{ base: 4, md: 6 }}>
          <Button
            size={{ base: "md", md: "lg" }}
            colorScheme="pink"
            leftIcon={<LayoutDashboard size={18} />}
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
