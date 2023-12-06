import { Button } from '@chakra-ui/react';

interface NextButtonProps {
  nextStep: () => void;
  option: 'Next' | 'Previous' | 'Submit';
}

const NextButton: React.FC<NextButtonProps> = ({ nextStep, option }) => {
  return (
    <Button colorScheme="teal" onClick={nextStep} ml={2}>
      {option}
    </Button>
  );
};

export default NextButton;
