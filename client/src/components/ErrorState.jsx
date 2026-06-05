import { Alert, AlertDescription, AlertIcon, Box } from '@chakra-ui/react';

export default function ErrorState({ message }) {
  if (!message) return null;
  return (
    <Alert
      status="error"
      variant="left-accent"
      bg="rgba(239,68,68,0.08)"
      borderColor="rgba(239,68,68,0.45)"
      borderWidth="1px"
      borderRadius="lg"
      color="brand.text"
      mb={4}
    >
      <AlertIcon color="brand.danger" />
      <Box>
        <AlertDescription fontSize="sm">{message}</AlertDescription>
      </Box>
    </Alert>
  );
}
