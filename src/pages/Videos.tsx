import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, onSnapshot, Timestamp } from "firebase/firestore";
import {
  Box,
  Container,
  Heading,
  Text,
  HStack,
  Badge,
  LinkBox,
  LinkOverlay,
  Icon,
  Alert,
  AlertIcon,
  AlertTitle,
  Skeleton,
  Flex,
  Image,
  useColorModeValue,
  Spacer,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  Calendar,
  ExternalLink,
  Tag,
  Image as ImageIcon,
  PlayCircle,
} from "lucide-react";

// --- Components ---
import NavigationBarItems from "../components/NavigationBar";
import Footer from "../components/Footer";

// --- Assets ---
import bannerImage from "../assets/PageCharacters/ScameleonVideo.png";

// --------------------------------------------------
// Types
// --------------------------------------------------

interface Video {
  id: string;
  title: string;
  category: string;
  contentType: string;
  sourceUrl: string;
  imageUrl?: string;
  createdAt?: Timestamp;
}

interface VideoHeaderProps {
  title: string;
  imageSrc: string;
}

// --------------------------------------------------
// Component 1: Video Header (Banner)
// --------------------------------------------------

const VideoHeader: React.FC<VideoHeaderProps> = ({ title, imageSrc }) => {
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
      // FIX: Responsive margin bottom
      mb={{ base: 6, md: 10 }}
    >
      <Flex direction={{ base: "column", md: "row" }} align="center" h="full">
        {/* Image Section */}
        <Box p={4} w={{ base: "full", md: "300px" }} flexShrink={0}>
          <Flex
            bg={imageBg}
            rounded="xl"
            // FIX: Responsive height for better mobile display
            h={{ base: "180px", md: "180px" }}
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
              objectFit="contain"
              w="full"
              h="full"
              p={2}
            />
          </Flex>
        </Box>

        {/* Text Section */}
        <Flex
          flex={1}
          // FIX: Responsive padding
          p={{ base: 4, md: 8 }}
          direction="column"
          justify="center"
          textAlign={{ base: "center", md: "left" }}
          borderLeftWidth={{ md: "1px" }}
          borderLeftColor="gray.100"
          w="full"
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

// --------------------------------------------------
// Component 2: Video Card (Grid Item)
// --------------------------------------------------

const VideoCard = ({ video }: { video: Video }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const titleColor = useColorModeValue("gray.900", "white");
  const imageBg = useColorModeValue("gray.100", "gray.700");
  const mutedColor = useColorModeValue("gray.500", "gray.400");

  const formatDate = (timestamp?: Timestamp) => {
    if (!timestamp) return "";
    return new Date(timestamp.toMillis()).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <LinkBox
      as="article"
      w="full"
      bg={cardBg}
      rounded="2xl"
      shadow="sm"
      borderWidth="1px"
      borderColor={borderColor}
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-4px)", shadow: "lg" }}
      display="flex"
      flexDirection="column"
    >
      <Box
        w="full"
        h="220px"
        bg={imageBg}
        borderBottomWidth="1px"
        borderColor={borderColor}
        position="relative"
        overflow="hidden"
      >
        {video.imageUrl ? (
          <Image
            src={video.imageUrl}
            alt={video.title}
            objectFit="cover"
            w="full"
            h="full"
            transition="transform 0.3s ease"
            _groupHover={{ transform: "scale(1.05)" }}
          />
        ) : (
          <Flex
            w="full"
            h="full"
            align="center"
            justify="center"
            direction="column"
            color={mutedColor}
          >
            <Icon as={PlayCircle} boxSize={10} mb={2} opacity={0.4} />
            <Text fontSize="sm" fontWeight="medium">
              No Thumbnail
            </Text>
          </Flex>
        )}

        <Flex
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          align="center"
          justify="center"
          opacity="0"
          transition="opacity 0.2s"
          bg="blackAlpha.300"
          _groupHover={{ opacity: 1 }}
        >
          <Icon
            as={PlayCircle}
            color="white"
            boxSize={12}
            fill="whiteAlpha.400"
          />
        </Flex>
      </Box>

      <Flex flex={1} p={6} direction="column">
        <HStack spacing={3} mb={4} flexWrap="wrap">
          <Badge
            colorScheme="red"
            variant="subtle"
            borderRadius="full"
            px={2}
            py={0.5}
          >
            {video.category}
          </Badge>
          <Spacer />
          {video.createdAt && (
            <HStack spacing={1} color="gray.400" fontSize="xs">
              <Icon as={Calendar} boxSize={3} />
              <Text>{formatDate(video.createdAt)}</Text>
            </HStack>
          )}
        </HStack>

        <Heading
          as="h3"
          size="md"
          fontWeight="bold"
          color={titleColor}
          lineHeight="tall"
          mb={3}
          noOfLines={2}
          minH="3em"
        >
          <LinkOverlay href={video.sourceUrl} isExternal>
            {video.title}
          </LinkOverlay>
        </Heading>

        <HStack
          justify="space-between"
          mt="auto"
          pt={4}
          borderTopWidth="1px"
          borderColor={useColorModeValue("gray.100", "gray.700")}
        >
          <HStack spacing={1}>
            <Icon as={Tag} boxSize={3} color="gray.400" />
            <Text fontSize="xs" color="gray.500" fontWeight="medium">
              {video.contentType}
            </Text>
          </HStack>

          <HStack color="red.500" fontSize="sm" fontWeight="semibold">
            <Text>Watch</Text>
            <Icon as={ExternalLink} boxSize={4} />
          </HStack>
        </HStack>
      </Flex>
    </LinkBox>
  );
};

