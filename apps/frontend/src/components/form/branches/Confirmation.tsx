import {
  Button,
  Container,
  Heading,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from '@chakra-ui/react';

type ConfirmationStepProps = {
  confirmationQuestion: string;
  confirmationSubheading?: string;
  onConfirm: (response: boolean) => void;
  value: boolean | undefined;
};

const ConfirmationStep = ({
  confirmationQuestion,
  confirmationSubheading,
  onConfirm,
  value,
}: ConfirmationStepProps) => {
  const radioValue = (() => {
    switch (value) {
      case true:
        return '1';
      case false:
        return '2';
      default:
        return '0';
    }
  })();

  return (
    <>
      <VStack spacing={6}>
        <Heading size="md">{confirmationQuestion}</Heading>
        <Heading size="sm" textAlign="center">
          {confirmationSubheading}
        </Heading>
        <RadioGroup
          onChange={(value) => onConfirm(value === '1')}
          value={radioValue}
          display="flex"
          flexDirection="column"
        >
          <Radio value={'1'}>Yes</Radio>
          <Radio value={'2'}>No</Radio>
        </RadioGroup>
      </VStack>
    </>
  );
};

export default ConfirmationStep;
