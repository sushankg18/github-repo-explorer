/**
 * Map of common GitHub language colors (matching github/linguist).
 * Returns a fallback gray for unknown languages.
 */
const LANGUAGE_COLORS = {
  JavaScript: '#F1E05A',
  TypeScript: '#3178C6',
  Python: '#3572A5',
  Java: '#B07219',
  'C++': '#F34B7D',
  C: '#555555',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#DEA584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#FA7343',
  Kotlin: '#A97BFF',
  Shell: '#89E051',
  HTML: '#E34C26',
  CSS: '#563D7C',
  SCSS: '#C6538C',
  Vue: '#41B883',
  Svelte: '#FF3E00',
  Dart: '#00B4AB',
  Lua: '#000080',
  Perl: '#0298C3',
  Scala: '#C22D40',
  Elixir: '#6E4A7E',
  Haskell: '#5E5086',
  Clojure: '#DB5855',
  R: '#198CE7',
  'Objective-C': '#438EFF',
  MATLAB: '#E16737',
  Jupyter: '#DA5B0B',
  Dockerfile: '#384D54',
  Makefile: '#427819',
  PowerShell: '#012456',
  GLSL: '#5686A5',
  Assembly: '#6E4C13',
  Solidity: '#AA6746',
  Other: '#8B949E',
};

export function languageColor(name) {
  if (!name) return LANGUAGE_COLORS.Other;
  return LANGUAGE_COLORS[name] || LANGUAGE_COLORS.Other;
}

/**
 * Compute language distribution (count-based) from an array of repos.
 * Groups everything beyond the top `topN` into "Other".
 */
export function computeLanguageStats(repos, topN = 4) {
  const counts = new Map();
  for (const repo of repos || []) {
    const lang = repo.language || 'Other';
    counts.set(lang, (counts.get(lang) || 0) + 1);
  }
  const total = Array.from(counts.values()).reduce((a, b) => a + b, 0) || 1;
  const entries = Array.from(counts.entries())
    .map(([name, count]) => ({ name, count, percent: (count / total) * 100 }))
    .sort((a, b) => b.count - a.count);

  if (entries.length <= topN) return entries;

  const top = entries.slice(0, topN);
  const rest = entries.slice(topN);
  const otherPercent = rest.reduce((sum, r) => sum + r.percent, 0);
  const otherCount = rest.reduce((sum, r) => sum + r.count, 0);
  return [...top, { name: 'Other', count: otherCount, percent: otherPercent }];
}
