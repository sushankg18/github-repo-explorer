import {
  Box,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Button,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiSearch, FiMenu, FiCompass, FiTrendingUp, FiAlertCircle } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';

export default function Navbar({ onSearch, defaultQuery = '' }) {
  const [query, setQuery] = useState(defaultQuery);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const submit = (e) => {
    e.preventDefault();
    const value = query.trim();
    if (!value) return;
    onSearch?.(value);
    onClose();
  };

  const navLinks = [
    { label: 'Explore', icon: FiCompass },
    { label: 'Trending', icon: FiTrendingUp },
    { label: 'Issues', icon: FiAlertCircle },
  ];

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      h="64px"
      zIndex={100}
      bg="rgba(2,8,23,0.72)"
      backdropFilter="saturate(180%) blur(14px)"
      borderBottom="1px solid"
      borderColor="brand.border"
    >
      <Flex
        h="full"
        maxW="1400px"
        mx="auto"
        px={{ base: 4, md: 6 }}
        align="center"
        gap={{ base: 3, md: 6 }}
      >
        {/* Brand */}
        <HStack spacing={2.5} flexShrink={0}>
          <Flex
            boxSize="32px"
            align="center"
            justify="center"
            bgGradient="linear(to-br, #1F2937, #0F172A)"
            borderRadius="md"
            borderWidth="1px"
            borderColor="brand.border"
          >
            <Box as={FaGithub} color="brand.text" size="18px" />
          </Flex>
          <Text
            fontSize="lg"
            fontWeight={700}
            color="brand.text"
            letterSpacing="-0.01em"
            display={{ base: 'none', sm: 'block' }}
          >
            Repo Explorer
          </Text>
        </HStack>

        {/* Centered search (desktop / tablet) */}
        <Box flex={1} maxW="640px" mx="auto" display={{ base: 'none', md: 'block' }}>
          <form onSubmit={submit}>
            <InputGroup size="md">
              <InputLeftElement pointerEvents="none" h="full">
                <Box as={FiSearch} color="brand.muted" />
              </InputLeftElement>
              <Input
                pl="40px"
                placeholder="Search repositories, users, organizations..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </InputGroup>
          </form>
        </Box>

        {/* Right nav (desktop) */}
        <HStack spacing={1} display={{ base: 'none', md: 'flex' }}>
          {navLinks.map((l) => (
            <Button
              key={l.label}
              variant="ghostNav"
              size="sm"
              leftIcon={<Box as={l.icon} />}
            >
              {l.label}
            </Button>
          ))}
        </HStack>

        {/* Mobile hamburger */}
        {isMobile && (
          <IconButton
            ml="auto"
            aria-label="Open menu"
            icon={<FiMenu />}
            variant="ghost"
            color="brand.text"
            onClick={onOpen}
          />
        )}
      </Flex>

      {/* Mobile drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="brand.card" color="brand.text">
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" borderColor="brand.border">
            Repo Explorer
          </DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" spacing={4} mt={2}>
              <form onSubmit={submit}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Box as={FiSearch} color="brand.muted" />
                  </InputLeftElement>
                  <Input
                    pl="40px"
                    placeholder="Search repositories, users..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </InputGroup>
              </form>
              {navLinks.map((l) => (
                <Button
                  key={l.label}
                  variant="ghostNav"
                  justifyContent="flex-start"
                  leftIcon={<Box as={l.icon} />}
                >
                  {l.label}
                </Button>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
