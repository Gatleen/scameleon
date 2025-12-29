import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  Badge,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { ExternalLink, Phone, ShieldAlert } from "lucide-react";
import type { ReportLink } from "../data/reportLinks";

type Props = {
  data: ReportLink;
};

export default function ReportCard({ data }: Props) {
  const { name, description, link, hotline, urgent, image } = data;

  return (
    <Box
      bg="white"
      borderWidth="1px"
      borderColor="gray.100"
      borderRadius="xl"
      overflow="hidden"
      position="relative"
      transition="all 0.2s"
      _hover={{
        borderColor: "yellow.400", // Scameleon Yellow Hover
        transform: "translateY(-4px)",
        boxShadow: "lg",
      }}
    >
      {/* Top Accent Bar (Red if urgent, Yellow otherwise) */}
      <Box h="4px" w="full" bg={urgent ? "red.500" : "yellow.400"} />

      <Flex p={5} direction="column" h="full">
        {/* HEADER: Logo + Title + Badge */}
        <Flex align="start" justify="space-between" mb={3}>
          <HStack spacing={3} align="start">
            {/* Logo Box */}
            <Flex
              w="48px"
              h="48px"
              align="center"
              justify="center"
              bg={urgent ? "red.50" : "yellow.50"}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={urgent ? "red.100" : "yellow.200"}
              flexShrink={0}
            >
              {image ? (
                <Image
                  src={image}
                  alt={name}
                  w="28px"
                  h="28px"
                  objectFit="contain"
                />
              ) : (
                <Icon
                  as={ShieldAlert}
                  color={urgent ? "red.500" : "yellow.600"}
                  w={6}
                  h={6}
                />
              )}
            </Flex>

            <Box>
              <Heading size="sm" lineHeight="shorter" mb={1}>
                {name}
              </Heading>
              {urgent && (
                <Badge colorScheme="red" variant="solid" fontSize="0.6em">
                  URGENT ACTION
                </Badge>
              )}
            </Box>
          </HStack>
        </Flex>

        {/* DESCRIPTION */}
        <Text fontSize="sm" color="gray.600" mb={4} flex={1}>
          {description}
        </Text>

        {/* HOTLINE SECTION */}
        {hotline && (
          <HStack
            mb={4}
            p={2}
            bg="gray.50"
            borderRadius="md"
            justify="center"
            borderWidth="1px"
            borderColor="gray.200"
          >
            <Icon as={Phone} size={16} color="gray.600" />
            <Text fontWeight="bold" fontSize="sm" color="gray.800">
              {hotline}
            </Text>
          </HStack>
        )}

        {/* ACTION BUTTON */}
        <Button
          as="a"
          href={link}
          target="_blank"
          size="sm"
          w="full"
          bg="gray.900"
          color="white"
          rightIcon={<Icon as={ExternalLink} size={16} />}
          _hover={{
            bg: "yellow.400",
            color: "gray.900",
            textDecoration: "none",
          }}
        >
          Visit Official Site
        </Button>
      </Flex>
    </Box>
  );
}
