import { Button, Center, Spacer, Tooltip } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { FormValues } from '../components/form/Form';
import { formSchema } from '../types/formSchema';
import { submitForm } from '../utils/sendRequest';
import GrantFormPage from './GrantFormPage';
import MedicalFormPage from './MedicalFormPage';
import { useState } from 'react';

const FormPage: React.FC = () => {
  const formProgress = useState<number>(0);

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

  const getDeepValues = (obj: Object): string[] => {
    console.log(obj);
    var values: string[] = [];

    for (const val of Object.values(obj)) {
      if (typeof val === "object") {
        values = values.concat(getDeepValues(val));
      } else {
        values.push(String(val));
      }
    }

    return values;
  }

  /**
   * Determines whether the submit button should be enabled.
   *
   * @param values the values currently entered into the form
   * @returns true iff the values can be parsed successfully
   */
  const enableButton = (values: FormValues): boolean => {
    console.log(getDeepValues(values).filter(entry => entry.length > 0).length);
    try {
      formSchema.validateSync(values);
      return true;
    } catch (e) {
      return false;
    }
  };

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
