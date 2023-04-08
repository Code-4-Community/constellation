/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import FormField from './FormField';
import {
  CancersDropdownValues,
  HospitalsDropdownValues,
} from '../../enums/DropdownValues';
import { Form } from 'formik';

const MedicalForm: React.FC = () => {
  return (
    <Form>
      <FormField
        inputVariant="select"
        name="medicalForm.childsDiagnosis"
        displayName="Child's Diagnosis"
        isRequired
        description="Select Child's Diagnosis"
        selectList={Object.entries(CancersDropdownValues)}
      />

      <FormField
        inputVariant="text"
        name="medicalForm.otherDiagnosis"
        displayName="If Other, please specify the type of cancer"
      />

      <FormField
        inputVariant="date"
        name="medicalForm.dateOfDiagnosis"
        displayName="Date of Diagnosis"
        isRequired
      />

      <FormField
        inputVariant="text"
        name="medicalForm.childsPhysician"
        displayName="Child's Physician"
        isRequired
      />

      <FormField
        inputVariant="select"
        name="medicalForm.hospital"
        displayName="Hospital"
        isRequired
        description="Hospital Name"
        selectList={Object.entries(HospitalsDropdownValues)}
      />

      <FormField
        inputVariant="text"
        name="medicalForm.otherHospital"
        displayName="If Other, please specify the hospital name"
      />

      <FormField
        inputVariant="text"
        name="medicalForm.address.street"
        displayName="Address"
        isRequired
      />

      <FormField
        inputVariant="text"
        name="medicalForm.address.city"
        displayName="City"
        isRequired
      />

      <FormField
        inputVariant="text"
        name="medicalForm.address.state"
        displayName="State"
        isRequired
      />

      <FormField
        inputVariant="number"
        name="medicalForm.address.zipcode"
        displayName="Zip Code"
        isRequired
      />

      <FormField
        inputVariant="phoneNumber"
        name="medicalForm.phone"
        displayName="Phone"
        isRequired
      />

      <FormField
        inputVariant="text"
        name="medicalForm.descriptionOfCondition"
        displayName="Please describe the child's medical condition and anticipated hospital stay"
      />

      <FormField
        inputVariant="text"
        name="medicalForm.medicalProfessionalName"
        displayName="Doctor's Name"
      />

      <FormField
        inputVariant="text"
        name="medicalForm.medicalProfessionalTitle"
        displayName="Doctor's Title"
      />

      <FormField
        inputVariant="text"
        name="medicalForm.signature"
        displayName="Doctor's Signature"
        isRequired
      />

      <FormField
        inputVariant="date"
        name="medicalForm.date"
        displayName="Date Signed"
        isRequired
      />

      <FormField
        inputVariant="email"
        name="medicalForm.socialWorkersEmail"
        displayName="Social Worker's Email Address"
        isRequired
      />

      <FormField
        inputVariant="textArea"
        name="medicalForm.notes"
        displayName="Notes"
        description="This space is for recording any thoughts/questions you may have"
      />
    </Form>
  );
};

export default MedicalForm;
