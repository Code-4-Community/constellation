import { ChakraProvider, Collapse } from '@chakra-ui/react';
import FormPage from '../pages/FormPage';
import GrantFormPage from '../pages/GrantFormPage';
import MedicalFormPage from '../pages/MedicalFormPage';

export function App() {
  return (
    <ChakraProvider>
      {/* <GrantFormPage />
      <MedicalFormPage /> */}
      <FormPage />
    </ChakraProvider>
  );
}

export default App;
