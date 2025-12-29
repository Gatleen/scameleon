import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Image,
  Textarea,
  VStack,
  HStack,
  Container,
  SimpleGrid,
  useToast,
  Heading,
  Icon,
  Badge as ChakraBadge,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import {
  Edit2,
  Save,
  Image as ImageIcon,
  Upload,
  Lock,
  Unlock,
  Award,
  Star,
  Trophy,
  Shield,
} from "lucide-react";

// --- FIREBASE IMPORTS ---
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase/firebaseConfig";

// --- Custom Components ---
import NavigationBarItems from "../components/NavigationBar";
import UserProfileHeader from "../components/headerCards/UserProfileHeader";
import Footer from "../components/Footer";
import ScalesCard from "../components/ScalesCard";

// --- IMPORT DATA ---
import { BADGES, PASS_SCORE } from "../data/GameConfig";
import type { LevelScores } from "../types";

// --- Types ---
interface UserProfileData {
  // Read-only (mostly)
  fullname: string;
  email: string;
  // Editable in Firestore
  username: string;
  avatarUrl: string;
  coverUrl: string;
  bio?: string;
}

interface UserProfileProps {
  // We keep these for flexibility, but usually we fetch internally
  badges?: string[];
  scores?: LevelScores;
}

// --- CONSTANTS ---
const PRESET_COVERS = [
  "src/assets/ProfileCovers/Cover1.png",
  "src/assets/ProfileCovers/Cover2.png",
  "src/assets/ProfileCovers/Cover3.png",
  "src/assets/ProfileCovers/Cover4.png",
  "src/assets/ProfileCovers/Cover5.png",
  "src/assets/ProfileCovers/Cover6.png",
];

const getBadgeColor = (type: string) => {
  switch (type) {
    case "beginner":
      return "green";
    case "advanced":
      return "purple";
    case "special":
      return "orange";
    default:
      return "gray";
  }
};

// --- HELPER: Stat Box Component ---
function StatBox({
  icon: IconComponent,
  label,
  val,
  color,
}: {
  icon: any;
  label: string;
  val: number | string;
  color: string;
}) {
  return (
    <VStack
      bg="whiteAlpha.800"
      p={4}
      rounded="xl"
      border="1px solid"
      borderColor="orange.100"
      flex={1}
      spacing={1}
      shadow="sm"
    >
      <Icon as={IconComponent} size={24} color={color} />
      <Text fontSize="2xl" fontWeight="black" color="gray.800" lineHeight="1">
        {val}
      </Text>
      <Text
        fontSize="xs"
        fontWeight="bold"
        color="gray.500"
        textTransform="uppercase"
        letterSpacing="wide"
      >
        {label}
      </Text>
    </VStack>
  );
}

