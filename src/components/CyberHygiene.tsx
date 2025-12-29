import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Divider,
  Heading,
  HStack,
  Progress,
  Stack, // Changed from HStack to Stack for responsiveness
  Text,
  VStack,
} from "@chakra-ui/react";
import { Shield } from "lucide-react";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import {
  getCyberHygiene,
  saveCyberHygieneItem,
} from "../firebase/cyberHygiene";

// ... [Keep your securityChecklist and totalWeight variables exactly as they were] ...
const securityChecklist = [
  { id: 1, text: "Do you use Multi-Factor Authentication (MFA)?", weight: 16 },
  { id: 2, text: "Have you updated your device recently?", weight: 16 },
  { id: 3, text: "Do you use strong, unique passwords?", weight: 16 },
  { id: 4, text: "Is your antivirus software active and updated?", weight: 16 },
  { id: 5, text: "Do you verify emails before clicking links?", weight: 16 },
  { id: 6, text: "Have you reviewed your app permissions?", weight: 16 },
  { id: 7, text: "Do you use a VPN on public WiFi?", weight: 16 },
  { id: 8, text: "Have you backed up your important data?", weight: 16 },
];
const totalWeight = securityChecklist.reduce(
  (sum, item) => sum + item.weight,
  0
);

const CyberHygieneCard: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      try {
        const saved = await getCyberHygiene(user.uid);
        if (saved?.checkedItems) setCheckedItems(saved.checkedItems);
      } catch (err) {
        console.error("Failed to load cyber hygiene data:", err);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleCheckboxChange = async (id: number) => {
    if (checkedItems[id]) return;
    const user = auth.currentUser;
    if (!user) return;
    setCheckedItems((prev) => ({ ...prev, [id]: true }));
    try {
      await saveCyberHygieneItem(user.uid, id);
    } catch (err) {
      console.error("Failed to save cyber hygiene item:", err);
    }
  };

  const calculateScore = () => {
    const checkedWeight = securityChecklist
      .filter((item) => checkedItems[item.id])
      .reduce((sum, item) => sum + item.weight, 0);
    return Math.round((checkedWeight / totalWeight) * 100);
  };

  const score = calculateScore();

  const getScoreColor = () => {
    if (score < 30) return "red";
    if (score < 60) return "orange";
    if (score < 85) return "yellow";
    return "green";
  };

  const getScoreLabel = () => {
    if (score < 30) return "At Risk";
    if (score < 60) return "Needs Improvement";
    if (score < 85) return "Good";
    return "Excellent";
  };

  return (
    <Card shadow="lg" h="100%">
      <CardHeader pb={2}>
        {/* Responsive Header: Stack vertically on mobile, horizontally on tablet+ */}
        <Stack
          direction={{ base: "column", sm: "row" }}
          justify="space-between"
          align={{ base: "start", sm: "center" }}
          spacing={3}
        >
          <HStack>
            <Shield color="#f89831" size={28} />
            <Heading size="md">Cyber Hygiene</Heading>
          </HStack>
          <Badge colorScheme={getScoreColor()} fontSize="md" px={3} py={1}>
            {getScoreLabel()}
          </Badge>
        </Stack>
      </CardHeader>

      <CardBody>
        <VStack spacing={4} align="stretch">
          <Box>
            <HStack justify="space-between" mb={2}>
              <Text fontWeight="bold" fontSize="sm">
                Security Score
              </Text>
              <Text
                fontSize="xl"
                fontWeight="bold"
                color={`${getScoreColor()}.500`}
              >
                {score}%
              </Text>
            </HStack>
            <Progress
              value={score}
              colorScheme={getScoreColor()}
              size="lg"
              borderRadius="full"
            />
          </Box>

          <Divider />

          <VStack spacing={3} align="stretch">
            {securityChecklist.map((item) => (
              <Checkbox
                key={item.id}
                isChecked={checkedItems[item.id] || false}
                isDisabled={checkedItems[item.id]}
                onChange={() => handleCheckboxChange(item.id)}
                colorScheme="green"
                size="lg"
                alignItems="flex-start" // Ensures checkbox aligns with top of text if text wraps
              >
                <Text ml={2} fontSize={{ base: "sm", md: "md" }} mt="-2px">
                  {item.text}
                </Text>
              </Checkbox>
            ))}
          </VStack>

          {score === 100 && (
            <Alert status="success" borderRadius="md" variant="left-accent">
              <AlertIcon />
              <Box>
                <AlertTitle fontSize="sm">Perfect Score! 🌟</AlertTitle>
                <AlertDescription fontSize="xs">
                  You're following all security best practices!
                </AlertDescription>
              </Box>
            </Alert>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default CyberHygieneCard;
