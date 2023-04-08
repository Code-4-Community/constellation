import { Button, Center, Spacer } from '@chakra-ui/react';
import { Formik } from 'formik';
import { FormValues } from '../components/form/Form';
import { formSchema } from '../types/formSchema';
import { submitForm } from '../utils/sendRequest';
import GrantFormPage from './GrantFormPage';
import MedicalFormPage from './MedicalFormPage';

const FormPage: React.FC = () => {
  const onSubmit = async (values: FormValues): Promise<void> => {
    await submitForm(values);
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{}}
      validationSchema={formSchema}
    >
      {(form) => (
        <>
          <GrantFormPage />

          <Spacer height={16} />

          <MedicalFormPage />

          <Center>
            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              onClick={form.submitForm}
            >
              Submit
            </Button>
          </Center>
        </>
      )}
    </Formik>
  );
};

export default FormPage;
