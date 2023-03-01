import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Field, FieldProps } from 'formik';
import React from 'react';
import { GenericInputFieldProps } from './types';

type InputFieldProps = GenericInputFieldProps<string>;

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
  <Field
    name={fieldName}
  >
    {({ field, form }: FieldProps) => (
      <FormControl
        isRequired={isRequired}
        isInvalid={Boolean(form.errors[fieldName] && form.touched[fieldName])}
      >
        <FormLabel htmlFor={fieldName}>{displayName ?? fieldName}</FormLabel>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Input {...field} id={`${idPrefix ?? ''}${fieldName}`} placeholder={placeholder} />
      </FormControl>
    )}
  </Field>
);

export default InputField;