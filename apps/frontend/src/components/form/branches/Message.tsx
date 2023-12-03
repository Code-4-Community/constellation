import { Container, Text } from '@chakra-ui/react';

type MessageProps = {
  message: string;
};

const Message = ({ message }: MessageProps) => {
  return (
    <Container
      maxW="container.md"
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
    >
      <Text>{message}</Text>
    </Container>
  );
};

export default Message;
