/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import FormField from './FormField';
import {
  CancersDropdownValues,
  HospitalsDropdownValues,
  StatesDropdownValues,
} from '../../enums/DropdownValues';

export const ChildInfoSection: React.FC = () => {
  return (
    <>
      <FormField
        inputVariant="text"
        name="financialAssistanceForm.childsName"
        isRequired
        displayName="Child Name"
      />

      <FormField
        inputVariant="date"
        name="financialAssistanceForm.dob"
        isRequired
        displayName="Date of Birth"
      />

      <FormField
        inputVariant="text"
        name="financialAssistanceForm.guardianName"
        displayName="Parent/Legal Guardian Name"
        isRequired
      />
    </>
  );
};

export const GrantDetailsSection: React.FC = () => {
  return (
    <>
      <FormField
        inputVariant="money"
        name="financialAssistanceForm.requestedGrantAmount"
        displayName="Requested Grant Amount (in USD)"
      />

      <FormField
        inputVariant="textArea"
        name="financialAssistanceForm.intendedUseOfGrant"
        displayName="Intended Use of Grant"
        description="Please provide a copy of the bill, if direct payment to a creditor is preferred"
      />
    </>
  );
};

export const HospitalInfoSection: React.FC = () => {
  return (
    <>
      <FormField
        inputVariant="select"
        name="financialAssistanceForm.hospital"
        displayName="Hospital"
        isRequired
        description="Select Hospital"
        selectList={Object.entries(HospitalsDropdownValues)}
      />

      <FormField
        inputVariant="text"
        name="financialAssistanceForm.otherHospital"
        displayName="If Other, please specify the hospital name"
      />

      <FormField
        inputVariant="text"
        name="financialAssistanceForm.hospitalAddress.street"
        displayName="Address"
        isRequired
      />

      <FormField
        inputVariant="text"
        name="financialAssistanceForm.hospitalAddress.city"
        displayName="City"
        isRequired
      />

      <FormField
        inputVariant="select"
        name="financialAssistanceForm.hospitalAddress.state"
        displayName="State"
        isRequired
        description="Select State"
        selectList={Object.entries(StatesDropdownValues)}
      />

      <FormField
        inputVariant="text"
        name="financialAssistanceForm.hospitalAddress.zipcode"
        displayName="Zip Code"
        isRequired
      />
    </>
  );
};

export const MedDetailsSection: React.FC = () => {
  return (
    <>
      <FormField
        inputVariant="select"
        name="financialAssistanceForm.childsDiagnosis"
        displayName="Child's Diagnosis"
        isRequired
        description="Select Child's Diagnosis"
        selectList={Object.entries(CancersDropdownValues)}
      />

      <FormField
        inputVariant="text"
        name="financialAssistanceForm.otherDiagnosis"
        displayName="If Other, please specify the type of cancer"
      />

      <FormField
        inputVariant="date"
        name="financialAssistanceForm.dateOfDiagnosis"
        displayName="Date of Diagnosis"
        isRequired
      />

      <FormField
        inputVariant="text"
        name="financialAssistanceForm.childsPhysician"
        displayName="Child's Physician"
        isRequired
      />
    </>
  );
};

export const MedProfessionalDetailsSection: React.FC = () => {
  return (
    <>
      <FormField
        inputVariant="phoneNumber"
        name="financialAssistanceForm.medicalProfessionalPhone"
        displayName="Phone Number of the Medical Professional"
        isRequired
      />

      <FormField
        inputVariant="email"
        name="financialAssistanceForm.medicalProfessionalEmail"
        displayName="Business Email Address of the Medical Professional"
        isRequired
      />
    </>
  );
};

export const NotesSection: React.FC = () => {
  return (
    <FormField
      inputVariant="textArea"
      name="financialAssistanceForm.notes"
      displayName="Notes"
      placeholder="This space is for recording any thoughts/questions you may have"
    />
  );
};
