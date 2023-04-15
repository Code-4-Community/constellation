import { Container, Heading, Text } from '@chakra-ui/react';

interface FieldViewProps {
  fieldName: string;
  value: string;
}
export const FieldView: React.FC<FieldViewProps> = ({ fieldName, value }) => (
  <Container padding="0" width="fit-content" margin="16px 56px 16px 0px">
    <Heading
      size="xs"
      color="gray.500"
      textTransform="uppercase"
      paddingBottom="2px"
    >
      {fieldName}
    </Heading>
    <Text fontSize="xl">{value}</Text>
  </Container>
);