export default function UserProfile({
  badges: propBadges = [],
  scores: propScores = {},
}: UserProfileProps) {
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Brand Gradient Constant
  const backgroundColor = "#f9f1e8";

  // --- STATE ---
  const [loading, setLoading] = useState(true);
  const [currentAuthUser, setCurrentAuthUser] = useState<any>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [showCoverMenu, setShowCoverMenu] = useState(false);

  // Profile Data State
  const [profileData, setProfileData] = useState<UserProfileData>({
    fullname: "Loading...",
    email: "...",
    username: "scameleon_user",
    avatarUrl: "src/assets/ProfilePlaceholder.png",
    coverUrl: "src/assets/CoverPlaceholder.png",
    bio: "Adapting to every environment.",
  });

  const [editForm, setEditForm] = useState<UserProfileData>(profileData);

  // --- GAME STATS STATE (Fetched from DB) ---
  const [fetchedBadges, setFetchedBadges] = useState<string[]>(propBadges);
  const [fetchedScores, setFetchedScores] = useState<LevelScores>(propScores);

  // --- 1. FETCH DATA FROM FIREBASE ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentAuthUser(user);
        const userDocRef = doc(db, "users", user.uid);

        try {
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            const firestoreData = docSnap.data();

            // 1. Setup Profile Info
            const fetchedName =
              firestoreData.fullname || user.displayName || "Scameleon User";

            const mergedData = {
              fullname: fetchedName,
              email: user.email || "No Email",
              username: firestoreData.username || "scameleon_user",
              avatarUrl:
                firestoreData.avatarUrl || "src/assets/ProfilePlaceholder.png",
              coverUrl:
                firestoreData.coverUrl || "src/assets/CoverPlaceholder.png",
              bio: firestoreData.bio || "Adapting to every environment.",
            };
            setProfileData(mergedData);
            setEditForm(mergedData);

            // 2. Setup Game Stats (The Fix!)
            // We fetch 'badges' from root and 'levelScores' from gameProgress
            const dbBadges = firestoreData.badges || [];
            const dbProgress = firestoreData.gameProgress || {};
            const dbScores = dbProgress.levelScores || {};

            setFetchedBadges(dbBadges);
            setFetchedScores(dbScores);
          } else {
            // New user defaults
            const defaultData = {
              fullname: user.displayName || "New User",
              email: user.email || "",
              username: "scameleon_user",
              avatarUrl: "src/assets/ProfilePlaceholder.png",
              coverUrl: "src/assets/CoverPlaceholder.png",
              bio: "Adapting to every environment.",
            };
            setProfileData(defaultData);
            setEditForm(defaultData);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          toast({
            title: "Error loading profile",
            status: "error",
            isClosable: true,
          });
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [toast]);

  // --- 2. STATS CALCULATION (Using Fetched Data) ---
  const stats = useMemo(() => {
    const totalScore = Object.values(fetchedScores).reduce((a, b) => a + b, 0);
    const completedLevels = Object.values(fetchedScores).filter(
      (s) => s >= PASS_SCORE
    ).length;

    const validBadges = fetchedBadges.filter((id) =>
      BADGES.some((b) => b.id === id)
    );

    return {
      totalScore,
      completedLevels,
      validBadgeCount: validBadges.length,
    };
  }, [fetchedScores, fetchedBadges]);

  // --- HANDLERS ---

  const handleEditToggle = () => {
    if (isEditing) {
      setEditForm(profileData);
      setShowCoverMenu(false);
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    if (!currentAuthUser) return;

    try {
      const dataToSave = {
        bio: editForm.bio,
        avatarUrl: editForm.avatarUrl,
        coverUrl: editForm.coverUrl,
        username: editForm.username,
      };

      await setDoc(doc(db, "users", currentAuthUser.uid), dataToSave, {
        merge: true,
      });

      setProfileData({
        ...profileData,
        ...dataToSave,
      });

      setIsEditing(false);
      setShowCoverMenu(false);

      toast({
        title: "Profile Updated",
        status: "success",
        duration: 3000,
        position: "top",
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Failed to save",
        description: "Please try again.",
        status: "error",
      });
    }
  };

  const handleChange = (field: keyof UserProfileData, value: string) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 800000) {
        toast({
          title: "Image too large",
          description: "Please use an image under 800KB",
          status: "warning",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm((prev) => ({
          ...prev,
          avatarUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <Flex minH="100vh" bg={backgroundColor} align="center" justify="center">
        <Spinner size="xl" color="orange.500" thickness="4px" />
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      minH="100vh"
      bg={backgroundColor}
      fontFamily="sans-serif"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleAvatarUpload}
        style={{ display: "none" }}
        accept="image/*"
      />

      <NavigationBarItems />

      <Box flex="1">
        <Container maxW="container.xl" pt={2} pb={4}>
          <UserProfileHeader
            title={"Profile"}
            imageSrc={"src/assets/PageCharacters/ScameleonProfile.png"}
          />
        </Container>

        <Container maxW="container.md" pb={12}>
          {/* --- CARD 1: PROFILE INFO --- */}
          <Box
            bg="white"
            borderRadius="2xl"
            boxShadow="xl"
            overflow="hidden"
            border="1px"
            borderColor="orange.100"
            mb={6}
          >
            {/* Cover Image */}
            <Box
              position="relative"
              h={{ base: "128px", sm: "192px" }}
              bg="gray.200"
              role="group"
            >
              <Image
                src={isEditing ? editForm.coverUrl : profileData.coverUrl}
                alt="Cover"
                w="full"
                h="full"
                objectFit="cover"
                fallbackSrc="https://via.placeholder.com/800x200"
              />
              {isEditing && (
                <Flex
                  position="absolute"
                  inset={0}
                  bg="blackAlpha.40"
                  align="center"
                  justify="center"
                  opacity={0}
                  _groupHover={{ opacity: 1 }}
                  transition="0.2s"
                >
                  <Button
                    leftIcon={<ImageIcon size={16} />}
                    onClick={() => setShowCoverMenu(!showCoverMenu)}
                    size="sm"
                    rounded="full"
                  >
                    Change Cover
                  </Button>
                </Flex>
              )}
              {isEditing && showCoverMenu && (
                <Box
                  position="absolute"
                  top={4}
                  right={4}
                  bg="white"
                  p={3}
                  borderRadius="xl"
                  shadow="xl"
                  zIndex={20}
                >
                  <SimpleGrid columns={3} spacing={2} w="200px">
                    {PRESET_COVERS.map((url, i) => (
                      <Box
                        key={i}
                        as="button"
                        onClick={() => handleChange("coverUrl", url)}
                        h="40px"
                        borderRadius="md"
                        overflow="hidden"
                        border="2px solid"
                        borderColor={
                          editForm.coverUrl === url
                            ? "orange.500"
                            : "transparent"
                        }
                      >
                        <Image src={url} w="full" h="full" objectFit="cover" />
                      </Box>
                    ))}
                  </SimpleGrid>
                </Box>
              )}
            </Box>

            <Box px={8} pb={8}>
              <Flex justify="space-between" align="flex-end" mt="-48px" mb={6}>
                {/* Avatar */}
                <Box position="relative" role="group">
                  <Box
                    w="120px"
                    h="120px"
                    borderRadius="full"
                    border="4px solid white"
                    bg="gray.100"
                    overflow="hidden"
                    boxShadow="md"
                  >
                    <Image
                      src={
                        isEditing ? editForm.avatarUrl : profileData.avatarUrl
                      }
                      w="full"
                      h="full"
                      objectFit="cover"
                    />
                    {isEditing && (
                      <Flex
                        onClick={() => fileInputRef.current?.click()}
                        position="absolute"
                        inset={0}
                        bg="blackAlpha.40"
                        align="center"
                        justify="center"
                        opacity={0}
                        _groupHover={{ opacity: 1 }}
                        cursor="pointer"
                      >
                        <Icon as={Upload} color="white" />
                      </Flex>
                    )}
                  </Box>
                </Box>
                {/* Edit Buttons */}
                <Box mb={2}>
                  {isEditing ? (
                    <HStack>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleEditToggle}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="orange"
                        leftIcon={<Save size={16} />}
                        onClick={handleSave}
                      >
                        Save
                      </Button>
                    </HStack>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      colorScheme="orange"
                      leftIcon={<Edit2 size={16} />}
                      onClick={handleEditToggle}
                    >
                      Edit Profile
                    </Button>
                  )}
                </Box>
              </Flex>

              {/* User Details */}
              <VStack align="stretch" spacing={4}>
                <Box>
                  <Heading size="lg" color="gray.800">
                    {profileData.fullname}
                  </Heading>
                  <Text color="gray.500" fontSize="sm">
                    {profileData.email}
                  </Text>
                  <Text color="orange.400" fontSize="sm" mt={1}>
                    @{profileData.username}
                  </Text>
                </Box>

                <Box>
                  <LabelText>About</LabelText>
                  {isEditing ? (
                    <Textarea
                      value={editForm.bio}
                      onChange={(e) => handleChange("bio", e.target.value)}
                      focusBorderColor="orange.400"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <Text color="gray.600">{profileData.bio}</Text>
                  )}
                </Box>
              </VStack>

              <Divider my={6} borderColor="orange.100" />

              {/* --- STATS SECTION --- */}
              <HStack justify="space-between" spacing={4}>
                <StatBox
                  icon={Star}
                  label="Total Score"
                  val={stats.totalScore}
                  color="orange.400"
                />
                <StatBox
                  icon={Trophy}
                  label="Levels Passed"
                  val={stats.completedLevels}
                  color="purple.500"
                />
                <StatBox
                  icon={Shield}
                  label="Badges"
                  val={stats.validBadgeCount}
                  color="pink.500"
                />
              </HStack>
            </Box>
          </Box>

          {/* --- SCALES CARD (Balance) --- */}
          {currentAuthUser && (
            <Flex justify="center" mb={6}>
              <ScalesCard userId={currentAuthUser.uid} />
            </Flex>
          )}

          {/* --- CARD 2: ACHIEVEMENTS LIST --- */}
          <Box
            bg="white"
            borderRadius="2xl"
            boxShadow="xl"
            border="1px"
            borderColor="orange.100"
            p={6}
          >
            <Flex align="center" gap={2} mb={6}>
              <Icon as={Award} color="orange.500" />
              <Heading size="md" color="gray.800">
                Achievements ({stats.validBadgeCount}/{BADGES.length})
              </Heading>
            </Flex>

            <VStack spacing={3} align="stretch">
              {BADGES.map((badge) => {
                // UPDATE: Use fetchedBadges here!
                const isUnlocked = fetchedBadges.includes(badge.id);
                const colorScheme = getBadgeColor(badge.type);

                return (
                  <Flex
                    key={badge.id}
                    bg="white"
                    border="1px solid"
                    borderColor={isUnlocked ? "orange.50" : "gray.100"}
                    borderRadius="xl"
                    p={4}
                    align="center"
                    justify="space-between"
                    opacity={isUnlocked ? 1 : 0.6}
                    transition="all 0.2s"
                    _hover={{
                      shadow: isUnlocked ? "md" : "none",
                      borderColor: isUnlocked ? `orange.200` : "gray.100",
                    }}
                  >
                    <HStack spacing={4}>
                      <Flex
                        w="14"
                        h="14"
                        borderRadius="lg"
                        bg={isUnlocked ? `${colorScheme}.50` : "gray.100"}
                        border="1px solid"
                        borderColor={
                          isUnlocked ? `${colorScheme}.100` : "transparent"
                        }
                        align="center"
                        justify="center"
                        p={2}
                      >
                        <Image
                          src={badge.icon}
                          alt={badge.name}
                          filter={
                            isUnlocked ? "none" : "grayscale(100%) opacity(0.5)"
                          }
                          w="full"
                          h="full"
                          objectFit="contain"
                          fallback={<Icon as={Award} color="gray.300" />}
                        />
                      </Flex>

                      <Box>
                        <HStack>
                          <Text
                            fontWeight="bold"
                            color={isUnlocked ? "gray.800" : "gray.500"}
                          >
                            {badge.name}
                          </Text>
                          {isUnlocked && (
                            <ChakraBadge
                              colorScheme={colorScheme}
                              variant="subtle"
                              fontSize="0.6em"
                            >
                              {badge.type}
                            </ChakraBadge>
                          )}
                        </HStack>
                        <Text fontSize="sm" color="gray.500">
                          {badge.desc}
                        </Text>
                      </Box>
                    </HStack>
                    <Box color={isUnlocked ? "green.400" : "gray.300"}>
                      {isUnlocked ? <Unlock size={20} /> : <Lock size={20} />}
                    </Box>
                  </Flex>
                );
              })}
            </VStack>
          </Box>
        </Container>
      </Box>
      <Footer />
    </Flex>
  );
}

const LabelText = ({ children }: { children: React.ReactNode }) => (
  <Text
    fontSize="xs"
    fontWeight="bold"
    color="orange.400"
    textTransform="uppercase"
    letterSpacing="wider"
    mb={1}
  >
    {children}
  </Text>
);
