import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  Button,
  Image,
  Badge,
  Icon,
  Container,
  Avatar,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Stack,
  AspectRatio,
  Center,
  Textarea,
} from "@chakra-ui/react";
import { Package, Truck } from "lucide-react";
import STORE_MERCH from "../data/storemerch.json";

// --- FIREBASE IMPORTS ---
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// --- COMPONENT IMPORTS ---
import NavigationBarItems from "../components/NavigationBar";
import Footer from "../components/Footer";
import StoreHeader from "../components/headerCards/StoreHeader";
import ScalesCard from "../components/ScalesCard";

// --- FIXED ASSET IMPORTS ---
// 1. Static Page Assets
import scalesIcon from "../assets/ScalesIcon.png";
import storeBanner from "../assets/PageCharacters/ScameleonStore.png";

// 2. Merch Assets (The Map we created in Step 1)
import { MERCH_IMAGES } from "../data/merchAssets";

// --- SUB-COMPONENTS ---

const ProductCard = ({
  product,
  onRedeem,
  userCoins,
}: {
  product: any;
  onRedeem: any;
  userCoins: number;
}) => {
  const canAfford = userCoins >= product.price;
  const inStock = product.stock > 0;

  return (
    <Flex
      direction="column"
      bg="white"
      borderWidth="1px"
      borderColor="orange.100"
      borderRadius="xl"
      overflow="hidden"
      _hover={{ shadow: "xl", transform: "translateY(-4px)" }}
      transition="all 0.3s"
      role="group"
      h="100%"
    >
      <Box position="relative" h="48" w="full" bg="gray.100">
        <Image
          src={product.images && product.images[0]}
          fallbackSrc="https://via.placeholder.com/400x300?text=No+Image"
          alt={product.name}
          w="full"
          h="full"
          objectFit="cover"
          _groupHover={{ transform: "scale(1.05)" }}
          transition="transform 0.3s"
        />

        {!inStock && (
          <Flex
            position="absolute"
            inset="0"
            bg="blackAlpha.700"
            align="center"
            justify="center"
            zIndex="10"
          >
            <Text
              color="white"
              fontWeight="bold"
              fontSize="xl"
              transform="rotate(-12deg)"
              borderWidth="2px"
              borderColor="white"
              px={4}
              py={1}
            >
              SOLD OUT
            </Text>
          </Flex>
        )}

        {product.images && product.images.length > 1 && (
          <Badge
            position="absolute"
            bottom={2}
            right={2}
            variant="solid"
            colorScheme="blackAlpha"
            borderRadius="full"
            px={2}
            fontSize="xs"
          >
            +{product.images.length - 1} more
          </Badge>
        )}
      </Box>

      <Flex direction="column" flex="1" p={5}>
        <Heading size="md" mb={1} color="gray.800" noOfLines={1}>
          {product.name}
        </Heading>
        <Text fontSize="sm" color="gray.500" mb={4} noOfLines={2}>
          {product.description}
        </Text>

        <Box mt="auto">
          <Flex justify="space-between" align="center" mb={4}>
            <Flex
              align="center"
              color="orange.600"
              fontWeight="bold"
              fontSize="lg"
            >
              <Image
                src={scalesIcon} // Fixed Import
                boxSize="20px"
                mr={2}
                alt="Coin"
                fallbackSrc="https://via.placeholder.com/20?text=$"
              />
              {product.price}
            </Flex>
            <Text fontSize="xs" color="gray.400">
              {inStock ? `${product.stock} left` : "Out of stock"}
            </Text>
          </Flex>

          <Button
            onClick={() => onRedeem(product)}
            isDisabled={!inStock || !canAfford}
            bg="#e3992e"
            color="white"
            rounded="xl"
            _hover={{ bg: "#c78628" }}
            width="full"
            size="sm"
          >
            {inStock
              ? canAfford
                ? "Redeem Now"
                : "Need more coins"
              : "Out of Stock"}
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

// --- MAIN COMPONENT ---

export default function Store() {
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [realBalance, setRealBalance] = useState<number>(0);
  const [userProfilePic, setUserProfilePic] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  const [shippingAddress, setShippingAddress] = useState<string>("");
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  // --- FIX: Initialize products by mapping JSON to Real Imports ---
  const [products, setProducts] = useState(() => {
    return STORE_MERCH.map((item) => ({
      ...item,
      // Use the imported images from our map, fallback to empty array
      images: MERCH_IMAGES[item.id] || [],
    }));
  });

  const backgroundColor = "#f9f1e8";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const toast = useToast();

  useEffect(() => {
    const auth = getAuth();
    let unsubscribeFirestore: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserId(user.uid);
        setUserName(user.displayName || "Explorer");

        try {
          const userRef = doc(db, "users", user.uid);

          unsubscribeFirestore = onSnapshot(
            userRef,
            (docSnap) => {
              if (docSnap.exists()) {
                const data = docSnap.data();
                setRealBalance(data.scales || 0);

                if (data.avatarUrl) {
                  setUserProfilePic(data.avatarUrl);
                }
                if (data.displayName) {
                  setUserName(data.displayName);
                }
                if (data.shippingAddress) {
                  setShippingAddress(data.shippingAddress);
                }
              }
            },
            (error) => {
              console.error("Error listening to user data:", error);
            }
          );
        } catch (e) {
          console.error("Error setting up firestore listener", e);
        }
      } else {
        setCurrentUserId("");
        setRealBalance(0);
        setUserName("");
        setUserProfilePic("");
        setShippingAddress("");
        if (unsubscribeFirestore) unsubscribeFirestore();
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeFirestore) unsubscribeFirestore();
    };
  }, []);

  const handleOpenRedeem = (product: any) => {
    setSelectedProduct(product);
    setActiveImageIndex(0);
    if (!shippingAddress) setIsEditingAddress(true);
    else setIsEditingAddress(false);
    onOpen();
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setSelectedProduct(null), 200);
  };

  const executeRedemption = async () => {
    if (!selectedProduct || !currentUserId) return;

    if (!shippingAddress.trim()) {
      toast({
        title: "Shipping Address Required",
        description: "Please enter a valid shipping address.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      setIsEditingAddress(true);
      return;
    }

    setIsProcessing(true);

    const currentProductIndex = products.findIndex(
      (p) => p.id === selectedProduct.id
    );
    const currentProduct = products[currentProductIndex];

    if (!currentProduct || currentProduct.stock <= 0) {
      toast({
        title: "Error",
        description: "Product went out of stock!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsProcessing(false);
      handleClose();
      return;
    }

    if (realBalance < currentProduct.price) {
      toast({
        title: "Insufficient coins",
        description: "You need more coins to purchase this item.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsProcessing(false);
      handleClose();
      return;
    }

    try {
      const userRef = doc(db, "users", currentUserId);
      const newBalance = realBalance - currentProduct.price;

      await updateDoc(userRef, {
        scales: newBalance,
        shippingAddress: shippingAddress,
      });

      setRealBalance(newBalance);

      const updatedProducts = [...products];
      updatedProducts[currentProductIndex] = {
        ...currentProduct,
        stock: currentProduct.stock - 1,
      };
      setProducts(updatedProducts);

      toast({
        title: "Order Confirmed!",
        description: `Your ${currentProduct.name} is on the way!`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      console.error("Purchase failed", error);
      toast({
        title: "Transaction Failed",
        description: "Could not complete purchase. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    setIsProcessing(false);
    handleClose();
  };

  return (
    <Flex
      direction="column"
      minH="100vh"
      bg={backgroundColor}
      overflowX="hidden"
    >
      <Box mt={{ base: 2, md: 4 }}>
        <NavigationBarItems />
      </Box>

      {/* STICKY HEADER */}
      <Box
        bg="whiteAlpha.900"
        backdropFilter="blur(10px)"
        shadow="sm"
        position="sticky"
        top={0}
        zIndex={40}
        borderBottom="1px solid"
        borderColor="orange.100"
      >
        <Container maxW="7xl" h={16} px={{ base: 4, md: 8 }}>
          <Flex h="full" align="center" justify="space-between">
            <Flex align="center" gap={3}>
              <Flex bg="orange.500" p={2} borderRadius="md" color="white">
                <Icon as={Package} boxSize={{ base: 5, md: 6 }} />
              </Flex>
              <Box>
                <Heading size="sm" lineHeight="tight" color="gray.800">
                  Scameleon Store
                </Heading>
                <Text
                  fontSize="xs"
                  color="gray.600"
                  display={{ base: "none", md: "block" }}
                >
                  Spend your hard-earned scales
                </Text>
              </Box>
            </Flex>

            {/* Right: Balance & Avatar */}
            <Flex align="center" gap={{ base: 2, md: 4 }}>
              <Box textAlign="right">
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  color="gray.500"
                  textTransform="uppercase"
                  display={{ base: "none", sm: "block" }}
                >
                  Balance
                </Text>
                <Flex
                  align="center"
                  justify="flex-end"
                  color="orange.600"
                  gap={1}
                >
                  <Image
                    src={scalesIcon} // Fixed Import
                    boxSize={{ base: "24px", md: "28px" }}
                    alt="Coin"
                    fallbackSrc="https://via.placeholder.com/24?text=$"
                  />
                  <Text fontSize={{ base: "md", md: "xl" }} fontWeight="black">
                    {realBalance.toLocaleString()}
                  </Text>
                </Flex>
              </Box>

              <Avatar
                size={{ base: "sm", md: "md" }}
                name={userName}
                src={userProfilePic}
                bg="orange.100"
                color="orange.700"
                borderWidth="2px"
                borderColor="orange.400"
              />
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* MAIN CONTENT */}
      <Box flex="1">
        <Container maxW="7xl" py={{ base: 6, md: 12 }} px={{ base: 4, md: 8 }}>
          <Box mb={8}>
            <StoreHeader
              title="Store"
              imageSrc={storeBanner} // Fixed Import
            />
          </Box>

          <Center mb={12}>
            {currentUserId ? (
              <ScalesCard
                key={realBalance}
                userId={currentUserId}
                scalesImage={scalesIcon} // Fixed Import
              />
            ) : (
              <Text>Please log in to view your balance</Text>
            )}
          </Center>

          {/* Responsive Product Grid */}
          <Grid
            templateColumns={{
              base: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={{ base: 6, md: 8 }}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onRedeem={handleOpenRedeem}
                userCoins={realBalance}
              />
            ))}
          </Grid>
        </Container>
      </Box>

      <Box width="100%" mt="auto">
        <Footer />
      </Box>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        size={{ base: "full", md: "md" }}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
        <ModalContent
          borderRadius={{ base: 0, md: "2xl" }}
          overflow="hidden"
          my={{ base: 0, md: "auto" }}
        >
          <ModalHeader borderBottomWidth="1px">Confirm Order</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6} pt={4}>
            {selectedProduct && (
              <Stack spacing={4}>
                <Box>
                  <AspectRatio
                    ratio={16 / 9}
                    mb={2}
                    bg="gray.100"
                    borderRadius="xl"
                    overflow="hidden"
                  >
                    <Image
                      src={selectedProduct.images[activeImageIndex]}
                      fallbackSrc="https://via.placeholder.com/400x300?text=No+Image"
                      alt={selectedProduct.name}
                      objectFit="cover"
                    />
                  </AspectRatio>

                  {selectedProduct.images.length > 1 && (
                    <Flex gap={2} overflowX="auto" pb={1}>
                      {selectedProduct.images.map(
                        (img: string, idx: number) => (
                          <Box
                            as="button"
                            key={idx}
                            onClick={() => setActiveImageIndex(idx)}
                            boxSize={14}
                            borderRadius="lg"
                            overflow="hidden"
                            borderWidth="2px"
                            flexShrink={0}
                            borderColor={
                              activeImageIndex === idx
                                ? "orange.400"
                                : "transparent"
                            }
                          >
                            <Image
                              src={img}
                              w="full"
                              h="full"
                              objectFit="cover"
                            />
                          </Box>
                        )
                      )}
                    </Flex>
                  )}
                </Box>

                <Text textAlign="center" color="gray.700">
                  Redeem{" "}
                  <Text as="span" fontWeight="bold">
                    {selectedProduct.name}
                  </Text>{" "}
                  for{" "}
                  <Text as="span" fontWeight="bold" color="orange.600">
                    {selectedProduct.price} scales
                  </Text>
                  ?
                </Text>

                {/* --- ADDRESS SECTION --- */}
                <Box
                  bg="orange.50"
                  p={4}
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor="orange.100"
                >
                  <Flex
                    align="center"
                    gap={2}
                    color="orange.800"
                    fontWeight="bold"
                    fontSize="sm"
                    mb={2}
                  >
                    <Icon as={Truck} size={16} /> Shipping Address:
                  </Flex>

                  {isEditingAddress ? (
                    <Box>
                      <Textarea
                        bg="white"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        placeholder="Enter your street address, city, and zip code..."
                        size="sm"
                        rows={3}
                        mb={2}
                      />
                      <Button
                        size="xs"
                        colorScheme="orange"
                        variant="solid"
                        onClick={() => setIsEditingAddress(false)}
                      >
                        Done
                      </Button>
                    </Box>
                  ) : (
                    <Box>
                      <Box
                        pl={6}
                        borderLeftWidth="2px"
                        borderColor="orange.300"
                        ml={1}
                      >
                        <Text fontSize="sm" fontWeight="bold" color="gray.700">
                          {userName || "Cam the Chameleon"}
                        </Text>
                        <Text
                          fontSize="sm"
                          color="gray.600"
                          whiteSpace="pre-wrap"
                        >
                          {shippingAddress || "No address set. Please add one!"}
                        </Text>
                      </Box>
                      <Button
                        variant="link"
                        size="xs"
                        colorScheme="orange"
                        ml={7}
                        mt={2}
                        onClick={() => setIsEditingAddress(true)}
                      >
                        {shippingAddress ? "Edit Address" : "Add Address"}
                      </Button>
                    </Box>
                  )}
                </Box>

                <Flex
                  bg="gray.50"
                  p={3}
                  borderRadius="lg"
                  justify="space-between"
                  fontSize="sm"
                >
                  <Text color="gray.500">Balance after order:</Text>
                  <Text fontWeight="bold" color="orange.700">
                    {realBalance - selectedProduct.price}
                  </Text>
                </Flex>
              </Stack>
            )}
          </ModalBody>

          <ModalFooter bg="gray.50" borderTopWidth="1px">
            <Button
              variant="ghost"
              mr={3}
              onClick={handleClose}
              isDisabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              colorScheme="orange"
              onClick={executeRedemption}
              isLoading={isProcessing}
            >
              Confirm & Ship
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
