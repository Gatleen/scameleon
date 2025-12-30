import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Textarea,
  Button,
  IconButton,
  Input,
  useToast,
  VStack,
  HStack,
  SimpleGrid,
  Tooltip,
  Image as ChakraImage,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Badge,
  useDisclosure,
  Container,
} from "@chakra-ui/react";
import {
  ChevronLeft,
  ChevronRight,
  Sticker,
  Save,
  Download,
  Trash2,
  Upload,
  Plus,
  Edit2,
  Check,
  X,
} from "lucide-react";

// --- New Imports for PDF ---
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// --- Firebase Imports ---
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { saveDiaryEntry, loadDiaryEntries } from "../firebase/diary";

// --- Local Component & Data Imports ---
import NavigationBarItems from "../components/NavigationBar";
import DiaryHeader from "../components/headerCards/DiaryHeader";
import Footer from "../components/Footer";
import { STICKER_PACKS } from "../data/stickerData";

// --- Asset Import ---
import diaryMascot from "../assets/PageCharacters/ScameleonDiary.png";

// --- Interfaces ---
interface DraggableItem {
  id: string;
  type: "sticker" | "image";
  content: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  width?: number;
  height?: number;
}

interface DiaryEntry {
  id: string;
  date: Date;
  title: string;
  content: string;
  items: DraggableItem[];
}

