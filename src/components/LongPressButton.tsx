import React, { useState, useEffect, useRef } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

interface LongPressButtonProps {
  onComplete: () => void;
  label: string;
}

const LongPressButton: React.FC<LongPressButtonProps> = ({
  onComplete,
  label,
}) => {
  const [pressing, setPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<any>(null);
  const hasCompleted = useRef(false);

  const startPress = () => {
    if (hasCompleted.current) return;
    setPressing(true);
  };

  const endPress = () => {
    setPressing(false);
    if (!hasCompleted.current) {
      setProgress(0);
    }
  };

  useEffect(() => {
    if (pressing && !hasCompleted.current) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 4; // Speed of the bar
          return next >= 100 ? 100 : next;
        });
      }, 50);
      timerRef.current = interval;
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [pressing]);

  useEffect(() => {
    if (progress >= 100 && !hasCompleted.current) {
      hasCompleted.current = true;
      if (timerRef.current) clearInterval(timerRef.current);
      onComplete();
    }
    if (progress === 0) {
      hasCompleted.current = false;
    }
  }, [progress, onComplete]);

  return (
    <VStack w="full" spacing={2}>
      <Box position="relative" w="full">
        <Box
          as="button"
          onMouseDown={startPress}
          onMouseUp={endPress}
          onMouseLeave={endPress}
          onTouchStart={startPress}
          onTouchEnd={endPress}
          w="full"
          position="relative"
          overflow="hidden"
          bg="white"
          borderWidth="2px"
          borderColor="red.500"
          color="red.600"
          fontWeight="bold"
          py={3}
          rounded="lg"
          userSelect="none"
          _active={{ transform: "scale(0.95)" }}
          transition="transform 0.1s"
        >
          {/* Progress Fill */}
          <Box
            position="absolute"
            left={0}
            top={0}
            bottom={0}
            bg="red.100"
            transition="width 75ms linear"
            width={`${progress}%`}
            zIndex={1}
          />

          {/* Text */}
          <Text position="relative" zIndex={10}>
            {progress === 100 ? "SENT!" : label}
          </Text>
        </Box>
      </Box>
      <Text textAlign="center" fontSize="xs" color="gray.400">
        Hold button to Confirm Transfer
      </Text>
    </VStack>
  );
};

export default LongPressButton;
