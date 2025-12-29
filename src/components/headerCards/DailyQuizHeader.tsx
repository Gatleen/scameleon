import React from "react";
import { Box, Flex, Heading, Image, useColorModeValue } from "@chakra-ui/react";

interface DailyQuizHeaderProps {
  title: string;
  imageSrc: string;
}

const DailyQuizHeader: React.FC<DailyQuizHeaderProps> = ({
  title,
  imageSrc,
}) => {
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const cardBg = useColorModeValue("white", "gray.800");
  const imageBg = useColorModeValue("gray.50", "gray.900");
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
        {/* --- IMAGE SECTION --- */}
        <Box
          p={4} // The "border" gap around the image
          w={{ base: "full", md: "300px" }}
          flexShrink={0}
        >
          <Flex
            bg={imageBg}
            rounded="xl"
            h={{ base: "200px", md: "180px" }}
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
              objectFit="contain" // Keeps the whole image visible
              w="full"
              h="full"
              p={2} // Inner padding so image doesn't touch the box edges
            />
          </Flex>
        </Box>

        {/* --- TEXT SECTION --- */}
        <Flex
          flex={1}
          p={{ base: 6, md: 8 }} // The spacing around the text
          direction="column"
          justify="center"
          textAlign={{ base: "center", md: "left" }}
          borderLeftWidth={{ md: "1px" }}
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

export default DailyQuizHeader;
