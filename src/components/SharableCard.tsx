import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Grid,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
  SimpleGrid,
  Divider,
} from "@chakra-ui/react";
import { Download, Share2, Check } from "lucide-react";
import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";

// --- Configuration Data ---

const shareTemplates = [
  {
    id: 1,
    title: "Password Security Tip",
    content:
      "🔐 Security Tip: Use at least 12 characters with a mix of uppercase, lowercase, numbers, and symbols!",
  },
  {
    id: 2,
    title: "Phishing Alert",
    content:
      "🎣 Stay Alert: Always verify sender emails. Don't click suspicious links!",
  },
  {
    id: 3,
    title: "MFA Reminder",
    content:
      "🛡️ Enable 2FA: Add an extra layer of security to all your accounts today!",
  },
  {
    id: 4,
    title: "Update Reminder",
    content:
      "🔄 Keep Safe: Regular updates patch security vulnerabilities. Update now!",
  },
];

// New Background Options
const bgOptions = [
  { name: "Periwinkle", value: "#9ECCF0", textColor: "#000" },
  { name: "Soft Pink", value: "#F5C8C4", textColor: "#000" },
  { name: "Coral", value: "#F59C9A", textColor: "#000" },
  { name: "Peach", value: "#FFBE98", textColor: "#000" },
  { name: "Butter", value: "#FFE7AB", textColor: "#000" },
  { name: "Pistachio", value: "#C5DBA9", textColor: "#000" },
];

// New Text Color Options
const textOptions = [
  { name: "Raspberry", value: "#C21047" },
  { name: "Electric", value: "#EC1763" },
  { name: "Warm Sun", value: "#E1911E" },
  { name: "Leaves", value: "#4A9166" },
  { name: "Sky Blue", value: "#5568AF" },
  { name: "Sable", value: "#060606" },
];

