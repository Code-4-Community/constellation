import { Button } from '@chakra-ui/react';

interface NextButtonProps {
  nextStep: () => void;
  option: 'Next' | 'Previous' | 'Submit';
  isDisabled?: boolean;
}

const NextButton: React.FC<NextButtonProps> = ({
  nextStep,
  option,
  isDisabled,
}) => {
  return (
    <Button
      bg="#EA6824"
      _hover={{ bg: "#EA682461" }}
      textColor="#FFFFFF"
      onClick={nextStep}
      isDisabled={isDisabled}
    >
      {option}
    </Button>
  );
};

export default NextButton;
