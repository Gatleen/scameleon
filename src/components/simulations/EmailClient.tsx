import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  VStack,
  Heading,
  Badge,
  Image,
  Icon,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import {
  Inbox,
  ChevronRight,
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { INBOX_EMAILS } from "../../data/simulations/emailData";
import type { EmailItem } from "../../types/simulationTypes";

export const EmailClient = ({ onComplete }: { onComplete: () => void }) => {
  const [decisions, setDecisions] = useState<Record<number, "legit" | "scam">>(
    {}
  );
  const [selectedEmailId, setSelectedEmailId] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<number | null>(null);

  const handleDecision = (id: number, type: "legit" | "scam") => {
    setDecisions((prev) => ({ ...prev, [id]: type }));
    setShowExplanation(id);
  };

  const getScore = () => {
    let s = 0;
    INBOX_EMAILS.forEach((e) => {
      if (
        (e.isScam && decisions[e.id] === "scam") ||
        (!e.isScam && decisions[e.id] === "legit")
      )
        s++;
    });
    return s;
  };

  const selectedEmail = INBOX_EMAILS.find((e) => e.id === selectedEmailId);
  const isComplete = Object.keys(decisions).length === INBOX_EMAILS.length;

  return (
    <Flex
      direction="column"
      h="full"
      bg="gray.100"
      maxW="4xl"
      mx="auto"
      rounded="xl"
      shadow="xl"
      overflow="hidden"
      position="relative"
    >
      <Flex
        bg="#ffa43a"
        color="white"
        p={4}
        justify="space-between"
        align="center"
        shadow="lg"
        zIndex={20}
      >
        <HStack>
          <Inbox size={20} />
          <Heading size="md">Inbox Blitz</Heading>
        </HStack>
      </Flex>

      <Flex flex={1} overflow="hidden" position="relative" bg="white">
        {/* LIST VIEW */}
        <Box
          position="absolute"
          inset={0}
          overflowY="auto"
          transition="transform 0.3s"
          transform={selectedEmailId ? "translateX(-100%)" : "translateX(0)"}
        >
          {isComplete && (
            <Box
              bg="blue.50"
              p={6}
              m={4}
              rounded="lg"
              textAlign="center"
              borderWidth="1px"
              borderColor="blue.200"
            >
              <Heading size="lg" color="blue.900" mb={2}>
                Inbox Cleared!
              </Heading>
              <Text fontSize="xl" mb={4}>
                You scored{" "}
                <Text as="span" fontWeight="bold">
                  {getScore()} / {INBOX_EMAILS.length}
                </Text>
              </Text>
              <Button colorScheme="blue" w="full" onClick={onComplete}>
                Return to Menu
              </Button>
            </Box>
          )}

          {INBOX_EMAILS.map((email) => {
            const status = decisions[email.id];
            return (
              <Flex
                key={email.id}
                onClick={() => setSelectedEmailId(email.id)}
                borderBottomWidth="1px"
                py={4}
                px={6}
                _hover={{ bg: "blue.50" }}
                cursor="pointer"
                gap={4}
                align="center"
              >
                <Flex
                  w={10}
                  h={10}
                  rounded="full"
                  align="center"
                  justify="center"
                  color="white"
                  fontWeight="bold"
                  bg={
                    email.profileImage
                      ? "transparent"
                      : email.isScam
                      ? "orange.400"
                      : "blue.400"
                  }
                >
                  <Image
                    src={email.profileImage}
                    alt={email.sender}
                    w="full"
                    h="full"
                    objectFit="cover"
                  />
                  {email.sender[0]}
                </Flex>
                <Box flex={1} minW={0}>
                  <Flex justify="space-between">
                    <Text
                      fontWeight="bold"
                      isTruncated
                      color={status ? "gray.500" : "black"}
                    >
                      {email.sender}
                    </Text>
                    {status && (
                      <Badge
                        variant="subtle"
                        colorScheme={
                          (email.isScam && status === "scam") ||
                          (!email.isScam && status === "legit")
                            ? "green"
                            : "red"
                        }
                      >
                        {status === "scam" && email.isScam
                          ? "Caught!"
                          : status === "legit" && !email.isScam
                          ? "Verified"
                          : "Missed"}
                      </Badge>
                    )}
                  </Flex>
                  <Text fontSize="sm" isTruncated color="gray.600">
                    {email.subject}
                  </Text>
                </Box>
                <Icon as={ChevronRight} size={16} color="gray.300" />
              </Flex>
            );
          })}
        </Box>

        {/* DETAIL VIEW */}
        <Flex
          direction="column"
          position="absolute"
          inset={0}
          bg="white"
          transition="transform 0.3s"
          transform={selectedEmailId ? "translateX(0)" : "translateX(100%)"}
        >
          {selectedEmail && (
            <>
              <Flex
                p={4}
                borderBottomWidth="1px"
                align="center"
                gap={4}
                bg="gray.50"
              >
                <IconButton
                  aria-label="back"
                  icon={<ArrowLeft />}
                  onClick={() => {
                    setSelectedEmailId(null);
                    setShowExplanation(null);
                  }}
                  variant="ghost"
                  isRound
                />
                <Box flex={1} minW={0}>
                  <Text fontWeight="bold" isTruncated>
                    {selectedEmail.subject}
                  </Text>
                  <Text fontSize="xs" color="gray.500" isTruncated>
                    {selectedEmail.senderEmail}
                  </Text>
                </Box>
              </Flex>

              <Box flex={1} p={6} overflowY="auto">
                {selectedEmail.body}

                {/* Explanation Result */}
                {decisions[selectedEmail.id] && (
                  <Box
                    mt={8}
                    p={4}
                    rounded="md"
                    borderWidth="1px"
                    bg={selectedEmail.isScam ? "red.50" : "green.50"}
                    borderColor={selectedEmail.isScam ? "red.200" : "green.200"}
                  >
                    <Flex align="center" gap={2} mb={2} fontWeight="bold">
                      {selectedEmail.isScam ? (
                        <Icon as={AlertTriangle} size={18} color="red.600" />
                      ) : (
                        <Icon as={CheckCircle} size={18} color="green.600" />
                      )}
                      <Text>Analysis</Text>
                    </Flex>
                    <Text fontSize="sm">{selectedEmail.explanation}</Text>
                  </Box>
                )}
              </Box>

              {/* Action Buttons */}
              {!decisions[selectedEmail.id] && (
                <Flex
                  p={4}
                  borderTopWidth="1px"
                  gap={4}
                  bg="white"
                  shadow="lg"
                  zIndex={10}
                >
                  <Button
                    flex={1}
                    py={8}
                    colorScheme="red"
                    fontSize="lg"
                    leftIcon={<Icon as={AlertTriangle} />}
                    onClick={() => handleDecision(selectedEmail.id, "scam")}
                  >
                    SCAM
                  </Button>
                  <Button
                    flex={1}
                    py={8}
                    colorScheme="green"
                    fontSize="lg"
                    leftIcon={<Icon as={CheckCircle} />}
                    onClick={() => handleDecision(selectedEmail.id, "legit")}
                  >
                    LEGIT
                  </Button>
                </Flex>
              )}
              {decisions[selectedEmail.id] && (
                <Box p={4} borderTopWidth="1px" bg="white">
                  <Button
                    w="full"
                    variant="outline"
                    onClick={() => {
                      setSelectedEmailId(null);
                      setShowExplanation(null);
                    }}
                  >
                    Back to Inbox
                  </Button>
                </Box>
              )}
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
