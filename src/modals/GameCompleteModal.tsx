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

// Adjust path as needed
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
      // FIX 1: Responsive Modal Size
      // 'xs' or 'sm' on mobile, 'xl' on desktop
      size={{ base: "sm", md: "xl" }}
      closeOnOverlayClick={false}
      // FIX 2: Ensure it doesn't overflow the viewport height on small phones
      scrollBehavior="inside"
    >
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent
        rounded="3xl"
        // FIX 3: Dynamic Padding
        p={{ base: 4, md: 6 }}
        textAlign="center"
        // FIX 4: Add margin on mobile so it doesn't touch screen edges
        mx={{ base: 4, md: 0 }}
      >
        <ModalBody>
          <VStack spacing={{ base: 4, md: 6 }}>
            {/* FIX 5: Responsive Font Sizes */}
            <Heading
              size={{ base: "xl", md: "2xl" }}
              color="pink.500"
              fontWeight="extrabold"
              lineHeight="shorter"
            >
              CONGRATULATIONS!
            </Heading>

            <Text
              fontSize={{ base: "md", md: "xl" }}
              fontWeight="bold"
              color="gray.600"
            >
              You defeated the ScamVillains!
            </Text>

            <Box
              w="full"
              // FIX 6: Responsive Image Height
              // 180px on mobile, 300px on desktop
              h={{ base: "180px", md: "300px" }}
              bg="gray.100"
              rounded="2xl"
              overflow="hidden"
              border="4px dashed"
              borderColor="pink.200"
            >
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

            <Text fontSize={{ base: "sm", md: "md" }} color="gray.500">
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
