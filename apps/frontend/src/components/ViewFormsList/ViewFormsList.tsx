import React, { useState, useEffect, useMemo } from 'react';
import Checkbox from './DropDownCheckbox';
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
import MultiSelect from './MultiSelectBoxes';


export default function ViewFormsList() {
  const [forms, setForms] = useState<FormData[]>([]);
  const [allForms, setAllForms] = useState<FormData[]>([]); // this is used to get all forms again after removing a filter/search term
  const [sortBy, setSortBy] = useState<SortOptions>(SortOptions.NAME);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASC);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [checkboxes, setCheckboxes] = React.useState<boolean[]>(Array(11).fill(false)); 
  

  const handleChange = (index: number) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    setCheckboxes(newCheckboxes);
  };  
  const states = [ " CT ", " DE ", " ME ", " MD ", " MA ", " NH ", " NJ ", " NY ", " PA ", " RI ", " VT "];
  
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

  // filter forms by search term
  useEffect(() => {
    if (searchTerm.length > 0) {
      setForms(
        allForms.filter((form) => {
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
        })
      );
    } else {
      setForms(allForms);
    }
  }, [searchTerm]);

  useEffect(() => {
    getForms();
  }, []);
  // event handler for all the checkboozes to a empty list until the boxes are checked then the list appends the checked boxes
  // keep the hosptial names as long and add the full names to the lists as well
  return (
    <Box p={1}>
      <Center mb={1}>
        <Heading size="xl">Submitted Forms</Heading>
      </Center>
      <MultiSelect></MultiSelect>      
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
