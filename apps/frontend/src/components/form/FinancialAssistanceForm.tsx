/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import FormField from './FormField';
import {
  CancersDropdownValues,
  HospitalsDropdownValues,
  StatesDropdownValues,
} from '../../enums/DropdownValues';
import { useStateFormContext } from '../../hooks/useStateFormContext';

export const ChildInfoSection: React.FC = () => {
  const { isOtherStatesSelected } = useStateFormContext();

  return (
    <>
      <FormField
        inputVariant="text"
        name="financialAssistanceForm.childsName"
        isRequired
        displayName="Child Name"
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="date"
        name="financialAssistanceForm.dob"
        isRequired
        displayName="Date of Birth"
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="text"
        name="financialAssistanceForm.guardianName"
        displayName="Parent/Legal Guardian Name"
        isRequired
        isDisabled={isOtherStatesSelected}
      />
    </>
  );
};

export const GrantDetailsSection: React.FC = () => {
  const { isOtherStatesSelected } = useStateFormContext();
  return (
    <>
      <FormField
        inputVariant="money"
        name="financialAssistanceForm.requestedGrantAmount"
        displayName="Requested Grant Amount (in USD)"
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="textArea"
        name="financialAssistanceForm.intendedUseOfGrant"
        displayName="Intended Use of Grant"
        description="Please provide a copy of the bill, if direct payment to a creditor is preferred"
        isDisabled={isOtherStatesSelected}
      />
    </>
  );
};

export const HospitalInfoSection: React.FC = () => {
  const { isOtherStatesSelected, toggleOtherStates } = useStateFormContext();

  const handleStateSelectChange = (selectedState: string) => {
    toggleOtherStates(selectedState);
  };
  return (
    <>
      <FormField
        inputVariant="select"
        name="financialAssistanceForm.hospital"
        displayName="Hospital"
        isRequired
        description="Select Hospital"
        selectList={Object.entries(HospitalsDropdownValues)}
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="text"
        name="financialAssistanceForm.otherHospital"
        displayName="If Other, please specify the hospital name"
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="text"
        name="financialAssistanceForm.hospitalAddress.street"
        displayName="Address"
        isRequired
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="text"
        name="financialAssistanceForm.hospitalAddress.city"
        displayName="City"
        isRequired
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="select"
        name="financialAssistanceForm.hospitalAddress.state"
        displayName="State"
        isRequired
        description="Select State"
        selectList={Object.entries(StatesDropdownValues).filter(
          ([k, v]) => v !== StatesDropdownValues.OTHERSTATES
        )}
        onChange={(value: string) => handleStateSelectChange(value)}
      />

      <FormField
        inputVariant="text"
        name="financialAssistanceForm.hospitalAddress.zipcode"
        displayName="Zip Code"
        isRequired
        isDisabled={isOtherStatesSelected}
      />
    </>
  );
};

export const MedDetailsSection: React.FC = () => {
  const { isOtherStatesSelected } = useStateFormContext();
  return (
    <>
      <FormField
        inputVariant="select"
        name="financialAssistanceForm.childsDiagnosis"
        displayName="Child's Diagnosis"
        isRequired
        description="Select Child's Diagnosis"
        selectList={Object.entries(CancersDropdownValues)}
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="text"
        name="financialAssistanceForm.otherDiagnosis"
        displayName="If Other, please specify the type of cancer"
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="date"
        name="financialAssistanceForm.dateOfDiagnosis"
        displayName="Date of Diagnosis"
        isRequired
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="text"
        name="financialAssistanceForm.childsPhysician"
        displayName="Child's Physician"
        isRequired
        isDisabled={isOtherStatesSelected}
      />
    </>
  );
};

export const MedProfessionalDetailsSection: React.FC = () => {
  const { isOtherStatesSelected } = useStateFormContext();
  return (
    <>
      <FormField
        inputVariant="phoneNumber"
        name="financialAssistanceForm.medicalProfessionalPhone"
        displayName="Phone Number of the Medical Professional"
        isRequired
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="email"
        name="financialAssistanceForm.medicalProfessionalEmail"
        displayName="Business Email Address of the Medical Professional"
        isRequired
        isDisabled={isOtherStatesSelected}
      />
    </>
  );
};

export const NotesSection: React.FC = () => {
  const { isOtherStatesSelected } = useStateFormContext();
  return (
    <FormField
      inputVariant="textArea"
      name="financialAssistanceForm.notes"
      displayName="Notes"
      placeholder="This space is for recording any thoughts/questions you may have"
      isDisabled={isOtherStatesSelected}
    />
  );
};
