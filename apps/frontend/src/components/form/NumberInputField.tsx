import { FormControl, FormLabel, NumberInput, NumberInputField } from '@chakra-ui/react';
import { Field, FieldProps } from 'formik';
import React from 'react';
// STILL NEED TO FIX UP THIS FORMATTING
interface InputFieldProps {
    fieldName: string;
    displayName?: string;
    isRequired?: boolean;
  }

/**
 * A form input field for short text input to be composed with Form.
 */
const TimeInputField: React.FC<InputFieldProps> = ({
  // validate,
  fieldName,
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
        <NumberInput {...field} min={0}>
        <NumberInputField />
    </NumberInput>
      </FormControl>
    )}
  </Field>
);

export default TimeInputField;