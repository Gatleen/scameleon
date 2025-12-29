import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  VStack,
  Heading,
  Grid,
  GridItem,
  HStack,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase/firebaseConfig";
import { getUserProfile } from "../firebase/auth";

import ScameleonHeader from "../components/ScameleonHeader";
import NavBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import PasswordGameCard from "../components/PasswordGame";
import SharableCard from "../components/SharableCard";
import CyberHygieneCard from "../components/CyberHygiene";
import DailyQuoteCard from "../components/DailyQuote";

const Dashboard: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const profile = await getUserProfile(user);
          setUsername(profile.username);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgGradient="linear(to-br, orange.50, yellow.50, orange.100)"
      >
        <VStack spacing={4}>
          <Spinner size="xl" color="orange.500" />
          <Text color="orange.800" fontWeight="medium">
            Loading your dashboard…
          </Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box
      bgGradient="linear(to-br, orange.50, yellow.50, orange.100)"
      minH="100vh"
      display="flex"
      flexDirection="column"
    >
      {/* 1. Main Content Container */}
      <Container
        maxW="container.xl"
        // Responsive Padding: 4 (16px) on mobile, 8 (32px) on desktop
        py={{ base: 4, md: 8 }}
        // Responsive Horizontal Padding: ensures cards don't touch phone edges
        px={{ base: 4, md: 8 }}
        flex="1"
      >
        <ScameleonHeader />

        {/* Navigation Bar */}
        <Box mt={{ base: 2, md: 4 }}>
          <NavBar />
        </Box>

        {/* Responsive Spacing between sections */}
        <VStack
          spacing={{ base: 4, md: 6 }}
          align="stretch"
          mt={{ base: 4, md: 6 }}
        >
          <DailyQuoteCard />

          <HStack justify="space-between" align="center" pt={2}>
            <VStack align="flex-start" spacing={0}>
              <Text
                // Responsive Font: slightly smaller on mobile for better fit
                fontSize={{ base: "md", md: "lg" }}
                color="orange.700"
                fontWeight="semibold"
              >
                Dashboard
              </Text>
              <Heading
                // Responsive Heading: 'md' on mobile, 'lg' on desktop
                size={{ base: "md", md: "lg" }}
                color="#eb7347"
              >
                Welcome back, {username}! 👋
              </Heading>
            </VStack>
          </HStack>

          <Grid
            // Layout: 1 column on mobile/tablet, 2 columns on large screens
            templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
            // Gap: smaller gap on mobile to save space
            gap={{ base: 4, md: 6 }}
            alignItems="start" // Important: prevents cards from stretching weirdly
          >
            <GridItem>
              <CyberHygieneCard />
            </GridItem>

            <GridItem>
              {/* Ensure inner stack fills the height for alignment */}
              <VStack spacing={{ base: 4, md: 6 }} align="stretch" h="full">
                <SharableCard />
                <PasswordGameCard />
              </VStack>
            </GridItem>
          </Grid>
        </VStack>
      </Container>

      {/* 2. Footer - Pushed to bottom via mt="auto" on parent Box */}
      <Box width="100%" mt="auto">
        <Footer />
      </Box>
    </Box>
  );
};

export default Dashboard;
