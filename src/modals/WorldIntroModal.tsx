import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Center,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import ModalWrapper from "./ModalWrapper";
import type { World, VideoData } from "../types";

interface WorldIntroModalProps {
  world: World;
  videoData: VideoData;
  onClose: (worldId: number) => void;
}

const WorldIntroModal: React.FC<WorldIntroModalProps> = ({
  world,
  videoData,
  onClose,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videoData.url;
      videoRef.current.load();
    }
  }, [videoData.url]);

  const colorScheme = world.theme;

  return (
    <ModalWrapper
      title={`Entering ${world.name}`}
      onClose={() => onClose(world.id)}
    >
      <VStack p={6} align="stretch" textAlign="center" spacing={4}>
        <Heading size="lg" color={`${colorScheme}.600`}>
          {videoData.title}
        </Heading>

        <Box
          bg="gray.900"
          rounded="xl"
          overflow="hidden"
          position="relative"
          w="full"
          sx={{ aspectRatio: "16/9" }}
        >
          {!isLoaded && (
            <Center
              position="absolute"
              inset={0}
              bg="gray.800"
              color="white"
              fontWeight="bold"
            >
              <VStack>
                <Spinner color="pink.500" />
                <Text fontSize="sm">Loading Video Animation...</Text>
              </VStack>
            </Center>
          )}
          <Box
            as="video"
            ref={videoRef}
            src={videoData.url}
            //poster="https://placehold.co/400x225/334155/ffffff?text=Animation+Preview"
            autoPlay
            loop
            muted
            playsInline
            w="full"
            h="full"
            objectFit="cover"
            opacity={isLoaded ? 1 : 0}
            transition="opacity 0.5s"
            onCanPlay={() => setIsLoaded(true)}
            onError={() => setIsLoaded(true)}
          />
        </Box>

        <Text color="gray.600" fontSize="sm">
          {videoData.desc}
        </Text>

        <Button
          onClick={() => onClose(world.id)}
          colorScheme={colorScheme}
          size="lg"
          fontWeight="bold"
          shadow="lg"
          _active={{ transform: "scale(0.95)" }}
        >
          Proceed to Levels
        </Button>
      </VStack>
    </ModalWrapper>
  );
};

export default WorldIntroModal;
