import { Box, Heading, Text, VStack } from '@chakra-ui/react';

export default function Hero() {
  return (
    <Box as="section" pt={{ base: 6, md: 10 }} pb={{ base: 6, md: 8 }}>
      <VStack align="flex-start" spacing={3} maxW="900px">
        <Heading
          as="h1"
          fontSize={{ base: '3xl', md: '5xl' }}
          lineHeight={1.1}
          letterSpacing="-0.02em"
          fontWeight={800}
          color="brand.text"
        >
          Explore the open source universe
        </Heading>
        <Text
          color="brand.muted"
          fontSize={{ base: 'md', md: 'lg' }}
          maxW="700px"
          lineHeight={1.6}
        >
          Browse curated repositories, inspect contributor profiles and dive
          into language stats.
        </Text>
      </VStack>
    </Box>
  );
}
