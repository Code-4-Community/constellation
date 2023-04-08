import { FormControl, FormLabel } from '@chakra-ui/react';
import { Field, FieldProps } from 'formik';
import FormInput, { InputVariant } from './FormInput';

interface FormFieldProps {
  inputVariant: InputVariant;
  name: string;
  displayName: string;
  description?: string;
  isRequired?: boolean;
  selectList?: string[][];
}

const FormField: React.FC<FormFieldProps> = ({
  inputVariant,
  name,
  displayName,
  description,
  isRequired,
  selectList,
}) => {
  const fieldType = (() => {
    if (inputVariant === 'money' || inputVariant === 'number') {
      return 'number';
    } else if (inputVariant === 'email') {
      return 'email';
    } else {
      return 'text';
    }
  })();

  return (
    <Field name={name} type={fieldType}>
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired={isRequired}
          isInvalid={Boolean(form.errors[name] && form.touched[name])}
        >
          <FormLabel htmlFor={name}>{displayName}</FormLabel>
          <FormInput
            variant={inputVariant}
            field={field}
            form={form}
            id={name}
            description={description}
            selectList={selectList}
          />
        </FormControl>
      )}
    </Field>
  );
};

export default FormField;
