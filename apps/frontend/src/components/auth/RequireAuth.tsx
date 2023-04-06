import { useLocation, Navigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Box, Heading, Button } from '@chakra-ui/react';

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
        <Heading size="l">Logged in as: {user.username}</Heading>
        <Button onClick={signOut}>Sign Out</Button>
      </Box>
      {children}
    </>
  );
}
