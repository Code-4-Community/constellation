import { Button, Center, Spacer } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { FormValues } from '../components/form/Form';
import { formSchema } from '../types/formSchema';
import { submitForm } from '../utils/sendRequest';
import GrantFormPage from './GrantFormPage';
import MedicalFormPage from './MedicalFormPage';

const FormPage: React.FC = () => {
  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<any>
  ): Promise<void> => {
    try {
      await submitForm(values);
    } finally {
      actions.setSubmitting(false);
    }
  };

  console.log(process.env.NX_ENV_NAME);

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{}}
      validationSchema={formSchema}
    >
      {(form) => (
        <Form>
          <GrantFormPage />

          <Spacer height={16} />

          <MedicalFormPage />

          <Center>
            <Button mt={4} colorScheme="teal" onClick={form.submitForm}>
              Submit
            </Button>
          </Center>
        </Form>
      )}
    </Formik>
  );
};

export default FormPage;
