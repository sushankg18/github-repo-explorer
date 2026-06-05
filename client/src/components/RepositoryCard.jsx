import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  Tag,
  TagLabel,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { FiGitBranch, FiStar, FiClock } from 'react-icons/fi';
import Card from './Card.jsx';
import { languageColor } from '../services/languages.js';
import { FiArrowUpRight } from "react-icons/fi";


function formatRelative(iso) {
  if (!iso) return '';
  const date = new Date(iso);
  const diff = (Date.now() - date.getTime()) / 1000;
  const units = [
    ['year', 60 * 60 * 24 * 365],
    ['month', 60 * 60 * 24 * 30],
    ['week', 60 * 60 * 24 * 7],
    ['day', 60 * 60 * 24],
    ['hour', 60 * 60],
    ['minute', 60],
  ];
  for (const [name, secs] of units) {
    const v = Math.floor(diff / secs);
    if (v >= 1) return `${v} ${name}${v === 1 ? '' : 's'} ago`;
  }
  return 'just now';
}

function NumberWithIcon({ icon, value }) {
  return (
    <HStack spacing={1.5} color="brand.muted" fontSize="sm">
      <Box as={icon} />
      <Text>{Intl.NumberFormat('en', { notation: 'compact' }).format(value || 0)}</Text>
    </HStack>
  );
}

export default function RepositoryCard({ repo }) {
  const visibility = (repo.visibility || 'public').toUpperCase();
  const isPublic = visibility === 'PUBLIC';
  const topics = (repo.topics || []).slice(0, 4);

  return (
    <Card  as="article" display="flex" flexDirection="column" h="full">
      <Flex justify="space-between" align="flex-start" gap={3} mb={2}>

        <Heading size={'sm'}
          fontWeight={700}
          noOfLines={1}
          minW={0}>{repo.name}</Heading>
        <Text
          fontSize="2xs"
          px={2}
          py={0.5}
          color={isPublic ? 'brand.muted' : 'orange.300'}
          flexShrink={0}
        >
          {visibility}
        </Text>
      </Flex>

      <Text
        fontSize="sm"
        color="brand.muted"
        lineHeight={1.55}
        noOfLines={2}
        minH="3.6em"
        mb={3}
      >
        {repo.description || 'No description provided.'}
      </Text>

      <Link
        href={repo.html_url}
        isExternal
        fontSize="md"
        fontWeight={700}
        color="brand.primary"
        _hover={{ textDecoration: 'underline' }}
        minW={0}
        display={'flex'}
        gap={'1'}
      >
        <Text fontSize={'xs'} pb={'1'}>View Repository</Text> <FiArrowUpRight />

      </Link>
      {topics.length > 0 && (
        <Wrap spacing={2} mb={4}>
          {topics.map((topic) => (
            <WrapItem key={topic}>
              <Tag
                size="sm"
                variant="subtle"
                bg="rgba(59,130,246,0.12)"
                color="#93C5FD"
                borderRadius="full"
                px={2.5}
                fontWeight={500}
              >
                <TagLabel>{topic}</TagLabel>
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
      )}

      <Flex
        mt="auto"
        pt={3}
        borderTopWidth="1px"
        borderColor="brand.border"
        align="center"
        justify="space-between"
        flexWrap="wrap"
        gap={3}
      >
        <HStack spacing={4} flexWrap="wrap">
          {repo.language && (
            <HStack spacing={1.5} fontSize="sm" color="brand.muted">
              <Box
                boxSize="10px"
                borderRadius="full"
                bg={languageColor(repo.language)}
                boxShadow={`0 0 8px ${languageColor(repo.language)}55`}
              />
              <Text color="brand.text" fontWeight={500}>{repo.language}</Text>
            </HStack>
          )}
          <NumberWithIcon icon={FiStar} value={repo.stargazers_count} />
          <NumberWithIcon icon={FiGitBranch} value={repo.forks_count} />
        </HStack>
        <HStack spacing={1.5} color="brand.muted" fontSize="xs">
          <Box as={FiClock} />
          <Text>{formatRelative(repo.pushed_at || repo.updated_at)}</Text>
        </HStack>
      </Flex>
    </Card>
  );
}
