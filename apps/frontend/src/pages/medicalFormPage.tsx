import { Box, Container, Grid, Heading, Text } from '@chakra-ui/react';
import * as React from 'react';
import MedicalForm from '../components/form/MedicalForm';
import Header from '../components/header/Header';

const MedicalFormPage: React.FC = () => (
  <Box>
    <Grid minH="100vh" padding="3">
      <Container maxW="xl">
        <Header></Header>
        <Heading size="md" textAlign="center">
          Information
        </Heading>
        <Text textAlign="center" padding="2">
          (to be completed by medical professional)
        </Text>
        <MedicalForm />
      </Container>
    </Grid>
  </Box>
);

export default MedicalFormPage;
