import { Container, Flex, Heading, Spacer, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ViewAdminNotes } from '../components/adminNotes/AdminNotes';
import { ErrorMessage } from '../components/ErrorMessage';
import { GuardianForm } from '../components/viewForm/GuardianForm';
import { MedicalForm } from '../components/viewForm/MedicalForm';
import { FormData } from '../types/formData';
import { formSchema } from '../types/formSchema';
import { getFormById } from '../utils/sendRequest';

const OneFormPage: React.FC = () => {
  const [formData, setFormData] = useState<null | FormData>(null);
  const [error, setError] = useState<null | string>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const result = await getFormById(id);
        const formData: FormData = formSchema.validateSync(result.data[0]);
        setFormData(formData);
      } else {
        setError('No form ID.');
      }
    };
    fetchData().catch((e) => {
      setError('Unable to fetch form data.');
      console.error(e);
    });
  }, [id]);

  if (error) {
    return <ErrorMessage message={error} />;
  } else {
    return (
      <Container maxWidth="90ch" padding="0px 32px 80px">
        <Heading
          size="lg"
          textAlign="center"
          padding="16px"
          marginBottom="24px"
        >
          Form: {formData?.guardianForm.childsName || id}
        </Heading>
        {formData == null && (
          <Flex>
            <Spacer />
            <Spinner size="xl" />
            <Spacer />
          </Flex>
        )}
        {formData && <GuardianForm guardianForm={formData.guardianForm} />}
        {formData && <MedicalForm medicalForm={formData.medicalForm} />}
        {formData && <ViewAdminNotes notes={formData.adminNotes} />}
      </Container>
    );
  }
};

export default OneFormPage;
