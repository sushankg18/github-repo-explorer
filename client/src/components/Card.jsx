import { Box } from '@chakra-ui/react';

export default function Card({ children, hover = false, ...rest }) {
  return (
    <Box
      bg="brand.card"
      borderWidth="1px"
      borderColor="brand.border"
      borderRadius="xl"
      p={5}
      boxShadow="0 1px 0 rgba(255,255,255,0.02) inset, 0 6px 18px rgba(0,0,0,0.25)"
      transition="all 0.25s ease"
      _hover={
        hover
          ? {
              transform: 'scale(1.02)',
              borderColor: 'rgba(59,130,246,0.45)',
              boxShadow:
                '0 1px 0 rgba(255,255,255,0.04) inset, 0 10px 28px rgba(0,0,0,0.45)',
            }
          : undefined
      }
      {...rest}
    >
      {children}
    </Box>
  );
}
