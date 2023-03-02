import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Field, FieldProps } from 'formik';
import React from 'react';

type InputFieldProps = {
  fieldName: string;
  idPrefix?: string;
  placeholder?: string;
  displayName?: string;
  isRequired?: boolean;
};

/**
 * A form input field for short text input to be composed with Form.
 */
const InputField: React.FC<InputFieldProps> = ({
  // validate,
  fieldName,
  idPrefix,
  placeholder,
  displayName,
  isRequired,
}) => (
  <Field name={fieldName}>
    {({ field, form }: FieldProps) => (
      <FormControl
        isRequired={isRequired}
        isInvalid={Boolean(form.errors[fieldName] && form.touched[fieldName])}
      >
        <FormLabel htmlFor={fieldName}>{displayName ?? fieldName}</FormLabel>
        <Input
          {...field}
          id={`${idPrefix ?? ''}${fieldName}`}
          placeholder={placeholder}
        />
      </FormControl>
    )}
  </Field>
);

export default InputField;
