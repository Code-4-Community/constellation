import { Box, Container, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import MedicalForm from '../components/form/MedicalForm';
import Header from '../components/header/Header';

const MedicalFormPage: React.FC = () => (
  <Box>
    <Container maxW="xl">
      <Header />

      <Heading size="md" textAlign="center">
        Information
      </Heading>

      <Text textAlign={'center'} padding="2">
        (to be completed by medical professional)
      </Text>

      <MedicalForm />
    </Container>
  </Box>
);

export default MedicalFormPage;
