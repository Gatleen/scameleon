import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  IconButton,
  Image,
  SimpleGrid,
  Container,
  useToast,
  Tooltip,
  Icon,
} from "@chakra-ui/react";
import { Download, Share2, X, Maximize2 } from "lucide-react";

// --- USER IMPORTS ---
import NavBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import InfographicsHeader from "../components/headerCards/InfographicsHeader";
import INFOGRAPHICS from "../data/infographics.json";

// --- IMAGE IMPORTS (FIXED) ---
// Ensure these paths match your folder structure exactly
import headerCharImg from "../assets/PageCharacters/ScameleonInfographic.png";
import artistCharImg from "../assets/PageCharacters/ScameleonArtist.png";

// --- MAIN INFOGRAPHICS IMPLEMENTATION ---

interface Infographic {
  id: number;
  title: string;
  description: string;
  image: string;
}

const Infographics: React.FC = () => {
  const [selectedInfographic, setSelectedInfographic] =
    useState<Infographic | null>(null);
  const toast = useToast();

  const openModal = (info: Infographic) => {
    setSelectedInfographic(info);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedInfographic(null);
    document.body.style.overflow = "auto";
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedInfographic) return;

    try {
      // Note: This fetch only works if the image is hosted on the same domain (which works with the 'public' folder method)
      const response = await fetch(selectedInfographic.image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `scameleon-infographic-${selectedInfographic.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
      toast({
        title: "Download Failed",
        description: "Unable to download image directly.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedInfographic) return;

    // Fix: Use full URL for sharing, not relative path
    const shareUrl = window.location.origin + selectedInfographic.image;

    if (navigator.share) {
      try {
        await navigator.share({
          title: selectedInfographic.title,
          text: selectedInfographic.description,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link Copied",
        description: "Image link copied to clipboard!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleJoinCompetition = () => {
    const googleFormUrl = "https://forms.gle/QNcW9NPY8BTPbRs68";
    window.open(googleFormUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Flex
      direction="column"
      minH="100vh"
      bgColor="#f9f1e8"
      fontFamily="body"
      overflowX="hidden"
    >
      <Box mt={{ base: 2, md: 4 }}>
        <NavBar />
      </Box>

      <Box as="main" flex="1" pt={3} pb={10}>
        <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }}>
          <Box mb={{ base: 6, md: 12 }}>
            <InfographicsHeader
              title="Infographics"
              imageSrc={headerCharImg} // FIXED: Using imported variable
            />
          </Box>

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={{ base: 6, lg: 8 }}
          >
            {INFOGRAPHICS.map((info) => (
              <Box
                key={info.id}
                role="group"
                bg="white"
                rounded="xl"
                shadow="md"
                _hover={{ shadow: "xl", transform: "translateY(-4px)" }}
                transition="all 0.3s"
                overflow="hidden"
                cursor="pointer"
                borderWidth="1px"
                borderColor="gray.100"
                onClick={() => openModal(info)}
              >
                <Box
                  position="relative"
                  overflow="hidden"
                  bg="gray.100"
                  _before={{ content: '""', display: "block", pb: "75%" }}
                >
                  <Image
                    src={info.image} // Ensure these paths in JSON start with "/" and exist in public folder
                    alt={info.title}
                    position="absolute"
                    top="0"
                    left="0"
                    w="full"
                    h="full"
                    objectFit="cover"
                    _groupHover={{ transform: "scale(1.05)" }}
                    transition="transform 0.5s"
                  />
                  {/* ... Rest of Overlay Code ... */}
                  <Flex
                    position="absolute"
                    inset="0"
                    bg="blackAlpha.300"
                    opacity="0"
                    _groupHover={{ opacity: 1 }}
                    transition="all 0.3s"
                    align="center"
                    justify="center"
                  >
                    <Box
                      transform="translateY(16px)"
                      _groupHover={{ transform: "translateY(0)", opacity: 1 }}
                      transition="all 0.3s"
                      opacity="0"
                    >
                      <Flex
                        bg="whiteAlpha.900"
                        backdropFilter="blur(4px)"
                        color="gray.900"
                        px="4"
                        py="2"
                        rounded="full"
                        align="center"
                        fontSize="sm"
                        fontWeight="medium"
                      >
                        <Icon as={Maximize2} w="4" h="4" mr="2" /> View Full
                      </Flex>
                    </Box>
                  </Flex>
                </Box>

                <Box p={{ base: 4, md: 6 }}>
                  <Heading
                    as="h3"
                    size="md"
                    color="gray.900"
                    _groupHover={{ color: "orange.500" }}
                    transition="colors"
                    mb="2"
                    noOfLines={1}
                  >
                    {info.title}
                  </Heading>
                  <Text fontSize="sm" color="gray.500" noOfLines={2}>
                    {info.description}
                  </Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Competition Banner */}
      <Box as="section" bg="yellow.300" color="gray.800" mt={10}>
        <Container maxW="5xl" px={{ base: 4, sm: 6 }} py={{ base: 8, md: 10 }}>
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
            gap={{ base: 6, md: 0 }}
            textAlign={{ base: "center", md: "left" }}
          >
            <Flex
              align="center"
              direction={{ base: "column", md: "row" }}
              gap={{ base: 4, md: 6 }}
            >
              <Box h={{ base: "24", md: "32" }} w="auto" flexShrink={0}>
                <Image
                  src={artistCharImg} // FIXED: Using imported variable
                  alt="Competition Mascot"
                  h="full"
                  w="auto"
                  objectFit="contain"
                  filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.1))"
                />
              </Box>

              <Box>
                <Heading as="h2" size="lg" fontWeight="bold" color="gray.900">
                  Infographic Design Challenge
                </Heading>
                <Text mt="2" color="gray.700" fontSize="md" maxW="md">
                  Think you can visualize data better? Join our competition and
                  win prizes!
                </Text>
              </Box>
            </Flex>

            <Button
              bg="white"
              color="blue.600"
              rounded="full"
              size="lg"
              fontWeight="bold"
              shadow="md"
              px="8"
              _hover={{
                bg: "gray.50",
                transform: "translateY(-2px)",
                shadow: "lg",
              }}
              transition="all 0.2s"
              onClick={handleJoinCompetition}
              width={{ base: "full", md: "auto" }}
            >
              Join Competition
            </Button>
          </Flex>
        </Container>
      </Box>

      <Box width="100%" mt="auto">
        <Footer />
      </Box>

      {/* Full Screen Modal */}
      {selectedInfographic && (
        <Flex
          position="fixed"
          inset="0"
          zIndex="modal"
          align="center"
          justify="center"
          bg="blackAlpha.900"
          backdropFilter="blur(4px)"
          onClick={closeModal}
          p={0}
        >
          {/* Toolbar */}
          <Flex
            position="absolute"
            top="0"
            left="0"
            right="0"
            p="4"
            justify="space-between"
            align="center"
            bgGradient="linear(to-b, blackAlpha.800, transparent)"
            zIndex="sticky"
            pointerEvents="none"
          >
            <Text
              color="white"
              fontWeight="medium"
              ml="2"
              display={{ base: "none", sm: "block" }}
              textShadow="0 2px 4px rgba(0,0,0,0.5)"
            >
              {selectedInfographic.title}
            </Text>

            <Flex
              align="center"
              pointerEvents="auto"
              mx={{ base: "auto", sm: 0 }}
              bg="gray.800"
              rounded="full"
              px="4"
              py="1"
              borderWidth="1px"
              borderColor="gray.700"
              shadow="lg"
              gap={2}
            >
              <Tooltip label="Download">
                <IconButton
                  aria-label="Download"
                  icon={<Download size={20} />}
                  variant="ghost"
                  color="white"
                  _hover={{ color: "teal.400", bg: "transparent" }}
                  onClick={handleDownload}
                  size="sm"
                />
              </Tooltip>

              <Box w="1px" h="4" bg="gray.600" />

              <Tooltip label="Share">
                <IconButton
                  aria-label="Share"
                  icon={<Share2 size={20} />}
                  variant="ghost"
                  color="white"
                  _hover={{ color: "teal.400", bg: "transparent" }}
                  onClick={handleShare}
                  size="sm"
                />
              </Tooltip>
            </Flex>

            <IconButton
              aria-label="Close"
              icon={<X size={32} />}
              variant="ghost"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
              rounded="full"
              onClick={closeModal}
              pointerEvents="auto"
              ml="4"
            />
          </Flex>

          <Box
            w="full"
            h="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={{ base: 2, md: 8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedInfographic.image}
              alt={selectedInfographic.title}
              rounded="md"
              shadow="2xl"
              objectFit="contain"
              maxH="90vh"
              maxW="95vw"
            />
          </Box>
        </Flex>
      )}
    </Flex>
  );
};

export default Infographics;
