import { ReactNode } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import NextButton from './NextButton';

interface FormSectionProps {
  title: String;
  children: ReactNode;
}

/**
 * Displays the child form HTML passed to it, surrounded by the form section styling
 * (including the section title, back and next buttons, and a progress bar).
 */
export default function FormSection({ title, children }: FormSectionProps) {
  return (
    <Box>
      <Box bg="#422669" padding="3" marginBottom="3">
        <Box color="#FFFFFF" marginBottom="3">
          {title}
        </Box>
        <Box bg="#FFFFFF" paddingLeft="3" paddingRight="3">
          {children}
        </Box>
      </Box>
      {/* <Flex justifyContent="space-between">
        <NextButton option="Previous" nextStep={() => {}} />
        <NextButton option="Next" nextStep={() => {}} />
      </Flex> */}
    </Box>
  );
}
