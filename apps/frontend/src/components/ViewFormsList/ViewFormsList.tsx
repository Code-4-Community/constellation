import { useState, useEffect } from 'react';
import {
  Box,
  Center,
  Flex,
  Heading,
  Spacer,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getAllForms, markFormAsRead } from '../../utils/sendRequest';
import { FormData } from '../../types/formData';
import { SortOptions } from '../../enums/SortOrder';
import useFormsListFiltering from '../../hooks/useFormsListFiltering';
import { useSort } from '../../hooks/useSort';
import {
  lastUpdatedCompareFunction,
  nameCompareFunction,
} from '../../utils/sortFunctions';
import CSVImportButton from './CSVImportButton';
import ViewFormsOptions from './ViewFormsOptions';

export default function ViewFormsList() {
  const [forms, setForms] = useState<FormData[]>([]);
  const [allForms, setAllForms] = useState<FormData[]>([]); // this is used to get all forms again after removing a filter/search term

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

  useEffect(() => {
    getForms();
  }, []);

  return (
    <Box p={1}>
      <Center mb={1}>
        <Heading size="xl">Submitted Forms</Heading>
      </Center>
      <Box mb={8}>
        <CSVImportButton />
      </Box>

      <ViewFormsOptions forms={forms} allForms={allForms} setForms={setForms} />

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
