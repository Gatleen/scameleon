import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Image,
  VStack,
  Icon,
  Input,
  Heading,
} from "@chakra-ui/react";
import { ArrowLeft, Play } from "lucide-react";
import { ASSETS } from "../../data/simulations/assets";
import { ROMANCE_SCRIPT } from "../../data/simulations/romanceScript";
import { playAudio } from "../../utils/audioUtils";
import LongPressButton from "../LongPressButton";

export const ChatSimulator = ({ onComplete }: { onComplete: () => void }) => {
  const [messages, setMessages] = useState<any[]>([
    {
      id: 0,
      sender: "them",
      type: "text",
      content:
        "Hi, sorry to bother you. I think I might have the wrong number. I was trying to reach a support volunteer.",
    },
  ]);
  const [userName, setUserName] = useState<string>("");
  const [showNameInput, setShowNameInput] = useState(false);
  const [pendingChoice, setPendingChoice] = useState<any>(null);
  const [stepId, setStepId] = useState("start");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleChoice = (choice: any) => {
    const userText = choice.label.replace("[Name]", userName || "[Name]");
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "me", type: "text", content: userText },
    ]);
    playAudio(ASSETS.msg_sent);

    if (
      choice.next &&
      ROMANCE_SCRIPT[choice.next] &&
      ROMANCE_SCRIPT[choice.next].isEnd
    ) {
      setTimeout(() => setStepId(choice.next), 1000);
      return;
    }

    const nextStep = ROMANCE_SCRIPT[choice.next];
    if (nextStep) {
      setStepId(choice.next);
      triggerBotResponse(nextStep);
    }
  };

  const triggerBotResponse = (stepData: any) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      playAudio(ASSETS.msg_received);

      if (stepData.response) {
        const text =
          typeof stepData.response === "function"
            ? stepData.response(userName)
            : stepData.response;
        setMessages((prev) => [
          ...prev,
          { id: Date.now(), sender: "them", type: "text", content: text },
        ]);
      }

      if (stepData.media) {
        stepData.media.forEach((m: any, idx: number) => {
          setTimeout(() => {
            playAudio(ASSETS.msg_received);
            setMessages((prev) => [
              ...prev,
              {
                id: Date.now() + idx,
                sender: "them",
                type: m.type,
                content: m.content,
              },
            ]);
          }, 1500 * (idx + 1));
        });
      }

      if (stepData.timeJump) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now(),
              sender: "sys",
              type: "text",
              content: stepData.timeJump,
            },
          ]);
          if (stepData.nextAuto) {
            triggerBotResponse(ROMANCE_SCRIPT[stepData.nextAuto]);
            setStepId(stepData.nextAuto);
          }
        }, 2000);
      }
    }, 3500);
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim() && pendingChoice) {
      setShowNameInput(false);
      handleChoice(pendingChoice);
      setPendingChoice(null);
    }
  };

  const clickChoice = (choice: any) => {
    if (choice.needsName && !userName) {
      setPendingChoice(choice);
      setShowNameInput(true);
    } else {
      handleChoice(choice);
    }
  };

  const currentStepData = ROMANCE_SCRIPT[stepId];
  const isEnd = currentStepData?.isEnd;

  return (
    <Flex
      direction="column"
      h="full"
      bg="gray.100"
      maxW="md"
      mx="auto"
      borderX="1px"
      borderColor="gray.200"
      shadow="xl"
      position="relative"
    >
      {/* Header */}
      <Flex
        bg="#075e54"
        p={3}
        color="white"
        align="center"
        shadow="md"
        zIndex={10}
      >
        <Icon as={ArrowLeft} mr={2} cursor="pointer" onClick={onComplete} />
        <Box
          w={10}
          h={10}
          bg="gray.300"
          rounded="full"
          mr={3}
          overflow="hidden"
          borderWidth="2px"
          borderColor="white"
        >
          <Image
            src={ASSETS.romance_img}
            alt="Denny"
            w="full"
            h="full"
            objectFit="cover"
          />
        </Box>
        <Box>
          <Text fontWeight="bold" fontSize="sm">
            Denny Brooks (US Army)
          </Text>
          <Text fontSize="xs" color="green.100">
            Online
          </Text>
        </Box>
      </Flex>

      {/* Chat Area */}
      <VStack
        flex={1}
        p={4}
        overflowY="auto"
        spacing={4}
        bg="#e5ddd5"
        pb={20}
        align="stretch"
      >
        {messages.map((m, i) => (
          <Flex
            key={i}
            justify={
              m.sender === "me"
                ? "flex-end"
                : m.sender === "sys"
                ? "center"
                : "flex-start"
            }
          >
            {m.sender === "sys" && (
              <Box
                bg="#dcf8c6"
                color="gray.800"
                fontSize="xs"
                px={3}
                py={1}
                rounded="md"
                shadow="base"
                opacity={0.8}
                fontWeight="bold"
                my={4}
              >
                {m.content}
              </Box>
            )}

            {m.sender !== "sys" && (
              <Box
                maxW="80%"
                rounded="lg"
                shadow="sm"
                position="relative"
                overflow="hidden"
                fontSize="sm"
                bg={m.sender === "me" ? "#dcf8c6" : "white"}
                borderTopRightRadius={m.sender === "me" ? "none" : "lg"}
                borderTopLeftRadius={m.sender !== "me" ? "none" : "lg"}
              >
                {m.type === "text" && <Text p={3}>{m.content}</Text>}

                {m.type === "audio" && (
                  <Flex
                    p={3}
                    align="center"
                    gap={3}
                    minW="200px"
                    cursor="pointer"
                    onClick={() => playAudio(m.content)}
                  >
                    <Flex
                      w={8}
                      h={8}
                      bg="gray.200"
                      rounded="full"
                      align="center"
                      justify="center"
                      color="gray.500"
                      _hover={{ bg: "gray.300" }}
                    >
                      <Play size={16} fill="currentColor" />
                    </Flex>
                    <Box flex={1}>
                      <Box
                        h={1}
                        bg="gray.300"
                        rounded="full"
                        w="full"
                        mb={1}
                      ></Box>
                      <Text fontSize="xs" color="gray.500">
                        Voice Message
                      </Text>
                    </Box>
                  </Flex>
                )}

                {m.type === "image" && (
                  <Box p={1}>
                    <Flex
                      bg="gray.200"
                      w={48}
                      h={48}
                      rounded="md"
                      align="center"
                      justify="center"
                      color="gray.400"
                      gap={2}
                      overflow="hidden"
                    >
                      <Image
                        src={m.content}
                        alt="Attachment"
                        w="full"
                        h="full"
                        objectFit="cover"
                      />
                    </Flex>
                  </Box>
                )}

                <Text
                  fontSize="10px"
                  color="gray.500"
                  px={2}
                  pb={1}
                  textAlign="right"
                >
                  10:{15 + i} AM
                </Text>
              </Box>
            )}
          </Flex>
        ))}
        {isTyping && (
          <Flex justify="flex-start">
            <Box
              bg="white"
              p={3}
              rounded="lg"
              borderTopLeftRadius="none"
              shadow="sm"
              color="gray.500"
              fontSize="xs"
              fontStyle="italic"
            >
              Denny is typing...
            </Box>
          </Flex>
        )}
        <div ref={messagesEndRef} />
      </VStack>

      {/* Input / Choices Area */}
      <Box bg="#f0f0f0" borderTopWidth="1px" borderColor="gray.300">
        {isEnd ? (
          <Box
            p={6}
            textAlign="center"
            color="white"
            bg={currentStepData.result === "SCAMMED" ? "red.600" : "green.600"}
          >
            <Heading size="lg" mb={2}>
              {currentStepData.result}!
            </Heading>
            <Text mb={6}>{currentStepData.msg}</Text>
            <Button
              onClick={onComplete}
              variant="outline"
              color="white"
              _hover={{ bg: "white", color: "black" }}
              w="full"
            >
              Back to Menu
            </Button>
          </Box>
        ) : (
          <VStack p={2} spacing={2} align="stretch">
            {!isTyping &&
              currentStepData?.choices?.map((c: any, i: number) =>
                c.isLongPress ? (
                  <LongPressButton
                    key={i}
                    label={c.label}
                    onComplete={() => handleChoice(c)}
                  />
                ) : (
                  <Button
                    key={i}
                    onClick={() => clickChoice(c)}
                    w="full"
                    bg="white"
                    color="blue.600"
                    justifyContent="flex-start"
                    p={3}
                    rounded="md"
                    shadow="sm"
                    fontSize="sm"
                    fontWeight="medium"
                    _hover={{ bg: "gray.50" }}
                    height="auto"
                    whiteSpace="normal"
                    textAlign="left"
                  >
                    {c.label.replace("[Name]", userName || "[Name]")}
                  </Button>
                )
              )}
          </VStack>
        )}
      </Box>

      {/* Name Input Modal */}
      {showNameInput && (
        <Flex
          position="absolute"
          inset={0}
          bg="blackAlpha.600"
          align="center"
          justify="center"
          zIndex={50}
          p={4}
        >
          <Box bg="white" rounded="lg" p={6} w="full" maxW="xs" shadow="2xl">
            <Heading size="md" mb={2}>
              What is your name?
            </Heading>
            <Text
              fontSize="sm"
              color="gray.500"
              mb={4}
              fontStyle="italic"
              bg="blue.50"
              p={2}
              rounded="md"
              borderWidth="1px"
              borderColor="blue.100"
            >
              <Text as="span" fontWeight="bold" color="blue.600">
                Tip:
              </Text>{" "}
              This scenario simulates a scammer targeting women. For the best
              experience, try using a female name (e.g., Sarah).
            </Text>
            <form onSubmit={handleNameSubmit}>
              <Input
                autoFocus
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name..."
                mb={4}
              />
              <Flex justify="flex-end" gap={2}>
                <Button variant="ghost" onClick={() => setShowNameInput(false)}>
                  Cancel
                </Button>
                <Button type="submit" colorScheme="blue">
                  Continue
                </Button>
              </Flex>
            </form>
          </Box>
        </Flex>
      )}
    </Flex>
  );
};
