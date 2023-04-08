import { Container, Heading, Text, Link } from '@chakra-ui/react';
import * as React from 'react';

const NotFoundPage: React.FC = () => (
  <Container>
    <Heading size="lg" textAlign="center" padding="16px">
      404 Not Found
    </Heading>
    <Text textAlign={'center'} padding="10px">
      This page does not exist. Are you looking for{' '}
      <Link color="teal.600" href="/form" textDecoration="underline">
        the form page
      </Link>
      ?
    </Text>
  </Container>
);

export default NotFoundPage;
