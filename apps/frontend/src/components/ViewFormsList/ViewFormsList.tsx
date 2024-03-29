import React, { useState, useEffect } from 'react';
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
  Input,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {
  getAllForms,
  markFormAsRead
} from '../../utils/sendRequest';
import { FormData } from '../../types/formData';
import { SortOptions, SortOrder } from '../../enums/SortOrder';
import useFormsListFiltering from '../../hooks/useFormsListFiltering';
import { useSort } from '../../hooks/useSort';
import {
  lastUpdatedCompareFunction,
  nameCompareFunction,
} from '../../utils/sortFunctions';
import CSVImportButton from './CSVImportButton';

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
      <CSVImportButton />
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
            <Th></Th>
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
              <Tr key={form.id} onClick={() => navigateToForm(form.id)}>
                <Td
                  style={{
                    color: '#3275a8',
                    fontSize: '24pt',
                  }}
                >
                  {form.read === undefined || !form.read ? '●' : ''}
                </Td>
                <Td>
                  {form.adminNotes.length > 0
                    ? new Date(
                        form.adminNotes[0].updatedAt
                      ).toLocaleDateString()
                    : new Date(
                        form.financialAssistanceForm.date
                      ).toLocaleDateString()}
                </Td>
                <Td>{form.financialAssistanceForm.childsName}</Td>
                <Td>
                  {new Date(
                    form.financialAssistanceForm.dob
                  ).toLocaleDateString()}
                </Td>
                <Td>{form.financialAssistanceForm.hospital}</Td>
                <Td>{`${form.financialAssistanceForm.hospitalAddress.city}, ${form.financialAssistanceForm.hospitalAddress.state}`}</Td>
              </Tr>
            ))}
          </Tbody>
        )}
      </Table>
    </Box>
  );
}
