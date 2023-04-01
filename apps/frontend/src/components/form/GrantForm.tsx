/* eslint-disable react/jsx-props-no-spreading */

// do we add notes section to both grant form and medical form or just one
import React from 'react';
import Form, { FormValues } from './Form';
import {
  Input,
  NumberInputField,
  NumberInput,
  InputGroup,
  InputLeftElement,
  FormHelperText,
  Textarea,
} from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons';
import FormField from './FormField';
import axios from 'axios';
import { POST_FORM_URL } from '../../constants/endpoints';

interface GrantFormValues {
  childName: string;
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
  grantFormNotes: string;
}

interface GrantFormProps {
  onSubmit?: (values: Partial<GrantFormValues>) => Promise<void>;
}

const alertOnSubmit = async (values: FormValues) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  alert(JSON.stringify(values, null, 2));
};

const GrantForm: React.FC<GrantFormProps> = ({ onSubmit }) => {
  return (
    <Form onSubmit={onSubmit ?? alertOnSubmit} initialValues={{}}>
      <FormField name="childName" isRequired displayName="Child Name">
        {(field) => <Input {...field} id={'childName'} />}
      </FormField>

      <FormField name="dob" isRequired displayName="Date of Birth">
        {(field) => <Input {...field} type="date" id={'dob'} />}
      </FormField>

      <FormField name="gender" displayName="Gender">
        {(field) => <Input {...field} id={'gender'} />}
      </FormField>

      <FormField name="parentName" displayName="Parent/Legal Guardian Name">
        {(field) => <Input {...field} id={'parentName'} />}
      </FormField>

      <FormField name="addressStreet" displayName="Address">
        {(field) => <Input {...field} id={'addressStreet'} />}
      </FormField>

      <FormField name="addressCity" displayName="City">
        {(field) => <Input {...field} id={'addressCity'} />}
      </FormField>

      <FormField name="addressState" displayName="State">
        {(field) => <Input {...field} id={'addressState'} />}
      </FormField>

      <FormField name="addressZipcode" displayName="Zip Code">
        {(field) => (
          <NumberInput>
            <NumberInputField {...field} id={'addressZipcode'} />
          </NumberInput>
        )}
      </FormField>

      <FormField name="phoneNumber" displayName="Phone Number" isRequired>
        {() => (
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<PhoneIcon color="gray.300" />}
            />
            <Input type="tel" />
          </InputGroup>
        )}
      </FormField>

      <FormField name="cellPhoneNumber" displayName="Cell Phone Number">
        {() => (
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<PhoneIcon color="gray.300" />}
            />
            <Input type="tel" />
          </InputGroup>
        )}
      </FormField>

      <FormField name="email" displayName="Email Address" isRequired>
        {(field) => <Input {...field} type="email" id={'email'} />}
      </FormField>

      <FormField
        name="requestedGrantAmount"
        displayName="Requested Grant Amount (in USD)"
      >
        {(field) => (
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
        )}
      </FormField>

      <FormField name="useOfGrant" displayName="Intended use of grant">
        {(field) => (
          <>
            <Textarea {...field} id={'useOfGrant'} />
            <FormHelperText>
              Please provide a copy of the bill, if direct payment to a creditor
              is preferred
            </FormHelperText>
          </>
        )}
      </FormField>

      <FormField
        name="parentSignature"
        displayName="Parent/Legal Guardian Signature"
      >
        {(field) => <Input {...field} id={'parentSignature'} />}
      </FormField>

      <FormField name="parentSignatureDate" displayName="Date">
        {(field) => <Input {...field} type="date" id={'parentSignatureDate'} />}
      </FormField>

      <FormField name="grantFormNotes" displayName="Notes">
        {(field) => (
          <>
            <Textarea {...field} id={'grantFormNotes'} />
            <FormHelperText>
              This space is for recording any thoughts/questions you may have
            </FormHelperText>
          </>
        )}
      </FormField>
    </Form>
  );
};

export default GrantForm;
