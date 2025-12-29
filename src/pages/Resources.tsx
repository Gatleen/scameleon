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

import NavigationBarItems from "../components/NavigationBar";
import Footer from "../components/Footer";
import ResourcesHeader from "../components/headerCards/ResourcesHeader";

// Import images
import ArticleImg from "../assets/PageCharacters/ScameleonArticle.png";
import VideoImg from "../assets/PageCharacters/ScameleonVideo.png";
import InfographicImg from "../assets/PageCharacters/ScameleonInfographic.png";
import HeaderImg from "../assets/PageCharacters/ScameleonResources.png";

interface ResourceItem {
  id: number;
  label: string;
  imageSrc: string;
  colour: string;
  description: string;
  path: string;
}

const Resources: React.FC = () => {
  const backgroundColor = "#f9f1e8";

  const resources: ResourceItem[] = [
    {
      id: 1,
      label: "Articles",
      imageSrc: ArticleImg,
      colour: "#fbde37",
      description: "Read the guides",
      path: "/articles",
    },
    {
      id: 2,
      label: "Videos",
      imageSrc: VideoImg,
      colour: "#fec428",
      description: "Watch and learn",
      path: "/videos",
    },
    {
      id: 3,
      label: "Infographics",
      imageSrc: InfographicImg,
      colour: "#f49f04",
      description: "Browse assets",
      path: "/infographics",
    },
  ];

  return (
    <Box
      minH="100vh"
      bg={backgroundColor}
      display="flex"
      flexDirection="column"
      // FIX: Prevents horizontal scrolling/cut-off if content is slightly too wide
      overflowX="hidden"
      w="100%"
    >
      <Box mt={{ base: 2, md: 4 }}>
        <NavigationBarItems />
      </Box>

      {/* Main Content Area */}
      <Box flex="1" pb={{ base: 8, md: 12 }}>
        <Container maxW="6xl" px={{ base: 4, md: 8 }}>
          <Box mb={{ base: 6, md: 12 }}>
            <ResourcesHeader title="Resources" imageSrc={HeaderImg} />
          </Box>
        </Container>

        <Container maxW="3xl" px={{ base: 4, md: 8 }}>
          <VStack spacing={{ base: 5, md: 6 }} w="full">
            {resources.map((resource) => (
              <Box
                as={ReactRouterLink}
                to={resource.path}
                key={resource.id}
                role="group"
                w="full"
                // FIX: 'auto' height on mobile ensures text never gets cut off if it wraps
                // Fixed height on Desktop (md) ensures uniform look
                h={{ base: "auto", md: "180px" }}
                bg="white"
                rounded="2xl"
                boxShadow="md"
                overflow="hidden"
                borderWidth="1px"
                borderColor="gray.100"
                transition="all 0.3s"
                _hover={{
                  boxShadow: "xl",
                  borderColor: "yellow.400",
                  transform: "translateY(-4px)",
                  textDecoration: "none",
                }}
              >
                <Flex
                  // FIX: Column on mobile (stack), Row on desktop (side-by-side)
                  direction={{ base: "column", md: "row" }}
                  h="full"
                  align="stretch"
                >
                  {/* Left Side (Image) */}
                  <Box
                    // Mobile: Full width, fixed 130px height (banner style)
                    // Desktop: 35% width, full height
                    w={{ base: "100%", md: "35%" }}
                    h={{ base: "130px", md: "100%" }}
                    bg={resource.colour}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box
                      transition="transform 0.3s"
                      _groupHover={{ transform: "scale(1.05)" }}
                    >
                      <Image
                        src={resource.imageSrc}
                        alt={resource.label}
                        // FIX: Smaller image on mobile so it doesn't overflow the banner
                        boxSize={{ base: "100px", md: "140px" }}
                        objectFit="contain"
                        filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.2))"
                      />
                    </Box>
                  </Box>

                  {/* Right Side (Text) */}
                  <Flex
                    w={{ base: "100%", md: "65%" }}
                    direction="column"
                    justify="center"
                    // FIX: Padding is responsive.
                    // On mobile, py={6} gives the text vertical breathing room
                    px={{ base: 5, md: 10 }}
                    py={{ base: 6, md: 0 }}
                    bg="white"
                  >
                    <Heading
                      size={{ base: "md", md: "lg" }}
                      color="gray.800"
                      _groupHover={{ color: "yellow.600" }}
                      // FIX: Ensures text wraps if title is long
                      wordBreak="break-word"
                    >
                      {resource.label}
                    </Heading>

                    <Text
                      color="gray.500"
                      fontWeight="medium"
                      mt={2}
                      fontSize={{ base: "sm", md: "md" }}
                    >
                      {resource.description} &rarr;
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            ))}
          </VStack>
        </Container>
      </Box>

      <Box width="100%" mt="auto">
        <Footer />
      </Box>
    </Box>
  );
};

export default Resources;
