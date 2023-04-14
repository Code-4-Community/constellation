import * as React from 'react';
import { Image, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';
import Logo from '../header/Swgologo.jpeg';

const PortalHeader: React.FC = () => {
  return (
    <LinkBox display="flex" pr="8" pl="8" py="4" justifyContent="space-between">
      <LinkOverlay href="/all-forms">
        <Image width="128px" height="45.8px" src={Logo} />
        <Heading size="l">TSWGO Admin Portal</Heading>
      </LinkOverlay>
    </LinkBox>
  );
};

export default PortalHeader;
