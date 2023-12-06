/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import FormField from './FormField';
import {
  CancersDropdownValues,
  HospitalsDropdownValues,
  StatesDropdownValues,
} from '../../enums/DropdownValues';

const FinancialAssistanceForm: React.FC = () => {
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
        name="guardianForm.guardianName"
        displayName="Parent/Legal Guardian Name"
        isRequired
      />

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
        name="financialAssistanceForm.address.street"
        displayName="Address"
        isRequired
      />

      <FormField
        inputVariant="text"
        name="financialAssistanceForm.address.city"
        displayName="City"
        isRequired
      />

      <FormField
        inputVariant="select"
        name="financialAssistanceForm.address.state"
        displayName="State"
        isRequired
        description="Select State"
        selectList={Object.entries(StatesDropdownValues)}
      />

      <FormField
        inputVariant="text"
        name="financialAssistanceForm.address.zipcode"
        displayName="Zip Code"
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
        displayName="Intended Use of Grant"
        description="Please provide a copy of the bill, if direct payment to a creditor is preferred"
      />

      <FormField
        inputVariant="phoneNumber"
        name="medicalForm.phone"
        displayName="Phone Number of the Medical Professional"
        isRequired
      />

      <FormField
        inputVariant="email"
        name="financialAssistanceForm.medicalProfessionalEmail"
        displayName="Business Email Address of the Medical Professional"
        isRequired
      />

      <FormField
        inputVariant="textArea"
        name="financialAssistanceForm.notes"
        displayName="Notes"
        description="This space is for recording any thoughts/questions you may have"
      />
    </>
  );
};

export default FinancialAssistanceForm;
