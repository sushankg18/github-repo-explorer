import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  VStack,
} from '@chakra-ui/react';

import { keyframes } from '@emotion/react';

import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import UserProfileCard, {
  UserProfileCardSkeleton,
} from './components/UserProfileCard.jsx';
import RepositoryGrid from './components/RepositoryGrid.jsx';
import LanguageChart from './components/LanguageChart.jsx';
import RecentSearches from './components/RecentSearches.jsx';
import ErrorState from './components/ErrorState.jsx';

import { fetchGithubUser } from './services/api.js';
import { computeLanguageStats } from './services/languages.js';

const RECENTS_KEY = 'repo-explorer:recents';
const DEFAULT_USER = 'sushankg18';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export default function App() {
  const [username, setUsername] = useState(DEFAULT_USER);
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sortKey, setSortKey] = useState('stars');
  const [recents, setRecents] = useState(() => {
    try {
      const raw = localStorage.getItem(RECENTS_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      return Array.isArray(parsed) && parsed.length ? parsed : [];
    } catch {
      return [];
    }
  });

  const persistRecents = useCallback((next) => {
    setRecents(next);
    try {
      localStorage.setItem(RECENTS_KEY, JSON.stringify(next));
    } catch {
    }
  }, []);

  const load = useCallback(
    async (uname) => {
      const target = (uname || '').trim();
      if (!target) return;

      setLoading(true);
      setError('');
      try {
        const data = await fetchGithubUser(target);
        if (!data?.success) throw new Error('Unexpected API response.');
        setUser(data.user);
        setRepos(data.repos || []);
        setUsername(data.user.login);

        const entry = data.user.login;
        const next = [entry, ...recents.filter((r) => r.split('/')[0] !== entry)].slice(0, 5);
        persistRecents(next);
      } catch (err) {
        setUser(null);
        setRepos([]);
        setError(err.message || 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    },
    [recents, persistRecents]
  );

  useEffect(() => {
    load(DEFAULT_USER);
  }, []);

  const handleRemoveRecent = useCallback(
    (entry) => persistRecents(recents.filter((r) => r !== entry)),
    [recents, persistRecents]
  );

  const languageStats = useMemo(() => computeLanguageStats(repos, 4), [repos]);

  return (
    <Box minH="100vh" bg="brand.bg">
      <Navbar onSearch={load} defaultQuery={username} />
      <Box
        as="main"
        pt="64px"
        animation={`${fadeIn} 0.45s ease-out`}
        
      >
        <Container 
        maxW="1400px" px={{ base: 4, md: 6 }} pb={16}>
          {/* <Hero /> */}

          {error && <ErrorState message={error} />}

          <Grid
            templateColumns={{
              base: '1fr',
              lg: '320px minmax(0, 1fr)',
              xl: '320px minmax(0, 1fr) 280px',
            }}
            gap={6}
            mt={'3rem'}
            alignItems="flex-start"
          >
            {/* Left sidebar */}
            <GridItem>
              <Box
                position={{ base: 'static', lg: 'sticky' }}
                top="88px"
              >
                {loading && !user ? (
                  <UserProfileCardSkeleton />
                ) : (
                  user && <UserProfileCard user={user} />
                )}
              </Box>
            </GridItem>

            {/* Center content */}
            <GridItem minW={0}>
              <RepositoryGrid
                repos={repos}
                sortKey={sortKey}
                onSortChange={setSortKey}
              />
            </GridItem>

            {/* Right sidebar */}
            <GridItem display={{ base: 'none', xl: 'block' }}>
              <Box position="sticky" top="88px">
                <VStack spacing={6} align="stretch">
                  <LanguageChart stats={languageStats} />
                  <RecentSearches
                    items={recents}
                    onSelect={load}
                    onRemove={handleRemoveRecent}
                  />
                </VStack>
              </Box>
            </GridItem>

            {/* Tablet / mobile fallback for sidebars */}
            <GridItem
              colSpan={{ base: 1, lg: 2 }}
              display={{ base: 'block', xl: 'none' }}
            >
              <Grid
                templateColumns={{ base: '1fr', md: 'repeat(2, minmax(0, 1fr))' }}
                gap={6}
              >
                <LanguageChart stats={languageStats} />
                <RecentSearches
                  items={recents}
                  onSelect={load}
                  onRemove={handleRemoveRecent}
                />
              </Grid>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
