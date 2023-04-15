import { useAuthenticator } from '@aws-amplify/ui-react';
import { Box, Button, Heading } from '@chakra-ui/react';
import { Navigate, useLocation } from 'react-router-dom';
import PortalHeader from '../header/PortalHeader';

export function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const { route } = useAuthenticator((context) => [context.route]);
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  if (route !== 'authenticated') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return (
    <>
      <Box display="flex" padding="8" justifyContent="space-between">
        <PortalHeader />
        <Box
          display="flex"
          flexDirection="column"
          pr="8"
          pl="8"
          py="4"
          justifyContent="space-between"
          alignItems="end"
        >
          <Button height="45.8px" onClick={signOut}>
            Sign Out
          </Button>
          <Heading size="m">Logged in as: {user.attributes?.email}</Heading>
        </Box>
      </Box>
      {children}
    </>
  );
}
