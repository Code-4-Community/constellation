import { Authenticator } from '@aws-amplify/ui-react';
import { ChakraProvider, Heading } from '@chakra-ui/react';
import { Amplify } from 'aws-amplify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import awsExports from '../aws-exports';
import { Login } from '../components/auth/Login';
import { RequireAuth } from '../components/auth/RequireAuth';
import ViewFormsList from '../components/ViewFormsList';
import GrantFormPage from '../pages/grantFormPage';
import MedicalFormPage from '../pages/medicalFormPage';

Amplify.configure(awsExports);

function ConstellationRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Heading size="xl">Home page stub</Heading>} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/form"
          element={
            <>
              <GrantFormPage />
              <MedicalFormPage />
            </>
          }
        />
        <Route
          path="/all-forms"
          element={
            <RequireAuth>
              <ViewFormsList />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export function App() {
  return (
    <Authenticator.Provider>
      <ChakraProvider>
        <ConstellationRoutes />
      </ChakraProvider>
    </Authenticator.Provider>
  );
}

export default App;
