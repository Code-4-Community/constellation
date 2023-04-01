import { ChakraProvider } from '@chakra-ui/react';
import GrantFormPage from '../pages/grantFormPage';
import MedicalFormPage from '../pages/medicalFormPage';

export function App() {
  return (
    <ChakraProvider>
      <GrantFormPage />
      <MedicalFormPage />
    </ChakraProvider>
  );
}

export default App;
