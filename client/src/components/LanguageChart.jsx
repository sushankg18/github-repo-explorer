import {
  Box,
  Flex,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import Card from './Card.jsx';
import { languageColor } from '../services/languages.js';

function buildConicGradient(stats) {
  if (!stats || stats.length === 0) return 'conic-gradient(#1F2937 0deg 360deg)';
  let acc = 0;
  const stops = stats.map((s) => {
    const start = acc;
    const end = acc + (s.percent / 100) * 360;
    acc = end;
    return `${languageColor(s.name)} ${start.toFixed(2)}deg ${end.toFixed(2)}deg`;
  });
  return `conic-gradient(${stops.join(', ')})`;
}

function Donut({ stats, size = 160, thickness = 22 }) {
  return (
    <Box position="relative" boxSize={`${size}px`} mx="auto">
      <Box
        boxSize="full"
        borderRadius="full"
        bg={buildConicGradient(stats)}
        boxShadow="0 6px 24px rgba(0,0,0,0.45)"
      />
      <Box
        position="absolute"
        top={`${thickness}px`}
        left={`${thickness}px`}
        right={`${thickness}px`}
        bottom={`${thickness}px`}
        bg="brand.card"
        borderRadius="full"
        borderWidth="1px"
        borderColor="brand.border"
      />
      <Flex
        position="absolute"
        inset={0}
        align="center"
        justify="center"
        direction="column"
        pointerEvents="none"
      >
        <Text fontSize="xs" color="brand.muted" letterSpacing="0.08em" textTransform="uppercase">
          Total
        </Text>
        <Text fontSize="xl" fontWeight={700} color="brand.text" lineHeight={1}>
          {stats.reduce((s, e) => s + e.count, 0)}
        </Text>
      </Flex>
    </Box>
  );
}

/**
 * Language analytics card — donut chart + legend with percentages.
 */
export default function LanguageChart({ stats }) {
  const hasData = stats && stats.length > 0;

  return (
    <Card>
      <Text fontSize="md" fontWeight={700} color="brand.text" mb={4}>
        Languages
      </Text>

      {hasData ? (
        <VStack spacing={4} align="stretch">
          <Donut stats={stats} />
          <VStack spacing={2.5} align="stretch">
            {stats.map((s) => (
              <Flex key={s.name} align="center" justify="space-between">
                <HStack spacing={2.5}>
                  <Box
                    boxSize="10px"
                    borderRadius="sm"
                    bg={languageColor(s.name)}
                    boxShadow={`0 0 8px ${languageColor(s.name)}55`}
                  />
                  <Text fontSize="sm" color="brand.text">{s.name}</Text>
                </HStack>
                <Text fontSize="xs" color="brand.muted" fontVariantNumeric="tabular-nums">
                  {s.percent.toFixed(1)}%
                </Text>
              </Flex>
            ))}
          </VStack>
        </VStack>
      ) : (
        <Text fontSize="sm" color="brand.muted">No language data available.</Text>
      )}
    </Card>
  );
}
