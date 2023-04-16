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
  Link,
  GridItem,
} from '@chakra-ui/react';
import { getAllForms } from '../../utils/sendRequest';
import { FormData, FormDataNestedKeys } from '../../types/formData';
import useSortingAndFiltering from '../../hooks/useSortingAndFiltering';
import { Filter, Filtering, Options } from '../../types/SortAndFilter';
import FormListRow from './FormListRow';
import FormListFilter from './FormListFilter';
import { Grid } from '@aws-amplify/ui-react';

export enum FormDataToEnglish {
  'date' = 'Last Updated',
  'guardianForm.childsName' = 'Child Name',
  'guardianForm.dob' = 'Date of Birth',
  'medicalForm.hospital' = 'Hospital',
  'guardianForm.address' = 'Location',
}

export default function ViewFormsList() {
  const [forms, setForms] = useState<FormData[] | null>(null);

  const { listState: filteredForms } = useSortingAndFiltering();

  const getForms = async () => {
    const allForms = await getAllForms();
    setForms(allForms);
  };

  useEffect(() => {
    getForms();
  }, []);

  return (
    <Box p={1}>
      <Center mb={1}>
        <Heading size="xl">Submitted Forms</Heading>
      </Center>
      <Select width="25%" mb={2} ml={4}>
        <option value="name">Sort by Name</option>
        <option value="recency">Sort by Last Updated</option>
      </Select>
      <Grid templateColumns="1fr 3fr">
        {filteredForms === null || filteredForms.length === 0 ? (
          <Flex>
            <Spacer />
            <Spinner size="xl" />
            <Spacer />
          </Flex>
        ) : (
          <GridItem colSpan={1}>
            {Object.entries(FormDataToEnglish).map(
              ([formKey, englishValue], index) => {
                return (
                  <FormListFilter
                    key={index}
                    dataField={formKey as FormDataNestedKeys}
                    dataLabel={englishValue}
                    filterValues={getUniqueValuesFromKey(
                      filteredForms,
                      formKey as FormDataNestedKeys
                    )}
                  />
                );
              }
            )}
          </GridItem>
        )}
        <GridItem colSpan={1}>
          <Table
            marginLeft="auto"
            marginRight="auto"
            width="98%"
            variant="striped"
          >
            <Thead>
              <Tr>
                <Th>Last Updated</Th>
                <Th>Child Name</Th>
                <Th>Date of Birth</Th>
                <Th>Hospital</Th>
                <Th>Location</Th>
              </Tr>
            </Thead>
            {filteredForms === null || filteredForms.length === 0 ? (
              <Flex>
                <Spacer />
                <Spinner size="xl" />
                <Spacer />
              </Flex>
            ) : (
              <Tbody>
                {filteredForms.map((form) => (
                  <FormListRow
                    id={form.id}
                    date={form.guardianForm.date}
                    childsName={form.guardianForm.childsName}
                    dob={form.guardianForm.dob}
                    hospital={form.medicalForm.hospital}
                    address={form.guardianForm.address}
                  />
                ))}
              </Tbody>
            )}
          </Table>
        </GridItem>
      </Grid>
    </Box>
  );
}
