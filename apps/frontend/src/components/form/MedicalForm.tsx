/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import Form from './Form';
import FormField from './FormField';
import { submitForm } from '../../utils/sendRequest';
import {
  CancersDropdownValues,
  HospitalsDropdownValues,
} from '../../types/form';
import { FormikBag, FormikProps, Form } from 'formik';

const MedicalForm: React.FC<{ form: FormikProps<{}> }> = ({ form }) => {
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
      />

      <FormField
        inputVariant="text"
        name="medicalForm.childsPhysician"
        displayName="Child's Physician"
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
      />

      <FormField
        inputVariant="text"
        name="medicalForm.address.city"
        displayName="City"
      />

      <FormField
        inputVariant="text"
        name="medicalForm.address.state"
        displayName="State"
      />

      <FormField
        inputVariant="number"
        name="medicalForm.address.zipcode"
        displayName="Zip Code"
      />

      <FormField
        inputVariant="phoneNumber"
        name="medicalForm.phone"
        displayName="Phone"
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
      />

      <FormField
        inputVariant="date"
        name="medicalForm.date"
        displayName="Date Signed"
      />

      <FormField
        inputVariant="email"
        name="medicalForm.socialWorkersEmail"
        displayName="Social Worker's Email Address"
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
