import React from "react";
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
  Container,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

// Component Imports
import NavigationBarItems from "../components/NavigationBar";
import Footer from "../components/Footer";
import QuizPickerHeader from "../components/headerCards/QuizPickerHeader";

// Asset Imports
import DailyQuizImg from "../assets/PageCharacters/ScameleonQuizDaily.png";
import ScamSmashImg from "../assets/PageCharacters/ScameleonScamSmash.png";
import HeaderImg from "../assets/PageCharacters/ScameleonQuiz.png";

// Define the interface for our Quiz items
interface QuizItem {
  id: number;
  label: string;
  imageSrc: string;
  colour: string;
  description: string;
  path: string;
}

const QuizPicker: React.FC = () => {
  // Define the brand gradient background
  const backgroundColor = "#f9f1e8";

  const quizzes: QuizItem[] = [
    {
      id: 1,
      label: "Daily Quiz",
      imageSrc: DailyQuizImg,
      colour: "#c3e7f1",
      description: "Answer a question daily to get scales!",
      path: "/dailyquiz",
    },
    {
      id: 2,
      label: "Scam Smash",
      imageSrc: ScamSmashImg,
      colour: "#ffdbed",
      description: "Can you defeat the ScamVillains?",
      path: "/quiz",
    },
  ];

  return (
    <Flex
      minH="100vh"
      bg={backgroundColor}
      direction="column"
      // FIX: Prevent horizontal scrolling
      overflowX="hidden"
    >
      {/* 1. Navigation Bar */}
      <Box mt={{ base: 2, md: 4 }}>
        <NavigationBarItems />
      </Box>

      {/* Main Content Area */}
      <Box flex="1" pt={0} pb={12}>
        {/* --- Header Section --- */}
        <Container
          maxW="6xl"
          mt={0}
          // FIX: Responsive Padding
          px={{ base: 4, md: 8 }}
        >
          <Box mb={{ base: 6, md: 10 }}>
            <QuizPickerHeader title="Quizzes" imageSrc={HeaderImg} />
          </Box>
        </Container>

        {/* --- Cards Section --- */}
        <Container maxW="3xl" px={{ base: 4, md: 8 }}>
          <VStack spacing={{ base: 5, md: 6 }} w="full">
            {quizzes.map((quiz) => (
              <Box
                as={ReactRouterLink}
                to={quiz.path}
                key={quiz.id}
                role="group"
                w="full"
                // FIX: Height is Auto on mobile (to fit stacked content), Fixed on Tablet+
                h={{ base: "auto", sm: "160px" }}
                bg="white"
                rounded="2xl"
                boxShadow="md"
                overflow="hidden"
                borderWidth="1px"
                borderColor="gray.100"
                position="relative"
                textAlign="left"
                display="block"
                transition="all 0.3s"
                _hover={{
                  boxShadow: "xl",
                  borderColor: "orange.300",
                  transform: "translateY(-4px)",
                  textDecoration: "none",
                }}
              >
                <Flex
                  h="full"
                  // FIX: Column on mobile, Row on desktop
                  direction={{ base: "column", sm: "row" }}
                >
                  {/* Left Side: Color & Character */}
                  <Box
                    // FIX: Full width on mobile, 33% on desktop
                    w={{ base: "100%", sm: "33%" }}
                    h={{ base: "140px", sm: "full" }}
                    bg={quiz.colour}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                  >
                    <Box
                      zIndex={10}
                      transition="transform 0.3s"
                      _groupHover={{ transform: "scale(1.05)" }}
                    >
                      <Image
                        src={quiz.imageSrc}
                        alt={quiz.label}
                        // FIX: Responsive Image Sizing
                        boxSize={{
                          base: "110px", // Smaller on mobile
                          sm: quiz.label === "Daily Quiz" ? "150px" : "130px",
                        }}
                        objectFit="contain"
                        filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.2))"
                      />
                    </Box>
                  </Box>

                  {/* Right Side: Text Content */}
                  <Flex
                    w={{ base: "100%", sm: "67%" }}
                    h="full"
                    direction="column"
                    justify="center"
                    // FIX: Padding adjustments for mobile readability
                    px={{ base: 6, sm: 10 }}
                    py={{ base: 6, sm: 0 }}
                    bg="white"
                  >
                    <Heading
                      size={{ base: "md", sm: "lg" }}
                      color="gray.800"
                      transition="color 0.3s"
                      _groupHover={{ color: "orange.500" }}
                    >
                      {quiz.label}
                    </Heading>

                    <Text
                      color="gray.500"
                      fontWeight="medium"
                      mt={2}
                      fontSize={{ base: "sm", sm: "md" }}
                    >
                      {quiz.description} &rarr;
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            ))}
          </VStack>
        </Container>
      </Box>

      {/* 3. Footer */}
      <Box width="100%" mt="auto">
        <Footer />
      </Box>
    </Flex>
  );
};

export default QuizPicker;
