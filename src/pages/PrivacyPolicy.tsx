import { Box, Container, Heading, Text, VStack, Flex } from "@chakra-ui/react";
import React from "react";

import NavigationBarItems from "../components/NavigationBar";
import Footer from "../components/Footer";
import PrivacyPolicyHeader from "../components/headerCards/PrivacyPolicyHeader";

const PrivacyPolicy: React.FC = () => {
  return (
    <Flex
      direction="column"
      bg="#f9f1e8" // Brand background color
      minH="100vh"
      w="100%"
      overflowX="hidden" // Prevent accidental scrolling
    >
      {/* 1. Navigation Bar */}
      <Box mt={{ base: 2, md: 4 }}>
        <NavigationBarItems />
      </Box>

      {/* 2. Main Content Area */}
      <Box flex="1" pt={4} pb={12}>
        {/* Header Wrapped in Container to match other pages */}
        <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
          <Box mb={8}>
            <PrivacyPolicyHeader
              title="Privacy Policy"
              imageSrc="src/assets/PageCharacters/ScameleonPrivacyPolicy.png"
            />
          </Box>
        </Container>

        {/* Text Content */}
        <Container
          maxW="container.md"
          py={4}
          // FIX: Responsive padding for text
          px={{ base: 6, md: 8 }}
        >
          <VStack align="start" spacing={6}>
            <Heading size="lg" fontStyle={"italic"} color="orange.800">
              Hey there, scam-fighting superstar! 👋🏻
            </Heading>
            <Text>
              I care about your info almost as much as I care about keeping you
              safe online. Here’s the lowdown on what I collect and why.
            </Text>
            <Heading as="h2" size="md" color="orange.700" mt={4}>
              What I Collect
            </Heading>
            <Text lineHeight="tall">
              - <b>Account info</b>: your email, username, and any profile info
              you share.
              <br />- <b>Progress data</b>: your quiz scores, hearts, and Scales
              (so you can keep leveling up!).
              <br />- <b>Optional stuff</b>: feedback, messages, or any info you
              decide to give mes.
            </Text>

            <Heading as="h2" size="md" color="orange.700" mt={4}>
              Why I Collect It
            </Heading>
            <Text lineHeight="tall">
              - To make your Scameleon experience smoother than butter 🧈.
              <br />
              - To track your progress and celebrate your wins 🎉.
              <br />- To improve our app and squish bugs faster than a
              superhero.
            </Text>

            <Heading as="h2" size="md" color="orange.700" mt={4}>
              How I Keep It Safe
            </Heading>
            <Text lineHeight="tall">
              - I use super-secret encryption 🕵️‍♂️.
              <br />
              - Only I have access to what you share (and I promise I am a good
              person 😇).
              <br />- I never sell your info to shady third parties. Nope.
              Never.
            </Text>

            <Heading as="h2" size="md" color="orange.700" mt={4}>
              Your Rights
            </Heading>
            <Text lineHeight="tall">
              - Peek at your data whenever you want.
              <br />- Ask me to correct or delete it (I’ll wave my magic wand
              🪄).
            </Text>

            <Heading as="h2" size="md" color="orange.700" mt={4}>
              Questions? Concerns? Want to send me memes?
            </Heading>
            <Text lineHeight="tall">
              Reach out at: <b>scameleon.app@gmail.com</b>. Thanks for trusting
              me, hero! 🦎💛
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

export default PrivacyPolicy;
