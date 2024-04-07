import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { getAllForms, markFormAsRead } from '../../utils/sendRequest';
import { FormData } from '../../types/formData';
import { SortOptions, SortOrder } from '../../enums/SortOrder';
import useFormsListFiltering from '../../hooks/useFormsListFiltering';
import { useSort } from '../../hooks/useSort';
import {
  lastUpdatedCompareFunction,
  nameCompareFunction,
} from '../../utils/sortFunctions';
export default function ViewFormsList() {
  const [forms, setForms] = useState<FormData[]>([]);
  const [allForms, setAllForms] = useState<FormData[]>([]); // this is used to get all forms again after removing a filter/search term
  const [sortBy, setSortBy] = useState<SortOptions>(SortOptions.NAME);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();

  //navigate to an user's form based on the formId, and update its read state
  const navigateToForm = (formId: string) => {
    navigate(`/form/${formId}`);
    markFormAsRead(formId);
  };

  const getForms = async () => {
    const allForms = await getAllForms();
    setForms(allForms);
    setAllForms(allForms);
  };

  // sort forms

  const compareFunction =
    sortBy === SortOptions.NAME
      ? nameCompareFunction
      : lastUpdatedCompareFunction;
  const { setSortOrder } = useSort(forms, compareFunction, setForms);

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
  const { setHospitalsToFilter, setStatesToFilter } = useFormsListFiltering(
    allForms,
    setForms,
    searchTerm
  );

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
      <Table marginLeft="auto" marginRight="auto" width="98%" variant="simple">
        <Thead>
          <Tr>
            <Th></Th>
            <Th></Th>
            <Th sx={{ color: '#000000', fontSize: '23px'}}>Last Updated</Th>
            <Th sx={{ color: '#000000', fontSize: '23px'}}>Child Name</Th>
            <Th sx={{ color: '#000000', fontSize: '23px'}}>Date of Birth</Th>
            <Th sx={{ color: '#000000', fontSize: '23px'}}>Hospital</Th>
            <Th sx={{ color: '#000000', fontSize: '23px'}}>Location</Th>
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
            {forms.map((form, index) => (
              <Tr key={form.id} onClick={() => navigateToForm(form.id)} sx={{
                color: index % 2 === 0 ? '#000000' : '#555555',
              }}>
                <Td sx={{fontSize: '20px'}}>{`${index + 1}.`}</Td>
                <Td
                  style={{
                    color: '#E3670C',
                    fontSize: '24pt',
                  }}
                >
                  {form.read === undefined || !form.read ? '●' : ''}
                </Td>
                <Td sx={{ fontSize: '20px' }}>
                  {form.adminNotes.length > 0
                    ? new Date(
                      form.adminNotes[0].updatedAt
                    ).toLocaleDateString()
                    : new Date(
                      form.financialAssistanceForm.date
                    ).toLocaleDateString()}
                </Td>
                <Td sx={{ fontSize: '20px' }}>{form.financialAssistanceForm.childsName}</Td>
                <Td sx={{ fontSize: '20px' }}>
                  {new Date(
                    form.financialAssistanceForm.dob
                  ).toLocaleDateString()}
                </Td>
                <Td sx={{ fontSize: '20px' }}>{form.financialAssistanceForm.hospital}</Td>
                <Td sx={{ fontSize: '20px' }}>{`${form.financialAssistanceForm.hospitalAddress.city}, ${form.financialAssistanceForm.hospitalAddress.state}`}</Td>
              </Tr>
            ))}
          </Tbody>
        )}
      </Table>
    </Box>
  );
}
