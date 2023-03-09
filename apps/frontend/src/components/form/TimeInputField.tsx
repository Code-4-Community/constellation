import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Field, FieldProps } from 'formik';
import React from 'react';

interface InputFieldProps {
    fieldName: string;
    displayName?: string;
    isRequired?: boolean;
  }
/**
 * A form input field for short text input to be composed with Form.
 */
const TimeInputField: React.FC<InputFieldProps> = ({
    fieldName,
    displayName,
    isRequired,
  }) => {
    return (
    <Field
      name={fieldName}
      >
      {({ field, form }: FieldProps) => (
        <FormControl
        isRequired={isRequired}
        isInvalid={Boolean(form.errors[fieldName] && form.touched[fieldName])}
        >
        <FormLabel htmlFor={fieldName}>{displayName ?? fieldName}</FormLabel>
        <Input {...field} type='date' w={"100%"}/>
      </FormControl>
        )} 
    </Field>
  )};

export default TimeInputField;