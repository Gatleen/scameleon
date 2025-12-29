import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Container,
  Flex,
  Text,
  Textarea,
  Button,
  IconButton,
  Image,
  Avatar,
  Badge,
  VStack,
  HStack,
  Divider,
  Wrap,
  WrapItem,
  Card,
  CardBody,
  Tooltip,
  useToast,
  Spinner,
  Collapse,
  Input,
  InputGroup,
  InputRightElement,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  MessageSquare,
  Heart,
  Send,
  Filter,
  Upload,
  X,
  Trash2,
} from "lucide-react";

// --- FIREBASE IMPORTS ---
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  getDoc,
  increment,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase/firebaseConfig";

// --- IMPORTS ---
import NavBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import ForumHeader from "../components/headerCards/ForumHeader";

// ---------------- TYPES ----------------
interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  text: string;
  createdAt: any;
}

interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorUsername: string;
  createdAt: any;
  scamType: string;
  content: string;
  imageUrl?: string;
  likesCount: number;
  likedBy: string[];
  commentsCount: number;
}

interface CurrentUserProfile {
  uid: string;
  displayName: string;
  username: string;
  avatarUrl: string;
}

interface UsersCache {
  [key: string]: {
    avatarUrl?: string;
    fullname?: string;
    username?: string;
  };
}

const SCAM_TAGS = [
  "Others",
  "Phishing",
  "Crypto",
  "Shopping",
  "Romance",
  "Tech Support",
];

// ---------------- SUB-COMPONENT: COMMENTS SECTION ----------------
const CommentsSection = ({
  postId,
  currentUser,
  usersCache,
}: {
  postId: string;
  currentUser: CurrentUserProfile | null;
  usersCache: UsersCache;
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isSending, setIsSending] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const q = query(
      collection(db, "forum_posts", postId, "comments"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Comment[];
      setComments(data);
    });

    return () => unsubscribe();
  }, [postId]);

  const handleSendComment = async () => {
    if (!currentUser) return;
    if (!newComment.trim()) return;

    setIsSending(true);
    try {
      await addDoc(collection(db, "forum_posts", postId, "comments"), {
        authorId: currentUser.uid,
        authorName: currentUser.displayName,
        authorAvatar: currentUser.avatarUrl,
        text: newComment,
        createdAt: serverTimestamp(),
      });

      const postRef = doc(db, "forum_posts", postId);
      await updateDoc(postRef, {
        commentsCount: increment(1),
      });

      setNewComment("");
    } catch (error) {
      console.error("Error sending comment:", error);
      toast({ title: "Failed to send comment", status: "error" });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Box mt={4} bg="gray.50" p={{ base: 3, md: 4 }} borderRadius="md">
      <VStack align="stretch" spacing={3} mb={4} maxH="300px" overflowY="auto">
        {comments.map((comment) => {
          const liveAvatar =
            usersCache[comment.authorId]?.avatarUrl || comment.authorAvatar;
          const liveName =
            usersCache[comment.authorId]?.fullname || comment.authorName;

          return (
            <HStack key={comment.id} align="start" spacing={3}>
              <Avatar size="xs" src={liveAvatar} name={liveName} />
              <Box bg="white" p={2} borderRadius="md" shadow="sm" flex={1}>
                <Text fontSize="xs" fontWeight="bold" color="gray.700">
                  {liveName}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {comment.text}
                </Text>
              </Box>
            </HStack>
          );
        })}
        {comments.length === 0 && (
          <Text fontSize="sm" color="gray.400" textAlign="center">
            No comments yet. Be the first!
          </Text>
        )}
      </VStack>

      {currentUser && (
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            placeholder="Write a comment..."
            bg="white"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendComment()}
          />
          <InputRightElement width="3rem">
            <IconButton
              h="1.75rem"
              size="sm"
              aria-label="Send"
              icon={<Send size={14} />}
              onClick={handleSendComment}
              isLoading={isSending}
              colorScheme="orange"
              variant="ghost"
            />
          </InputRightElement>
        </InputGroup>
      )}
    </Box>
  );
};

