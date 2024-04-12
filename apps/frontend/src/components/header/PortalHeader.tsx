import * as React from 'react';
import { Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';
import Logo from './Logo';

const PortalHeader: React.FC = () => {
  return (
    <LinkBox display="flex" pr="8" pl="8" py="4" justifyContent="space-between">
      <LinkOverlay href="/all-forms">
        <Logo />
      </LinkOverlay>
    </LinkBox>
  );
};

export default PortalHeader;
