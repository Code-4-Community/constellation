import styled from '@emotion/styled';
import NxWelcome from './nx-welcome';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import ViewFormsList2 from '../ViewFormsList2';
import {ChakraProvider} from "@chakra-ui/react";

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <StyledApp>
          <Routes>
            <Route path="/" element={<NxWelcome title="frontend" />} />
            <Route path="/viewForms" element={<ViewFormsList2 />} />
          </Routes>
        </StyledApp>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
