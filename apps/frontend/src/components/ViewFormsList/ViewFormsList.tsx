import { useState, useEffect } from 'react';
import {
  Box,
  Center,
  Flex,
  Heading,
  Input,
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
import CSVImportButton from './CSVImportButton';
import ViewFormsOptions from './ViewFormsOptions';
import { formSchema } from '../../types/formSchema';

export default function ViewFormsList() {
  const [forms, setForms] = useState<FormData[]>([]);
  const [allForms, setAllForms] = useState<FormData[]>([]); // this is used to get all forms again after removing a filter/search term
  const [searchTerm, setSearchTerm] = useState<string>('');

  const navigate = useNavigate();

  //navigate to an user's form based on the formId, and update its read state
  const navigateToForm = (formId: string) => {
    navigate(`/form/${formId}`);
    markFormAsRead(formId);
  };

  const getForms = async () => {
    const allForms = await getAllForms();
    const validatedForms = await validateForms(allForms);
    setForms(validatedForms);
    setAllForms(validatedForms);
  };

  const validateForms = async (forms: any[]) => {
    const validatedForms = [] as FormData[];
    for (const f of forms) {
      try {
        await formSchema.validate(f);
        validatedForms.push(f as any as FormData);
      } catch (error) {
        console.log(error);
      }
    }
    return validatedForms;
  };

  useEffect(() => {
    getForms();
  }, []);

  return (
    <Box p={1}>
      <Flex alignItems="center" justifyContent="space-between" mb={8}>
        <Box marginLeft={5}>
          <CSVImportButton />
          <ViewFormsOptions
            forms={forms}
            allForms={allForms}
            setForms={setForms}
            searchTerm={searchTerm}
          />
        </Box>

        <Center mb={1}>
          <Heading
            sx={{
              fontSize: '52px',
            }}
          >
            Submitted Forms
          </Heading>
        </Center>

        <Input
          width="15%"
          alignSelf="flex-start"
          placeholder="Search"
          marginRight={2}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </Flex>

      <Table marginLeft="auto" marginRight="auto" width="98%" variant="simple">
        <Thead>
          <Tr>
            <Th></Th>
            <Th></Th>
            <Th sx={{ color: '#000000', fontSize: '23px' }}>Last Updated</Th>
            <Th sx={{ color: '#000000', fontSize: '23px' }}>Child Name</Th>
            <Th sx={{ color: '#000000', fontSize: '23px' }}>Date of Birth</Th>
            <Th sx={{ color: '#000000', fontSize: '23px' }}>Hospital</Th>
            <Th sx={{ color: '#000000', fontSize: '23px' }}>Location</Th>
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
              <Tr
                key={form.id}
                onClick={() => navigateToForm(form.id)}
                sx={{
                  color: index % 2 === 0 ? '#000000' : '#555555',
                }}
              >
                <Td sx={{ fontSize: '20px' }}>{`${index + 1}.`}</Td>
                <Td
                  style={{
                    color: '#EA6824',
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
                <Td sx={{ fontSize: '20px' }}>
                  {form.financialAssistanceForm.childsName}
                </Td>
                <Td sx={{ fontSize: '20px' }}>
                  {new Date(
                    form.financialAssistanceForm.dob
                  ).toLocaleDateString()}
                </Td>
                <Td sx={{ fontSize: '20px' }}>
                  {form.financialAssistanceForm.hospital}
                </Td>
                <Td
                  sx={{ fontSize: '20px' }}
                >{`${form.financialAssistanceForm.hospitalAddress.city}, ${form.financialAssistanceForm.hospitalAddress.state}`}</Td>
              </Tr>
            ))}
          </Tbody>
        )}
      </Table>
    </Box>
  );
}
