import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Image,
  Center,
  Button,
  Divider,
} from "@chakra-ui/react";
import {
  Star,
  Award,
  Shield,
  Gift,
  User,
  Mail,
  CheckCircle2,
  Lock,
  ArrowLeft,
} from "lucide-react";
import { BADGES, PASS_SCORE } from "../data/GameConfig";
import type { LevelScores, UserProfile, Badge } from "../types";

interface ProfileProps {
  badges: string[];
  scores: LevelScores;
  unlockedCount: number;
  userProfile: UserProfile;
  PASS_SCORE: number;
  onBack: () => void; // Added this prop so users can close the profile
}

const Profile: React.FC<ProfileProps> = ({
  badges,
  scores = {},
  userProfile,
  onBack,
}) => {
  // Calculate total stats
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const completedLevels = Object.values(scores).filter(
    (s) => s >= PASS_SCORE
  ).length;

  // Helper component for the stat blocks
  function StatBox({
    icon: IconComponent,
    label,
    val,
  }: {
    icon: React.ElementType;
    label: string;
    val: string | number;
  }) {
    return (
      <VStack
        bg="white"
        p={3}
        rounded="xl"
        shadow="sm"
        border="1px"
        borderColor="gray.100"
        flex={1}
        spacing={0}
      >
        <Icon as={IconComponent} boxSize={5} color="pink.500" mb={1} />
        <Text fontSize="lg" fontWeight="black" color="gray.800">
          {val}
        </Text>
        <Text
          fontSize="2xs"
          color="gray.400"
          textTransform="uppercase"
          fontWeight="bold"
        >
          {label}
        </Text>
      </VStack>
    );
  }

  return (
    <Box p={4} bg="gray.50" minH="100vh">
      {/* Navigation / Header */}
      <Flex mb={4} align="center">
        <Button
          leftIcon={<ArrowLeft size={18} />}
          variant="ghost"
          onClick={onBack}
          colorScheme="pink"
          size="sm"
        >
          Back to Quiz
        </Button>
      </Flex>

      {/* Main Profile Card */}
      <Box
        bg="white"
        rounded="3xl"
        p={6}
        shadow="lg"
        border="1px"
        borderColor="gray.100"
        mb={8}
      >
        <VStack spacing={4} align="center" mb={6}>
          <Box position="relative">
            <Image
              src={userProfile.profilePhoto}
              alt={`${userProfile.name}'s profile`}
              boxSize="28"
              bg="pink.100"
              rounded="full"
              objectFit="cover"
              border="4px"
              borderColor="pink.50"
              shadow="md"
              fallbackSrc="https://placehold.co/100x100/EC4899/ffffff?text=User"
            />
            {/* Optional: Add a verification badge if needed */}
            <Icon
              as={CheckCircle2}
              color="blue.400"
              bg="white"
              rounded="full"
              position="absolute"
              bottom={1}
              right={1}
              boxSize={6}
            />
          </Box>

          <VStack spacing={0}>
            <Heading size="lg" color="gray.800">
              {userProfile.name}
            </Heading>
            <HStack color="gray.500" fontSize="sm" mt={1}>
              <Icon as={User} boxSize={3} />
              <Text>@{userProfile.username}</Text>
            </HStack>
          </VStack>
        </VStack>

        <VStack spacing={2} align="flex-start" mb={6} px={4}>
          <HStack color="gray.700">
            <Icon as={Mail} boxSize={4} color="pink.400" />
            <Text fontSize="sm" fontWeight="medium">
              {userProfile.email}
            </Text>
          </HStack>
        </VStack>

        <Divider mb={4} />

        {/* Stats Row */}
        <HStack justify="space-between" spacing={3}>
          <StatBox icon={Star} label="Score" val={totalScore} />
          <StatBox icon={Award} label="Passed" val={completedLevels} />
          <StatBox icon={Shield} label="Badges" val={badges.length} />
        </HStack>
      </Box>

      {/* Badges Section */}
      <Heading size="md" color="gray.700" mb={4} px={2}>
        <HStack>
          <Icon as={Gift} boxSize={5} color="pink.500" />
          <Text>
            Achievements ({badges.length}/{BADGES.length})
          </Text>
        </HStack>
      </Heading>

      <VStack spacing={3} pb={10}>
        {BADGES.map((badge: Badge) => {
          const isUnlocked = badges.includes(badge.id);
          return (
            <Flex
              key={badge.id}
              p={4}
              rounded="2xl"
              align="center"
              gap={4}
              bg="white"
              border="1px"
              borderColor={isUnlocked ? "pink.200" : "gray.100"}
              shadow={isUnlocked ? "sm" : "none"}
              opacity={isUnlocked ? 1 : 0.5}
              filter={isUnlocked ? "none" : "grayscale(100%)"}
              w="full"
              transition="all 0.2s"
            >
              <Box boxSize="12" minW="12">
                <Image
                  src={badge.icon}
                  alt={badge.name}
                  boxSize="full"
                  objectFit="contain"
                  fallback={
                    <Center boxSize="full" bg="gray.100" rounded="full">
                      🏆
                    </Center>
                  }
                />
              </Box>

              <Box flex="1">
                <Heading size="sm" color={isUnlocked ? "gray.800" : "gray.500"}>
                  {badge.name}
                </Heading>
                <Text fontSize="xs" color="gray.500" noOfLines={2}>
                  {badge.desc}
                </Text>
              </Box>

              <Icon
                as={isUnlocked ? CheckCircle2 : Lock}
                boxSize={5}
                color={isUnlocked ? "green.500" : "gray.300"}
              />
            </Flex>
          );
        })}
      </VStack>
    </Box>
  );
};

export default Profile;
