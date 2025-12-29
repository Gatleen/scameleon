import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  SimpleGrid,
  Container,
  Heading,
  Icon,
} from "@chakra-ui/react";
import {
  Heart,
  Inbox,
  AlertTriangle,
  ShoppingCart,
  Phone,
  ArrowLeft,
} from "lucide-react";

// --- Types ---
import type { ScenarioType } from "../types/simulationTypes";

// --- Components ---
import NavBar from "../components/NavigationBar";
import SimulationsHeader from "../components/headerCards/SimulationsHeader";
import Footer from "../components/Footer";
import { ChatSimulator } from "../components/simulations/ChatSimulator";
import { EmailClient } from "../components/simulations/EmailClient";
import { AdwareSimulator } from "../components/simulations/AdwareSimulator";
import { ShoppingSimulator } from "../components/simulations/ShoppingSimulator";
import { PhoneSimulator } from "../components/simulations/PhoneSimulator";

export default function Simulations() {
  const [scenario, setScenario] = useState<ScenarioType>("HOME");

  // Defined the gradient for reuse
  const backgroundColor = "#f9f1e8";

  const menuItems = [
    {
      id: "ROMANCE_SCAM",
      icon: Heart,
      title: "Romance Trap",
      desc: "Identify a romance scammer.",
      bg: "pink.100",
      text: "pink.600",
    },
    {
      id: "INBOX_BLITZ",
      icon: Inbox,
      title: "Inbox Blitz",
      desc: "Rapidly flag 10 emails.",
      bg: "blue.100",
      text: "indigo.600",
    },
    {
      id: "POPUP_ADS",
      icon: AlertTriangle,
      title: "Pop-Up Ads",
      desc: "Clear the adware infection.",
      bg: "orange.100",
      text: "orange.600",
    },
    {
      id: "SHOPPING_INVESTIGATOR",
      icon: ShoppingCart,
      title: "Shopping Investigator",
      desc: 'Spot fakes on "Shopeee".',
      bg: "red.100",
      text: "red.600",
    },
    {
      id: "BANK_FRAUD_CALL",
      icon: Phone,
      title: "Bank Fraud Call",
      desc: "Simulated voice scam call.",
      bg: "teal.100",
      text: "teal.600",
    },
  ];

  const renderScenario = () => {
    switch (scenario) {
      case "HOME":
        return (
          <Flex direction="column" minH="100%">
            {/* 1. Navigation Bar */}
            <Box mt={{ base: 2, md: 4 }}>
              <NavBar />
            </Box>

            {/* 2. Main Content */}
            <Container
              maxW="6xl"
              py={6}
              pb={20}
              // FIX: Responsive Padding
              px={{ base: 4, md: 8 }}
              flex="1"
            >
              {/* Header Component */}
              <Box mb={10}>
                <SimulationsHeader
                  title="Simulations"
                  imageSrc="src/assets/PageCharacters/ScameleonSimulation.png"
                />
              </Box>

              {/* Menu Grid */}
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {menuItems.map((item) => (
                  <Box
                    as="button"
                    key={item.id}
                    onClick={() => setScenario(item.id as ScenarioType)}
                    bg="white"
                    p={6}
                    rounded="xl"
                    shadow="sm"
                    _hover={{ shadow: "xl", transform: "translateY(-4px)" }}
                    transition="all 0.3s"
                    borderWidth="1px"
                    borderColor="orange.100"
                    textAlign="left"
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    h="full"
                    w="full" // Ensures button takes full width of grid cell
                  >
                    <Flex
                      p={3}
                      rounded="lg"
                      bg={item.bg}
                      color={item.text}
                      mb={4}
                    >
                      <Icon as={item.icon} boxSize={8} />
                    </Flex>
                    <Heading size="md" color="gray.800" mb={2}>
                      {item.title}
                    </Heading>
                    <Text fontSize="sm" color="gray.500">
                      {item.desc}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Container>

            {/* 3. Footer */}
            <Box width="100%" mt="auto">
              <Footer />
            </Box>
          </Flex>
        );
      case "ROMANCE_SCAM":
        return <ChatSimulator onComplete={() => setScenario("HOME")} />;
      case "INBOX_BLITZ":
        return <EmailClient onComplete={() => setScenario("HOME")} />;
      case "POPUP_ADS":
        return <AdwareSimulator onComplete={() => setScenario("HOME")} />;
      case "SHOPPING_INVESTIGATOR":
        return <ShoppingSimulator onComplete={() => setScenario("HOME")} />;
      case "BANK_FRAUD_CALL":
        return (
          <PhoneSimulator
            scriptId="BANK"
            onComplete={() => setScenario("HOME")}
          />
        );
      default:
        return <div>Unknown Scenario</div>;
    }
  };

  return (
    <Flex
      direction="column"
      h="100vh"
      bg={backgroundColor}
      // FIX: Prevent horizontal scroll
      overflowX="hidden"
      fontFamily="sans-serif"
    >
      {/* Navigation Sub-Bar (Visible only when NOT on Home) */}
      {scenario !== "HOME" && (
        <Flex
          p={4}
          bg="whiteAlpha.900"
          backdropFilter="blur(8px)"
          borderBottomWidth="1px"
          shadow="sm"
          position="sticky"
          top={0}
          zIndex={50}
          align="center"
        >
          <Button
            variant="ghost"
            color="orange.700"
            _hover={{ color: "orange.900", bg: "orange.50" }}
            fontSize="sm"
            fontWeight="medium"
            leftIcon={<Icon as={ArrowLeft} boxSize={4} />} // FIX: Use boxSize for lucide icons
            onClick={() => setScenario("HOME")}
          >
            Back to Academy
          </Button>
          <Text
            fontWeight="bold"
            color="orange.400"
            fontSize="sm"
            ml={4}
            textTransform="uppercase"
            letterSpacing="wider"
            borderLeftWidth="1px"
            pl={4}
            borderColor="orange.200"
            // Hide text on very small screens if needed
            display={{ base: "none", sm: "block" }}
          >
            {scenario.replace(/_/g, " ")}
          </Text>
        </Flex>
      )}

      {/* Main Content Area */}
      <Box flex={1} overflow="hidden" position="relative">
        <Box
          h="full"
          w="full"
          // Allows scrolling on HOME, but locks scrolling for games so they handle their own internal scrolling
          overflowY={scenario === "HOME" ? "auto" : "hidden"}
        >
          {renderScenario()}
        </Box>
      </Box>
    </Flex>
  );
}
