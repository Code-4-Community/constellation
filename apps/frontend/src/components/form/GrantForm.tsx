/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import Form, { FormValues } from './Form';
import InputField from './InputField';
import TimeInputField from './TimeInputField';
import NumberInputField from './NumberInputField';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';

import EmailInputField from './EmailInputField';

interface GrantFormValues {
  childName: string;
  ssn: string;
  dob: Date; 
  gender: string;
  parentName: string;
  childAddress: string;
  childCity: string;
  childState: string;
  childZipcode: string;
  childPhone: string;
  childCellphone: string;
  childEmail: string;
  grantDollarAmount: number; 
  useOfGrant: string;
  parentSignature: string;
  parentSignatureDate: Date;
}

interface ExampleFormProps {
  onSubmit?: (values: Partial<GrantFormValues>) => Promise<void>;
}

const alertOnSubmit = async (values: FormValues) => {
  // import and call method on api
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // eslint-disable-next-line no-alert
  alert(JSON.stringify(values, null, 2));
};

const ExampleForm: React.FC<ExampleFormProps> = ({ onSubmit }) => (
  // eslint-disable-next-line no-alert
  <Form onSubmit={onSubmit ?? alertOnSubmit} initialValues={{ }}>
    <InputField
      isRequired
      displayName="Child's Name:"
      fieldName="childName"
    />
    <InputField
      isRequired
      displayName="SSN:"
      fieldName="ssn"
    />
    <TimeInputField
      isRequired
      displayName="Date of Birth:"
      fieldName="dob"
    />
    <InputField
      isRequired
      displayName="Gender:"
      fieldName="gender"
    />
    <InputField
      isRequired
      displayName="Parent/Legal Guardian Name:"
      fieldName="parentName"
    />
    <InputField
      isRequired
      displayName="Address:"
      fieldName="childAddress"
    />
    <InputField
      isRequired
      displayName="City:"
      fieldName="childCity"
    />
    <InputField
      isRequired
      displayName="State:"
      fieldName="childState"
    />
    <InputField
      isRequired
      displayName="Zip Code:"
      fieldName="childZipcode"
    />
    <InputField
      isRequired
      displayName="Phone:"
      fieldName="childPhone"
    />
    <InputField
      isRequired
      displayName="Cell Phone:"
      fieldName="childCellphone"
    />

    <EmailInputField
      isRequired
      displayName="E-mail Address"
      fieldName="childEmail"
    />
    <NumberInputField
      isRequired
      displayName="Requested grant amount (in USD):"
      fieldName="grantDollarAmount"
    />
    <InputField
      isRequired
      displayName="Intended use of grant (please provide a copy of the bill, if direct payment to a creditor is preferred):"
      fieldName="useOfGrant"
    />
    <InputField
      isRequired
      displayName="Parent/Legal Guardian Signature:"
      fieldName="parentSignature"
    />
    <TimeInputField
      isRequired
      displayName="Date:"
      fieldName="parentSignatureDate" 
    /> 
  </Form>
);

export default ExampleForm;