/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Form, { FormValues } from './Form';
import InputField from './InputField';

interface MedicalFormValues {
  childDiagnosis: string;
  diagnosisDate: Date;
  childPhysician: string;
  hospitalName: string;
  hospitalAddress: string;
  hospitalCity: string;
  hospitalState: string;
  hospitalZipcode: string;
  hospitalPhone: string;
  doctorsExplanation: string;
  doctorName: string;
  doctorTitle: string;
  doctorSignature: string;
  doctorSignatureDate: Date;
  socialWorkerEmail: string;
}

interface ExampleFormProps {
  onSubmit?: (values: Partial<MedicalFormValues>) => Promise<void>;
}

const alertOnSubmit = async (values: FormValues) => {
  // import and call method on api
  await new Promise((resolve) => setTimeout(resolve, 1000));
  alert(JSON.stringify(values, null, 2));
};

const ExampleForm: React.FC<ExampleFormProps> = ({ onSubmit }) => (
  <Form onSubmit={onSubmit ?? alertOnSubmit} initialValues={{}}>
    <InputField
      isRequired
      displayName="Child's Diagnosis:"
      fieldName="childDiagnosis"
    />
    <InputField
      isRequired
      displayName="Date of Diagnosis:"
      fieldName="diagnosisDate"
    />
    <InputField
      isRequired
      displayName="Child's Physician:"
      fieldName="childPhysician"
    />
    <InputField isRequired displayName="Hopsital:" fieldName="hospitalName" />
    <InputField isRequired displayName="Address:" fieldName="hospitalAddress" />
    <InputField isRequired displayName="City:" fieldName="hospitalCity" />
    <InputField isRequired displayName="State:" fieldName="hospitalState" />
    <InputField
      isRequired
      displayName="Zip Code:"
      fieldName="hospitalZipcode"
    />
    <InputField isRequired displayName="Phone:" fieldName="hospitalPhone" />
    <InputField
      isRequired
      displayName="Please describe the child's medical condition and anticipated hospital stay:"
      fieldName="doctorsExplanation"
    />

    <InputField
      isRequired
      displayName="Doctor's Name:"
      fieldName="doctorName"
    />

    <InputField
      isRequired
      displayName="Doctor's Title:"
      fieldName="doctorTitle"
    />

    <InputField
      isRequired
      displayName="Doctor's Signature:"
      fieldName="doctorSignature"
    />

    <InputField
      isRequired
      displayName="Date Signed:"
      fieldName="doctorSignatureDate"
    />
    <InputField
      isRequired
      displayName="Social Worker's Email Address:"
      fieldName="socialWorkerEmail"
    />
  </Form>
);

export default ExampleForm;
