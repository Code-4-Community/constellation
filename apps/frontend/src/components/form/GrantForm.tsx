/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import Form, { FormValues } from './Form';
import {
  FormControl,
  FormLabel,
  Input,
  NumberInputField,
  NumberInput,
  InputGroup,
  InputLeftElement,
  FormHelperText,
  Textarea,
} from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons';
import { Field, FieldProps } from 'formik';

interface GrantFormValues {
  childName: string;
  ssn: string;
  dob: Date;
  gender: string;
  parentName: string;
  addressStreet: string;
  addressCity: string;
  addressState: string;
  addressZipcode: number;
  phoneNumber: string;
  cellPhoneNumber: string;
  email: string;
  grantDollarAmount: number;
  useOfGrant: string;
  parentSignature: string;
  parentSignatureDate: Date;
}

interface ExampleFormProps {
  onSubmit?: (values: Partial<GrantFormValues>) => Promise<void>;
}

const alertOnSubmit = async (values: FormValues) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  alert(JSON.stringify(values, null, 2));
};

const ExampleForm: React.FC<ExampleFormProps> = ({ onSubmit }) => (
  <Form onSubmit={onSubmit ?? alertOnSubmit} initialValues={{}}>
    <Field name="childName">
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired
          isInvalid={Boolean(
            form.errors['childName'] && form.touched['childName']
          )}
        >
          <FormLabel htmlFor={'childName'}>Child Name</FormLabel>
          <Input {...field} id={'childName'} />
        </FormControl>
      )}
    </Field>
    <Field name="ssn">
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired
          isInvalid={Boolean(form.errors['ssn'] && form.touched['ssn'])}
        >
          <FormLabel htmlFor={'ssn'}>SSN</FormLabel>
          <Input {...field} id={'ssn'} />
        </FormControl>
      )}
    </Field>
    <Field name="dob">
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired
          isInvalid={Boolean(form.errors['dob'] && form.touched['dob'])}
        >
          <FormLabel htmlFor={'dob'}>Date of Birth</FormLabel>
          <Input {...field} type="date" id={'dob'} />
        </FormControl>
      )}
    </Field>
    <Field name="gender">
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired
          isInvalid={Boolean(form.errors['gender'] && form.touched['gender'])}
        >
          <FormLabel htmlFor={'gender'}>Gender</FormLabel>
          <Input {...field} id={'gender'} />
        </FormControl>
      )}
    </Field>
    <Field name="parentName">
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired
          isInvalid={Boolean(
            form.errors['parentName'] && form.touched['parentName']
          )}
        >
          <FormLabel htmlFor={'parentName'}>
            Parent/Legal Guardian Name
          </FormLabel>
          <Input {...field} id={'parentName'} />
        </FormControl>
      )}
    </Field>
    <Field name="addressStreet">
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired
          isInvalid={Boolean(
            form.errors['addressStreet'] && form.touched['addressStreet']
          )}
        >
          <FormLabel htmlFor={'addressStreet'}>Address</FormLabel>
          <Input {...field} id={'addressStreet'} />
        </FormControl>
      )}
    </Field>
    <Field name="addressCity">
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired
          isInvalid={Boolean(
            form.errors['addressCity'] && form.touched['addressCity']
          )}
        >
          <FormLabel htmlFor={'addressCity'}>City</FormLabel>
          <Input {...field} id={'addressCity'} />
        </FormControl>
      )}
    </Field>
    <Field name="addressState">
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired
          isInvalid={Boolean(
            form.errors['addressState'] && form.touched['addressState']
          )}
        >
          <FormLabel htmlFor={'addressState'}>State</FormLabel>
          <Input {...field} id={'addressState'} />
        </FormControl>
      )}
    </Field>
    <Field name="addressZipcode">
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired
          isInvalid={Boolean(
            form.errors['addressZipcode'] && form.touched['addressZipcode']
          )}
        >
          <FormLabel htmlFor={'addressZipcode'}>Zip Code</FormLabel>
          <NumberInput>
            <NumberInputField {...field} id={'addressZipcode'} />
          </NumberInput>
        </FormControl>
      )}
    </Field>
    <Field name="phoneNumber">
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired
          isInvalid={Boolean(
            form.errors['phoneNumber'] && form.touched['phoneNumber']
          )}
        >
          <FormLabel htmlFor={'phoneNumber'}>Phone Number</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<PhoneIcon color="gray.300" />}
            />
            <Input type="tel" />
          </InputGroup>
        </FormControl>
      )}
    </Field>
    <Field name="cellPhoneNumber">
      {({ field, form }: FieldProps) => (
        <FormControl
          isInvalid={Boolean(
            form.errors['cellPhoneNumber'] && form.touched['cellPhoneNumber']
          )}
        >
          <FormLabel htmlFor={'cellPhoneNumber'}>Cell Phone Number</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<PhoneIcon color="gray.300" />}
            />
            <Input type="tel" />
          </InputGroup>
        </FormControl>
      )}
    </Field>
    <Field name="email">
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired
          isInvalid={Boolean(form.errors['email'] && form.touched['email'])}
        >
          <FormLabel htmlFor={'email'}>Email Address</FormLabel>
          <Input {...field} type="email" id={'email'} />
        </FormControl>
      )}
    </Field>
    <Field name="requestedGrantAmount">
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired
          isInvalid={Boolean(
            form.errors['requestedGrantAmount'] &&
              form.touched['requestedGrantAmount']
          )}
        >
          <FormLabel htmlFor={'requestedGrantAmount'}>
            Requested Grant Amount (in USD)
          </FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children="$"
            />
            <NumberInput>
              <NumberInputField {...field} id={'requestedGrantAmount'} />
            </NumberInput>
          </InputGroup>
        </FormControl>
      )}
    </Field>
    <Field name="useOfGrant">
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired
          isInvalid={Boolean(
            form.errors['useOfGrant'] && form.touched['useOfGrant']
          )}
        >
          <FormLabel htmlFor={'useOfGrant'}>Intended use of grant</FormLabel>
          <Textarea {...field} id={'useOfGrant'} />
          <FormHelperText>
            Please provide a copy of the bill, if direct payment to a creditor
            is preferred
          </FormHelperText>
        </FormControl>
      )}
    </Field>
    <Field name="parentSignature">
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired
          isInvalid={Boolean(
            form.errors['parentSignature'] && form.touched['parentSignature']
          )}
        >
          <FormLabel htmlFor={'parentSignature'}>
            Parent/Legal Guardian Signature
          </FormLabel>
          <Input {...field} id={'parentSignature'} />
        </FormControl>
      )}
    </Field>
    <Field name="parentSignatureDate">
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired
          isInvalid={Boolean(
            form.errors['parentSignatureDate'] &&
              form.touched['parentSignatureDate']
          )}
        >
          <FormLabel htmlFor={'parentSignatureDate'}>Date</FormLabel>
          <Input {...field} type="date" id={'parentSignatureDate'} />
        </FormControl>
      )}
    </Field>
  </Form>
);

export default ExampleForm;
