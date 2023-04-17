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
} from '@chakra-ui/react';
import { getAllForms } from '../../utils/sendRequest';
import { FormData } from '../../types/formData';
import { SortOptions } from '../../enums/SortOrder';

export default function ViewFormsList() {
  const [forms, setForms] = useState<FormData[]>([]);
  const [sortBy, setSortBy] = useState<SortOptions>(SortOptions.NAME);

  const getForms = async () => {
    const allForms = await getAllForms();
    setForms(allForms);
  };

  useMemo(() => {
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
    console.log('sorted forms', forms);
  }, [sortBy, forms]);

  useEffect(() => {
    getForms();
  }, []);

  return (
    <Box p={1}>
      <Center mb={1}>
        <Heading size="xl">Submitted Forms</Heading>
      </Center>
      <Select
        width="25%"
        mb={2}
        ml={4}
        onChange={(event) => setSortBy(event.target.value as SortOptions)}
      >
        <option value={SortOptions.NAME}>Sort by Name</option>
        <option value={SortOptions.LASTUPDATED}>Sort by Last Updated</option>
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
