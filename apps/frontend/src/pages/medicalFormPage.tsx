import { Box, Container, Heading, Text } from '@chakra-ui/react';
import { FormikBag, FormikProps } from 'formik';
import React from 'react';
import MedicalForm from '../components/form/MedicalForm';
import Header from '../components/header/Header';

const MedicalFormPage: React.FC<{ form: FormikProps<{}> }> = ({ form }) => (
  <Box>
    <Container maxW="xl">
      <Header />

      <Heading size="md" textAlign="center">
        Information
      </Heading>

      <Text textAlign={'center'} padding="10px">
        (to be completed by medical professional)
      </Text>

      <MedicalForm form={form} />
    </Container>
  </Box>
);

export default MedicalFormPage;
