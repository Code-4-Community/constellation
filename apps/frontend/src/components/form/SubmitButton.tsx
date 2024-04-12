import { Button, Center, Tooltip } from '@chakra-ui/react';
import { FormikProps } from 'formik';
import { formSchema } from '../../types/formSchema';
import { FormValues } from './Form';

interface SubmitButtonProps {
  form: FormikProps<any>;
}

/**
 * Determines whether the submit button should be enabled.
 *
 * @param values the values currently entered into the form
 * @returns true iff the values can be parsed successfully
 */
const enableButton = (values: FormValues): boolean => {
  try {
    formSchema.validateSync(values);
    return true;
  } catch (e) {
    return false;
  }
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ form }) => (
  <Center>
    <Tooltip
      label="Fill out all required fields first!"
      isDisabled={enableButton(form.values)}
    >
      <Button
        bg="#EA6824"
        _hover={{ bg: "#EA682461" }}
        textColor="#FFFFFF"
        onClick={form.submitForm}
        isDisabled={!enableButton(form.values)}
      >
        Submit
      </Button>
    </Tooltip>
  </Center>
);

export default SubmitButton;
