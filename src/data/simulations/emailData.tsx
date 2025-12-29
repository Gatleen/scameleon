import React from "react";
import { VStack, Box, Text, Button, Flex, Icon, Image } from "@chakra-ui/react";
import {
  Play,
  Paperclip,
  CreditCard,
  Flag,
  Zap,
  Smartphone,
} from "lucide-react";
import type { EmailItem } from "../../types/simulationTypes";

// --- FIXED IMAGE IMPORTS ---
// Ensure these filenames match your "src/assets/Logos/" folder exactly
import netflixLogo from "../../assets/Logos/NetflixLogo.png";
import coworkerLogo from "../../assets/Logos/CoworkerLogo.png";
import payPalLogo from "../../assets/Logos/PayPalLogo.png";
import momLogo from "../../assets/Logos/MomLogo.png";
import prizeLogo from "../../assets/Logos/PrizeLogo.jpg";
import tnbLogo from "../../assets/Logos/TNBLogo.png";
import bossLogo from "../../assets/Logos/BossLogo.png";
import cwLogo from "../../assets/Logos/ComputerWeeklyLogo.png";
import chipImg from "../../assets/Chip.png"; // Note: This one was "src/assets/Chip.png"
import appleLogo from "../../assets/Logos/AppleLogo.png";
import lhdnLogo from "../../assets/Logos/LHDNLogo.png";

