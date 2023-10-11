import * as React from 'react';
import { Box, Image, Link } from '@chakra-ui/react';
import Logo from '../header/Swgologo.jpeg';

const Header: React.FC = () => {

  return (
    <Box display="flex" pr="8" pl="8" py="4" justifyContent="space-between">
      <Link href="https://www.tswgo.org/">
        <Image width="128px" height="45.8px" src={Logo} />
      </Link>
    </Box>
  );
};

export default Header;