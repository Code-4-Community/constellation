import { Button } from '@chakra-ui/react';

interface NextButtonProps {
  nextStep: () => void;
  option: 'Next' | 'Previous' | 'Submit';
  isDisabled?: boolean;
}

const NextButton: React.FC<NextButtonProps> = ({ nextStep, option, isDisabled }) => {
  return (
    <Button colorScheme="teal" onClick={nextStep} ml={2} isDisabled={isDisabled}>
      {option}
    </Button>
  );
};

export default NextButton;
