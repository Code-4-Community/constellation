import { useAuthenticator } from '@aws-amplify/ui-react';
import { Box, Button, Heading } from '@chakra-ui/react';
import { Navigate, useLocation } from 'react-router-dom';

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
        <Heading size="l">Logged in as: {user.attributes?.email}</Heading>
        <Button onClick={signOut}>Sign Out</Button>
      </Box>
      {children}
    </>
  );
}
