import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Image as ChakraImage,
  SimpleGrid,
  chakra,
  Flex,
  Button,
  Icon,
} from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GatleenScameleon2 from "../assets/GatleenScameleon2.jpg";
// 1. Import your new "pop-out" image here
import ScameleonAbout from "../assets/PageCharacters/ScameleonAbout.png";

interface AboutScameleonProps {}

const AboutScameleon: React.FC<AboutScameleonProps> = () => {
  const navigate = useNavigate();

  // Placeholder card with hover overlay
  const SimpleImageCard = ({ src, alt }: { src: string; alt: string }) => (
    <Box
      position="relative"
      overflow="hidden"
      borderRadius="xl"
      boxShadow="lg"
      _hover={{ transform: "scale(1.02)" }}
      transition="0.3s ease"
      h={{ base: "200px", md: "240px" }}
      role="group"
    >
      <ChakraImage
        src={src}
        alt={alt}
        objectFit="cover"
        w="100%"
        h="100%"
        fallbackSrc="https://via.placeholder.com/400x300?text=Scameleon+Journey"
      />

      {/* Hover Overlay */}
      <Flex
        position="absolute"
        inset={0}
        bg="rgba(0,0,0,0.6)"
        opacity={{ base: 1, md: 0 }} // Visible by default on mobile, hover on desktop
        _groupHover={{ opacity: 1 }}
        color="white"
        direction="column"
        justify="center"
        align="center"
        px={4}
        textAlign="center"
        transition="0.3s ease"
      ></Flex>
    </Box>
  );

  return (
    <Box
      bg="#f9f1e8"
      minH="100vh"
      w="100%" // FIX: Ensures the box takes full width of parent
      m="0" // FIX: Resets margin to prevent outer spacing issues
      p="0"
      display="flex"
      flexDirection="column"
      // FIX: Removed overflowX="hidden" from here to prevent double scrollbars
    >
      {/* Header */}
      <Box
        bg="#bba661e9"
        h={{ base: "260px", md: "320px" }}
        position="relative"
        w="100%"
      >
        <Container maxW="4xl" pt={{ base: 6, md: 10 }} px={4}>
          <Flex justify="space-between" align="center">
            {/* Back Button */}
            <Button
              leftIcon={<Icon as={ArrowLeft} />}
              variant="solid"
              bg="whiteAlpha.300"
              color="white"
              _hover={{ bg: "whiteAlpha.500" }}
              onClick={() => navigate(-1)}
              size="sm"
            >
              Back
            </Button>
          </Flex>
          <Heading
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="extrabold"
            color="white"
            textShadow="0px 2px 4px rgba(0,0,0,0.15)"
            textAlign="center"
            mt={{ base: 6, md: 8 }}
          >
            About Scameleon
          </Heading>
        </Container>
      </Box>

      {/* Main Content Wrapper */}
      <Box flex="1" w="100%">
        <Container maxW="4xl" px={{ base: 4, md: 6 }} position="relative">
          {/* Profile Image */}
          <Flex
            justify="center"
            position="relative"
            zIndex={10}
            mt={{ base: "-80px", md: "-100px" }}
          >
            <Box
              w={{ base: "160px", md: "220px" }}
              h={{ base: "160px", md: "220px" }}
              borderRadius="full"
              overflow="hidden"
              bg="gray.300"
              border="6px solid white"
              boxShadow="xl"
            >
              <ChakraImage
                src={GatleenScameleon2}
                alt="Gatleen — Scameleon"
                objectFit="cover"
                w="100%"
                h="100%"
              />
            </Box>
          </Flex>

          {/* Main Content Text */}
          <Box
            bg="white"
            p={{ base: 6, md: 10 }}
            rounded="xl"
            shadow="xl"
            mt={8}
          >
            <Heading
              textAlign="center"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
              mb={6}
              color="slate.900"
            >
              ⭐ About Scameleon — The Journey
            </Heading>

            <Box
              fontSize={{ base: "md", md: "lg" }}
              color="gray.700"
              lineHeight="tall"
            >
              <Text mb={4}>
                Scameleon didn’t begin with code, deadlines, or requirements.
              </Text>

              <Text mb={4}>
                It began with a single weird question:
                <br />
                <chakra.span fontWeight="bold">
                  “What animal should be the mascot?”
                </chakra.span>
              </Text>

              <Text mb={4}>
                I explored every possibility — foxes, owls, wolves. The classic
                “wise” and “sneaky” animals. But none of them felt right. None
                of them felt <em>special</em>.
              </Text>

              <Text mb={4}>
                I wanted something unforgettable. Something symbolic. Something
                that truly captured the nature of scams.
              </Text>

              <Text mb={4}>
                Then one day, in a conversation with my sister, she said:
                <br />
                <chakra.span fontWeight="bold">
                  “What about a chameleon? Scammers change their identities
                  too.”
                </chakra.span>
              </Text>

              <Text mb={4}>
                That one sentence changed everything. It felt like a switch
                flipped in my mind — colour schemes, expressions, characters,
                entire worlds came to life instantly.
              </Text>

              <Text mb={4}>
                In that moment, Scameleon wasn’t just a mascot.
                <br />
                <chakra.span fontWeight="bold">
                  It became the soul of the entire project.
                </chakra.span>
              </Text>

              <Text mb={4}>
                From that point forward, this Final Year Project transformed
                into something deeply personal to me. I dedicated myself to
                every part of it — the design, the storytelling, the UI, the
                research, the simulations, the quizzes, the educational content.
              </Text>

              <Text mb={4}>
                I poured my late nights, my stress, my imagination, and my heart
                into building a world that could genuinely help people.
              </Text>

              <Text mb={4}>
                There were times I was overwhelmed. Times I doubted myself.
                Times I felt unstoppable.
              </Text>

              <Text mb={4}>
                All of these emotions became part of Scameleon’s creation.
              </Text>

              <Text mb={4}>
                I built this for the people who don’t deserve to be tricked. For
                the ones who need guidance, without judgment. For those who get
                targeted daily by scammers.
              </Text>

              <Text mb={4}>
                And for myself — to prove that I can create something
                meaningful, original, and impactful.
              </Text>

              <Text mb={4}>
                Scameleon grew far beyond the boundaries of a university
                project. Today, it stands as my passion project — a reflection
                of my creativity, my purpose, and my belief that education can
                be engaging, interactive, and kind.
              </Text>

              <Text mb={4}>
                While meant for middle-aged adults, my dream is for Scameleon to
                reach homes, families, and communities all over the world.
              </Text>

              <Text mb={4}>
                This isn’t just an app. It’s a piece of me. My heart stitched
                into a colourful, safe, empowering world.
              </Text>

              <Text mb={4}>
                I hope Scameleon teaches you, protects you, and brings you a
                smile along the way. 💛
              </Text>

              {/* Quote Box */}
              <Box
                borderLeft="4px solid"
                borderColor="yellow.400"
                pl={4}
                py={3}
                bg="yellow.50"
                mt={8}
                roundedRight="md"
              >
                <Text as="em" fontSize={{ base: "md", md: "lg" }}>
                  "A chameleon who teaches people about scams? Sign me up!"
                </Text>
                <Text
                  mt={2}
                  fontSize="sm"
                  fontWeight="semibold"
                  color="gray.600"
                >
                  — Gatleen, Founder (sometime in August 2025)
                </Text>
              </Box>
            </Box>
          </Box>

          {/* Image Grid */}
          <Box mt={12}>
            <Heading
              textAlign="center"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
              color="slate.900"
              mb={8}
            >
              Behind the Scenes
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              <SimpleImageCard src="src/assets/Gatleen1.jpeg" alt="Image1" />
              <SimpleImageCard src="src/assets/Gatleen2.jpeg" alt="Image2" />
              <SimpleImageCard src="src/assets/Gatleen3.jpeg" alt="Image3" />
            </SimpleGrid>
          </Box>
        </Container>
      </Box>

      {/* ========================================= */}
      {/* FOOTER SECTION                            */}
      {/* ========================================= */}

      {/* FIX: Wrapper ensures full width. 
          mt={56} gives the vertical spacing you wanted.
      */}
      <Box position="relative" mt={56} w="100%">
        {/* The Pop-Out Character */}
        <Box
          position="absolute"
          // "bottom: 100%" puts the bottom of the image exactly at the top line of the footer
          // Subtracting a few pixels (e.g. -2px) hides any tiny gaps
          bottom="-2px"
          // Center the image horizontally
          left="50%"
          transform="translateX(-50%)"
          // Ensure it sits on top of the footer background
          zIndex={2}
          // Constrain width so it doesn't take over on mobile
          w={{ base: "150px", md: "250px" }}
        >
          <ChakraImage
            src={ScameleonAbout}
            alt="Scameleon popping out"
            // Ensure this image is a PNG with transparent background
            fallbackSrc="https://via.placeholder.com/200x200?text=Character"
          />
        </Box>

        {/* The Footer Bar (Empty & Full Width) */}
        <Box
          bg="#bba661e9" // Same color as header
          h="80px" // FIX: Made slightly taller to look more "full"
          w="100%" // FIX: Explicitly full width
          position="relative"
          zIndex={1} // Lower z-index than the image so the image pops "over" it
        />
      </Box>
    </Box>
  );
};

export default AboutScameleon;