export default function Diary() {
  // --- State ---
  const [entries, setEntries] = useState<DiaryEntry[]>([
    {
      id: "1",
      date: new Date(),
      title: "My First Entry",
      content: "",
      items: [],
    },
  ]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPack, setSelectedPack] =
    useState<keyof typeof STICKER_PACKS>("scameleon");
  const [draggingItem, setDraggingItem] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [editingTitle, setEditingTitle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // --- Refs & Hooks ---
  const pageRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cancelRef = useRef<any>(null);

  const toast = useToast();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const currentEntry = entries[currentPage];

  // --- Firebase Loading Logic ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const savedEntries = await loadDiaryEntries(user.uid);

          if (savedEntries && savedEntries.length > 0) {
            const formattedEntries = savedEntries.map((entry: any) => ({
              ...entry,
              date: entry.date?.toDate
                ? entry.date.toDate()
                : new Date(entry.date),
            }));

            setEntries(formattedEntries);
            setCurrentPage(formattedEntries.length - 1);
          }
        } catch (error) {
          console.error("Error loading diary:", error);
          toast({
            title: "Error loading diary",
            description: "Could not fetch your previous entries.",
            status: "error",
          });
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [toast]);

  // --- Logic Helpers ---
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updated = [...entries];
    updated[currentPage].content = e.target.value;
    setEntries(updated);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = [...entries];
    updated[currentPage].title = e.target.value;
    setEntries(updated);
  };

  const addItem = (
    content: string,
    type: "sticker" | "image",
    width?: number,
    height?: number
  ) => {
    const newItem: DraggableItem = {
      id: Date.now().toString() + Math.random(),
      type,
      content,
      x: 100, // Default position
      y: 100,
      rotation: 0,
      scale: 1,
      width: type === "sticker" ? 100 : width,
      height: type === "sticker" ? 100 : height,
    };
    const updated = [...entries];
    updated[currentPage].items.push(newItem);
    setEntries(updated);
  };

  // --- Mouse & Touch Handlers (Merged Logic) ---
  const startDrag = (clientX: number, clientY: number, itemId: string) => {
    const item = currentEntry.items.find((s) => s.id === itemId);
    if (item && pageRef.current) {
      const rect = pageRef.current.getBoundingClientRect();
      setDraggingItem(itemId);
      setDragOffset({
        x: clientX - rect.left - item.x,
        y: clientY - rect.top - item.y,
      });
    }
  };

  const moveDrag = (clientX: number, clientY: number) => {
    if (draggingItem && pageRef.current) {
      const rect = pageRef.current.getBoundingClientRect();
      const x = Math.max(
        0,
        Math.min(clientX - rect.left - dragOffset.x, rect.width - 60)
      );
      const y = Math.max(
        0,
        Math.min(clientY - rect.top - dragOffset.y, rect.height - 60)
      );

      const updated = [...entries];
      const itemIndex = updated[currentPage].items.findIndex(
        (s) => s.id === draggingItem
      );
      if (itemIndex !== -1) {
        updated[currentPage].items[itemIndex] = {
          ...updated[currentPage].items[itemIndex],
          x,
          y,
        };
        setEntries(updated);
      }
    }
  };

  // Mouse Handlers
  const handleItemMouseDown = (e: React.MouseEvent, itemId: string) => {
    e.preventDefault();
    e.stopPropagation();
    startDrag(e.clientX, e.clientY, itemId);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    moveDrag(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setDraggingItem(null);
  };

  // Touch Handlers (For Mobile)
  const handleItemTouchStart = (e: React.TouchEvent, itemId: string) => {
    e.stopPropagation();
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY, itemId);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (draggingItem) {
      const touch = e.touches[0];
      moveDrag(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = () => {
    setDraggingItem(null);
  };

  const removeItem = (itemId: string) => {
    const updated = [...entries];
    updated[currentPage].items = updated[currentPage].items.filter(
      (s) => s.id !== itemId
    );
    setEntries(updated);
  };

  const rotateItem = (itemId: string) => {
    const updated = [...entries];
    const itemIndex = updated[currentPage].items.findIndex(
      (s) => s.id === itemId
    );
    if (itemIndex !== -1) {
      updated[currentPage].items[itemIndex].rotation += 15;
      setEntries(updated);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const maxSize = 150;
            const scale = Math.min(maxSize / img.width, maxSize / img.height);
            addItem(
              event.target?.result as string,
              "image",
              img.width * scale,
              img.height * scale
            );
          };
          img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const saveEntry = async () => {
    const user = auth.currentUser;
    if (!user) {
      toast({
        title: "Not Logged In",
        description: "You must be logged in to save your diary.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      await saveDiaryEntry(user.uid, currentEntry);
      toast({
        title: "Entry Saved!",
        description: "Your diary page has been saved securely.",
        status: "success",
        duration: 3000,
        isClosable: true,
        icon: <Check />,
      });
    } catch (error) {
      console.error("Save error:", error);
      toast({
        title: "Save Failed",
        description: "Something went wrong while saving.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteClick = () => {
    if (entries.length === 1) {
      toast({
        title: "Action Denied",
        description: "You can't delete the last entry!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    onDeleteOpen();
  };

  const confirmDelete = () => {
    const updated = entries.filter((_, idx) => idx !== currentPage);
    setEntries(updated);
    setCurrentPage(Math.max(0, currentPage - 1));
    onDeleteClose();
    toast({
      title: "Entry Deleted",
      description: "The page has been torn out.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const exportAsPDF = async () => {
    const element = document.getElementById("diary-page-content");
    if (!element) {
      toast({
        title: "Error",
        description: "Content not found.",
        status: "error",
      });
      return;
    }
    const loadingToast = toast({
      title: "Generating PDF...",
      status: "loading",
      duration: null,
    });
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
      pdf.save(
        `Scameleon_Diary_${currentEntry.date.toISOString().split("T")[0]}.pdf`
      );
      toast.close(loadingToast);
      toast({
        title: "PDF Downloaded",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast.close(loadingToast);
      toast({ title: "Export Failed", status: "error" });
    }
  };

  const createNewEntry = () => {
    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      date: new Date(),
      title: "New Entry",
      content: "",
      items: [],
    };
    setEntries([...entries, newEntry]);
    setCurrentPage(entries.length);
  };

  const nextPage = () =>
    currentPage < entries.length - 1 && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 0 && setCurrentPage(currentPage - 1);

  return (
    <Flex
      direction="column"
      minH="100vh"
      bg="#f9f1e8"
      fontFamily="sans-serif"
      overflowX="hidden"
    >
      {/* 1. Navigation */}
      <Box mt={{ base: 2, md: 4 }}>
        <NavigationBarItems />
      </Box>

      {/* 2. Main Content */}
      <Box flex="1" pb={8} px={{ base: 4, md: 8 }}>
        <Container maxW="7xl" p={0}>
          {/* Header */}
          <Box mb={6}>
            <DiaryHeader title="Diary" imageSrc={diaryMascot} />
          </Box>

          {/* Main Layout: Stack on Mobile, Row on Desktop */}
          <Flex gap={6} flexDirection={{ base: "column", lg: "row" }}>
            {/* --- Notebook Page Area --- */}
            <Box flex="1" position="relative" ml={{ base: 0, lg: 8 }}>
              {/* Book Binding Decoration (Desktop Only) */}
              <Box
                display={{ base: "none", lg: "block" }}
                position="absolute"
                left="-32px"
                top="0"
                bottom="0"
                w="32px"
                bg="orange.300"
                borderLeftRadius="lg"
                shadow="sm"
              />

              <Box
                id="diary-page-content"
                bg="white"
                roundedRight="2xl"
                roundedLeft={{ base: "2xl", lg: "none" }}
                shadow="2xl"
                p={{ base: 4, md: 8 }} // Responsive Padding
                position="relative"
                overflow="hidden"
                minH={{ base: "500px", md: "700px" }} // Smaller height on mobile
                // Mouse Handlers
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                // Touch Handlers
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                _before={{
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.05,
                  pointerEvents: "none",
                  bgImage: `repeating-linear-gradient(0deg, transparent, transparent 35px, #000 35px, #000 36px)`,
                }}
              >
                {/* Entry Title & Date */}
                <Box
                  mb={6}
                  pb={4}
                  borderBottom="2px solid"
                  borderColor="orange.200"
                  position="relative"
                  zIndex={10}
                >
                  {editingTitle ? (
                    <Input
                      value={currentEntry.title}
                      onChange={handleTitleChange}
                      onBlur={() => setEditingTitle(false)}
                      autoFocus
                      fontSize={{ base: "xl", md: "2xl" }}
                      fontWeight="bold"
                      color="orange.900"
                      variant="flushed"
                      borderColor="orange.300"
                    />
                  ) : (
                    <Flex justify="space-between" align="center">
                      <Heading
                        as="h2"
                        size={{ base: "md", md: "lg" }}
                        color="orange.900"
                      >
                        {currentEntry.title}
                      </Heading>
                      <IconButton
                        aria-label="Edit title"
                        icon={<Edit2 size={18} />}
                        variant="ghost"
                        colorScheme="orange"
                        onClick={() => setEditingTitle(true)}
                      />
                    </Flex>
                  )}
                  <Text fontSize="sm" color="orange.600" mt={1}>
                    {currentEntry.date.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
                </Box>

                {/* Text Area */}
                <Textarea
                  value={currentEntry.content}
                  onChange={handleContentChange}
                  placeholder="Dear diary, today I learned about scams..."
                  w="100%"
                  h="96"
                  p={2}
                  bg="transparent"
                  resize="none"
                  border="none"
                  fontFamily="serif"
                  lineHeight="2rem"
                  fontSize={{ base: "sm", md: "md" }}
                  position="relative"
                  zIndex={0}
                  _focus={{ boxShadow: "none" }}
                />

                {/* Draggable Items */}
                {currentEntry.items.map((item) => (
                  <Box
                    key={item.id}
                    position="absolute"
                    left={`${item.x}px`}
                    top={`${item.y}px`}
                    transform={`rotate(${item.rotation}deg) scale(${item.scale})`}
                    cursor="move"
                    userSelect="none"
                    zIndex={20}
                    // FIX: Passed as style to satisfy Typescript
                    style={{ touchAction: "none" }}
                    // Mouse Events
                    onMouseDown={(e) => handleItemMouseDown(e, item.id)}
                    onDoubleClick={() => rotateItem(item.id)}
                    // Touch Events
                    onTouchStart={(e) => handleItemTouchStart(e, item.id)}
                    role="group"
                  >
                    <ChakraImage
                      src={item.content}
                      alt={item.type}
                      w={`${item.width}px`}
                      h={item.type === "sticker" ? "auto" : `${item.height}px`}
                      rounded={item.type === "image" ? "lg" : "none"}
                      shadow={item.type === "image" ? "lg" : "none"}
                      filter={
                        item.type === "sticker"
                          ? "drop-shadow(0px 4px 6px rgba(0,0,0,0.2))"
                          : "none"
                      }
                      pointerEvents="none"
                      draggable={false}
                    />
                    {/* Delete X Button */}
                    <IconButton
                      aria-label="Remove item"
                      icon={<X size={12} />}
                      size="xs"
                      colorScheme="red"
                      rounded="full"
                      position="absolute"
                      top="-2"
                      right="-2"
                      // Always show on touch devices, otherwise show on hover
                      opacity={{ base: 1, md: 0 }}
                      _groupHover={{ opacity: 1 }}
                      transition="opacity 0.2s"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeItem(item.id);
                      }}
                      zIndex={30}
                    />
                  </Box>
                ))}
              </Box>

              {/* Page Controls Toolbar */}
              <Flex
                data-html2canvas-ignore="true"
                direction="column"
                gap={5}
                mt={6}
                pt={4}
                borderTop="2px solid"
                borderColor="orange.200"
                position="relative"
                zIndex={10}
              >
                {/* Button Row */}
                <Flex
                  justify="space-between"
                  align="center"
                  wrap="wrap"
                  gap={3}
                >
                  <Flex wrap="wrap" gap={2}>
                    <Button
                      leftIcon={<Upload size={16} />}
                      size="sm"
                      colorScheme="orange"
                      variant="subtle"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Image
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                    />
                    <Button
                      leftIcon={<Save size={16} />}
                      size="sm"
                      colorScheme="green"
                      variant="subtle"
                      onClick={saveEntry}
                    >
                      Save
                    </Button>
                    <Button
                      leftIcon={<Download size={16} />}
                      size="sm"
                      colorScheme="blue"
                      variant="subtle"
                      onClick={exportAsPDF}
                    >
                      PDF
                    </Button>
                  </Flex>
                  <Button
                    leftIcon={<Trash2 size={16} />}
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                    onClick={handleDeleteClick}
                  >
                    Delete
                  </Button>
                </Flex>

                {/* Pagination */}
                <Flex
                  justify="center"
                  align="center"
                  gap={4}
                  pt={3}
                  borderTop="1px solid"
                  borderColor="orange.100"
                >
                  <HStack
                    bg="orange.50"
                    p={1}
                    rounded="lg"
                    border="1px solid"
                    borderColor="orange.100"
                  >
                    <IconButton
                      aria-label="Prev"
                      icon={<ChevronLeft size={18} />}
                      size="sm"
                      variant="ghost"
                      onClick={prevPage}
                      isDisabled={currentPage === 0}
                    />
                    <Text
                      fontSize="xs"
                      fontWeight="bold"
                      w="12"
                      textAlign="center"
                    >
                      {currentPage + 1} / {entries.length}
                    </Text>
                    <IconButton
                      aria-label="Next"
                      icon={<ChevronRight size={18} />}
                      size="sm"
                      variant="ghost"
                      onClick={nextPage}
                      isDisabled={currentPage === entries.length - 1}
                    />
                  </HStack>
                  <Box w="1px" h="20px" bg="orange.200" />
                  <Button
                    leftIcon={<Plus size={16} />}
                    size="sm"
                    colorScheme="orange"
                    onClick={createNewEntry}
                  >
                    New Page
                  </Button>
                </Flex>
              </Flex>
            </Box>

            {/* --- Sticker Sidebar --- */}
            <Box
              w={{ base: "100%", lg: "80" }}
              bg="white"
              rounded="2xl"
              shadow="xl"
              p={6}
              minH={{ base: "auto", lg: "700px" }} // Auto height on mobile so it doesn't take up empty space
              display="flex"
              flexDirection="column"
            >
              <HStack
                mb={4}
                position="sticky"
                top="0"
                bg="white"
                zIndex={10}
                borderBottom="1px solid"
                borderColor="gray.100"
                pb={2}
              >
                <Sticker size={24} />
                <Heading as="h3" size="md" color="orange.900">
                  Sticker Packs
                </Heading>
              </HStack>

              {/* Pack Selector */}
              <Flex wrap="wrap" gap={2} mb={4}>
                {Object.keys(STICKER_PACKS).map((pack) => (
                  <Badge
                    key={pack}
                    as="button"
                    onClick={() =>
                      setSelectedPack(pack as keyof typeof STICKER_PACKS)
                    }
                    px={3}
                    py={1}
                    rounded="full"
                    colorScheme={selectedPack === pack ? "orange" : "gray"}
                    variant={selectedPack === pack ? "solid" : "subtle"}
                    textTransform="capitalize"
                  >
                    {pack}
                  </Badge>
                ))}
              </Flex>

              {/* Stickers Grid */}
              <SimpleGrid columns={{ base: 4, lg: 3 }} spacing={3}>
                {STICKER_PACKS[selectedPack].map((src, idx) => (
                  <Tooltip label="Click to add" key={idx} placement="top">
                    <Box
                      as="button"
                      onClick={() => addItem(src, "sticker")}
                      p={2}
                      rounded="lg"
                      bg="gray.50"
                      border="1px solid"
                      borderColor="gray.200"
                      _hover={{ bg: "orange.100", transform: "scale(1.05)" }}
                      transition="all 0.2s"
                    >
                      <ChakraImage
                        src={src}
                        alt="Sticker"
                        objectFit="contain"
                        h="60px"
                        w="full"
                        pointerEvents="none"
                      />
                    </Box>
                  </Tooltip>
                ))}
              </SimpleGrid>

              {/* Tips Box */}
              <Box
                mt={6}
                p={4}
                bg="orange.50"
                rounded="lg"
                fontSize="sm"
                color="orange.800"
              >
                <Text fontWeight="bold" mb={2}>
                  💡 Tips:
                </Text>
                <VStack align="start" spacing={1} fontSize="xs">
                  <Text>• Click stickers to add</Text>
                  <Text>• Drag anywhere on page</Text>
                  <Text>• Double-click to rotate</Text>
                  <Text>• Upload images to paste</Text>
                </VStack>
              </Box>
            </Box>
          </Flex>

          {/* Delete Alert */}
          <AlertDialog
            isOpen={isDeleteOpen}
            leastDestructiveRef={cancelRef}
            onClose={onDeleteClose}
            isCentered
          >
            <AlertDialogOverlay>
              <AlertDialogContent mx={4}>
                <AlertDialogHeader>Delete Entry?</AlertDialogHeader>
                <AlertDialogBody>
                  Are you sure you want to tear this page out?
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onDeleteClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Container>
      </Box>

      {/* 3. Footer */}
      <Box width="100%" mt="auto">
        <Footer />
      </Box>
    </Flex>
  );
}
