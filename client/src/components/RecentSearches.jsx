import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FiClock, FiX } from 'react-icons/fi';
import Card from './Card.jsx';

const DEFAULT_RECENTS = [
  'facebook/react',
  'vercel/next.js',
  'torvalds/linux',
  'microsoft/vscode',
  'tanstack/router',
];


export default function RecentSearches({
  items = DEFAULT_RECENTS,
  onSelect,
  onRemove,
}) {
  const list = items.length ? items : DEFAULT_RECENTS;

  return (
    <Card>
      <Text fontSize="md" fontWeight={700} color="brand.text" mb={3}>
        Recent searches
      </Text>
      <VStack spacing={1.5} align="stretch">
        {list.map((entry) => {
          const owner = entry.split('/')[0];
          return (
            <Flex
              key={entry}
              role="group"
              align="center"
              justify="space-between"
              borderRadius="md"
              px={2.5}
              py={2}
              cursor="pointer"
              transition="all 0.15s ease"
              _hover={{ bg: 'rgba(59,130,246,0.08)' }}
              onClick={() => onSelect?.(owner)}
            >
              <HStack spacing={2.5} minW={0}>
                <Box as={FiClock} color="brand.muted" flexShrink={0} />
                <Text
                  fontSize="sm"
                  color="brand.text"
                  noOfLines={1}
                  _groupHover={{ color: 'brand.primary' }}
                >
                  {entry}
                </Text>
              </HStack>
              {onRemove && (
                <IconButton
                  aria-label={`Remove ${entry}`}
                  icon={<FiX />}
                  size="xs"
                  variant="ghost"
                  color="brand.muted"
                  opacity={0}
                  _groupHover={{ opacity: 1 }}
                  _hover={{ color: 'brand.text', bg: 'whiteAlpha.100' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(entry);
                  }}
                />
              )}
            </Flex>
          );
        })}
      </VStack>
    </Card>
  );
}