export const INBOX_EMAILS: EmailItem[] = [
  {
    id: 1,
    sender: "NetfIix Support",
    senderEmail: "support@netflix-verify-action.com",
    subject: "Account Suspended: Payment Failed",
    preview: "We were unable to process your payment...",
    profileImage: netflixLogo, // FIXED
    type: "brand",
    brandColor: "black",
    brandIcon: Play,
    isScam: true,
    explanation:
      'SCAM: Check the sender domain. "netflix-verify-action.com" is not official. Netflix will never ask you to enter payment info via email link.',
    body: (
      <VStack spacing={4} align="stretch">
        <Box
          bg="black"
          color="red.600"
          p={4}
          fontWeight="extrabold"
          fontSize="xl"
          letterSpacing="widest"
          textTransform="uppercase"
        >
          NETFLIX
        </Box>
        <Text>Hi Customer,</Text>
        <Text>
          We attempted to bill your membership for the current month, but the
          transaction failed. To avoid interruption, please update your payment
          details immediately.
        </Text>
        <Button
          bg="red.600"
          color="white"
          w="full"
          py={2}
          _hover={{ bg: "red.700" }}
        >
          UPDATE PAYMENT
        </Button>
        <Text fontSize="xs" color="gray.500">
          The Netflix Team
        </Text>
      </VStack>
    ),
  },
  {
    id: 2,
    sender: "David Tan (HR)",
    senderEmail: "t.david@company-internal.com",
    subject: "Intern Interview Notes",
    preview: "Please find attached the notes from today...",
    profileImage: coworkerLogo, // FIXED
    type: "plain",
    isScam: false,
    explanation:
      "LEGIT: The sender address matches the company domain, the context is expected, and the attachment is a standard PDF.",
    body: (
      <VStack spacing={4} align="stretch">
        <Text>Hi Team,</Text>
        <Text>
          Here are the notes from the interview with the intern earlier. I've
          attached it for our clarification and decision-making process later.
        </Text>
        <Flex
          align="center"
          gap={2}
          p={3}
          bg="gray.100"
          rounded="md"
          border="1px"
          borderColor="gray.200"
        >
          <Icon as={Paperclip} boxSize={4} />
          <Text
            fontSize="sm"
            fontWeight="medium"
            color="blue.600"
            textDecoration="underline"
          >
            I003-Intern_Interview.pdf
          </Text>
          <Text fontSize="xs" color="gray.500">
            (2.4 MB)
          </Text>
        </Flex>
        <Text>
          Best,
          <br />
          David
        </Text>
      </VStack>
    ),
  },
  {
    id: 3,
    sender: "PayPa1 Service",
    senderEmail: "service@paypa1-security.com",
    subject: "You sent $500.00 USD to Unknown",
    preview: "Receipt for your recent transaction...",
    profileImage: payPalLogo, // FIXED
    type: "brand",
    brandColor: "blue.800",
    brandIcon: CreditCard,
    isScam: true,
    explanation:
      'SCAM: Look closely at "PayPa1" (number 1 instead of L). This is a classic refund scam designed to make you panic call them.',
    body: (
      <VStack spacing={4} align="stretch">
        <Flex justify="center" mb={4}>
          <Text
            color="blue.800"
            fontWeight="bold"
            fontStyle="italic"
            fontSize="2xl"
          >
            PayPal
          </Text>
        </Flex>
        <Box textAlign="center" borderBottomWidth="1px" pb={4}>
          <Text color="gray.500">You sent a payment of</Text>
          <Text fontSize="3xl" fontWeight="bold">
            $500.00 USD
          </Text>
        </Box>
        <Text fontSize="sm" color="gray.600">
          If you did not authorize this purchase, click the link below to cancel
          the transaction immediately.
        </Text>
        <Text
          color="blue.600"
          textDecoration="underline"
          fontSize="sm"
          textAlign="center"
          fontWeight="bold"
          cursor="pointer"
        >
          Dispute Transaction
        </Text>
      </VStack>
    ),
  },
  {
    id: 4,
    sender: "Mom",
    senderEmail: "gatleens_mom@gmail.com",
    subject: "Dinner on Sunday?",
    preview: "Are you coming over this weekend...",
    profileImage: momLogo, // FIXED
    type: "plain",
    isScam: false,
    explanation:
      "LEGIT: It is from a known contact (Mom), the tone is personal, and there are no suspicious links or requests for money.",
    body: (
      <VStack spacing={4} align="stretch">
        <Text>Hi Gatleen,</Text>
        <Text>
          Are you still coming over for dinner this Sunday? Dad bought that
          chocolate cake you like.
        </Text>
        <Text>
          Let me know by tomorrow so I can go shopping to prepare the food.
        </Text>
        <Text>
          Love,
          <br />
          Mom
        </Text>
      </VStack>
    ),
  },
  {
    id: 5,
    sender: "SURPRISE LOTTERY WINNER",
    senderEmail: "claims@lottery-surprise-winners.org",
    subject: "OFFICIAL NOTIFICATION: YOU WON!",
    preview: "Your email was selected randomly...",
    profileImage: prizeLogo, // FIXED
    type: "brand",
    brandColor: "yellow.500",
    brandIcon: Flag,
    isScam: true,
    explanation:
      "SCAM: If you didn't enter a lottery, you didn't win. The urgency (\"24 Hours\") is a red flag to make you act without thinking.",
    body: (
      <VStack spacing={4} align="stretch" textAlign="center">
        <Box
          bg="#ffe1cdb8"
          p={6}
          rounded="lg"
          borderWidth="3px"
          borderColor="#dec0ae"
          borderStyle="dashed"
        >
          <Text fontSize="xl" fontWeight="extrabold" color="#e15e55">
            CONGRATULATIONS!
          </Text>
          <Text fontSize="4xl" fontWeight="bold" color="green.600" my={4}>
            $1,000,000
          </Text>
          <Text fontSize="sm" color="gray.700">
            Your email address has been randomly selected as the grand prize
            winner of the International Digital Lottery.
          </Text>
        </Box>
        <Text color="red.600" fontWeight="bold">
          CLAIM DEADLINE: 24 HOURS
        </Text>
        <Button
          bg="green.500"
          color="white"
          rounded="full"
          shadow="lg"
          fontWeight="bold"
          _hover={{ bg: "green.600" }}
        >
          CLAIM PRIZE NOW
        </Button>
      </VStack>
    ),
  },
  {
    id: 6,
    sender: "Tenaga Nasional Berhad",
    senderEmail: "billing@tnb.com.my",
    subject: "Your Electric Bill is Ready",
    preview: "Bill for September 2025...",
    profileImage: tnbLogo, // FIXED
    type: "official",
    brandColor: "green.600",
    brandIcon: Zap,
    isScam: false,
    explanation:
      "LEGIT: Standard billing notification from a utility provider. The details are specific (Account #) and the email domain is correct.",
    body: (
      <VStack spacing={4} align="stretch">
        <Flex align="center" gap={2} borderBottomWidth="1px" pb={2}>
          <Box bg="#ffc065" p={1} rounded="md" color="white">
            <Icon as={Zap} boxSize={4} />
          </Box>
          <Text fontWeight="bold" color="#e15e55">
            TNB Group
          </Text>
        </Flex>
        <Text>Dear Customer,</Text>
        <Text>
          Your utilities bill for the month of September is ready for viewing.
        </Text>
        <Box bg="gray.50" p={4} rounded="md" fontSize="sm">
          <Text>
            <strong>Account:</strong> 000-11-2222
          </Text>
          <Text>
            <strong>Amount Due:</strong> RM142.50
          </Text>
          <Text>
            <strong>Due Date:</strong> 13 Sep 2025
          </Text>
        </Box>
        <Text textAlign="center" fontSize="xs" color="gray.500" mt={4}>
          This is an automated message. Please do not reply.
        </Text>
      </VStack>
    ),
  },
  {
    id: 7,
    sender: "CEO (Internal)",
    senderEmail: "ceo-urgent-task@gmail.com",
    subject: "URGENT WIRE TRANSFER REQUEST",
    preview: "I need you to process this immediately...",
    profileImage: bossLogo, // FIXED
    type: "plain",
    isScam: true,
    explanation:
      'SCAM: This is "CEO Fraud". Note the email is @gmail.com, not the company domain. The urgency and request for secrecy are major red flags.',
    body: (
      <VStack spacing={4} align="stretch" fontFamily="serif">
        <Text>
          I am in a meeting right now and can't talk, but I need a favor.
        </Text>
        <Text>
          We need to make an urgent vendor payment today or we lose the
          contract. Please process a wire transfer of $4,500 to the attached
          account details immediately.
        </Text>
        <Text>Keep this confidential until I return to the office.</Text>
        <Text>Sent from my iPad</Text>
      </VStack>
    ),
  },
  {
    id: 8,
    sender: "Computer Weekly Newsletter",
    senderEmail: "newsletter@cw-brand.com",
    subject: "Weekly Tech Roundup",
    preview: "Here are the top stories in tech...",
    profileImage: cwLogo, // FIXED
    type: "brand",
    brandColor: "indigo.600",
    isScam: false,
    explanation:
      "LEGIT: A standard marketing newsletter. It contains unsubscribe links and comes from the official brand domain.",
    body: (
      <VStack spacing={4} align="stretch">
        <Box bg="indigo.600" h={2} w="full"></Box>
        <Text fontSize="xl" fontWeight="bold" color="gray.800">
          The Weekly Tech
        </Text>
        <Flex align="start" gap={4}>
          <Box bg="gray.200" w={24} h={22} flexShrink={0}>
            {/* FIXED: Using imported image for the chip content */}
            <Image src={chipImg} />
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold">
              New Chip Released
            </Text>
            <Text fontSize="sm" color="gray.600">
              The industry is buzzing about the latest silicon chips...
            </Text>
            <Text
              color="indigo.600"
              fontSize="xs"
              fontWeight="bold"
              cursor="pointer"
              mt={1}
            >
              Read more
            </Text>
          </Box>
        </Flex>
        <Text fontSize="xs" color="gray.400" textAlign="center" mt={6}>
          Unsubscribe | View in Browser
        </Text>
      </VStack>
    ),
  },
  {
    id: 9,
    sender: "Apple Security",
    senderEmail: "secure-id@apple-support-lock.net",
    subject: "Your Apple ID has been locked",
    preview: "We have detected unusual activity...",
    profileImage: appleLogo, // FIXED
    type: "brand",
    brandColor: "gray.200",
    isScam: true,
    explanation:
      'SCAM: The domain "apple-support-lock.net" is fake. Real Apple emails come from apple.com. They are trying to steal your login credentials.',
    body: (
      <VStack spacing={6} align="stretch" textAlign="center">
        <Flex justify="center">
          <Icon as={Smartphone} boxSize={10} color="gray.500" />
        </Flex>
        <Text fontSize="xl" fontWeight="bold">
          Your Apple ID has been locked
        </Text>
        <Text fontSize="sm" color="gray.600">
          For your security, we have temporarily disabled your account due to
          unauthorized login attempts from Russia.
        </Text>
        <Text color="blue.500" cursor="pointer" fontSize="sm">
          Unlock Account Now {">"}
        </Text>
      </VStack>
    ),
  },
  {
    id: 10,
    sender: "LHDN Refunds",
    senderEmail: "refund-status@lhdn-tax-gov.xyz",
    subject: "Tax Refund Pending Approval",
    preview: "Click to claim your funds...",
    profileImage: lhdnLogo, // FIXED
    type: "official",
    brandColor: "blue.900",
    isScam: true,
    explanation:
      "SCAM: Tax agencies (like LHDN) rarely initiate refunds via email, and they definitely do not use .xyz domains. .gov is the standard.",
    body: (
      <VStack spacing={4} align="stretch">
        <Box borderBottomWidth="2px" borderColor="blue.900" pb={2} mb={4}>
          <Text fontWeight="bold" color="blue.900" textTransform="uppercase">
            Tax Refund Notification
          </Text>
        </Box>
        <Text>
          We have calculated your fiscal activity and determined you are
          eligible for a refund of:
        </Text>
        <Text fontSize="3xl" fontWeight="bold" color="green.700">
          $1,240.50
        </Text>
        <Text>
          To have these funds deposited, you must verify your identity via the
          secure portal below.
        </Text>
        <Button
          w="full"
          bg="blue.900"
          color="white"
          _hover={{ bg: "blue.800" }}
        >
          Verify Identity
        </Button>
      </VStack>
    ),
  },
];
