// src/theme.ts
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    yellowMode: { bg: "#FFF9C4" },
    yellow2Mode: { bg: "#f8eda6" },
    yellow3Mode: { bg: "#f3e88c" },
    redMode: { bg: "#FFCDD2" },
    greenMode: { bg: "#C8E6C9" },
    blueMode: { bg: "#BBDEFB" },
  },
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
});

export default theme;
