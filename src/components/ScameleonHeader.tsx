import React from "react";
import { Box, Image } from "@chakra-ui/react";

// Ensure this path is correct for your Vite/React setup
// Usually assets in 'src' need to be imported at the top, or in 'public' folder.
import headerImage from "../assets/ScameleonHeaderFull.png";

const ScameleonHeader = () => {
  return (
    <Box
      as="header"
      display="flex"
      justifyContent="center"
      alignItems="center"
      // Responsive Padding: 3 (12px) on mobile, 5 (20px) on desktop
      p={{ base: 3, md: 5 }}
      bg="#fce98a"
      borderRadius={{ base: "none", md: "lg" }} // Optional: Rounded corners on desktop
    >
      <Image
        src={headerImage}
        alt="Scameleon Header"
        maxW="100%"
        height="auto"
        objectFit="contain"
      />
    </Box>
  );
};

export default ScameleonHeader;
