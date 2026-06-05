import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FiChevronDown, FiInbox } from 'react-icons/fi';
import RepositoryCard from './RepositoryCard.jsx';
import Card from './Card.jsx';

export const SORT_OPTIONS = [
  { key: 'stars', label: 'Most stars' },
  { key: 'updated', label: 'Recently updated' },
  { key: 'name', label: 'Name A-Z' },
];

export function sortRepos(repos, key) {
  const arr = [...(repos || [])];
  switch (key) {
    case 'updated':
      return arr.sort(
        (a, b) =>
          new Date(b.pushed_at || b.updated_at) -
          new Date(a.pushed_at || a.updated_at)
      );
    case 'name':
      return arr.sort((a, b) =>
        (a.name || '').localeCompare(b.name || '', undefined, { sensitivity: 'base' })
      );
    case 'stars':
    default:
      return arr.sort(
        (a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0)
      );
  }
}

function EmptyState({ message }) {
  return (
    <Card>
      <VStack spacing={3} py={8}>
        <Box as={FiInbox} size="40px" color="#475569" />
        <Text color="brand.text" fontWeight={600}>No repositories found</Text>
        <Text color="brand.muted" fontSize="sm" textAlign="center">
          {message || 'This user has no public repositories to display.'}
        </Text>
      </VStack>
    </Card>
  );
}


export default function RepositoryGrid({
  repos,
  sortKey,
  onSortChange,
}) {
  const sorted = sortRepos(repos, sortKey);
  const count = sorted.length;
  const active = SORT_OPTIONS.find((s) => s.key === sortKey) || SORT_OPTIONS[0];

  return (
    <Box as="section">
      <Flex
        align={{ base: 'flex-start', sm: 'center' }}
        justify="space-between"
        gap={3}
        direction={{ base: 'column', sm: 'row' }}
        mb={4}
      >
        <Box>
          <Text fontSize="2xl" fontWeight={700} color="brand.text" letterSpacing="-0.01em">
            Repositories
          </Text>
          <Text fontSize="sm" color="brand.muted" mt={0.5}>
            {count} {count === 1 ? 'result' : 'results'} · sorted by {active.label.toLowerCase()}
          </Text>
        </Box>

        <Menu placement="bottom-end">
          <MenuButton
            as={Button}
            size="sm"
            variant="outline"
            color="brand.text"
            borderColor="brand.border"
            bg="brand.card"
            _hover={{ borderColor: '#374151', bg: '#0F172A' }}
            _active={{ bg: '#0F172A' }}
            rightIcon={<FiChevronDown />}
            fontWeight={500}
          >
            {active.label}
          </MenuButton>
          <MenuList>
            {SORT_OPTIONS.map((opt) => (
              <MenuItem
                key={opt.key}
                onClick={() => onSortChange?.(opt.key)}
                fontWeight={opt.key === sortKey ? 600 : 400}
              >
                {opt.label}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>

      {count === 0 ? (
        <EmptyState />
      ) : (
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, minmax(0, 1fr))' }}
          gap={4}
        >
          {sorted.map((repo) => (
            <RepositoryCard key={repo.id} repo={repo} />
          ))}
        </Grid>
      )}
    </Box>
  );
}
