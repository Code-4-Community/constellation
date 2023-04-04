import React, { useState } from 'react';
import {
  Box,
  Center,
  Heading,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import testData from '../../testData.json';
import useSortingAndFiltering from '../../hooks/useSortingAndFiltering';

export default function ViewFormsList() {
  const [options, setOptions] = useState({});
  const reducedData = useSortingAndFiltering(testData, options);

  return (
    <Box p={1}>
      <Center mb={1}>
        <Heading size="xl">Submitted Forms</Heading>
      </Center>
      <Select width="25%" mb={2} ml={4}>
        <option value="name">Sort by Name</option>
        <option value="recency">Sort by Last Updated</option>
      </Select>
      <Table marginLeft="auto" marginRight="auto" width="98%" variant="striped">
        <Thead>
          <Tr>
            <Th>Last Updated</Th>
            <Th>Child Name</Th>
            <Th>Date of Birth</Th>
            <Th>Hospital</Th>
            <Th>Location</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reducedData.map((child) => (
            <Tr key={child.id}>
              <Td>{new Date(child.date).toLocaleDateString()}</Td>
              <Td>{child.childsName}</Td>
              <Td>{new Date(child.dob).toLocaleDateString()}</Td>
              <Td>{child.hospital}</Td>
              <Td>{`${child.address.city}, ${child.address.state}`}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
