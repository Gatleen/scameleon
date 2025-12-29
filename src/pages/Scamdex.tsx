import React, { useState, useMemo } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  Image,
  Stack,
  Badge,
  Button,
  HStack,
  VStack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Icon,
  Divider,
  List,
  ListItem,
  ListIcon,
  Flex,
} from "@chakra-ui/react";
import {
  FaFilter,
  FaExclamationTriangle,
  FaSkullCrossbones,
  FaInfoCircle,
} from "react-icons/fa";

// --- IMPORTS ---
import { scams } from "../data/scamdex";
import ScamdexHeader from "../components/headerCards/ScamdexHeader";
import NavBar from "../components/NavigationBar";
import Footer from "../components/Footer";

// 1. Define the Interface for TypeScript
export interface Scam {
  id: number;
  name: string;
  type: string;
  riskLevel: string;
  description: string;
  pixelIcon: string;
  redFlags: string[];
}

const Scamdex = () => {
  // --- STATE MANAGEMENT ---
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedScam, setSelectedScam] = useState<Scam | null>(null);

  // Modal controls
  const { isOpen, onOpen, onClose } = useDisclosure();

  // --- FILTERING LOGIC ---
  const filteredScams = useMemo(() => {
    return scams.filter((scam) => {
      if (!selectedCategory) return true;
      return scam.type.toLowerCase().includes(selectedCategory.toLowerCase());
    });
  }, [selectedCategory]);

  const handleOpenDetails = (scam: Scam) => {
    setSelectedScam(scam);
    onOpen();
  };

  const categories = ["Email", "SMS", "Investment", "Social Media", "Phone"];

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "critical":
        return "red";
      case "high":
        return "orange";
      case "medium":
        return "yellow";
      default:
        return "green";
    }
  };

  return (
    // Responsive Layout Wrapper
    <Flex
      direction="column"
      minH="100vh"
      bg="#f9f1e8"
      // FIX: Prevent horizontal scroll
      overflowX="hidden"
    >
      {/* --- NAVIGATION --- */}
      <Box mt={{ base: 2, md: 4 }}>
        <NavBar />
      </Box>

      {/* --- MAIN CONTENT SECTION --- */}
      {/* flex="1" ensures this section grows to fill space, pushing footer down */}
      <Box flex="1" pt={4} pb={12}>
        <Container
          maxW="container.xl"
          // FIX: Responsive Padding
          px={{ base: 4, md: 8 }}
        >
          {/* Header Component */}
          <Box mb={8}>
            <ScamdexHeader
              title="The Scamdex"
              imageSrc="src/assets/PageCharacters/ScameleonScamdex.png"
            />
          </Box>

          {/* Description */}
          <VStack spacing={2} mb={10} textAlign="center">
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="gray.700"
              maxW="2xl"
              lineHeight="relaxed"
            >
              Knowledge is power. Browse our database of common scams to learn
              how to spot them before they strike.
            </Text>
          </VStack>

          {/* Filters */}
          <Box mb={12}>
            <Text
              textAlign="center"
              mb={4}
              fontSize="sm"
              fontWeight="bold"
              color="gray.500"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              Filter by Type
            </Text>
            <HStack spacing={3} wrap="wrap" justify="center">
              <Tag
                size="lg"
                variant={selectedCategory === null ? "solid" : "outline"}
                colorScheme="orange"
                cursor="pointer"
                onClick={() => setSelectedCategory(null)}
                borderRadius="full"
                px={4}
                py={2}
                mb={2} // Add margin bottom for wrapping on mobile
              >
                <TagLeftIcon as={FaFilter} />
                <TagLabel>All Scams</TagLabel>
              </Tag>
              {categories.map((cat) => (
                <Tag
                  key={cat}
                  size="lg"
                  variant={selectedCategory === cat ? "solid" : "outline"}
                  colorScheme="orange"
                  cursor="pointer"
                  onClick={() =>
                    setSelectedCategory(selectedCategory === cat ? null : cat)
                  }
                  borderRadius="full"
                  px={4}
                  py={2}
                  mb={2} // Add margin bottom for wrapping on mobile
                  _hover={{ bg: "orange.100" }}
                >
                  <TagLabel>{cat}</TagLabel>
                </Tag>
              ))}
            </HStack>
          </Box>

          {/* Scam Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {filteredScams.map((scam) => (
              <Card
                key={scam.id}
                bg="white"
                boxShadow="md"
                borderRadius="xl"
                border="1px solid"
                borderColor="orange.100"
                _hover={{ transform: "translateY(-5px)", boxShadow: "xl" }}
                transition="all 0.2s"
              >
                <CardBody>
                  <Stack spacing={4}>
                    <HStack justify="space-between" align="start">
                      <Box
                        bg="orange.50"
                        p={2}
                        borderRadius="lg"
                        border="1px dashed"
                        borderColor="orange.300"
                      >
                        <Image
                          src={scam.pixelIcon}
                          fallbackSrc="https://via.placeholder.com/64?text=?"
                          alt={scam.name}
                          boxSize="48px"
                          objectFit="contain"
                          style={{ imageRendering: "pixelated" }}
                        />
                      </Box>
                      <Badge
                        colorScheme={getRiskColor(scam.riskLevel)}
                        fontSize="0.8em"
                        px={2}
                        py={1}
                        borderRadius="md"
                      >
                        {scam.riskLevel} Risk
                      </Badge>
                    </HStack>

                    <Box>
                      <Heading size="md" mb={2} color="#463027">
                        {scam.name}
                      </Heading>
                      <Text fontSize="sm" color="gray.600" noOfLines={3}>
                        {scam.description}
                      </Text>
                    </Box>

                    <Divider borderColor="gray.200" />

                    <Button
                      rightIcon={<FaInfoCircle />}
                      colorScheme="orange"
                      variant="ghost"
                      size="sm"
                      width="full"
                      onClick={() => handleOpenDetails(scam)}
                    >
                      Learn More
                    </Button>
                  </Stack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>

          {/* Empty State */}
          {filteredScams.length === 0 && (
            <VStack mt={10} spacing={4}>
              <Icon as={FaExclamationTriangle} boxSize={10} color="gray.400" />
              <Text color="gray.500" fontSize="lg">
                No scams found for this category.
              </Text>
            </VStack>
          )}
        </Container>
      </Box>

      {/* --- FOOTER --- */}
      <Box width="100%" mt="auto">
        <Footer />
      </Box>

      {/* --- MODAL --- */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        // FIX: Full screen on mobile, large on desktop
        size={{ base: "full", md: "lg" }}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay backdropFilter="blur(5px)" />
        {selectedScam && (
          <ModalContent
            borderTop={{ base: "none", md: "5px solid" }}
            borderColor={{ md: "orange.400" }}
            borderRadius={{ base: 0, md: "md" }}
          >
            <ModalHeader>
              <HStack spacing={3}>
                <Image
                  src={selectedScam.pixelIcon}
                  fallbackSrc="https://via.placeholder.com/40"
                  h="64px"
                  w="90px"
                  objectFit="contain"
                  style={{ imageRendering: "pixelated" }}
                />
                <Text color="#463027" fontSize={{ base: "xl", md: "2xl" }}>
                  {selectedScam.name}
                </Text>
              </HStack>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Stack spacing={4}>
                <Box bg="orange.50" p={4} borderRadius="md">
                  <Text fontWeight="bold" color="orange.800" mb={1}>
                    Description
                  </Text>
                  <Text color="gray.700">{selectedScam.description}</Text>
                </Box>

                <Box>
                  <HStack mb={2}>
                    <Icon as={FaSkullCrossbones} color="red.500" />
                    <Text fontWeight="bold" fontSize="lg">
                      Red Flags to Watch For:
                    </Text>
                  </HStack>
                  <List spacing={2}>
                    {selectedScam.redFlags.map((flag, index) => (
                      <ListItem key={index} display="flex" alignItems="center">
                        <ListIcon
                          as={FaExclamationTriangle}
                          color="orange.500"
                        />
                        <Text>{flag}</Text>
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Box pt={2}>
                  <Text fontSize="sm" fontStyle="italic" color="gray.500">
                    Type: {selectedScam.type} • Risk Level:{" "}
                    {selectedScam.riskLevel}
                  </Text>
                </Box>
              </Stack>
            </ModalBody>
            <ModalFooter bg="gray.50">
              <Button
                colorScheme="orange"
                width={{ base: "full", md: "auto" }}
                onClick={onClose}
              >
                Got it, thanks!
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </Flex>
  );
};

export default Scamdex;
