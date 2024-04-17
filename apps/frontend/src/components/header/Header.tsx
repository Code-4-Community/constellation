import * as React from 'react';
import { Box, Link } from '@chakra-ui/react';
import Logo from './Logo';

const Header: React.FC = () => {

  return (
    <Box
      display="flex"
      pr="8"
      pl="8"
      py="4"
      justifyContent="space-between"
      backgroundColor="#422669"
      mb="8"
      boxShadow="0px 0px 30px 0px rgba(0, 0, 0, .15)"
    >
      <Link href="https://www.tswgo.org/">
        <Logo />
      </Link>
    </Box>
  );
};

export default Header;