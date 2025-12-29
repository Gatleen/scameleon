import { Box, Button, SimpleGrid, Icon } from "@chakra-ui/react";
import {
  LibraryBig,
  Brain,
  MonitorPlay,
  NotebookPen,
  MessagesSquare,
  Store,
  UserRound,
  Settings,
} from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavigationBarItems: React.FC = () => {
  const location = useLocation();
  const iconSize = 18;

  const navItems = [
    { label: "Resources", icon: LibraryBig, path: "/resources" },
    { label: "Quizzes", icon: Brain, path: "/quizpicker" },
    { label: "Sims", icon: MonitorPlay, path: "/simulations" }, // Shortened label for mobile
    { label: "Diary", icon: NotebookPen, path: "/diary" },
    { label: "Forum", icon: MessagesSquare, path: "/forum" },
    { label: "Store", icon: Store, path: "/store" },
    { label: "Profile", icon: UserRound, path: "/userprofile" },
    { label: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <Box as="nav" mb={6} mt={{ base: 2, md: 4 }}>
      <Box
        bg="white"
        p={2}
        borderRadius="xl"
        boxShadow="sm"
        border="1px solid"
        borderColor="gray.100"
      >
        {/* Responsive Grid Layout:
           - Base (Mobile): 4 columns (icons only or stacked) 
           - md (Tablet): 4 columns 
           - lg (Desktop): 8 columns (all in one row)
        */}
        <SimpleGrid columns={{ base: 4, sm: 4, lg: 8 }} spacing={2}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.label}
                as={Link}
                to={item.path}
                variant={isActive ? "solid" : "ghost"}
                colorScheme={isActive ? "orange" : "gray"}
                size="sm"
                // Responsive Content: Icon on top for mobile to save width
                flexDirection={{ base: "column", lg: "row" }}
                h={{ base: "auto", lg: "40px" }}
                py={{ base: 2, lg: 0 }}
                gap={2}
              >
                <Icon as={item.icon} boxSize={iconSize} />
                <Box fontSize={{ base: "xs", lg: "sm" }}>{item.label}</Box>
              </Button>
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default NavigationBarItems;
