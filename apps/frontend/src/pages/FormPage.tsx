import { Button, Center, Spacer, Tooltip } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { FormValues } from '../components/form/Form';
import {
  formSchema,
  medicalFormSchema,
  guardianFormSchema,
} from '../types/formSchema';
import { submitForm } from '../utils/sendRequest';
import GrantFormPage from './GrantFormPage';
import MedicalFormPage from './MedicalFormPage';
import { useStateFormContext } from '../hooks/useStateFormContext';

const FormPage: React.FC = () => {
  const { isOtherStatesSelected } = useStateFormContext();

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<any>
  ): Promise<void> => {
    try {
      await submitForm(values);
    } finally {
      actions.resetForm(); // Reset the form here
      actions.setSubmitting(false);
    }
  };

  /**
   * Determines whether the submit button should be enabled.
   *
   * @param values the values currently entered into the form
   * @returns true iff the values can be parsed successfully
   */
  const enableButton = (values: FormValues): boolean => {
    try {
      formSchema.validateSync(values);
      return !(isOtherStatesSelected); // Disables the submit button if user selected "Other" for state
    } catch (e) {
      return false;
    }
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        medicalForm: medicalFormSchema.getDefault(),
        guardianForm: guardianFormSchema.getDefault(),
      }}
      validationSchema={formSchema}
    >
      {(form) => (
        <Form>
          <GrantFormPage />

          <Spacer height={16} />

          <MedicalFormPage />

          <Center>
            <Tooltip
              label="Fill out all required fields first!"
              isDisabled={enableButton(form.values)}
            >
              <Button
                mt={4}
                colorScheme="teal"
                onClick={form.submitForm}
                isDisabled={!enableButton(form.values)}
              >
                Submit
              </Button>
            </Tooltip>
          </Center>
        </Form>
      )}
    </Formik>
  );
};

export default FormPage;
