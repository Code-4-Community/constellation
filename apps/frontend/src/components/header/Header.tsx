import * as React from 'react';
import { Box, Image } from '@chakra-ui/react';
import Logo from '../header/Swgologo.jpeg';

const Header: React.FC = () => {

  return (
    <Box display="flex" paddingLeft="8" paddingRight="8" justifyContent="space-between">
      <Image width="128px" height="45.8px" src={Logo} />
    </Box>
  );
};

export default Header;