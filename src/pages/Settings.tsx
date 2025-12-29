import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  VStack,
  Button,
  Text,
  Link,
  Image,
  Flex,
  useToast,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Import for redirection

// --- FIREBASE IMPORTS ---
import { signOut, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

import faqData from "../data/FAQ.json";
import SettingsHeader from "../components/headerCards/SettingsHeader";

// Navigation & Footer Imports
import NavigationBarItems from "../components/NavigationBar";
import Footer from "../components/Footer";

// Image Imports
import settingsHeaderImg from "../assets/PageCharacters/ScameleonSettings.png";
import supportMascotImg from "../assets/PageCharacters/ScameleonSupport.png";

const Settings = () => {
  const toast = useToast();
  const navigate = useNavigate();

  // Loading states for buttons
  const [resetLoading, setResetLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  // Brand gradient constant
  const backgroundColour = "#f9f1e8";

  // --- HANDLER: RESET PASSWORD ---
  const handleResetPassword = async () => {
    const user = auth.currentUser;

    if (user && user.email) {
      setResetLoading(true);
      try {
        await sendPasswordResetEmail(auth, user.email);
        toast({
          title: "Email Sent",
          description: `A password reset link has been sent to ${user.email}`,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } catch (error: any) {
        console.error("Error sending reset email: ", error);

        // Handle specific Firebase errors
        let errorMessage = "An error occurred. Please try again.";
        if (error.code === "auth/user-not-found") {
          errorMessage = "User not found.";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "Invalid email address.";
        }

        toast({
          title: "Error",
          description: errorMessage,
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      } finally {
        setResetLoading(false);
      }
    } else {
      toast({
        title: "Action Unavailable",
        description: "No email found for this user or user is not logged in.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // --- HANDLER: LOGOUT ---
  // --- HANDLER: LOGOUT ---
  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      // 1. CLEAR LOCAL STORAGE (Add this line!)
      // This wipes the "ghost data" so the next login is fresh.
      localStorage.clear(); // 2. Sign out of Firebase

      await signOut(auth);

      toast({
        title: "Logged Out",
        status: "success",
        duration: 2000,
        position: "top",
      }); // Redirect to Start Page

      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    // 1. MAIN CONTAINER
    <Flex direction="column" minH="100vh" bg={backgroundColour}>
      {/* 2. NAVIGATION BAR */}
      <NavigationBarItems />

      {/* 3. SETTINGS HEADER */}
      <Container maxW="container.xl" pt={2} pb={4}>
        <SettingsHeader title={"Settings"} imageSrc={settingsHeaderImg} />
      </Container>

      {/* 4. CONTENT AREA */}
      <Box flex="1" w="full">
        <Box maxW="800px" mx="auto" p={6} mt={2}>
          <VStack align="stretch" spacing={6}>
            {/* --- ACCOUNT SECTION --- */}
            <Box bg="whiteAlpha.700" p={6} rounded="2xl" shadow="sm">
              <Heading size="sm" mb={4} color="orange.800">
                Account
              </Heading>

              <Box>
                <Text fontSize="sm" color="gray.600" mb={3}>
                  Send a password reset link to your registered email address.
                </Text>
                <Button
                  colorScheme="orange"
                  onClick={handleResetPassword}
                  isLoading={resetLoading}
                  loadingText="Sending..."
                  rounded="xl"
                >
                  Reset Password
                </Button>
              </Box>
            </Box>

            {/* --- FAQ SECTION --- */}
            <Box bg="whiteAlpha.700" p={6} rounded="2xl" shadow="sm">
              <Heading size="sm" mb={4} color="orange.800">
                Frequently Asked Questions
              </Heading>
              <Accordion allowToggle>
                {faqData.map((item) => (
                  <AccordionItem key={item.id} border="none" mb={2}>
                    <AccordionButton
                      _expanded={{ bg: "orange.100" }}
                      bg="whiteAlpha.600"
                      rounded="lg"
                    >
                      <Box
                        flex="1"
                        textAlign="left"
                        fontWeight="medium"
                        color="gray.700"
                      >
                        {item.question}
                      </Box>
                      <AccordionIcon color="orange.500" />
                    </AccordionButton>
                    <AccordionPanel
                      pb={4}
                      bg="whiteAlpha.400"
                      mt={1}
                      rounded="md"
                    >
                      {item.answer && (
                        <Text mb={2} color="gray.600">
                          {item.answer}
                        </Text>
                      )}
                      {item.intro && (
                        <Text mb={2} color="gray.600">
                          {item.intro}
                        </Text>
                      )}
                      {item.bullets && (
                        <VStack align="start" ml={4} spacing={1} mb={2}>
                          {item.bullets.map((bullet, idx) => (
                            <Text key={idx} color="gray.600">
                              • {bullet}
                            </Text>
                          ))}
                        </VStack>
                      )}
                      {item.note && (
                        <Text
                          fontSize="xs"
                          color="orange.600"
                          fontStyle="italic"
                        >
                          {item.note}
                        </Text>
                      )}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </Box>

            {/* --- SUPPORT SECTION --- */}
            <Box>
              <Flex
                align="center"
                justify="flex-start"
                bg="whiteAlpha.800"
                p={6}
                rounded="2xl"
                shadow="sm"
                gap={6}
                border="1px solid"
                borderColor="orange.100"
              >
                <Image
                  src={supportMascotImg}
                  alt="Support Mascot"
                  boxSize="100px"
                  objectFit="contain"
                />

                <Box>
                  <Text
                    fontSize="md"
                    fontWeight="bold"
                    mb={1}
                    color="orange.800"
                  >
                    Have a question or found a bug?
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Email us at{" "}
                    <Link
                      href="mailto:scameleon.app@gmail.com"
                      color="orange.600"
                      fontWeight="bold"
                    >
                      scameleon.app@gmail.com
                    </Link>
                  </Text>
                </Box>
              </Flex>
            </Box>

            {/* --- LOGOUT SECTION --- */}
            <Box pt={4}>
              <Button
                w="full"
                bgColor="red.500"
                textColor="white"
                rounded="xl"
                size="lg"
                _hover={{ bgColor: "red.600", transform: "translateY(-2px)" }}
                _active={{ transform: "scale(0.98)" }}
                transition="all 0.2s"
                onClick={handleLogout}
                isLoading={logoutLoading}
                loadingText="Logging out..."
              >
                Log out
              </Button>
            </Box>
          </VStack>
        </Box>
      </Box>

      {/* 5. FOOTER */}
      <Footer />
    </Flex>
  );
};

export default Settings;
