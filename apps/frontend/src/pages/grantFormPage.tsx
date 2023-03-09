import { Box, Container, Grid, Heading, Text } from '@chakra-ui/react';
import * as React from 'react';
import GrantForm from '../components/form/GrantForm';
import Header from '../components/header/Header';

const GrantFormPage: React.FC = () => (
  <Box>
    <Grid minH="100vh" p={3}>
      <Container maxW="xl">
      <Header></Header>
        <Heading size="md" textAlign="center">
          Application for Financial Assistance
        </Heading>
        <Text textAlign={"center"} padding="10px">
          (to be completed by child’s parent/legal guardian)
        </Text>
        <GrantForm />
      </Container>
    </Grid>
  </Box>
);

export default GrantFormPage;