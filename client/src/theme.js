import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    bg: '#020817',
    card: '#111827',
    cardElevated: '#0F172A',
    border: '#1F2937',
    borderSubtle: '#1E293B',
    primary: '#3B82F6',
    primaryHover: '#2563EB',
    text: '#F8FAFC',
    muted: '#94A3B8',
    success: '#22C55E',
    successHover: '#16A34A',
    warning: '#F59E0B',
    danger: '#EF4444',
  },
};

const fonts = {
  heading: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`,
  body: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`,
};

const styles = {
  global: {
    'html, body': {
      bg: 'brand.bg',
      color: 'brand.text',
      fontFeatureSettings: '"cv11", "ss01"',
    },
    '*::selection': {
      bg: 'rgba(59,130,246,0.35)',
    },
  },
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: 600,
      borderRadius: 'lg',
      transition: 'all 0.2s ease',
    },
    variants: {
      solidGreen: {
        bg: 'brand.success',
        color: 'white',
        _hover: { bg: 'brand.successHover', transform: 'translateY(-1px)' },
        _active: { bg: 'brand.successHover', transform: 'translateY(0)' },
      },
      solidBlue: {
        bg: 'brand.primary',
        color: 'white',
        _hover: { bg: 'brand.primaryHover' },
      },
      ghostNav: {
        color: 'brand.muted',
        fontWeight: 500,
        _hover: { color: 'brand.text', bg: 'whiteAlpha.100' },
      },
    },
  },
  Input: {
    variants: {
      filledDark: {
        field: {
          bg: 'rgba(17,24,39,0.65)',
          color: 'brand.text',
          borderWidth: '1px',
          borderColor: 'brand.border',
          _placeholder: { color: 'brand.muted' },
          _hover: { borderColor: '#374151' },
          _focus: {
            borderColor: 'brand.primary',
            boxShadow: '0 0 0 3px rgba(59,130,246,0.25)',
            bg: 'rgba(17,24,39,0.85)',
          },
        },
      },
    },
    defaultProps: { variant: 'filledDark' },
  },
  Menu: {
    baseStyle: {
      list: {
        bg: 'brand.card',
        borderColor: 'brand.border',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        py: 1,
      },
      item: {
        bg: 'transparent',
        color: 'brand.text',
        _hover: { bg: 'whiteAlpha.100' },
        _focus: { bg: 'whiteAlpha.100' },
      },
    },
  },
  Tooltip: {
    baseStyle: {
      bg: 'brand.card',
      color: 'brand.text',
      borderWidth: '1px',
      borderColor: 'brand.border',
      borderRadius: 'md',
    },
  },
};

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors,
  fonts,
  styles,
  components,
});

export default theme;
