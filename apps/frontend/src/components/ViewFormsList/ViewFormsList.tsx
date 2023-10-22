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
import { SortOptions } from '../../enums/SortOrder';

export default function ViewFormsList() {
  const [forms, setForms] = useState<FormData[]>([]);
  const [allForms, setAllForms] = useState<FormData[]>([]); // this is used to get all forms again after removing a filter/search term
  const [sortBy, setSortBy] = useState<SortOptions>(SortOptions.NAME);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // the forms list will be filtered such that only forms whose hospital
  // is in the hospitalsToFilter array and whose state is in the
  // statesToFilter array will be shown; if an array is empty, then that
  // type of filtering will not be performed

  // should contain hospital abbreviations exactly as shown in the "hospital" column of the table (e.g., ["MASSGENHOSPITAL"])
  const [hospitalsToFilter, setHospitalsToFilter] = useState<string[]>([]);

  // should contain states (abbreviations) exactly as shown in the "location" column of the table (e.g., ["MA", "TX"])
  const [statesToFilter, setStatesToFilter] = useState<string[]>([]);

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
  }, [sortBy, forms]);

  // filter forms by search term and list of filtering options
  useEffect(() => {
    let formsToDisplay = allForms;

    // filter by search term
    if (searchTerm.length > 0) {
      formsToDisplay =
        formsToDisplay.filter((form) => {
          const formValues = Object.values({
            ...form.guardianForm,
            ...form.medicalForm,
            ...form.guardianForm.address,
          });
          console.log(formValues);

          for (const val of formValues) {
            if (
              typeof val === 'string' &&
              val.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return true;
            }
          }
          return false;
        });
    }

    // filter by hospital
    if (hospitalsToFilter.length > 0) {
      formsToDisplay =
        formsToDisplay.filter((form) => hospitalsToFilter.includes(form.medicalForm.hospital))
    }

    // filter by state ("location")
    if (statesToFilter.length > 0) {
      formsToDisplay =
        formsToDisplay.filter((form) => statesToFilter.includes(form.guardianForm.address.state))
    }

    setForms(formsToDisplay);
  }, [searchTerm, hospitalsToFilter, statesToFilter]);

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
