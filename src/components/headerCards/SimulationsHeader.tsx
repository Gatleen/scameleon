import React from "react";
import { Box, Flex, Heading, Image, useColorModeValue } from "@chakra-ui/react";

interface SimulationsHeaderProps {
  title: string;
  imageSrc: string;
}

const SimulationsHeader: React.FC<SimulationsHeaderProps> = ({
  title,
  imageSrc,
}) => {
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const cardBg = useColorModeValue("white", "gray.800");
  const imageBg = useColorModeValue("gray.50", "gray.900"); // Background behind the image
  const titleColor = useColorModeValue("gray.900", "white");

  return (
    <Box
      w="full"
      bg={cardBg}
      rounded="2xl"
      shadow="sm"
      borderWidth="1px"
      borderColor={borderColor}
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ shadow: "md" }}
    >
      <Flex direction={{ base: "column", md: "row" }} align="center" h="full">
        {/* --- IMAGE SECTION (Left) --- */}
        {/* w={{ md: '250px' }} fixes the width so it doesn't get too wide */}
        {/* p={4} adds the "little bit of border" gap you asked for */}
        <Box p={4} w={{ base: "full", md: "300px" }} flexShrink={0}>
          <Flex
            bg={imageBg}
            rounded="xl"
            h={{ base: "200px", md: "180px" }} // Fixed height for consistency
            w="full"
            align="center"
            justify="center"
            overflow="hidden"
            borderWidth="1px"
            borderColor="gray.100"
          >
            <Image
              src={imageSrc}
              alt={title}
              // ✅ 'contain' prevents the head from being cut off
              objectFit="contain"
              w="full"
              h="full"
              p={2} // Adds a tiny bit of internal space so the mascot doesn't touch the edge
              fallbackSrc="https://placehold.co/600x400/e2e8f0/64748b?text=No+Image"
            />
          </Flex>
        </Box>

        {/* --- TEXT SECTION (Right) --- */}
        {/* p={6} adds the "border" (spacing) around the text */}
        <Flex
          flex={1}
          p={{ base: 6, md: 8 }}
          direction="column"
          justify="center"
          textAlign={{ base: "center", md: "left" }}
          borderLeftWidth={{ md: "1px" }} // Optional: adds a subtle divider line between image and text
          borderLeftColor="gray.100"
        >
          <Heading
            as="h2"
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="bold"
            color={titleColor}
            lineHeight="tight"
          >
            {title}
          </Heading>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SimulationsHeader;
