import styled from '@emotion/styled';
import { ChakraProvider } from '@chakra-ui/react';
import GrantFormPage from '../pages/grantFormPage';
import MedicalFormPage from '../pages/medicalFormPage';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <ChakraProvider>
      <GrantFormPage></GrantFormPage>
      <MedicalFormPage></MedicalFormPage>
    </ChakraProvider>
  );
}

export default App;
