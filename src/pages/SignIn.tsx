import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
  VStack,
  useToast,
  Link, // Imported Link for better hover effects
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { signInUser, getUserProfile } from "../firebase/auth";

type SignInForm = {
  emailAddress: string;
  password: string;
};

const SignIn: React.FC = () => {
  const [signInData, setSignInData] = useState<SignInForm>({
    emailAddress: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const formBackground = useColorModeValue("white", "gray.700");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const credential = await signInUser(
        signInData.emailAddress.trim(),
        signInData.password
      );

      const user = credential.user;

      try {
        const profile = await getUserProfile(user.uid);
        console.log("User profile:", profile);
      } catch (profileErr) {
        console.warn("Could not fetch profile:", profileErr);
      }

      toast({
        title: "Signed in",
        description: "Welcome back!",
        status: "success",
        duration: 2500,
        isClosable: true,
      });

      navigate("/dashboard");
    } catch (err: any) {
      console.error("Sign in error:", err);

      if (err?.code === "auth/user-not-found") {
        setErrorMessage("No account found with that email.");
      } else if (err?.code === "auth/wrong-password") {
        setErrorMessage(
          "Incorrect password. Try again or reset your password."
        );
      } else if (err?.code === "auth/invalid-email") {
        setErrorMessage("Please enter a valid email address.");
      } else if (err?.code === "auth/too-many-requests") {
        setErrorMessage("Too many failed attempts. Please try again later.");
      } else {
        setErrorMessage("Failed to sign in. Please check your connection.");
      }

      toast({
        title: "Sign in failed",
        description: errorMessage || "Unable to sign in.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      align={"center"}
      bg={"#FFF9C4"}
      justify={"center"}
      minHeight={"100vh"}
      // Responsive Padding: 4 on mobile, 8 on desktop
      p={{ base: 4, md: 8 }}
    >
      <Box
        bg={formBackground}
        borderRadius="xl"
        boxShadow="lg"
        maxW="lg"
        // Responsive Card Padding: 6 on mobile, 8 on desktop
        p={{ base: 6, md: 8 }}
        w="full"
      >
        <Heading
          color="black"
          // Responsive Font: Slightly larger on desktop
          fontSize={{ base: "xl", md: "2xl" }}
          mb={6}
          textAlign={"center"}
        >
          Welcome Back to Scameleon!
        </Heading>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="emailAddress" isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                name="emailAddress"
                value={signInData.emailAddress}
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
                value={signInData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                _placeholder={{ fontSize: "sm", color: "gray.500" }}
                _focus={{
                  borderColor: "#FFC300",
                  boxShadow: "0 0 0 1px #FFC300",
                }}
                required
                minLength={8}
                maxLength={72}
              />
            </FormControl>

            {errorMessage && (
              <Text color="red.500" fontSize="sm" textAlign="center">
                {errorMessage}
              </Text>
            )}

            <Button
              type="submit"
              color={"white"}
              bg={"black"}
              // Responsive Width: Full width on mobile, 200px on desktop
              w={{ base: "100%", sm: "200px" }}
              h="45px"
              borderRadius="full"
              _hover={{ bg: "#ffd238", color: "black" }}
              isLoading={loading}
              loadingText="Signing in..."
              mt={2}
            >
              Sign In
            </Button>

            <Text fontSize="sm" textAlign="center">
              Don't have an account?{" "}
              <Link
                as={RouterLink}
                to="/create-account"
                fontWeight="bold"
                color="black"
                _hover={{ textDecoration: "underline" }}
              >
                Create Account
              </Link>
            </Text>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default SignIn;
