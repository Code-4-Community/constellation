import { ReactNode } from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';

interface FormSectionProps {
  title: String;
  children: ReactNode;
}

/**
 * Displays the child form HTML passed to it, surrounded by the form section styling
 * (including the section title and background boxes).
 */
export default function FormSection({ title, children }: FormSectionProps) {
  return (
    <Box bg="#422669" borderRadius="10px" padding="40px" marginBottom="20px">
      <Text color="#FFFFFF" textAlign="center" fontSize="30px" marginBottom="20px">
        {title}
      </Text>
      <Flex
        bg="#FFFFFF"
        flexDirection="column"
        rowGap="20px"
        borderRadius="10px"
        padding="40px"
      >
        {children}
      </Flex>
    </Box>
  );
}
