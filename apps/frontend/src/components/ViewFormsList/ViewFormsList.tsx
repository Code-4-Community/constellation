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
import useFormsListFiltering from '../../hooks/useFormsListFiltering';

export default function ViewFormsList() {
  const [forms, setForms] = useState<FormData[]>([]);
  const [allForms, setAllForms] = useState<FormData[]>([]); // this is used to get all forms again after removing a filter/search term
  const [sortBy, setSortBy] = useState<SortOptions>(SortOptions.NAME);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASC);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const getForms = async () => {
    const allForms = await getAllForms();
    setForms(allForms);
    setAllForms(allForms);
  };

  // sort forms
  useEffect(() => {
    if (sortBy === SortOptions.NAME) {
      forms.sort((a, b) =>
        a.guardianForm.childsName.localeCompare(b.guardianForm.childsName)
      );
    } else if (sortBy === SortOptions.LASTUPDATED) {
      forms.sort(
        (a, b) =>
          (b.adminNotes.length > 0
            ? new Date(b.adminNotes[0].updatedAt).getTime()
            : new Date(b.guardianForm.date).getTime()) -
          (a.adminNotes.length > 0
            ? new Date(a.adminNotes[0].updatedAt).getTime()
            : new Date(a.guardianForm.date).getTime())
      );
    }
    if (sortOrder === SortOrder.DESC) {
      forms.reverse();
    }
  }, [sortBy, sortOrder, forms]);

  /* Filter forms by search term and lists of hospital and state filtering options;
     the setters returned by the filtering hook allow the hospitals and states to
     filter for to be updated

     Note: hospitalsToFilter should contain only hospital abbreviations as represented
     in the keys of the HospitalsDropdownValues enum / as they appear in the
     "hospital" column of the table (e.g., ["BOSHOSPITAL"])

     Note: statesToFilter should contain only state abbreviations as represented in
     the keys of the StatesDropdownValues enum / as they appear in the "location"
     column of the table (e.g., ["MA", "NH"])

     After filtering by search term, the forms list will be filtered such that only
     forms whose hospital is in the hospitalsToFilter array and whose state is in
     the statesToFilter array will be shown; if an array is empty, then that type
     of filtering will not be performed
  */
  const {setHospitalsToFilter, setStatesToFilter} = useFormsListFiltering(allForms, setForms, searchTerm);
  
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
            {forms.map((form) => (
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
