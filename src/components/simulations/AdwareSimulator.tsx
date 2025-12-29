import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  VStack,
  Icon,
  SimpleGrid,
  Heading,
  IconButton,
  Badge,
  keyframes,
} from "@chakra-ui/react";
import {
  Download,
  AlertTriangle,
  X,
  Shield,
  Activity,
  Trash2,
  CheckCircle,
  Maximize2,
  Heart,
} from "lucide-react";
import { ASSETS } from "../../data/simulations/assets";
import { ADWARE_CONFIG } from "../../data/simulations/adwareData";
import { playAudio } from "../../utils/audioUtils";

// Animation Keyframes
const pulseKeyframe = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;
const spinKeyframe = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
const pingKeyframe = keyframes`
  75%, 100% { transform: scale(2); opacity: 0; }
`;

export const AdwareSimulator = ({ onComplete }: { onComplete: () => void }) => {
  const [stage, setStage] = useState<
    | "link"
    | "download"
    | "infected"
    | "antivirus_open"
    | "antivirus_scan"
    | "antivirus_clean"
    | "clean"
  >("link");
  const [popups, setPopups] = useState<any[]>([]);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);
  const [threats, setThreats] = useState(0);

  useEffect(() => {
    if (popups.length > 0) {
      playAudio(ASSETS.pop_sound);
    }
  }, [popups.length]);

  const triggerVirus = () => {
    setStage("infected");
    let count = 0;
    const interval = setInterval(() => {
      if (count > 12) {
        clearInterval(interval);
        return;
      }
      const id = Date.now() + Math.random();
      const x = Math.random() * 60 + 10;
      const y = Math.random() * 60 + 10;
      const type = Math.floor(Math.random() * 3);
      setPopups((prev) => [...prev, { id, x, y, type }]);
      setThreats((prev) => prev + 1);
      count++;
    }, 500);
  };

  const handleDownload = () => {
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setDownloadProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        triggerVirus();
      }
    }, 200);
  };

  const closePopup = (id: number) => {
    if (Math.random() > 0.7) {
      playAudio(ASSETS.pop_sound);
      const p = popups.find((pop) => pop.id === id);
      if (p) {
        setPopups((prev) => [
          ...prev,
          { ...p, id: Date.now(), x: p.x + 5, y: p.y + 5 },
        ]);
        setThreats((prev) => prev + 1);
      }
    } else {
      setPopups((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const startScan = () => {
    setStage("antivirus_scan");
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setScanProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setStage("antivirus_clean");
      }
    }, 100);
  };

  const cleanThreats = () => {
    setPopups([]);
    setStage("clean");
  };

  const TrophyIcon = () => <Text fontSize="4xl">🏆</Text>;

  if (stage === "link") {
    return (
      <Flex
        h="full"
        bg="white"
        p={8}
        direction="column"
        align="center"
        justify="center"
      >
        <Box
          maxW="md"
          w="full"
          borderWidth="1px"
          borderColor="gray.200"
          rounded="lg"
          shadow="lg"
          p={6}
          textAlign="center"
        >
          <Flex justify="center" mb={4}>
            <Icon as={Download} boxSize={12} color="blue.500" />
          </Flex>
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            Setup_Installer_v2.exe
          </Text>
          <Text color="gray.600" mb={6}>
            File size: 4.2 MB
          </Text>
          <Text fontSize="xs" color="gray.400" mb={2} fontStyle="italic">
            Source: www.free-soft-warez.net (Unverified)
          </Text>
          <Button
            colorScheme="blue"
            w="full"
            py={2}
            onClick={() => setStage("download")}
          >
            Download File
          </Button>
        </Box>
        <Text mt={8} color="gray.500">
          Goal: Simulate an infection and learn how to clean it.
        </Text>
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      h="full"
      bg="gray.800"
      position="relative"
      overflow="hidden"
      userSelect="none"
    >
      {/* Desktop */}
      <Box flex={1} position="relative" p={8}>
        {stage === "download" && (
          <Box
            maxW="md"
            mx="auto"
            bg="white"
            rounded="lg"
            shadow="xl"
            overflow="hidden"
            mt={20}
          >
            <Flex
              bg="gray.100"
              p={2}
              borderBottomWidth="1px"
              justify="space-between"
              align="center"
            >
              <Text fontSize="xs" color="gray.500">
                Installer
              </Text>
              <Flex gap={1}>
                <Box w={3} h={3} bg="red.400" rounded="full"></Box>
              </Flex>
            </Flex>
            <Box p={8} textAlign="center">
              <Text fontSize="xl" fontWeight="bold" mb={4}>
                Installing...
              </Text>
              <Box
                w="full"
                bg="gray.200"
                rounded="full"
                h={4}
                mb={4}
                overflow="hidden"
              >
                <Box
                  bg="green.500"
                  h="full"
                  transition="all 0.2s"
                  w={`${downloadProgress}%`}
                ></Box>
              </Box>
              {downloadProgress < 100 ? (
                <Button
                  colorScheme="green"
                  onClick={handleDownload}
                  w="full"
                  py={3}
                  leftIcon={<Icon as={Download} />}
                >
                  START INSTALL
                </Button>
              ) : (
                <Text color="red.500" fontWeight="bold">
                  Installation Complete...
                </Text>
              )}
            </Box>
          </Box>
        )}

        {popups.map((p) => {
          const config =
            ADWARE_CONFIG.popups[p.type] || ADWARE_CONFIG.popups[0];
          return (
            <Box
              key={p.id}
              position="absolute"
              top={`${p.y}%`}
              left={`${p.x}%`}
              w="64"
              bg="white"
              shadow="2xl"
              borderWidth="2px"
              borderColor="gray.400"
              rounded="md"
              zIndex={10}
            >
              <Flex
                h={6}
                px={2}
                justify="space-between"
                align="center"
                color="white"
                fontSize="xs"
                fontWeight="bold"
                bg={config.headerColor}
              >
                <Text>{config.headerTitle}</Text>
                <Icon
                  as={X}
                  cursor="pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    closePopup(p.id);
                  }}
                  size={12}
                />
              </Flex>
              <VStack p={4} align="center" gap={2} textAlign="center">
                {p.type === 0 && (
                  <>
                    <TrophyIcon />
                    <Text fontSize="sm" fontWeight="bold">
                      {config.contentTitle}
                    </Text>
                    <Button size="xs" colorScheme="blue" w="full">
                      {config.btnText}
                    </Button>
                  </>
                )}
                {p.type === 1 && (
                  <>
                    <Icon as={AlertTriangle} color="red.500" boxSize={8} />
                    <Text fontSize="sm" fontWeight="bold">
                      {config.contentTitle}
                    </Text>
                    <Button size="xs" colorScheme="red" w="full">
                      {config.btnText}
                    </Button>
                  </>
                )}
                {p.type === 2 && (
                  <>
                    <Icon as={Heart} color="pink.500" boxSize={8} />
                    <Text fontSize="sm" fontWeight="bold">
                      {config.contentTitle}
                    </Text>
                    <Button
                      size="xs"
                      variant="outline"
                      colorScheme="pink"
                      w="full"
                    >
                      {config.btnText}
                    </Button>
                  </>
                )}
              </VStack>
            </Box>
          );
        })}

        {/* Antivirus Modal */}
        {[
          "antivirus_open",
          "antivirus_scan",
          "antivirus_clean",
          "clean",
        ].includes(stage) && (
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            w="500px"
            bg="gray.900"
            rounded="xl"
            shadow="2xl"
            borderWidth="1px"
            borderColor="gray.700"
            color="white"
            zIndex={40}
            overflow="hidden"
          >
            <Flex
              bg="gray.800"
              p={4}
              justify="space-between"
              align="center"
              borderBottomWidth="1px"
              borderColor="gray.700"
            >
              <Flex align="center" gap={2} fontWeight="bold" fontSize="lg">
                <Icon as={Shield} size={20} color="green.400" />
                <Text>Scameleon Antivirus Pro</Text>
              </Flex>
              <IconButton
                aria-label="close"
                icon={<X size={20} />}
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (stage === "clean") onComplete();
                }}
                _hover={{ bg: "gray.700" }}
              />
            </Flex>

            <Box p={8}>
              {stage === "antivirus_open" && (
                <VStack spacing={6} textAlign="center">
                  <Text fontSize="6xl" mb={4}>
                    ⚠️
                  </Text>
                  <Heading size="md" color="red.500">
                    System at Risk!
                  </Heading>
                  <Text color="gray.400">
                    Multiple active threats detected on your desktop. Immediate
                    action required.
                  </Text>
                  <Button
                    size="lg"
                    colorScheme="blue"
                    shadow="lg"
                    animation={`${pulseKeyframe} 2s infinite`}
                    onClick={startScan}
                  >
                    Run Full Scan
                  </Button>
                </VStack>
              )}

              {stage === "antivirus_scan" && (
                <VStack spacing={6} textAlign="center">
                  <Icon
                    as={Activity}
                    boxSize={16}
                    color="blue.400"
                    animation={`${spinKeyframe} 1s linear infinite`}
                  />
                  <Heading size="sm">Scanning System Files...</Heading>
                  <Box
                    w="full"
                    bg="gray.800"
                    rounded="full"
                    h={4}
                    borderWidth="1px"
                    borderColor="gray.600"
                    overflow="hidden"
                  >
                    <Box
                      bg="blue.500"
                      h="full"
                      transition="all 0.1s"
                      w={`${scanProgress}%`}
                    ></Box>
                  </Box>
                  <Flex
                    justify="space-between"
                    w="full"
                    fontSize="sm"
                    color="gray.400"
                    px={2}
                  >
                    <Text>Files Scanned: {scanProgress * 142}</Text>
                    <Text color="red.400">Threats Found: {threats}</Text>
                  </Flex>
                </VStack>
              )}

              {stage === "antivirus_clean" && (
                <VStack spacing={6}>
                  <Box
                    bg="red.900"
                    opacity={0.3}
                    borderWidth="1px"
                    borderColor="red.500"
                    p={4}
                    rounded="md"
                    textAlign="center"
                    w="full"
                  >
                    <Heading size="sm" color="red.400" mb={2}>
                      {threats} Threats Identified
                    </Heading>
                    <Text fontSize="sm" color="gray.300">
                      Adware.Win32.PopUpGen found in memory.
                    </Text>
                  </Box>
                  <VStack w="full" spacing={2}>
                    {popups.slice(0, 3).map((_, i) => (
                      <Flex
                        key={i}
                        w="full"
                        justify="space-between"
                        align="center"
                        bg="gray.800"
                        p={2}
                        rounded="md"
                        fontSize="sm"
                      >
                        <Text color="red.300">Trojan.Adware.Generic</Text>
                        <Badge colorScheme="yellow">High Risk</Badge>
                      </Flex>
                    ))}
                    {popups.length > 3 && (
                      <Text fontSize="xs" color="gray.500" textAlign="center">
                        + {popups.length - 3} more...
                      </Text>
                    )}
                  </VStack>
                  <Button
                    colorScheme="red"
                    w="full"
                    py={6}
                    fontSize="lg"
                    leftIcon={<Trash2 size={20} />}
                    onClick={cleanThreats}
                  >
                    Quarantine & Delete All
                  </Button>
                </VStack>
              )}

              {stage === "clean" && (
                <VStack spacing={6} textAlign="center">
                  <Flex
                    w={20}
                    h={20}
                    bg="green.500"
                    opacity={0.8}
                    rounded="full"
                    align="center"
                    justify="center"
                    mx="auto"
                  >
                    <Icon as={CheckCircle} boxSize={12} color="green.900" />
                  </Flex>
                  <Heading size="md" color="white">
                    System Protected
                  </Heading>
                  <Text color="gray.400">
                    All threats have been successfully removed. Your computer is
                    safe.
                  </Text>
                  <Button colorScheme="green" w="full" onClick={onComplete}>
                    Close & Finish
                  </Button>
                </VStack>
              )}
            </Box>
          </Box>
        )}
      </Box>

      {/* Taskbar */}
      <Flex
        h={12}
        bg="gray.900"
        align="center"
        px={4}
        gap={4}
        borderTopWidth="1px"
        borderColor="gray.700"
      >
        <Flex
          w={8}
          h={8}
          bg="blue.500"
          rounded="md"
          align="center"
          justify="center"
          color="white"
        >
          <Icon as={Maximize2} size={16} />
        </Flex>
        <Box flex={1}></Box>
        <Box position="relative">
          <Flex
            onClick={() => {
              if (stage === "infected") setStage("antivirus_open");
            }}
            w={8}
            h={8}
            rounded="md"
            align="center"
            justify="center"
            transition="all 0.3s"
            bg={stage === "infected" ? "gray.700" : "gray.800"}
            cursor={stage === "infected" ? "pointer" : "default"}
            opacity={stage === "infected" ? 1 : 0.5}
            _hover={stage === "infected" ? { bg: "gray.600" } : {}}
          >
            <Icon
              as={Shield}
              size={20}
              color={stage === "clean" ? "green.400" : "white"}
            />
            {stage === "infected" && (
              <Box position="absolute" top={0} right={0}>
                <Box as="span" position="relative" display="flex" h={3} w={3}>
                  <Box
                    as="span"
                    animation={`${pingKeyframe} 1s cubic-bezier(0, 0, 0.2, 1) infinite`}
                    position="absolute"
                    display="inline-flex"
                    h="full"
                    w="full"
                    rounded="full"
                    bg="red.400"
                    opacity={0.75}
                  ></Box>
                  <Box
                    as="span"
                    position="relative"
                    display="inline-flex"
                    rounded="full"
                    h={3}
                    w={3}
                    bg="red.500"
                  ></Box>
                </Box>
              </Box>
            )}
          </Flex>
        </Box>
        <Text color="white" fontSize="xs" fontFamily="mono">
          14:02
        </Text>
      </Flex>
    </Flex>
  );
};
