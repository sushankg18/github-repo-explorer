import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  Link,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  FiBriefcase,
  FiLink,
  FiMapPin,
  FiUserPlus,
} from 'react-icons/fi';
import Card from './Card.jsx';

function formatBlog(url) {
  if (!url) return null;
  const href = /^https?:\/\//i.test(url) ? url : `https://${url}`;
  let label = url.replace(/^https?:\/\//i, '').replace(/\/$/, '');
  return { href, label };
}

function StatTile({ label, value }) {
  return (
    <Box
      bg="rgba(2,8,23,0.6)"
      borderWidth="1px"
      borderColor="brand.border"
      borderRadius="lg"
      px={3}
      py={3}
      textAlign="center"
    >
      <Text fontSize="lg" fontWeight={700} color="brand.text" lineHeight={1.1}>
        {Intl.NumberFormat('en', { notation: 'compact' }).format(value || 0)}
      </Text>
      <Text fontSize="xs" color="brand.muted" mt={1} textTransform="capitalize">
        {label}
      </Text>
    </Box>
  );
}

function MetaRow({ icon, children }) {
  if (!children) return null;
  return (
    <HStack spacing={2.5} color="brand.muted" fontSize="sm" align="flex-start">
      <Icon as={icon} mt="3px" flexShrink={0} />
      <Box minW={0} wordBreak="break-word">{children}</Box>
    </HStack>
  );
}


export function UserProfileCardSkeleton() {
  return (
    <Card >
      <VStack spacing={4} align="stretch">
        <Flex align="center" gap={4}>
          <SkeletonCircle size="64px" startColor="#1F2937" endColor="#0F172A" />
          <Box flex={1}>
            <Skeleton h="16px" w="60%" mb={2} startColor="#1F2937" endColor="#0F172A" />
            <Skeleton h="12px" w="40%" startColor="#1F2937" endColor="#0F172A" />
          </Box>
        </Flex>
        <SkeletonText noOfLines={3} spacing={2} startColor="#1F2937" endColor="#0F172A" />
        <Skeleton h="40px" borderRadius="lg" startColor="#1F2937" endColor="#0F172A" />
        <SimpleGrid columns={3} spacing={2}>
          <Skeleton h="62px" borderRadius="lg" startColor="#1F2937" endColor="#0F172A" />
          <Skeleton h="62px" borderRadius="lg" startColor="#1F2937" endColor="#0F172A" />
          <Skeleton h="62px" borderRadius="lg" startColor="#1F2937" endColor="#0F172A" />
        </SimpleGrid>
      </VStack>
    </Card>
  );
}

export default function UserProfileCard({ user }) {
  if (!user) return null;
  const blog = formatBlog(user.blog);

  return (
    <Card>
      <VStack spacing={4} 
      align="stretch">
        <Flex align="center" gap={4}>
          <Avatar
            size="lg"
            src={user.avatar_url}
            name={user.name || user.login}
            borderWidth="2px"
            borderColor="brand.border"
          />
          <Box minW={0}>
            <Text
              fontSize="lg"
              fontWeight={700}
              color="brand.text"
              noOfLines={1}
            >
              {user.name || user.login}
            </Text>
            <Text fontSize="sm" color="brand.muted" noOfLines={1}>
              @{user.login}
            </Text>
          </Box>
        </Flex>

        {user.bio && (
          <Text fontSize="sm" color="brand.text" opacity={0.85} lineHeight={1.55}>
            {user.bio}
          </Text>
        )}

        <VStack align="stretch" spacing={2}>
          <MetaRow icon={FiBriefcase}>{user.company}</MetaRow>
          <MetaRow icon={FiMapPin}>{user.location}</MetaRow>
          <MetaRow icon={FiLink}>
            {blog && (
              <Link href={blog.href} isExternal color="brand.primary" _hover={{ textDecoration: 'underline' }}>
                {blog.label}
              </Link>
            )}
          </MetaRow>
        </VStack>

        <Button
          as="a"
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          variant="solidGreen"
          w="full"
          leftIcon={<FiUserPlus />}
          size="md"
          borderRadius="lg"
        >
          Follow
        </Button>

        <Divider borderColor="brand.border" />

        <SimpleGrid  columns={3} spacing={2}>
          <StatTile label="Repos" value={user.public_repos} />
          <StatTile label="Followers" value={user.followers} />
          <StatTile label="Following" value={user.following} />
        </SimpleGrid>
      </VStack>
    </Card>
  );
}
