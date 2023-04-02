/* eslint-disable react/jsx-props-no-spreading */

// do we add notes section to both grant form and medical form or just one
import React from 'react';
import Form from './Form';
import FormField from './FormField';
import { submitForm } from '../../utils/sendRequest';

const GrantForm: React.FC = () => {
  return (
    <Form onSubmit={submitForm} initialValues={{}}>
      <FormField
        inputVariant="text"
        name="childName"
        isRequired
        displayName="Child Name"
      />

      <FormField
        inputVariant="date"
        name="dob"
        isRequired
        displayName="Date of Birth"
      />

      <FormField inputVariant="text" name="gender" displayName="Gender" />

      <FormField
        inputVariant="text"
        name="parentName"
        displayName="Parent/Legal Guardian Name"
      />

      <FormField
        inputVariant="text"
        name="addressStreet"
        displayName="Address"
      />

      <FormField inputVariant="text" name="addressCity" displayName="City" />

      <FormField inputVariant="text" name="addressState" displayName="State" />

      <FormField
        inputVariant="number"
        name="addressZipcode"
        displayName="Zip Code"
      />

      <FormField
        inputVariant="phoneNumber"
        name="phoneNumber"
        displayName="Phone Number"
        isRequired
      />

      <FormField
        inputVariant="phoneNumber"
        name="cellPhoneNumber"
        displayName="Cell Phone Number"
      />

      <FormField
        inputVariant="email"
        name="email"
        displayName="Email Address"
        isRequired
      />

      <FormField
        inputVariant="money"
        name="requestedGrantAmount"
        displayName="Requested Grant Amount (in USD)"
      />

      <FormField
        inputVariant="textArea"
        name="useOfGrant"
        displayName="Intended use of grant"
        description="Please provide a copy of the bill, if direct payment to a creditor is preferred"
      />

      <FormField
        inputVariant="text"
        name="parentSignature"
        displayName="Parent/Legal Guardian Signature"
      />

      <FormField
        inputVariant="date"
        name="parentSignatureDate"
        displayName="Date"
      />

      <FormField
        inputVariant="textArea"
        name="grantFormNotes"
        displayName="Notes"
        description="This space is for recording any thoughts/questions you may have"
      />
    </Form>
  );
};

export default GrantForm;
