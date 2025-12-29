import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link, // Added Link here for Chakra styling
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
// Removed 'Link', kept 'Link as RouterLink' for navigation behavior
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { registerNewUser } from "../firebase/auth";

const CreateUserAccount = () => {
  const [accountData, setAccountData] = useState({
    fullName: "",
    username: "",
    emailAddress: "",
    password: "",
    confirmedPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountData({ ...accountData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { fullName, username, emailAddress, password, confirmedPassword } =
      accountData;

    if (password !== confirmedPassword) {
      toast({
        duration: 4000,
        isClosable: true,
        status: "error",
        title: "Password Mismatch! ⚠️",
      });
      return;
    }

    try {
      setIsLoading(true);
      await registerNewUser(fullName, username, emailAddress, password);
      toast({
        duration: 4000,
        isClosable: true,
        status: "success",
        title: "Scameleon Account Created Successfully! ✨",
      });
      navigate("/sign-in");
    } catch (error: any) {
      toast({
        description: error.message,
        duration: 4000,
        isClosable: true,
        status: "error",
        title: "There was an error creating your account.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formBackground = useColorModeValue("white", "gray.500");

  return (
    <Flex
      align={"center"}
      bg={"#FFF9C4"}
      justify={"center"}
      minHeight={"100vh"}
      p={{ base: 4, md: 8 }}
    >
      <Box
        bg={formBackground}
        borderRadius="xl"
        boxShadow="lg"
        maxWidth="lg"
        p={{ base: 6, md: 8 }}
        w="full"
      >
        <Heading
          color="black"
          fontSize={{ base: "xl", md: "2xl" }}
          mb={6}
          textAlign={"center"}
        >
          Enter your details below:
        </Heading>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="fullName" isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input
                type="text"
                name="fullName"
                value={accountData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                _placeholder={{ fontSize: "sm", color: "gray.500" }}
                _focus={{
                  borderColor: "#FFC300",
                  boxShadow: "0 0 0 1px #FFC300",
                }}
                required
                minLength={2}
                maxLength={24}
              />
            </FormControl>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                value={accountData.username}
                onChange={handleChange}
                placeholder="Enter a username"
                _placeholder={{ fontSize: "sm", color: "gray.500" }}
                _focus={{
                  borderColor: "#FFC300",
                  boxShadow: "0 0 0 1px #FFC300",
                }}
                required
                minLength={6}
                maxLength={14}
              />
            </FormControl>
            <FormControl id="emailAddress" isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                name="emailAddress"
                value={accountData.emailAddress}
                onChange={handleChange}
                placeholder="Enter your email address"
                _placeholder={{ fontSize: "sm", color: "gray.500" }}
                _focus={{
                  borderColor: "#FFC300",
                  boxShadow: "0 0 0 1px #FFC300",
                }}
                required
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={accountData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                _placeholder={{ fontSize: "sm", color: "gray.500" }}
                _focus={{
                  borderColor: "#FFC300",
                  boxShadow: "0 0 0 1px #FFC300",
                }}
                required
                minLength={8}
                maxLength={18}
              />
            </FormControl>
            <FormControl id="confirmedPassword" isRequired>
              <FormLabel>Confirmed Password</FormLabel>
              <Input
                type="password"
                name="confirmedPassword"
                value={accountData.confirmedPassword}
                onChange={handleChange}
                placeholder="Please confirm your password"
                _placeholder={{ fontSize: "sm", color: "gray.500" }}
                _focus={{
                  borderColor: "#FFC300",
                  boxShadow: "0 0 0 1px #FFC300",
                }}
                required
                minLength={8}
                maxLength={18}
              />
            </FormControl>
            <Button
              color={"white"}
              backgroundColor={"black"}
              width={{ base: "100%", sm: "200px" }}
              height={"45px"}
              borderRadius={"full"}
              _hover={{ bg: "#ffd238", textColor: "black" }}
              type="submit"
              isLoading={isLoading}
              loadingText="Registering..."
              mt={2}
            >
              Register
            </Button>
            <Text fontSize="small" textAlign="center">
              Already have an account?{" "}
              <Link
                as={RouterLink}
                to="/sign-in"
                fontWeight="bold"
                color="black"
                _hover={{ textDecoration: "underline" }}
              >
                Sign In
              </Link>
            </Text>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default CreateUserAccount;
