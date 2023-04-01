import { FormControl, FormLabel } from '@chakra-ui/react';
import { Field, FieldInputProps, FieldProps } from 'formik';
import { ReactNode } from 'react';

interface FormFieldProps {
  name: string;
  displayName: string;
  isRequired?: boolean;
  children: (field: FieldInputProps<any>) => ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  displayName,
  isRequired,
  children,
}) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired={isRequired}
          isInvalid={Boolean(form.errors[name] && form.touched[name])}
        >
          <FormLabel htmlFor={name}>{displayName}</FormLabel>
          {children(field)}
        </FormControl>
      )}
    </Field>
  );
};

export default FormField;
