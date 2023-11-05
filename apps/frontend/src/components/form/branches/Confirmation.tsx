import { Button, Container, Heading, Text, VStack } from '@chakra-ui/react';

type ConfirmationStepProps = {
  confirmationQuestion: string;
  onConfirm: (response: boolean) => void;
};

const ConfirmationStep = ({
  confirmationQuestion,
  onConfirm,
}: ConfirmationStepProps) => {
  return (
    <Container
      maxW="container.md"
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
    >
      <VStack spacing={6}>
        <Heading size="md">{confirmationQuestion}</Heading>
        <Text>Please confirm your response:</Text>
        <div>
          <Button colorScheme="teal" mr={3} onClick={() => onConfirm(true)}>
            Yes
          </Button>
          <Button variant="outline" onClick={() => onConfirm(false)}>
            No
          </Button>
        </div>
      </VStack>
    </Container>
  );
};

export default ConfirmationStep;
