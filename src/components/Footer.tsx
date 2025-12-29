import {
  Box,
  Container,
  Divider,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import yellowProudChameleon from "../assets/YellowScameleonProud.png";

const Footer = () => {
  return (
    <Box
      bg={"#ffffffff"}
      borderTop={"1px"}
      borderColor="gray.200"
      mt={12}
      py={10}
    >
      <Container maxWidth={"container.xl"} px={{ base: 4, md: 8 }}>
        <Grid
          // Responsive Grid:
          // 1 col on mobile
          // 2 cols on tablet (md)
          // 4 cols on desktop (lg)
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "2fr 1fr 1fr 1fr",
          }}
          gap={8}
          mb={10}
        >
          {/* Column 1: Brand */}
          <GridItem colSpan={{ base: 1, md: 2, lg: 1 }}>
            <VStack align={"flex-start"} spacing={3}>
              <HStack spacing={3}>
                <Image
                  alt="Scameleon Logo"
                  boxSize={"40px"}
                  objectFit={"contain"}
                  src={yellowProudChameleon}
                />
                <Text
                  color={"#dd9f86"}
                  fontSize={"2xl"}
                  fontWeight={"extrabold"}
                >
                  Scameleon
                </Text>
              </HStack>
              <Text
                color={"#463027"}
                fontWeight={"semibold"}
                lineHeight="short"
                fontSize="sm"
              >
                Learn. Detect. Protect. <br /> Awareness is your best defence.
              </Text>
              <Text color={"#463027dc"} fontSize={"xs"} fontStyle={"italic"}>
                Stay one step ahead of scammers around you, with knowledge and
                awareness. ⭐
              </Text>
            </VStack>
          </GridItem>

          {/* Column 2: Quick Links */}
          <GridItem>
            <VStack align={"flex-start"} spacing={2}>
              <Text
                color={"#463027"}
                fontSize={"lg"}
                fontWeight={"bold"}
                mb={1}
              >
                Quick Links
              </Text>
              <Link color={"#463027dc"} href="/report" fontSize="sm">
                Report a Scam
              </Link>
              <Link color={"#463027dc"} href="/scamdex" fontSize="sm">
                The Scamdex
              </Link>
              <Link color={"#463027dc"} href="/scales" fontSize="sm">
                What are Scales?
              </Link>
            </VStack>
          </GridItem>

          {/* Column 3: Account */}
          <GridItem>
            <VStack align={"flex-start"} spacing={2}>
              <Text
                color={"#463027"}
                fontSize={"lg"}
                fontWeight={"bold"}
                mb={1}
              >
                Account
              </Text>
              <Link color={"#463027dc"} href="/dashboard" fontSize="sm">
                Dashboard
              </Link>
              <Link color={"#463027dc"} href="/userprofile" fontSize="sm">
                Profile
              </Link>
              <Link color={"#463027dc"} href="/settings" fontSize="sm">
                Settings
              </Link>
            </VStack>
          </GridItem>

          {/* Column 4: Connect */}
          <GridItem>
            <VStack align={"flex-start"} spacing={3}>
              <Text color={"#463027"} fontSize={"lg"} fontWeight={"bold"}>
                Connect With Us
              </Text>
              <HStack spacing={4}>
                {[
                  {
                    icon: FaFacebook,
                    label: "Facebook",
                    href: "https://www.facebook.com/scameleon",
                  },
                  {
                    icon: FaInstagram,
                    label: "Instagram",
                    href: "https://www.instagram.com/scameleon.app/",
                  },
                  {
                    icon: FaWhatsapp,
                    label: "WhatsApp",
                    href: "https://whatsapp.com/channel/0029Vb6q6NNFHWq6swwJWj0o",
                  },
                ].map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    isExternal
                    _hover={{ textDecoration: "none" }}
                  >
                    <IconButton
                      aria-label={social.label}
                      icon={<Icon as={social.icon} boxSize={5} />}
                      bg={"orange.100"}
                      borderRadius={"lg"}
                      color={"orange.600"}
                      _hover={{
                        bg: "orange.200",
                        transform: "translateY(-2px)",
                      }}
                      transition={"all 0.15s ease-in-out"}
                    />
                  </Link>
                ))}
              </HStack>
            </VStack>
          </GridItem>
        </Grid>

        <Divider borderColor="#dd9f86" opacity={0.3} />

        <VStack spacing={4} mt={6} align="center">
          <HStack spacing={{ base: 3, md: 6 }} wrap="wrap" justify="center">
            <Link color={"#463027dc"} href="/privacypolicy" fontSize="xs">
              Privacy Policy
            </Link>
            <Link color={"#463027dc"} href="/termsconditions" fontSize="xs">
              Terms and Conditions
            </Link>
            <Link color={"#463027dc"} href="/about" fontSize="xs">
              About Scameleon
            </Link>
          </HStack>
          <Text color={"#46302780"} fontSize="xs">
            © 2025 Scameleon. All Rights Reserved.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Footer;
