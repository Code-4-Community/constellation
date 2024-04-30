import { useState, useEffect } from 'react';
import {
  Box,
  Button,
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
import { formSchema, addressSchema, AdminNotes } from '../../types/formSchema';
import { CSVDownload, CSVLink } from 'react-csv';
import { Asserts } from 'yup';

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

  const convertFormsToCSVFormat = () => {
    return allForms.map((form) => {
      return {
        id: form.id,
        childsName: form.financialAssistanceForm.childsName,
        dob: form.financialAssistanceForm.dob,
        guardianName: form.financialAssistanceForm.guardianName,
        childsDiagnosis: form.financialAssistanceForm.childsDiagnosis,
        otherDiagnosis: form.financialAssistanceForm.otherDiagnosis,
        dateOfDiagnosis: form.financialAssistanceForm.dateOfDiagnosis,
        childsPhysician: form.financialAssistanceForm.childsPhysician,
        hospital: form.financialAssistanceForm.hospital,
        otherHospital: form.financialAssistanceForm.otherHospital,
        hospitalAddress: convertAddressToString(
          form.financialAssistanceForm.hospitalAddress
        ),
        requestedGrantAmount: `$${form.financialAssistanceForm.requestedGrantAmount}`,
        intendedUseOfGrant: form.financialAssistanceForm.intendedUseOfGrant,
        medicalProfessionalPhone:
          form.financialAssistanceForm.medicalProfessionalPhone,
        medicalProfessionalEmail:
          form.financialAssistanceForm.medicalProfessionalEmail,
        notes: form.financialAssistanceForm.notes,
        date: form.financialAssistanceForm.date,
        ...convertAdminNotesToString(form.adminNotes),
      };
    });
  };

  const convertAddressToString = (hospital: Asserts<typeof addressSchema>) => {
    return `${hospital.street}, ${hospital.city} ${hospital.state}, ${hospital.zipcode}`;
  };

  const convertAdminNotesToString = (adminNotes: AdminNotes) => {
    let notes = {};
    adminNotes.forEach((adminNote, index) => {
      notes = {
        ...notes,
        [`admin_note_${index}`]: `${adminNote.note} (${adminNote.updatedAt})`,
      };
    });
    return notes;
  };

  return (
    <Box p={1}>
      <Flex alignItems="center" justifyContent="space-between" mb={8}>
        <Box marginLeft={5}>
          <Input
            alignSelf="flex-start"
            placeholder="Search"
            marginRight={2}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

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

        <Box
          display="flex"
          flexDirection="column"
          alignItems="start"
          rowGap="5px"
          mb="10px"
          marginRight={5}
        >
          <CSVImportButton />

          <Button>
            <CSVLink
              data={convertFormsToCSVFormat()}
              filename="tswgo_all_forms"
              target="_blank"
              style={{
                margin: '10px 0',
                width: '98%',
              }}
            >
              Download Forms To CSV
            </CSVLink>
          </Button>
        </Box>
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
