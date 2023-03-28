import React, { useState } from 'react';
import {Box, Center, Heading, Select, Table, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react';
import testData from "../testData.json"

export default function ViewFormsList2 () {
  const [sortBy, setSortBy] = useState('name');
  let childData = testData;

  if (sortBy === 'name') {
    childData = testData.sort((a, b) => a.childsName.localeCompare(b.childsName));
  } else if (sortBy === 'recency') {
    childData = testData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  return (
    <Box p={1}>
      <Center mb={1}>
        <Heading size='xl'>Submitted Forms</Heading>
      </Center>
      <Select width='25%' mb={2} onChange={e => setSortBy(e.target.value)}>
        <option value='name'>Sort by Name</option>
        <option value='recency'>Sort by Recency</option>
      </Select>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Last Updated</Th>
            <Th>Child Name</Th>
            <Th>Date of Birth</Th>
            <Th>Hospital of Birth</Th>
            <Th>Location of Birth</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            childData.map(child =>
              <Tr key={child.childsName}>
                <Td>{new Date(child.date).toLocaleDateString()}</Td>
                <Td>{child.childsName}</Td>
                <Td>{new Date(child.dob).toLocaleDateString()}</Td>
                <Td>{child.hospital}</Td>
                <Td>{`${child.address.city}, ${child.address.state}`}</Td>
              </Tr>
            )
          }
        </Tbody>
      </Table>
    </Box>
  )
}
