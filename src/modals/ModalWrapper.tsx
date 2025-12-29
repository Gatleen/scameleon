import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { XCircle } from "lucide-react";

interface ModalWrapperProps {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  children,
  onClose,
  title,
}) => {
  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(8px)" />
      <ModalContent rounded="3xl" overflow="hidden" maxW="sm" shadow="2xl">
        <ModalHeader
          borderBottom="1px"
          borderColor="gray.100"
          color="pink.600"
          fontWeight="extrabold"
        >
          {title}
        </ModalHeader>
        <IconButton
          icon={<XCircle size={20} />}
          aria-label="Close modal"
          onClick={onClose}
          variant="ghost"
          position="absolute"
          top={4}
          right={4}
          color="gray.400"
          _hover={{ color: "pink.600" }}
        />
        <ModalBody p={0}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalWrapper;
