import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Center,
  Flex,
  Heading,
  Select,
  Spacer,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Link,
  Input,
} from '@chakra-ui/react';
import { getAllForms } from '../../utils/sendRequest';
import { FormData } from '../../types/formData';
import { SortOptions, SortOrder } from '../../enums/SortOrder';
import { useSort } from '../../hooks/useSort';
import { lastUpdatedCompareFunction, nameCompareFunction } from '../../hooks/useSort/sortFunctions';
import { useFilter } from '../../hooks/useFilter/useFilter';
import { formFilterFunction } from '../../hooks/useFilter/filterFunctions';

export default function ViewFormsList() {
  const [forms, setForms] = useState<FormData[]>([]);
  const [allForms, setAllForms] = useState<FormData[]>([]); // this is used to get all forms again after removing a filter/search term
  const [sortBy, setSortBy] = useState<SortOptions>(SortOptions.NAME);

  const getForms = async () => {
    const allForms = await getAllForms();
    setForms(allForms);
    setAllForms(allForms);
  };


  // sort forms
  const compareFunction = sortBy === SortOptions.NAME ? nameCompareFunction : lastUpdatedCompareFunction;
  const { sortedData: sortedForms, setSortOrder} = useSort(forms, compareFunction);

  // filter forms by search term
const {filteredData: filteredForms, setSearchTerm} = useFilter(sortedForms, formFilterFunction);

  useEffect(() => {
    getForms();
  }, []);

  return (
    <Box p={1}>
      <Center mb={1}>
        <Heading size="xl">Submitted Forms</Heading>
      </Center>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Select
          width="25%"
          mb={2}
          ml={4}
          onChange={(event) => setSortBy(event.target.value as SortOptions)}
        >
          <option value={SortOptions.NAME}>Sort by Name</option>
          <option value={SortOptions.LASTUPDATED}>Sort by Last Updated</option>
        </Select>
        <Select 
        width="25%" 
        mb={2} 
        mr={4}
        onChange={(event) => setSortOrder(event.target.value as SortOrder)}
        >
          <option value={SortOrder.ASC}>Ascending</option>
          <option value={SortOrder.DESC}>Descending</option>
        </Select>
        <Input
          width="25%"
          mr={4}
          placeholder="Search"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </Box>
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
        {forms === null ? (
          <Flex>
            <Spacer />
            <Spinner size="xl" />
            <Spacer />
          </Flex>
        ) : (
          <Tbody>
            {filteredForms.map((form) => (
              <Tr key={form.id}>
                <Td>
                  {form.adminNotes.length > 0
                    ? new Date(
                        form.adminNotes[0].updatedAt
                      ).toLocaleDateString()
                    : new Date(form.guardianForm.date).toLocaleDateString()}
                </Td>
                <Td>
                  <Link href={`/form/${form.id}`}>
                    {form.guardianForm.childsName}
                  </Link>
                </Td>
                <Td>{new Date(form.guardianForm.dob).toLocaleDateString()}</Td>
                <Td>{form.medicalForm.hospital}</Td>
                <Td>{`${form.guardianForm.address.city}, ${form.guardianForm.address.state}`}</Td>
              </Tr>
            ))}
          </Tbody>
        )}
      </Table>
    </Box>
  );
}
