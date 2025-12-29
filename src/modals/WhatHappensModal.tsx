import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

export default function WhatHappensModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button mt={4} variant="outline" colorScheme="green" onClick={onOpen}>
        What happens after I report?
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>What Happens After You Report</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack align="start" spacing={4}>
              <Text>
                🧾 <strong>Your report is recorded</strong>
                <br />
                Authorities will document your case and classify the scam.
              </Text>

              <Text>
                🔍 <strong>Investigation may begin</strong>
                <br />
                Transactions or accounts may be reviewed or traced.
              </Text>

              <Text>
                💳 <strong>Banks may take action</strong>
                <br />
                Accounts may be frozen if reported early.
              </Text>

              <Text>
                📞 <strong>You may be contacted</strong>
                <br />
                Officials or banks may request more details.
              </Text>

              <Text fontSize="sm" color="gray.500">
                Reporting helps reduce further damage and protects others, even
                if recovery is not guaranteed.
              </Text>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
