import styled from '@emotion/styled';
import { ChakraProvider } from '@chakra-ui/react';
import GrantFormPage from '../pages/grantFormPage';
import MedicalFormPage from '../pages/medicalFormPage';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import ViewFormsList2 from '../ViewFormsList2';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <ChakraProvider>
      <GrantFormPage></GrantFormPage>
      <MedicalFormPage></MedicalFormPage>
      <BrowserRouter>
        <StyledApp>
          <Routes>
            <Route path="/viewForms" element={<ViewFormsList2 />} />
          </Routes>
        </StyledApp>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
