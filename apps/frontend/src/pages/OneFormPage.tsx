import { useEffect, useState } from 'react';
import { getFormById } from '../utils/sendRequest';
import { useParams } from 'react-router-dom';
import { FormDataWithId } from '../types/formData';
import { formSchema } from '../types/formSchema';
import {
  Container,
  Flex,
  Heading,
  Text,
  Spinner,
  Spacer,
} from '@chakra-ui/react';
import { ErrorMessage } from '../components/ErrorMessage';
import { GuardianForm } from '../components/viewForm/GuardianForm';
import { MedicalForm } from '../components/viewForm/MedicalForm';

const OneFormPage: React.FC = () => {
  const [formData, setFormData] = useState<null | FormDataWithId>(null);
  const [error, setError] = useState<null | string>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const result = await getFormById(id);
        const formData: FormDataWithId = {
          id: result.data[0].id,
          data: formSchema.validateSync(result.data[0].data),
        };
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
      <Container maxWidth="90ch" padding="0px 32px 32px">
        <Heading
          size="lg"
          textAlign="center"
          padding="16px"
          marginBottom="24px"
        >
          Form {id}
        </Heading>
        {formData == null && (
          <Flex>
            <Spacer />
            <Spinner size="xl" />
            <Spacer />
          </Flex>
        )}
        {formData && <GuardianForm guardianForm={formData.data.guardianForm} />}
        {formData && <MedicalForm medicalForm={formData.data.medicalForm} />}
      </Container>
    );
  }
};

export default OneFormPage;
