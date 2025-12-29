import React from "react";
import { Button, Icon, Text } from "@chakra-ui/react";

interface NavBtnProps {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavBtn: React.FC<NavBtnProps> = ({
  icon: IconComponent,
  label,
  active,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      p={2}
      color={active ? "pink.500" : "gray.400"}
      _hover={{ bg: active ? "pink.50" : "gray.50" }}
      flexDirection="column"
      height="auto"
      borderRadius="xl"
      sx={{
        "& .lucide": {
          strokeWidth: active ? 2.5 : 2,
        },
      }}
    >
      <Icon as={IconComponent} boxSize={6} />
      <Text fontSize="2xs" fontWeight="bold" textTransform="uppercase" mt={1}>
        {label}
      </Text>
    </Button>
  );
};

export default NavBtn;
