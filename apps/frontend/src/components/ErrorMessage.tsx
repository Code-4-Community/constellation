import { Text } from '@chakra-ui/react';

interface ErrorMessageProps {
  message: string;
}
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <Text align="center" fontSize="xl">
    Error: {message}
  </Text>
);
