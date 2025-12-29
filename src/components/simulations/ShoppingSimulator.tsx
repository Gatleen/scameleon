import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Image,
  VStack,
  HStack,
  Heading,
  Badge,
} from "@chakra-ui/react";
import { ShoppingCart, Search, MessageCircle } from "lucide-react";
import { ASSETS } from "../../data/simulations/assets";
import {
  SHOPPING_CLUES,
  SHOPPING_PRODUCT,
  SHOPPING_REVIEWS,
} from "../../data/simulations/shoppingData";
import { playAudio } from "../../utils/audioUtils";

export const ShoppingSimulator = ({
  onComplete,
}: {
  onComplete: () => void;
}) => {
  const [cluesFound, setCluesFound] = useState<string[]>([]);

  const handleClueClick = (id: string) => {
    if (!cluesFound.includes(id)) {
      setCluesFound((prev) => [...prev, id]);
      playAudio(ASSETS.correct);
    }
  };

  const isClueFound = (id: string) => cluesFound.includes(id);

  return (
    <Flex
      direction="column"
      h="full"
      bg="gray.100"
      maxW="4xl"
      mx="auto"
      shadow="2xl"
      position="relative"
      overflow="hidden"
    >
      {/* Shopee-style Header */}
      <Flex
        bg="#ee4d2d"
        p={4}
        color="white"
        align="center"
        gap={4}
        position="sticky"
        top={0}
        zIndex={20}
        shadow="md"
      >
        <HStack fontSize="xl" fontWeight="bold" fontStyle="italic">
          <ShoppingCart /> <Text>Shopeee</Text>
        </HStack>
        <Flex
          flex={1}
          bg="white"
          rounded="md"
          p={2}
          color="gray.400"
          fontSize="sm"
          justify="space-between"
          align="center"
        >
          <Text>{SHOPPING_PRODUCT.title.substring(0, 30)}...</Text>
          <Search size={16} />
        </Flex>
      </Flex>

      {/* Content */}
      <Box flex={1} overflowY="auto" position="relative" pb={20}>
        {/* Product Hero */}
        <Box bg="white" p={4} mb={2} shadow="sm">
          <Flex direction={{ base: "column", md: "row" }} gap={4}>
            {/* Image + Badge Area */}
            <Box
              w={{ base: "full", md: "1/3" }}
              bg="gray.200"
              position="relative"
              cursor="pointer"
              role="group"
              onClick={() => handleClueClick("badge")}
              sx={{ aspectRatio: "1/1" }}
            >
              <Image
                src={ASSETS.iphone}
                alt="Product"
                w="full"
                h="full"
                objectFit="cover"
              />
              {/* Fake Badge */}
              <Flex
                position="absolute"
                top={0}
                left={0}
                bg="#ee4d2d"
                color="white"
                fontSize="xs"
                px={2}
                py={1}
                align="center"
                gap={1}
                borderWidth={isClueFound("badge") ? "4px" : "0px"}
                borderColor="red.500"
              >
                <Text fontWeight="bold">Mall</Text>
              </Flex>
              {isClueFound("badge") && (
                <Box
                  position="absolute"
                  top={8}
                  left={0}
                  bg="red.600"
                  color="white"
                  fontSize="xs"
                  p={1}
                  zIndex={30}
                  fontWeight="bold"
                  rounded="sm"
                >
                  FAKE BADGE
                </Box>
              )}
            </Box>

            <Box flex={1}>
              <Heading size="md" fontWeight="medium" mb={2}>
                {SHOPPING_PRODUCT.title}
              </Heading>

              {/* Price Area */}
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                mb={4}
                cursor="pointer"
                p={2}
                rounded="md"
                bg={isClueFound("price") ? "red.100" : "transparent"}
                borderWidth={isClueFound("price") ? "2px" : "0px"}
                borderColor="red.500"
                _hover={{ bg: isClueFound("price") ? "red.100" : "gray.50" }}
                onClick={() => handleClueClick("price")}
              >
                <Text color="#ee4d2d" fontSize="2xl" fontWeight="medium">
                  {SHOPPING_PRODUCT.price}
                </Text>
                <Text
                  color="gray.400"
                  fontSize="sm"
                  textDecoration="line-through"
                >
                  {SHOPPING_PRODUCT.originalPrice}
                </Text>
                <Badge colorScheme="orange" variant="solid">
                  95% OFF
                </Badge>
                {isClueFound("price") && (
                  <Text color="red.600" fontWeight="bold" fontSize="xs" ml={2}>
                    TOO GOOD TO BE TRUE
                  </Text>
                )}
              </Box>

              <HStack spacing={4} mb={4}>
                <Button
                  flex={1}
                  variant="outline"
                  borderColor="#ee4d2d"
                  color="#ee4d2d"
                  bg="#ee4d2d1a"
                  leftIcon={<MessageCircle size={16} />}
                  _hover={{ bg: "#ee4d2d33" }}
                >
                  Chat Now
                </Button>
                <Button
                  flex={1}
                  bg="#ee4d2d"
                  color="white"
                  _hover={{ bg: "#d73211" }}
                >
                  Buy Now
                </Button>
              </HStack>
            </Box>
          </Flex>
        </Box>

        {/* Seller Info */}
        <Flex bg="white" p={4} mb={2} shadow="sm" align="center" gap={4}>
          <Box w={12} h={12} rounded="full" overflow="hidden" borderWidth="1px">
            <Image
              src={ASSETS.shop_profile}
              alt="Shop"
              w="full"
              h="full"
              objectFit="cover"
            />
          </Box>
          <Box>
            <Text fontWeight="bold">{SHOPPING_PRODUCT.shopName}</Text>
            <Text fontSize="xs" color="gray.500">
              {SHOPPING_PRODUCT.shopStatus}
            </Text>
          </Box>
          <Button
            ml="auto"
            variant="outline"
            borderColor="#ee4d2d"
            color="#ee4d2d"
            size="sm"
            _hover={{ bg: "red.50" }}
          >
            View Shop
          </Button>
        </Flex>

        {/* Description */}
        <Box bg="white" p={4} mb={2} shadow="sm">
          <Text bg="gray.50" p={2} fontWeight="bold" mb={2} fontSize="sm">
            Product Description
          </Text>
          <VStack align="stretch" fontSize="sm" color="gray.600" spacing={2}>
            <Text>Stock: {SHOPPING_PRODUCT.description.stock}</Text>
            <Text>Ships From: {SHOPPING_PRODUCT.description.shipFrom}</Text>
            <Text>{SHOPPING_PRODUCT.description.text}</Text>

            {/* Chat Clue */}
            <Text
              fontWeight="bold"
              color="red.500"
              fontStyle="italic"
              cursor="pointer"
              p={1}
              display="inline-block"
              bg={isClueFound("chat") ? "red.100" : "transparent"}
              borderWidth={isClueFound("chat") ? "2px" : "0px"}
              borderColor="red.500"
              _hover={{ bg: "gray.100" }}
              onClick={() => handleClueClick("chat")}
            >
              "{SHOPPING_PRODUCT.description.chatText}"
            </Text>
            {isClueFound("chat") && (
              <Text color="red.600" fontSize="xs" fontWeight="bold">
                OFF-PLATFORM DEAL (DANGER)
              </Text>
            )}
          </VStack>
        </Box>

        {/* Reviews */}
        <Box
          p={4}
          shadow="sm"
          pb={8}
          cursor="pointer"
          bg={isClueFound("reviews") ? "red.50" : "white"}
          borderWidth={isClueFound("reviews") ? "2px" : "0px"}
          borderColor="red.500"
          onClick={() => handleClueClick("reviews")}
        >
          <Heading size="sm" mb={4} display="flex" alignItems="center" gap={2}>
            Product Ratings{" "}
            {isClueFound("reviews") && (
              <Text as="span" color="red.600" fontSize="xs">
                (FAKE REVIEWS DETECTED)
              </Text>
            )}
          </Heading>
          <VStack spacing={4} align="stretch">
            {SHOPPING_REVIEWS.map((r, i) => (
              <Box
                key={i}
                borderBottomWidth="1px"
                pb={2}
                _last={{ borderBottomWidth: 0 }}
              >
                <Flex fontSize="xs" fontWeight="bold" justify="space-between">
                  <Text>{r.user}</Text>
                  <Text color="gray.400" fontWeight="normal">
                    {r.date}
                  </Text>
                </Flex>
                <Text color="yellow.500" fontSize="xs">
                  ★★★★★
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {r.text}
                </Text>
              </Box>
            ))}
          </VStack>
        </Box>
      </Box>

      {/* Footer Status */}
      <Flex
        bg="white"
        borderTopWidth="1px"
        p={4}
        justify="space-between"
        align="center"
        zIndex={30}
        position="absolute"
        bottom={0}
        w="full"
      >
        <Text fontSize="sm">
          Clues found:{" "}
          <Text as="span" fontWeight="bold" color="#ee4d2d">
            {cluesFound.length}/{SHOPPING_CLUES.length}
          </Text>
        </Text>
        {cluesFound.length === SHOPPING_CLUES.length ? (
          <Button
            onClick={onComplete}
            bg="#ee4d2d"
            color="white"
            _hover={{ bg: "#d73211" }}
          >
            Finish Investigation
          </Button>
        ) : (
          <Button onClick={onComplete} variant="ghost" color="gray.500">
            Give Up
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
