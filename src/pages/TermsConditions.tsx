import { Box, Container, Heading, Text, VStack, Flex } from "@chakra-ui/react";
import React from "react";

import NavigationBarItems from "../components/NavigationBar";
import Footer from "../components/Footer";
import TermsConditionsHeader from "../components/headerCards/TermsConditionsHeader";

const TermsConditions: React.FC = () => {
  return (
    <Flex
      direction="column"
      bg="#f9f1e8"
      minH="100vh"
      w="100%"
      overflowX="hidden"
    >
      {/* 1. Navigation Bar */}
      <Box mt={{ base: 2, md: 4 }}>
        <NavigationBarItems />
      </Box>

      {/* 2. Main Content Area */}
      <Box flex="1" pt={4} pb={12}>
        {/* FIX: Wrapped Header in Container to prevent edge-touching */}
        <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
          <Box mb={8}>
            <TermsConditionsHeader
              title="Terms & Conditions"
              imageSrc="src/assets/PageCharacters/ScameleonTermsConditions.png"
            />
          </Box>
        </Container>

        {/* Text Content */}
        <Container
          maxW="container.md"
          // FIX: Reduced py slightly since we added margin to the header container above
          py={4}
          px={{ base: 6, md: 8 }}
        >
          <VStack align="start" spacing={6}>
            <Heading size="lg" fontStyle={"italic"} color="orange.800">
              Welcome to Scameleon!
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} lineHeight="tall">
              By using this application, you’re officially a member of the
              scam-fighting squad. Here’s what you need to know to stay on the
              right side of the law (and fun).
            </Text>

            <Heading as="h2" size="md" color="orange.700" mt={4}>
              Who Can Join
            </Heading>
            <Text lineHeight="tall">
              - You must be <b>old enough to use the internet responsibly</b> -
              preferably 40-50 years old! (I trust you 😉).
              <br />- You agree not to use Scameleon for evil purposes (villain
              behavior = instant ban ❌).
            </Text>

            <Heading as="h2" size="md" color="orange.700" mt={4}>
              Your Responsibilities
            </Heading>
            <Text lineHeight="tall">
              - Be honest with your account info.
              <br />
              - Don’t try to hack, cheat, or break the app (I have eyes
              everywhere 👀).
              <br />- Be nice! Treat fellow users with respect.
            </Text>

            <Heading as="h2" size="md" color="orange.700" mt={4}>
              My Responsibilities
            </Heading>
            <Text lineHeight="tall">
              - Provide a fun, safe, and educational environment.
              <br />
              - Protect your info like it’s a treasure chest.
              <br />- Keep improving Scameleon so you can keep winning at
              scam-dodging.
            </Text>

            <Heading as="h2" size="md" color="orange.700" mt={4}>
              Limits
            </Heading>
            <Text lineHeight="tall">
              - I do my best, but I can’t promise you’ll never meet a scammer in
              real life. Stay vigilant! 🧐
              <br />- I am not liable for things outside our app, but inside?
              I’ve got your back.
            </Text>

            <Heading as="h2" size="md" color="orange.700" mt={4}>
              Questions?
            </Heading>
            <Text lineHeight="tall">
              Need a lifeline? Email me at <b>scameleon.app@gmail.com</b>. Keep
              being awesome! 😎
            </Text>
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

export default TermsConditions;
