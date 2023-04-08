import { Container, Heading, Text } from '@chakra-ui/react';
import { FormikBag, FormikProps } from 'formik';
import React from 'react';
import GrantForm from '../components/form/GrantForm';
import Header from '../components/header/Header';

const GrantFormPage: React.FC = () => (
  <Container>
    <Header />

    <Heading size="md" textAlign="center">
      Application for Financial Assistance
    </Heading>

    <Text textAlign={'center'} padding="10px">
      (to be completed by child's parent/legal guardian)
    </Text>

    <GrantForm />
  </Container>
);

export default GrantFormPage;
