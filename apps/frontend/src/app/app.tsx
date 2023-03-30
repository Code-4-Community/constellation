import { ChakraProvider } from '@chakra-ui/react';
import GrantFormPage from '../pages/grantFormPage';
import MedicalFormPage from '../pages/medicalFormPage';
import ViewFormsList from '../components/ViewFormsList';


export function App() {
  return (
    <ChakraProvider>
      <GrantFormPage></GrantFormPage>
      <MedicalFormPage></MedicalFormPage>
      <ViewFormsList />
    </ChakraProvider>
  );
}

export default App;
