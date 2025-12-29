import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  VStack,
  Container,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
// Assuming your assets are in the correct path
import yellowProudChameleon from "../assets/YellowScameleonProud.png";
import redAngryChameleon from "../assets/RedScameleonAngry.png";
import greenScaredChameleon from "../assets/GreenScameleonScared.png";
import blueSadChameleon from "../assets/BlueScameleonSad.png";

const chameleonMoods = [
  {
    expression: "Proud",
    backgroundColor: "yellowMode.bg",
    image: yellowProudChameleon,
    altText: "I am proud, safe and aware! ⭐",
  },
  {
    expression: "Angry",
    backgroundColor: "redMode.bg",
    image: redAngryChameleon,
    altText: "How could I lose all my money? 😡",
  },
  {
    expression: "Scared",
    backgroundColor: "greenMode.bg",
    image: greenScaredChameleon,
    altText: "Oh no! I got scammed! 😱",
  },
  {
    expression: "Sad",
    backgroundColor: "blueMode.bg",
    image: blueSadChameleon,
    altText: "I lost everything... 😞",
  },
];

export default function StartPage() {
  const [currentMoodIndex, setcurrentMoodIndex] = useState(0);

  const handleMood = () => {
    setcurrentMoodIndex(
      (previousIndex) => (previousIndex + 1) % chameleonMoods.length
    );
  };

  const currentChameleonMood = chameleonMoods[currentMoodIndex];

  return (
    <Box
      background={currentChameleonMood.backgroundColor}
      transition="background 0.5s ease"
      // Change: minH allows content to grow if screen is too short, preventing cutoff
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4} // Padding to ensure content doesn't touch screen edges on mobile
    >
      {/* Container keeps content centered and readable on ultra-wide screens */}
      <Container maxW="container.md" centerContent>
        {/* Responsive Spacing: tight on mobile (4), looser on desktop (8) */}
        <VStack spacing={{ base: 4, md: 8 }}>
          <Image
            src={currentChameleonMood.image}
            alt="Scameleon"
            // Responsive Size: Small on mobile, Medium on Tablet, Large on Desktop
            boxSize={{ base: "140px", md: "180px", lg: "220px" }}
            cursor="pointer"
            transition="transform 0.2s ease"
            _hover={{ transform: "scale(1.1)" }}
            onClick={handleMood}
          />

          <VStack spacing={0}>
            <Heading
              fontFamily="Bungee"
              // Responsive Font: 3xl on mobile, 5xl on desktop
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              color="black"
              textAlign="center"
            >
              Scameleon
            </Heading>

            <Text
              fontFamily="Raleway"
              textAlign="center"
              // Responsive Text Size
              fontSize={{ base: "sm", md: "lg" }}
              maxW="md"
            >
              Learn. Detect. Protect. Awareness is your best defence.
            </Text>
          </VStack>

          {/* Start Page Buttons */}
          <VStack spacing={4} mt={4} width="100%">
            <Button
              as={Link}
              to="/create-account"
              color="white"
              backgroundColor="black"
              // Responsive Width: Full width on mobile, fixed 200px on tablet+
              width={{ base: "100%", sm: "200px" }}
              height="45px"
              borderRadius="full"
              _hover={{ bg: "#ffd238", textColor: "black" }}
            >
              Create Account
            </Button>

            <Button
              as={Link}
              to="/sign-in"
              color="white"
              backgroundColor="black"
              width={{ base: "100%", sm: "200px" }}
              height="45px"
              borderRadius="full"
              _hover={{ bg: "#ffd238", textColor: "black" }}
            >
              Sign In
            </Button>

            <Button
              as={Link}
              to="/about"
              color="black"
              backgroundColor="#fffeec"
              width={{ base: "100%", sm: "200px" }}
              height="45px"
              borderRadius="full"
              _hover={{ bg: "#111d4a", textColor: "white" }}
            >
              About Scameleon
            </Button>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
