/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Form from './Form';
import {
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  FormHelperText,
  Textarea,
} from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons';
import FormField from './FormField';
import { submitForm } from '../../utils/sendRequest';
import {
  CancersDropdownValues,
  HospitalsDropdownValues,
} from '../../types/form';

const MedicalForm: React.FC = () => {
  return (
    <Form onSubmit={submitForm} initialValues={{}}>
      <FormField
        inputVariant="select"
        name="childDiagnosis"
        displayName="Child's Diagnosis"
        isRequired
        description="Select Child's Diagnosis"
        selectList={Object.entries(CancersDropdownValues)}
      />

      <FormField
        inputVariant="text"
        name="otherCancer"
        displayName="If Other, please specify the type of cancer"
      />

      <FormField
        inputVariant="text"
        name="childPhysician"
        displayName="Child's Physician"
      />

      <FormField
        inputVariant="select"
        name="hospitalName"
        displayName="Hospital"
        isRequired
        description="Hospital Name"
        selectList={Object.entries(HospitalsDropdownValues)}
      />

      <FormField
        inputVariant="text"
        name="otherHospital"
        displayName="If Other, please specify the hospital name"
      />

      <FormField
        inputVariant="text"
        name="hospitalAddress"
        displayName="Address"
      />

      <FormField inputVariant="text" name="hospitalCity" displayName="City" />

      <FormField inputVariant="text" name="hospitalState" displayName="State" />

      <FormField
        inputVariant="text"
        name="hospitalZipcode"
        displayName="Zip Code"
      />

      <FormField
        inputVariant="phoneNumber"
        name="hospitalPhone"
        displayName="Phone"
      />

      <FormField
        inputVariant="text"
        name="doctorsExplanation"
        displayName="Please describe the child's medical condition and anticipated hospital stay"
      />

      <FormField
        inputVariant="text"
        name="doctorName"
        displayName="Doctor's Name"
      />

      <FormField
        inputVariant="text"
        name="doctorTitle"
        displayName="Doctor's Title"
      />

      <FormField
        inputVariant="text"
        name="doctorSignature"
        displayName="Doctor's Signature"
      />

      <FormField
        inputVariant="date"
        name="doctorSignatureDate"
        displayName="Date Signed"
      />

      <FormField
        inputVariant="email"
        name="socialWorkerEmail"
        displayName="Social Worker's Email Address"
      />

      <FormField
        inputVariant="textArea"
        name="medicalFormNotes"
        displayName="Notes"
        description="This space is for recording any thoughts/questions you may have"
      />
    </Form>
  );
};

export default MedicalForm;
