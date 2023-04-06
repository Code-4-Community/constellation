import { Amplify } from 'aws-amplify';
import { ChakraProvider, Heading } from '@chakra-ui/react';
import GrantFormPage from '../pages/grantFormPage';
import MedicalFormPage from '../pages/medicalFormPage';
import ViewFormsList from '../components/ViewFormsList';
import { Authenticator } from '@aws-amplify/ui-react';
import { RequireAuth } from '../components/auth/RequireAuth';
import { Login } from '../components/auth/Login';
import awsExports from '../aws-exports';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
