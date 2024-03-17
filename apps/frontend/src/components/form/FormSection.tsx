import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
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
      <Box bg="#832BBE">
        {title}
        {children}
      </Box>
      <NextButton option="Previous" nextStep={() => {}} />
      <NextButton option="Next" nextStep={() => {}} />
    </Box>
  );
}
