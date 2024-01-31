/* eslint-disable react/jsx-props-no-spreading */

// do we add notes section to both grant form and medical form or just one
import React from 'react';
import FormField from './FormField';
import { StatesDropdownValues } from '../../enums/DropdownValues';
import { useStateFormContext } from '../../hooks/useStateFormContext';

const GrantForm: React.FC = () => {

  const { isOtherStatesSelected, toggleOtherStates } = useStateFormContext();

  const handleStateSelectChange = (selectedState: string) => {
    toggleOtherStates(selectedState);
  };
  
  return (
    <>
      <FormField
        inputVariant="text"
        name="guardianForm.childsName"
        isRequired
        displayName="Child Name"
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="date"
        name="guardianForm.dob"
        isRequired
        displayName="Date of Birth"
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="text"
        name="guardianForm.gender"
        displayName="Gender"
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="text"
        name="guardianForm.guardianName"
        displayName="Parent/Legal Guardian Name"
        isRequired
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="text"
        name="guardianForm.address.street"
        displayName="Address"
        isRequired
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="text"
        name="guardianForm.address.city"
        displayName="City"
        isRequired
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="select"
        name="guardianForm.address.state"
        displayName="State"
        isRequired
        description="Select State"
        selectList={Object.entries(StatesDropdownValues)}
        onChange={(value: string) => handleStateSelectChange(value)}
      />

      <FormField
        inputVariant="text"
        name="guardianForm.address.zipcode"
        displayName="Zip Code"
        isRequired
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="phoneNumber"
        name="guardianForm.phone"
        displayName="Phone Number"
        isRequired
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="phoneNumber"
        name="guardianForm.cellPhone"
        displayName="Cell Phone Number"
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="email"
        name="guardianForm.email"
        displayName="Email Address"
        isRequired
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="money"
        name="guardianForm.requestedGrantAmount"
        displayName="Requested Grant Amount (in USD)"
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="textArea"
        name="guardianForm.intendedUseOfGrant"
        displayName="Intended Use of Grant"
        description="Please provide a copy of the bill, if direct payment to a creditor is preferred"
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="text"
        name="guardianForm.signature"
        displayName="Parent/Legal Guardian Signature"
        isRequired
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="date"
        name="guardianForm.date"
        displayName="Date"
        isRequired
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="textArea"
        name="guardianForm.notes"
        displayName="Notes"
        description="This space is for recording any thoughts/questions you may have"
        isDisabled={isOtherStatesSelected}
      />
    </>
  );
};

export default GrantForm;
