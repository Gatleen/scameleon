import {
  Box,
  Divider,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Flex,
  Container,
} from "@chakra-ui/react";

import ReportCard from "../components/ReportCard";
import ReportHeader from "../components/headerCards/ReportHeader";
import WhatHappensModal from "../modals/WhatHappensModal";
import NavigationBarItems from "../components/NavigationBar";
import Footer from "../components/Footer";

import {
  nationalAuthorities,
  communicationsAuthorities,
  banks,
  consumerProtection,
} from "../data/reportLinks";

// --- HEADER IMAGE IMPORT ---
import reportImage from "../assets/PageCharacters/ScameleonReport.png";

export default function Report() {
  // Brand gradient constant
  const backgroundColor = "#f9f1e8";

  return (
    <Flex
      direction="column"
      bg={backgroundColor}
      minH="100vh"
      // FIX: Prevent horizontal scroll
      overflowX="hidden"
    >
      {/* 1. Navigation Bar */}
      <Box mt={{ base: 2, md: 4 }}>
        <NavigationBarItems />
      </Box>

      {/* 2. Main Content Area */}
      <Box flex="1">
        <Container
          maxW="7xl"
          // FIX: Responsive vertical and horizontal padding
          py={{ base: 6, md: 12 }}
          px={{ base: 4, md: 8 }}
        >
          {/* Header */}
          <Box mb={{ base: 6, md: 8 }}>
            <ReportHeader
              title="Report a Scam"
              imageSrc={reportImage} // Using variable
            />
          </Box>

          {/* Intro Section */}
          <VStack align="start" spacing={4} mt={6} mb={8}>
            <Text
              // FIX: Responsive font size
              fontSize={{ base: "md", md: "lg" }}
              color="orange.900"
              fontWeight="medium"
              lineHeight="relaxed"
            >
              If you believe you’ve been scammed, act quickly. Use the official
              resources below to report the incident and protect your accounts.
            </Text>
            <WhatHappensModal />
          </VStack>

          <Divider my={8} borderColor="orange.200" />

          {/* --- AUTHORITY SECTIONS --- */}

          {/* Section 1: National Authorities */}
          <Heading
            size={{ base: "sm", md: "md" }}
            mb={5}
            color="orange.800"
            textTransform="uppercase"
            letterSpacing="wide"
          >
            National Authorities
          </Heading>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={{ base: 4, md: 6 }}
          >
            {nationalAuthorities.map((item) => (
              <ReportCard key={item.name} data={item} />
            ))}
          </SimpleGrid>

          {/* Section 2: Telecoms */}
          <Heading
            size={{ base: "sm", md: "md" }}
            mt={10}
            mb={5}
            color="orange.800"
            textTransform="uppercase"
            letterSpacing="wide"
          >
            Telecommunications & Online
          </Heading>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={{ base: 4, md: 6 }}
          >
            {communicationsAuthorities.map((item) => (
              <ReportCard key={item.name} data={item} />
            ))}
          </SimpleGrid>

          {/* Section 3: Banks */}
          <Heading
            size={{ base: "sm", md: "md" }}
            mt={10}
            mb={5}
            color="orange.800"
            textTransform="uppercase"
            letterSpacing="wide"
          >
            Banks & Financial Institutions
          </Heading>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={{ base: 4, md: 6 }}
          >
            {banks.map((item) => (
              <ReportCard key={item.name} data={item} />
            ))}
          </SimpleGrid>

          {/* Section 4: Consumer Protection */}
          <Heading
            size={{ base: "sm", md: "md" }}
            mt={10}
            mb={5}
            color="orange.800"
            textTransform="uppercase"
            letterSpacing="wide"
          >
            Consumer Protection
          </Heading>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={{ base: 4, md: 6 }}
          >
            {consumerProtection.map((item) => (
              <ReportCard key={item.name} data={item} />
            ))}
          </SimpleGrid>

          {/* Disclaimer */}
          <Text
            mt={12}
            fontSize="xs"
            color="orange.700"
            opacity={0.8}
            textAlign="center"
            px={4}
          >
            Scameleon does not collect scam reports. This page provides guidance
            and links to official authorities only.
          </Text>
        </Container>
      </Box>

      {/* 3. Footer */}
      <Box width="100%" mt="auto">
        <Footer />
      </Box>
    </Flex>
  );
}
