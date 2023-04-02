import { ChakraProvider } from '@chakra-ui/react';
import GrantFormPage from '../pages/GrantFormPage';
import MedicalFormPage from '../pages/MedicalFormPage';

export function App() {
  return (
    <ChakraProvider>
      <GrantFormPage />
      <MedicalFormPage />
    </ChakraProvider>
  );
}

export default App;
