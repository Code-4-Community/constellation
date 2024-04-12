import { ReactNode } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import NextButton from './NextButton';

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
    <Box bg="#422669" borderRadius="10px" padding="3" marginBottom="3">
      <Box color="#FFFFFF" marginBottom="3">
        {title}
      </Box>
      <Flex
        bg="#FFFFFF"
        flexDirection="column"
        rowGap="20px"
        borderRadius="10px"
        padding="20px"
      >
        {children}
      </Flex>
    </Box>
  );
}
