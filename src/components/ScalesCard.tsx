import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Text,
  Image,
  useColorModeValue,
  Spinner,
  Fade,
} from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

interface ScalesCardProps {
  userId: string;
  scalesImage?: string; // optional image URL
}

const ScalesCard: React.FC<ScalesCardProps> = ({ userId, scalesImage }) => {
  const [scales, setScales] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const borderColor = useColorModeValue("gray.100", "gray.700");

  useEffect(() => {
    console.log("📌 ScalesCard mounted");
    console.log("➡️ userId received:", userId);

    const fetchScales = async () => {
      if (!userId) {
        console.warn("⚠️ No userId provided to ScalesCard");
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", userId);
        console.log("📄 Firestore ref path:", `users/${userId}`);

        const userSnap = await getDoc(userRef);

        console.log("📦 userSnap.exists():", userSnap.exists());

        if (userSnap.exists()) {
          const data = userSnap.data();
          console.log("🧾 Firestore data:", data);
          console.log("🪙 scales field:", data.scales);

          setScales(data.scales ?? 0);
        } else {
          console.warn("❌ No document found for this userId");
        }
      } catch (error) {
        console.error("🔥 Error fetching scales balance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScales();
  }, [userId]);

  return (
    <Box
      bg={cardBg}
      rounded="2xl"
      shadow="xl"
      p={6}
      w="full"
      maxW="300px"
      textAlign="center"
      border="1px solid"
      borderColor={borderColor}
    >
      <VStack mb={3}>
        <Text
          fontStyle="italic"
          fontSize="xl"
          fontWeight="bold"
          color={"#dcbd25ff"}
        >
          Scales Balance
        </Text>
      </VStack>

      <VStack spacing={4}>
        <Image
          src={scalesImage || "/src/assets/ScalesIcon.png"}
          alt="Scales"
          w="80px"
          h="80px"
          objectFit="contain"
          // Add a grayscale filter if loading to look "deactivated"
          filter={loading ? "grayscale(100%)" : "none"}
          transition="filter 0.3s ease"
        />

        {loading ? (
          <VStack spacing={2}>
            <Spinner size="sm" color="#dcbd25ff" />
            <Text fontSize="xs" color="gray.400">
              Syncing...
            </Text>
          </VStack>
        ) : (
          <Fade in={!loading}>
            <Text fontSize="2xl" fontWeight="bold" color={textColor}>
              {scales} Scales
            </Text>
          </Fade>
        )}
      </VStack>
    </Box>
  );
};

export default ScalesCard;
