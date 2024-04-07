import { Container, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

type MessageProps = {
  children: ReactNode;
};

const Message: React.FC<MessageProps> = ({ children }) => {
  return (
    <Container
      maxW="container.md"
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
    >
      {children}
    </Container>
  );
};

export default Message;
