import { ChakraProvider } from '@chakra-ui/react';
import GrantFormPage from '../pages/grantFormPage';
import MedicalFormPage from '../pages/medicalFormPage';
import ViewFormsList2 from '../ViewFormsList2';


export function App() {
  return (
    <ChakraProvider>
      <GrantFormPage></GrantFormPage>
      <MedicalFormPage></MedicalFormPage>
      <ViewFormsList2 />
    </ChakraProvider>
  );
}

export default App;