// --------------------------------------------------
// Main Page Component
// --------------------------------------------------

export default function Videos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const backgroundColor = "#f9f1e8";

  useEffect(() => {
    setLoading(true);
    const videosRef = collection(db, "videos");

    const unsubscribe = onSnapshot(
      videosRef,
      (snapshot) => {
        const fetched = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Video, "id">),
        }));
        setVideos(fetched);
        setLoading(false);
      },
      (err) => {
        console.error("Firestore error:", err);
        setError("Failed to load videos.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <Flex
      direction="column"
      minH="100vh"
      bg={backgroundColor}
      // FIX: Prevent horizontal scroll
      overflowX="hidden"
    >
      {/* 1. Navigation Bar */}
      <Box mt={{ base: 2, md: 4 }}>
        <NavigationBarItems />
      </Box>

      {/* 2. Main Content Area */}
      <Box flex="1" pt={4} pb={12}>
        <Container
          maxW="container.xl"
          // FIX: Responsive padding so cards don't touch screen edges
          px={{ base: 4, md: 8 }}
        >
          <VideoHeader title="Videos" imageSrc={bannerImage} />

          {error && (
            <Alert status="error" borderRadius="md" mb={6}>
              <AlertIcon />
              <AlertTitle mr={2}>Error:</AlertTitle>
              {error}
            </Alert>
          )}

          {loading ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {[...Array(3)].map((_, i) => (
                <Box
                  key={i}
                  bg="white"
                  rounded="2xl"
                  borderWidth="1px"
                  borderColor="gray.200"
                  overflow="hidden"
                >
                  <Skeleton height="220px" width="100%" />
                  <Box p={6}>
                    <HStack mb={4} justify="space-between">
                      <Skeleton
                        height="20px"
                        width="60px"
                        borderRadius="full"
                      />
                      <Skeleton height="15px" width="80px" />
                    </HStack>
                    <Skeleton height="24px" width="90%" mb={2} />
                    <Skeleton height="24px" width="40%" mb={6} />
                    <Skeleton height="15px" width="100%" />
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          ) : videos.length === 0 ? (
            <Flex
              direction="column"
              align="center"
              justify="center"
              py={16}
              bg="white"
              borderRadius="2xl"
              borderWidth="2px"
              borderStyle="dashed"
              borderColor="gray.300"
            >
              <Icon as={ImageIcon} color="gray.400" boxSize={10} mb={4} />
              <Heading size="md" color="gray.700">
                No videos found
              </Heading>
            </Flex>
          ) : (
            // FIX: Responsive Grid Spacing
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={{ base: 6, lg: 8 }}
            >
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </SimpleGrid>
          )}
        </Container>
      </Box>

      {/* 3. Footer (Sticks to bottom) */}
      <Box width="100%" mt="auto">
        <Footer />
      </Box>
    </Flex>
  );
}
