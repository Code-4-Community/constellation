/* eslint-disable react/jsx-props-no-spreading */

// do we add notes section to both grant form and medical form or just one
import React from 'react';
// import Form from './Form';
import FormField from './FormField';
import { submitForm } from '../../utils/sendRequest';
import { FormikBag, FormikProps, Form } from 'formik';

const GrantForm: React.FC<{ form: FormikProps<{}> }> = ({ form }) => {
  return (
    <Form>
      <FormField
        inputVariant="text"
        name="guardianForm.childsName"
        isRequired
        displayName="Child Name"
      />

      <FormField
        inputVariant="date"
        name="guardianForm.dob"
        isRequired
        displayName="Date of Birth"
      />

      <FormField
        inputVariant="text"
        name="guardianForm.gender"
        displayName="Gender"
      />

      <FormField
        inputVariant="text"
        name="guardianForm.guardianName"
        displayName="Parent/Legal Guardian Name"
        isRequired
      />

      <FormField
        inputVariant="text"
        name="guardianForm.address.street"
        displayName="Address"
        isRequired
      />

      <FormField
        inputVariant="text"
        name="guardianForm.address.city"
        displayName="City"
        isRequired
      />

      <FormField
        inputVariant="text"
        name="guardianForm.address.state"
        displayName="State"
        isRequired
      />

      <FormField
        inputVariant="number"
        name="guardianForm.address.zipcode"
        displayName="Zip Code"
        isRequired
      />

      <FormField
        inputVariant="phoneNumber"
        name="guardianForm.phone"
        displayName="Phone Number"
        isRequired
      />

      <FormField
        inputVariant="phoneNumber"
        name="guardianForm.cellPhone"
        displayName="Cell Phone Number"
      />

      <FormField
        inputVariant="email"
        name="guardianForm.email"
        displayName="Email Address"
        isRequired
      />

      <FormField
        inputVariant="money"
        name="guardianForm.requestedGrantAmount"
        displayName="Requested Grant Amount (in USD)"
      />

      <FormField
        inputVariant="textArea"
        name="guardianForm.intendedUseOfGrant"
        displayName="Intended use of grant"
        description="Please provide a copy of the bill, if direct payment to a creditor is preferred"
      />

      <FormField
        inputVariant="text"
        name="guardianForm.signature"
        displayName="Parent/Legal Guardian Signature"
        isRequired
      />

      <FormField
        inputVariant="date"
        name="guardianForm.date"
        displayName="Date"
        isRequired
      />

      <FormField
        inputVariant="textArea"
        name="guardianForm.notes"
        displayName="Notes"
        description="This space is for recording any thoughts/questions you may have"
      />
    </Form>
  );
};

export default GrantForm;
