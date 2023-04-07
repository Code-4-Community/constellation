import { Authenticator } from '@aws-amplify/ui-react';
import { ChakraProvider } from '@chakra-ui/react';
import { Amplify } from 'aws-amplify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import awsExports from '../aws-exports';
import { Login } from '../components/auth/Login';
import { RequireAuth } from '../components/auth/RequireAuth';
import ViewFormsList from '../components/ViewFormsList';
import NotFoundPage from '../pages/404';
import GrantFormPage from '../pages/grantFormPage';
import MedicalFormPage from '../pages/medicalFormPage';

Amplify.configure(awsExports);

function ConstellationRoutes() {
  return (
    <BrowserRouter>
      <Routes>
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
        <Route path="*" element={<NotFoundPage />} />
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