const SharableCard: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [customTitle, setCustomTitle] = useState("");
  const [customText, setCustomText] = useState("");

  // Updated State for new colors
  const [bgColor, setBgColor] = useState(bgOptions[0].value);
  const [textColor, setTextColor] = useState(textOptions[5].value); // Default to Sable

  const captureRef = useRef<HTMLDivElement>(null);

  const handleTemplateClick = (template: any) => {
    setSelectedTemplate(template);
    setCustomTitle(template.title);
    setCustomText(template.content);
    // Reset to defaults when opening a new template
    setBgColor(bgOptions[0].value);
    setTextColor(textOptions[5].value);
    onOpen();
  };

  const handleShare = (platform: string) => {
    const text = encodeURIComponent(`${customTitle}\n\n${customText}`);
    const urls: any = {
      facebook: `https://www.facebook.com/sharer/sharer.php?quote=${text}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}`,
      whatsapp: `https://wa.me/?text=${text}`,
    };
    if (platform === "instagram") {
      navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "Paste it into Instagram ✨",
        status: "success",
        duration: 3000,
      });
    } else {
      window.open(urls[platform], "_blank", "width=600,height=400");
    }
  };

  const handleDownloadImage = async () => {
    if (!captureRef.current) return;
    const canvas = await html2canvas(captureRef.current, {
      backgroundColor: null, // Ensures transparency isn't added accidentally
      scale: 2, // Higher quality download
    });
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = `Scameleon-Tip-${Date.now()}.png`;
    link.click();
    toast({
      title: "Downloaded!",
      description: "Your security tip image is ready.",
      status: "success",
      duration: 2000,
    });
  };

  return (
    <>
      <Card shadow="lg">
        <CardHeader pb={3}>
          <Heading size="md">
            <HStack>
              <Share2 size={20} />
              <Text>Share Security Tips</Text>
            </HStack>
          </Heading>
        </CardHeader>

        <CardBody>
          <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }} gap={4}>
            {shareTemplates.map((template, index) => (
              <Box
                key={template.id}
                // Cycle through the new bg options for the preview cards
                bg={bgOptions[index % bgOptions.length].value}
                borderRadius="lg"
                p={4}
                cursor="pointer"
                transition="transform 0.2s"
                _hover={{ transform: "scale(1.05)" }}
                onClick={() => handleTemplateClick(template)}
              >
                <Text color="black" fontWeight="bold" mb={2} fontSize="sm">
                  {template.title}
                </Text>
                <Text color="black" fontSize="xs" noOfLines={2}>
                  {template.content}
                </Text>
              </Box>
            ))}
          </Grid>
        </CardBody>
      </Card>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader>Customize & Share</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={6} align="stretch">
              {/* --- PREVIEW AREA --- */}
              <Box
                borderWidth="1px"
                borderRadius="md"
                bg="gray.50"
                p={4}
                display="flex"
                justifyContent="center"
              >
                <Box
                  ref={captureRef}
                  bg={bgColor} // Uses solid hex color
                  p={8}
                  borderRadius="xl"
                  textAlign="center"
                  boxShadow="lg"
                  w="100%"
                  maxW="400px"
                >
                  <Text
                    fontSize="xl"
                    fontWeight="900"
                    mb={4}
                    color={textColor}
                    lineHeight="1.2"
                  >
                    {customTitle}
                  </Text>
                  <Text
                    fontSize="md"
                    fontWeight="medium"
                    color={textColor}
                    lineHeight="1.5"
                  >
                    {customText}
                  </Text>
                  <Text
                    fontSize="xs"
                    mt={6}
                    opacity={0.7}
                    color={textColor}
                    fontWeight="bold"
                  >
                    – Scameleon Security Tip
                  </Text>
                </Box>
              </Box>

              {/* --- CONTROLS --- */}
              <VStack align="stretch" spacing={4}>
                <Box>
                  <Text fontWeight="bold" fontSize="sm" mb={1}>
                    Title
                  </Text>
                  <Textarea
                    rows={1}
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    resize="none"
                  />
                </Box>

                <Box>
                  <Text fontWeight="bold" fontSize="sm" mb={1}>
                    Message
                  </Text>
                  <Textarea
                    rows={2}
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                  />
                </Box>

                {/* Background Color Picker */}
                <Box>
                  <Text fontWeight="bold" fontSize="sm" mb={2}>
                    Background Color
                  </Text>
                  <SimpleGrid columns={{ base: 2, sm: 3 }} spacing={3}>
                    {bgOptions.map((opt) => (
                      <Button
                        key={opt.name}
                        size="sm"
                        bg={opt.value}
                        color={opt.textColor} // Ensure label is readable
                        border={
                          bgColor === opt.value ? "2px solid" : "1px solid"
                        }
                        borderColor={
                          bgColor === opt.value ? "black" : "gray.200"
                        }
                        _hover={{ opacity: 0.9 }}
                        onClick={() => setBgColor(opt.value)}
                        fontSize="xs"
                        rightIcon={
                          bgColor === opt.value ? (
                            <Check size={14} />
                          ) : undefined
                        }
                      >
                        {opt.name}
                      </Button>
                    ))}
                  </SimpleGrid>
                </Box>

                {/* Text Color Picker */}
                <Box>
                  <Text fontWeight="bold" fontSize="sm" mb={2}>
                    Text Color
                  </Text>
                  <SimpleGrid columns={{ base: 2, sm: 3 }} spacing={3}>
                    {textOptions.map((opt) => (
                      <Button
                        key={opt.name}
                        size="sm"
                        variant="outline"
                        color={opt.value}
                        borderColor={
                          textColor === opt.value ? opt.value : "gray.200"
                        }
                        borderWidth={textColor === opt.value ? "2px" : "1px"}
                        bg={
                          textColor === opt.value
                            ? `${opt.value}10`
                            : "transparent"
                        } // Light tint on active
                        _hover={{ bg: `${opt.value}20` }}
                        onClick={() => setTextColor(opt.value)}
                        fontSize="xs"
                        rightIcon={
                          textColor === opt.value ? (
                            <Check size={14} />
                          ) : undefined
                        }
                      >
                        {opt.name}
                      </Button>
                    ))}
                  </SimpleGrid>
                </Box>
              </VStack>

              <Divider />

              {/* Share Buttons */}
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={3}>
                <Button
                  bgColor="#212e6a"
                  onClick={() => handleShare("facebook")}
                  color="white"
                  size="sm"
                  _hover={{ bg: "#1a2455" }}
                >
                  Facebook
                </Button>
                <Button
                  bgColor="#030206"
                  onClick={() => handleShare("twitter")}
                  color="white"
                  size="sm"
                  _hover={{ bg: "#222" }}
                >
                  X (Twitter)
                </Button>
                <Button
                  bgColor="#46953d"
                  onClick={() => handleShare("whatsapp")}
                  color="white"
                  size="sm"
                  _hover={{ bg: "#3a7c33" }}
                >
                  WhatsApp
                </Button>
                <Button
                  bgColor="#af28aa"
                  onClick={() => handleShare("instagram")}
                  color="white"
                  size="sm"
                  _hover={{ bg: "#91218d" }}
                >
                  Instagram
                </Button>
              </SimpleGrid>

              <Button
                leftIcon={<Download size={18} />}
                colorScheme="gray"
                onClick={handleDownloadImage}
                size="md"
                w="full"
              >
                Download Image
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SharableCard;
