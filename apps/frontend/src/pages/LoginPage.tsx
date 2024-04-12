import { Container } from '@chakra-ui/react';
import React from 'react';
import Header from '../components/header/Header';
import { Login } from '../components/auth/Login';

const LoginPage: React.FC = () => (
  <Container>
    <Header />
    <Login />
  </Container>
);

export default LoginPage;
