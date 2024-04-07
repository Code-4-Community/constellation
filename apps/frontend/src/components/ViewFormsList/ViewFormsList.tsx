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
