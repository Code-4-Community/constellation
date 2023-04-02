import styled from '@emotion/styled';
import NxWelcome from './nx-welcome';
import { Amplify } from 'aws-amplify';
import { ChakraProvider } from '@chakra-ui/react';
import GrantFormPage from '../pages/grantFormPage';
import MedicalFormPage from '../pages/medicalFormPage';
import ViewFormsList from '../components/ViewFormsList';
import AuthedPage from '../pages/AuthedPage';

import awsExports from '../aws-exports';
Amplify.configure(awsExports);

export function App() {
  return (
    <ChakraProvider>
      <GrantFormPage></GrantFormPage>
      <MedicalFormPage></MedicalFormPage>
      <ViewFormsList />
      <AuthedPage />
    </ChakraProvider>
  );
}

export default App;
