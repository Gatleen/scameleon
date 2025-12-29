import React from "react";
import {
  Box,
  Container,
  Text,
  SimpleGrid,
  Image,
  VStack,
  HStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useColorModeValue,
  Heading,
  Flex,
} from "@chakra-ui/react";

// Component Imports
import NavigationBarItems from "../components/NavigationBar";
import Footer from "../components/Footer";
import ScalesHeader from "../components/headerCards/ScalesHeader";

// Asset Imports
import ScaleIconImg from "../assets/ScalesIcon.png";
import TrophyRewardsImg from "../assets/ScameleonMerch.png";
import HeaderHeroImg from "../assets/PageCharacters/ScameleonScales.png";

// --- 1. The Plain Yellow Banner Component ---
const YellowBanner = () => {
  return (
    <Box
      bg="#dcb20dff" // Plain yellow
      color="white"
      // FIX: Responsive padding for banner
      p={{ base: 6, md: 10 }}
      borderRadius="3xl"
      mb={12}
      shadow="xl"
    >
      <VStack align="start" spacing={3}>
        <HStack spacing={4}>
          <Image
            src={ScaleIconImg}
            alt="Scales Icon"
            // FIX: Smaller icon on mobile
            boxSize={{ base: "48px", md: "60px" }}
            objectFit="contain"
          />
          <Heading as="h1" size={{ base: "lg", md: "xl" }} color="white">
            The Scales System
          </Heading>
        </HStack>
        <Text
          fontSize={{ base: "md", md: "lg" }}
          maxW="3xl"
          color="white"
          fontWeight="medium"
        >
          Scales refer to coin system used in Scameleon. Earn them by completing
          daily quizzes and use them to unlock exclusive merchandise!
        </Text>
      </VStack>
    </Box>
  );
};

// --- 2. Feature Card Component ---
const FeatureCard = ({
  imageSrc,
  title,
  description,
}: {
  imageSrc: string;
  title: string;
  description: string;
}) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("orange.100", "gray.700");

  return (
    <Box
      bg={cardBg}
      p={8}
      borderRadius="2xl"
      border="1px solid"
      borderColor={borderColor}
      shadow="sm"
      _hover={{ shadow: "md", transform: "translateY(-4px)" }}
      transition="all 0.2s"
      textAlign="center"
      h="100%" // Ensure consistent height in grid
    >
      <VStack spacing={4} h="100%" justify="center">
        <Image
          src={imageSrc}
          alt={title}
          boxSize="120px"
          objectFit="contain"
          mb={2}
        />
        <Heading as="h3" size="md" color="orange.800">
          {title}
        </Heading>
        <Text
          color={useColorModeValue("gray.600", "gray.400")}
          lineHeight="relaxed"
        >
          {description}
        </Text>
      </VStack>
    </Box>
  );
};

// --- 3. FAQ Section Component ---
const FAQSection = () => {
  const faqs = [
    {
      q: "Do Scales expire?",
      a: "No. Once you earn them, they are yours to keep forever until you choose to spend them in the Scameleon store.",
    },
    {
      q: "Can I transfer Scales to other users?",
      a: "Scales are bound to your account and cannot be transferred to ensure a fair competitive environment.",
    },
    {
      q: "How many Scales can I earn in a day?",
      a: "You can earn up to 8 Scales per day if you get the answer right in the daily quiz. Even if you get it wrong, don't worry, you will still get 3 Scales!",
    },
    {
      q: "Why are Scales called Scales?",
      a: "Scales resemble the chameleon's tail!",
    },
  ];

  return (
    <Box maxW="3xl" mx="auto" mt={12}>
      <Heading as="h2" size="lg" mb={8} textAlign="center" color="orange.900">
        Frequently Asked Questions
      </Heading>
      <Accordion allowToggle>
        {faqs.map((faq, i) => (
          <AccordionItem
            key={i}
            border="1px solid"
            borderColor={useColorModeValue("orange.200", "gray.700")}
            borderRadius="xl"
            mb={4}
            overflow="hidden"
            bg={useColorModeValue("white", "gray.800")}
          >
            <AccordionButton
              p={4}
              _hover={{ bg: useColorModeValue("orange.50", "gray.750") }}
            >
              <Box
                flex="1"
                textAlign="left"
                fontWeight="semibold"
                color="gray.800"
              >
                {faq.q}
              </Box>
              <AccordionIcon color="orange.500" />
            </AccordionButton>
            <AccordionPanel
              pb={4}
              color={useColorModeValue("gray.600", "gray.400")}
              borderTop="1px solid"
              borderTopColor={useColorModeValue("orange.50", "gray.700")}
            >
              {faq.a}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

// --- Main Page Component ---
export default function Scales() {
  const backgroundColor = "#f9f1e8";

  return (
    <Flex
      direction="column"
      minH="100vh"
      bg={backgroundColor}
      // FIX: Prevent horizontal scrolling
      overflowX="hidden"
    >
      {/* 1. Global Navigation */}
      <Box mt={{ base: 2, md: 4 }}>
        <NavigationBarItems />
      </Box>

      {/* 2. Main Content Area */}
      <Box flex="1" pt={4} pb={12}>
        <Container
          maxW="6xl"
          // FIX: Responsive Padding
          px={{ base: 4, md: 8 }}
        >
          {/* Section 1: Header Card */}
          <Box mb={8}>
            <ScalesHeader title="Scales" imageSrc={HeaderHeroImg} />
          </Box>

          {/* Section 2: Yellow Banner */}
          <YellowBanner />

          {/* Section 3: Feature Grid */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mb={12}>
            <FeatureCard
              imageSrc={ScaleIconImg}
              title="Native Currency"
              description="Scales are the official virtual currency of the Scameleon ecosystem, earned through engagement and mastery."
            />
            <FeatureCard
              imageSrc={TrophyRewardsImg}
              title="Earn Rewards"
              description="Complete daily quizzes and achieve high scores to grow your hoard and climb the global leaderboards."
            />
          </SimpleGrid>

          {/* Section 4: FAQs */}
          <FAQSection />
        </Container>
      </Box>

      {/* 3. Footer */}
      <Box width="100%" mt="auto">
        <Footer />
      </Box>
    </Flex>
  );
}
