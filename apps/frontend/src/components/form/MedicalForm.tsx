/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import FormField from './FormField';
import {
  CancersDropdownValues,
  HospitalsDropdownValues,
  StatesDropdownValues,
} from '../../enums/DropdownValues';
import { useStateFormContext } from '../../hooks/useStateFormContext';

const MedicalForm: React.FC = () => {

  const { isOtherStatesSelected, toggleOtherStates } = useStateFormContext();

  const handleStateSelectChange = (selectedState: string) => {
    toggleOtherStates(selectedState);
  };

  return (
    <>
      <FormField
        inputVariant="select"
        name="medicalForm.childsDiagnosis"
        displayName="Child's Diagnosis"
        isRequired
        description="Select Child's Diagnosis"
        selectList={Object.entries(CancersDropdownValues)}
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="text"
        name="medicalForm.otherDiagnosis"
        displayName="If Other, please specify the type of cancer"
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="date"
        name="medicalForm.dateOfDiagnosis"
        displayName="Date of Diagnosis"
        isRequired
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="text"
        name="medicalForm.childsPhysician"
        displayName="Child's Physician"
        isRequired
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="select"
        name="medicalForm.hospital"
        displayName="Hospital"
        isRequired
        description="Select Hospital"
        selectList={Object.entries(HospitalsDropdownValues)}
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="text"
        name="medicalForm.otherHospital"
        displayName="If Other, please specify the hospital name"
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="text"
        name="medicalForm.address.street"
        displayName="Address"
        isRequired
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="text"
        name="medicalForm.address.city"
        displayName="City"
        isRequired
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="select"
        name="medicalForm.address.state"
        displayName="State"
        isRequired
        description="Select State"
        selectList={Object.entries(StatesDropdownValues)}
        onChange={(value: string) => handleStateSelectChange(value)}
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="text"
        name="medicalForm.address.zipcode"
        displayName="Zip Code"
        isRequired
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="phoneNumber"
        name="medicalForm.phone"
        displayName="Phone"
        isRequired
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="text"
        name="medicalForm.descriptionOfCondition"
        displayName="Please describe the child's medical condition and anticipated hospital stay"
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="text"
        name="medicalForm.medicalProfessionalName"
        displayName="Doctor's Name"
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="text"
        name="medicalForm.medicalProfessionalTitle"
        displayName="Doctor's Title"
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="text"
        name="medicalForm.signature"
        displayName="Doctor's Signature"
        isRequired
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="date"
        name="medicalForm.date"
        displayName="Date Signed"
        isRequired
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="email"
        name="medicalForm.socialWorkersEmail"
        displayName="Social Worker's Email Address"
        isRequired
        isDisabled={isOtherStatesSelected}
      />

      <FormField
        inputVariant="textArea"
        name="medicalForm.notes"
        displayName="Notes"
        description="This space is for recording any thoughts/questions you may have"
        isDisabled={isOtherStatesSelected}
      />
    </>
  );
};

export default MedicalForm;
