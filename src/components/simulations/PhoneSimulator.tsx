import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  Image,
  keyframes,
} from "@chakra-ui/react";
import { Signal, Wifi, Battery, CheckCircle, XCircle } from "lucide-react";
import { ASSETS } from "../../data/simulations/assets";
import { CALL_SCRIPTS } from "../../data/simulations/bankScripts";
import { playAudio } from "../../utils/audioUtils";

// Animation Keyframes
const pulseKeyframe = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const bounceKeyframe = keyframes`
  0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
  50% { transform: translateY(0); animation-timing-function: cubic-bezier(0,0,0.2,1); }
`;

export const PhoneSimulator = ({
  scriptId,
  onComplete,
}: {
  scriptId: string;
  onComplete: () => void;
}) => {
  const [nodeId, setNodeId] = useState("start");
  const [callStatus, setCallStatus] = useState<
    "ringing" | "connected" | "ended"
  >("ringing");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const script = CALL_SCRIPTS[scriptId];
  const currentNode = script[nodeId];

  // Timer logic
  useEffect(() => {
    let interval: any;
    if (callStatus === "connected") {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  // Ringing logic
  useEffect(() => {
    const ringAudio = playAudio(ASSETS.ringtone);
    ringAudio.loop = true;
    const t = setTimeout(() => {
      ringAudio.pause();
      setCallStatus("connected");
    }, 3000);
    return () => {
      ringAudio.pause();
      clearTimeout(t);
    };
  }, []);

  // Play voice audio when node changes
  useEffect(() => {
    if (callStatus === "connected" && currentNode.audio) {
      if (audioRef.current) audioRef.current.pause();
      audioRef.current = playAudio(currentNode.audio);
    }
  }, [callStatus, currentNode]);

  const handleOption = (nextId: string, msg: string) => {
    setFeedback(msg || null);
    setNodeId(nextId);
    if (nextId.includes("end")) {
      setCallStatus("ended");
      if (audioRef.current) audioRef.current.pause();
    }
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const secs = (s % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <Box w="full" h="full" bg="gray.900" overflowY="auto" py={10} px={4}>
      <Flex
        direction="column"
        h="750px"
        minH="750px"
        bg="black"
        color="white"
        p={4}
        position="relative"
        overflow="hidden"
        rounded="3xl"
        borderWidth="8px"
        borderColor="gray.700"
        shadow="2xl"
        maxW="sm"
        mx="auto"
        fontFamily="sans-serif"
      >
        {/* Phone Header */}
        <Flex
          position="absolute"
          top={0}
          left={0}
          w="full"
          h={8}
          bg="black"
          justify="space-between"
          align="center"
          px={6}
          pt={2}
          fontSize="xs"
          zIndex={10}
        >
          <Text>00:00</Text>
          <HStack spacing={1}>
            <Signal size={12} />
            <Wifi size={12} />
            <Battery size={12} />
          </HStack>
        </Flex>

        <Flex
          mt={12}
          flex={1}
          direction="column"
          align="center"
          textAlign="center"
          w="full"
          overflowY="auto"
        >
          {callStatus === "ringing" && (
            <VStack mt={20} animation={`${pulseKeyframe} 2s infinite`}>
              <Box
                w={24}
                h={24}
                bg="yellow.400"
                rounded="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb={6}
                overflow="hidden"
                borderWidth="4px"
                borderColor="white"
              >
                <Image
                  src={ASSETS.maybank_logo}
                  alt="Maybank"
                  w="full"
                  h="full"
                  objectFit="cover"
                />
              </Box>
              <Box>
                <Heading size="lg" mb={2}>
                  Maybank Security
                </Heading>
                <Text color="gray.400">Incoming Call...</Text>
              </Box>
            </VStack>
          )}

          {callStatus === "connected" && (
            <Flex direction="column" w="full" h="full">
              <Flex flex={1} direction="column" align="center" pt={4}>
                <Box
                  w={24}
                  h={24}
                  bg="yellow.400"
                  rounded="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mb={4}
                  overflow="hidden"
                  borderWidth="4px"
                  borderColor="white"
                >
                  <Image
                    src={ASSETS.maybank_logo}
                    alt="Maybank"
                    w="full"
                    h="full"
                    objectFit="cover"
                  />
                </Box>
                <Box mb={4}>
                  <Heading size="md">{currentNode.speaker}</Heading>
                  <Text color="gray.400" fontSize="sm">
                    {formatTime(timer)}
                  </Text>
                </Box>

                <HStack
                  h={12}
                  align="center"
                  justify="center"
                  spacing={1}
                  mb={8}
                >
                  {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <Box
                      key={i}
                      w="1"
                      bg="yellow.400"
                      rounded="full"
                      animation={`${bounceKeyframe} 1s infinite`}
                      style={{
                        height: `${Math.random() * 30 + 10}px`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    ></Box>
                  ))}
                </HStack>

                <Box
                  bg="whiteAlpha.100"
                  p={4}
                  rounded="lg"
                  w="full"
                  mb={6}
                  fontSize="sm"
                  borderWidth="1px"
                  borderColor="gray.800"
                  textAlign="left"
                >
                  <Text
                    fontSize="xs"
                    color="yellow.500"
                    fontWeight="bold"
                    mb={1}
                  >
                    TRANSCRIPT
                  </Text>
                  <Text>"{currentNode.text}"</Text>
                </Box>
              </Flex>

              <VStack spacing={3} pb={4} w="full">
                {currentNode.options.map((opt, idx) => (
                  <Button
                    key={idx}
                    onClick={() => handleOption(opt.nextId, opt.feedback || "")}
                    w="full"
                    h="auto"
                    py={4}
                    bg="gray.800"
                    _hover={{ bg: "gray.700" }}
                    _active={{ bg: "gray.600" }}
                    rounded="2xl"
                    justifyContent="flex-start"
                    fontWeight="medium"
                    fontSize="sm"
                    borderWidth="1px"
                    borderColor="gray.700"
                    whiteSpace="normal"
                    textAlign="left"
                    textColor={"white"}
                  >
                    {opt.label}
                  </Button>
                ))}
              </VStack>
            </Flex>
          )}

          {callStatus === "ended" && (
            <VStack mt={20} spacing={6}>
              <Flex
                w={24}
                h={24}
                rounded="full"
                align="center"
                justify="center"
                borderWidth="4px"
                bg={nodeId === "end_safe" ? "green.500" : "red.500"}
                borderColor={nodeId === "end_safe" ? "green.300" : "red.300"}
              >
                {nodeId === "end_safe" ? (
                  <CheckCircle size={48} />
                ) : (
                  <XCircle size={48} />
                )}
              </Flex>
              <Box>
                <Heading size="lg" mb={2}>
                  {nodeId === "end_safe" ? "Safe!" : "Scammed!"}
                </Heading>
                <Text color="gray.300" px={4} fontSize="sm">
                  {feedback}
                </Text>
              </Box>
              <Button
                onClick={onComplete}
                variant="outline"
                color="white"
                _hover={{ bg: "white", color: "black" }}
                w="full"
                mt={4}
              >
                Return to Menu
              </Button>
            </VStack>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};
