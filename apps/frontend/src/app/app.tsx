import styled from '@emotion/styled';
import NxWelcome from './nx-welcome';
import { Amplify } from 'aws-amplify';
import { ChakraProvider } from '@chakra-ui/react';
import GrantFormPage from '../pages/grantFormPage';
import MedicalFormPage from '../pages/medicalFormPage';
import {
  withAuthenticator,
  WithAuthenticatorProps,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '../aws-exports';

Amplify.configure(awsExports);

interface Props extends WithAuthenticatorProps {
  isPassedToWithAuthenticator: boolean;
}

// const StyledApp = styled.div`
//   // Your style here
// `;

export function App({ isPassedToWithAuthenticator, signOut, user }: Props) {
  if (!isPassedToWithAuthenticator) {
    throw new Error(`isPassedToWithAuthenticator was not provided`);
  }
  return (
    // <StyledApp>
    //   <h1>Hello {user?.username}</h1>
    //   <button onClick={signOut}>Sign out</button>
    //   <NxWelcome title="frontend" />
    // </StyledApp>
    <ChakraProvider>
      <GrantFormPage></GrantFormPage>
      <MedicalFormPage></MedicalFormPage>
    </ChakraProvider>
  );
}

export default withAuthenticator(App);