// ---------------- MAIN COMPONENT ----------------
export default function ForumPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<CurrentUserProfile | null>(
    null
  );
  const [usersCache, setUsersCache] = useState<UsersCache>({});

  // Compose State
  const [content, setContent] = useState("");
  const [selectedTag, setSelectedTag] = useState("Others");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Responsive Hook: Check if we are on desktop
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(
    null
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const backgroundColor = "#f9f1e8";

  // --- 1. AUTH LISTENER ---
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setCurrentUser({
              uid: user.uid,
              displayName: data.fullname || user.displayName || "User",
              username: data.username || "scameleon_user",
              avatarUrl: data.avatarUrl || "",
            });
          } else {
            setCurrentUser({
              uid: user.uid,
              displayName: user.displayName || "User",
              username: "scameleon_user",
              avatarUrl: "",
            });
          }
        } catch (error) {
          console.error("Error fetching user details", error);
        }
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  // --- 2. POSTS LISTENER ---
  useEffect(() => {
    const q = query(
      collection(db, "forum_posts"),
      orderBy("createdAt", "desc")
    );
    const unsubscribePosts = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      setPosts(postsData);
      setLoading(false);
    });
    return () => unsubscribePosts();
  }, []);

  // --- 3. USERS CACHE LISTENER ---
  useEffect(() => {
    const q = collection(db, "users");
    const unsubscribeUsers = onSnapshot(q, (snapshot) => {
      const cache: UsersCache = {};
      snapshot.forEach((doc) => {
        cache[doc.id] = doc.data();
      });
      setUsersCache(cache);
    });
    return () => unsubscribeUsers();
  }, []);

  // --- HANDLERS ---
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 500000) {
        toast({
          title: "Image too large",
          description: "Max 500KB",
          status: "warning",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePostSubmit = async () => {
    if (!currentUser) return toast({ title: "Please login", status: "error" });
    if (!content.trim())
      return toast({ title: "Content empty", status: "warning" });

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "forum_posts"), {
        authorId: currentUser.uid,
        authorName: currentUser.displayName,
        authorUsername: currentUser.username,
        authorAvatar: currentUser.avatarUrl,
        content: content,
        scamType: selectedTag,
        imageUrl: selectedImage || null,
        likesCount: 0,
        likedBy: [],
        commentsCount: 0,
        createdAt: serverTimestamp(),
      });
      setContent("");
      setSelectedTag("Others");
      clearImage();
      setShowCompose(false);
      toast({ title: "Warning Posted", status: "success", duration: 3000 });
    } catch (error) {
      toast({ title: "Failed to post", status: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleLike = async (post: Post) => {
    if (!currentUser) return toast({ title: "Login to like", status: "info" });
    const postRef = doc(db, "forum_posts", post.id);
    const isLiked = post.likedBy?.includes(currentUser.uid);

    try {
      if (isLiked) {
        await updateDoc(postRef, {
          likesCount: increment(-1),
          likedBy: arrayRemove(currentUser.uid),
        });
      } else {
        await updateDoc(postRef, {
          likesCount: increment(1),
          likedBy: arrayUnion(currentUser.uid),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await deleteDoc(doc(db, "forum_posts", postId));
      toast({ title: "Post deleted", status: "info" });
    } catch (error) {
      toast({ title: "Error deleting", status: "error" });
    }
  };

  const toggleComments = (postId: string) => {
    if (activeCommentPostId === postId) {
      setActiveCommentPostId(null);
    } else {
      setActiveCommentPostId(postId);
    }
  };

  const formatTime = (timestamp: any) => {
    if (!timestamp) return "Just now";
    const date = timestamp.toDate();
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <Flex
      direction="column"
      minH="100vh"
      bg={backgroundColor}
      overflowX="hidden"
    >
      <Box mt={{ base: 2, md: 4 }}>
        <NavBar />
      </Box>

      <Box flex="1" py={8} px={{ base: 4, md: 8 }}>
        <Container maxW="container.xl" p={0}>
          <Box mb={{ base: 6, md: 10 }}>
            <ForumHeader
              title="Forum"
              imageSrc="src/assets/PageCharacters/ScameleonForum.png"
            />
          </Box>

          <Container maxW="container.md" px={0}>
            {/* COMPOSE AREA */}
            {currentUser && (
              // Collapse controlled by button on mobile, always TRUE on desktop
              <Collapse in={showCompose || isDesktop} animateOpacity>
                <Box mb={8}>
                  <Card
                    borderRadius="xl"
                    shadow="sm"
                    borderWidth="1px"
                    borderColor="orange.100"
                  >
                    <CardBody>
                      <Flex gap={4}>
                        <Avatar
                          src={currentUser.avatarUrl}
                          name={currentUser.displayName}
                          bg="orange.100"
                          display={{ base: "none", sm: "block" }} // Hide avatar on small mobile to save space
                        />
                        <Box flex={1}>
                          <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder={`Warn the community, @${currentUser.username}...`}
                            bg="gray.50"
                            border="none"
                            _focus={{ bg: "white", boxShadow: "outline" }}
                            resize="none"
                            mb={3}
                            rows={3}
                          />
                          {selectedImage && (
                            <Box position="relative" mb={3} width="fit-content">
                              <Image
                                src={selectedImage}
                                alt="Preview"
                                borderRadius="md"
                                maxH="150px"
                                objectFit="contain"
                                bg="gray.100"
                              />
                              <IconButton
                                aria-label="Remove"
                                icon={<X size={14} />}
                                size="xs"
                                position="absolute"
                                top={1}
                                right={1}
                                colorScheme="red"
                                onClick={clearImage}
                                isRound
                              />
                            </Box>
                          )}
                          <Wrap spacing={2} mb={4}>
                            {SCAM_TAGS.map((tag) => (
                              <WrapItem key={tag}>
                                <Button
                                  size="xs"
                                  borderRadius="full"
                                  variant={
                                    selectedTag === tag ? "solid" : "outline"
                                  }
                                  colorScheme={
                                    selectedTag === tag ? "orange" : "gray"
                                  }
                                  onClick={() => setSelectedTag(tag)}
                                >
                                  {tag}
                                </Button>
                              </WrapItem>
                            ))}
                          </Wrap>
                          <Flex justify="space-between" align="center">
                            <input
                              type="file"
                              ref={fileInputRef}
                              style={{ display: "none" }}
                              accept="image/*"
                              onChange={handleImageUpload}
                            />
                            <Button
                              size="sm"
                              variant="ghost"
                              colorScheme="orange"
                              leftIcon={<Upload size={16} />}
                              onClick={() => fileInputRef.current?.click()}
                            >
                              Upload Proof
                            </Button>
                            <Button
                              size="sm"
                              colorScheme="orange"
                              leftIcon={<Send size={16} />}
                              onClick={handlePostSubmit}
                              isLoading={isSubmitting}
                              px={6}
                            >
                              Post
                            </Button>
                          </Flex>
                        </Box>
                      </Flex>
                    </CardBody>
                  </Card>
                </Box>
              </Collapse>
            )}

            {/* FEED HEADER */}
            <Flex justify="space-between" align="center" mb={4}>
              <HStack spacing={2} color="orange.800">
                <Filter size={16} />
                <Text fontSize="sm" fontWeight="semibold">
                  Recent Activity
                </Text>
              </HStack>
              <Badge
                colorScheme="orange"
                variant="solid"
                borderRadius="full"
                px={3}
              >
                {posts.length} posts
              </Badge>
            </Flex>

            {/* POSTS LIST */}
            {loading ? (
              <Flex justify="center" py={10}>
                <Spinner color="orange.500" />
              </Flex>
            ) : (
              <VStack spacing={4} align="stretch">
                {posts.map((post) => {
                  const isOwner = currentUser?.uid === post.authorId;
                  const isLiked = post.likedBy?.includes(
                    currentUser?.uid || ""
                  );
                  const isCommentsOpen = activeCommentPostId === post.id;

                  const liveAvatar =
                    usersCache[post.authorId]?.avatarUrl || post.authorAvatar;
                  const liveName =
                    usersCache[post.authorId]?.fullname || post.authorName;
                  const liveUsername =
                    usersCache[post.authorId]?.username || post.authorUsername;

                  return (
                    <Card
                      key={post.id}
                      borderRadius="xl"
                      shadow="sm"
                      borderWidth="1px"
                      borderColor="gray.100"
                    >
                      <CardBody>
                        <Flex justify="space-between" mb={3}>
                          <HStack spacing={3}>
                            <Avatar
                              size="sm"
                              src={liveAvatar}
                              name={liveName}
                            />
                            <Box>
                              <HStack>
                                <Text
                                  fontWeight="bold"
                                  fontSize="sm"
                                  color="gray.800"
                                >
                                  {liveName}
                                </Text>
                                <Text fontSize="xs" color="gray.400">
                                  @{liveUsername}
                                </Text>
                              </HStack>
                              <HStack fontSize="xs" color="gray.500">
                                <Text>{formatTime(post.createdAt)}</Text>
                                <Text>•</Text>
                                <Badge
                                  colorScheme="orange"
                                  variant="subtle"
                                  borderRadius="md"
                                >
                                  {post.scamType}
                                </Badge>
                              </HStack>
                            </Box>
                          </HStack>
                          {isOwner && (
                            <IconButton
                              aria-label="Delete"
                              icon={<Trash2 size={16} />}
                              size="sm"
                              variant="ghost"
                              colorScheme="red"
                              onClick={() => handleDelete(post.id)}
                            />
                          )}
                        </Flex>

                        <Text
                          mb={4}
                          color="gray.700"
                          whiteSpace="pre-wrap"
                          wordBreak="break-word"
                        >
                          {post.content}
                        </Text>

                        {post.imageUrl && (
                          <Box
                            bg="gray.50"
                            borderRadius="md"
                            overflow="hidden"
                            mb={4}
                            borderWidth="1px"
                            borderColor="gray.100"
                            display="flex"
                            justifyContent="center"
                          >
                            <Image
                              src={post.imageUrl}
                              maxH={{ base: "200px", md: "350px" }} // Responsive Image Height
                              w="auto"
                              maxW="100%"
                              objectFit="contain"
                              alt="Post attachment"
                            />
                          </Box>
                        )}

                        <Divider mb={3} />

                        <Flex justify="space-between">
                          <HStack spacing={4}>
                            <Button
                              size="sm"
                              variant="ghost"
                              leftIcon={
                                <Heart
                                  size={16}
                                  fill={isLiked ? "#E53E3E" : "none"}
                                  color={isLiked ? "#E53E3E" : "currentColor"}
                                />
                              }
                              colorScheme={isLiked ? "red" : "gray"}
                              onClick={() => toggleLike(post)}
                            >
                              {post.likesCount || 0}
                            </Button>

                            <Button
                              size="sm"
                              variant={isCommentsOpen ? "solid" : "ghost"}
                              colorScheme={isCommentsOpen ? "orange" : "gray"}
                              leftIcon={<MessageSquare size={16} />}
                              onClick={() => toggleComments(post.id)}
                            >
                              {post.commentsCount || 0}
                            </Button>
                          </HStack>
                        </Flex>

                        <Collapse in={isCommentsOpen} animateOpacity>
                          <CommentsSection
                            postId={post.id}
                            currentUser={currentUser}
                            usersCache={usersCache}
                          />
                        </Collapse>
                      </CardBody>
                    </Card>
                  );
                })}
              </VStack>
            )}
          </Container>
        </Container>
      </Box>

      {/* Footer stays at bottom due to flex-1 on main box */}
      <Box width="100%" mt="auto">
        <Footer />
      </Box>

      {/* Mobile Floating Action Button for Compose */}
      {currentUser && (
        <Tooltip label="Post a warning">
          <IconButton
            icon={showCompose ? <X size={24} /> : <MessageSquare size={24} />}
            aria-label="Compose"
            colorScheme="orange"
            size="lg"
            isRound
            position="fixed"
            bottom={6}
            right={6}
            shadow="2xl"
            zIndex={30}
            // Show only on mobile
            display={{ base: "flex", md: "none" }}
            onClick={() => {
              setShowCompose(!showCompose);
              if (!showCompose) window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </Tooltip>
      )}
    </Flex>
  );
}
