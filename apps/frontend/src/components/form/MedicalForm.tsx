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

interface MedicalFormValues {
  childDiagnosis: string;
  otherCancer: string;
  diagnosisDate: Date;
  childPhysician: string;
  hospitalName: string;
  otherHospital: string;
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
  medicalFormNotes: string;
}

const MedicalForm: React.FC = () => {
  return (
    <Form onSubmit={submitForm} initialValues={{}}>
      <FormField
        name="childDiagnosis"
        displayName="Child's Diagnosis"
        isRequired
      >
        {(field) => (
          <Select placeholder="Select Child's Diagnosis" size="md" {...field}>
            {Object.entries(CancersDropdownValues).map(([key, value]) => {
              return (
                <option value={key} key={key}>
                  {value}
                </option>
              );
            })}
          </Select>
        )}
      </FormField>

      <FormField
        name="otherCancer"
        displayName="If Other, please specify the type of cancer"
      >
        {(field) => <Input {...field} id={'otherCancer'} />}
      </FormField>

      <FormField name="childPhysician" displayName="Child's Physician">
        {(field) => <Input {...field} id={'childPhysician'} />}
      </FormField>

      <FormField name="hospitalName" displayName="Hospital" isRequired>
        {(field) => (
          <Select placeholder="Hospital Name" size="md" {...field}>
            {Object.entries(HospitalsDropdownValues).map(([key, value]) => {
              return (
                <option value={key} key={key}>
                  {value}
                </option>
              );
            })}
          </Select>
        )}
      </FormField>

      <FormField
        name="otherHospital"
        displayName="If Other, please specify the hospital name"
      >
        {(field) => <Input {...field} id={'otherHospital'} />}
      </FormField>

      <FormField name="hospitalAddress" displayName="Address">
        {(field) => <Input {...field} id={'hospitalAddress'} />}
      </FormField>

      <FormField name="hospitalCity" displayName="City">
        {(field) => <Input {...field} id={'hospitalCity'} />}
      </FormField>

      <FormField name="hospitalState" displayName="State">
        {(field) => <Input {...field} id={'hospitalState'} />}
      </FormField>

      <FormField name="hospitalZipcode" displayName="Zip Code">
        {(field) => <Input {...field} id={'hospitalZipcode'} />}
      </FormField>

      <FormField name="hospitalPhone" displayName="Phone">
        {(field) => (
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<PhoneIcon color="gray.300" />}
            />
            <Input type="tel" {...field} />
          </InputGroup>
        )}
      </FormField>

      <FormField
        name="doctorsExplanation"
        displayName="Please describe the child's medical condition and anticipated hospital stay"
      >
        {(field) => <Input {...field} id={'doctorsExplanation'} />}
      </FormField>

      <FormField name="doctorName" displayName="Doctor's Name">
        {(field) => <Input {...field} id={'doctorName'} />}
      </FormField>

      <FormField name="doctorTitle" displayName="Doctor's Title">
        {(field) => <Input {...field} id={'doctorTitle'} />}
      </FormField>

      <FormField name="doctorSignature" displayName="Doctor's Signature">
        {(field) => <Input {...field} id={'doctorSignature'} />}
      </FormField>

      <FormField name="doctorSignatureDate" displayName="Date Signed">
        {(field) => <Input {...field} type="date" id={'doctorSignatureDate'} />}
      </FormField>

      <FormField
        name="socialWorkerEmail"
        displayName="Social Worker's Email Address"
      >
        {(field) => <Input {...field} type="email" id={'socialWorkerEmail'} />}
      </FormField>

      <FormField name="medicalFormNotes" displayName="Notes">
        {(field) => (
          <>
            <Textarea {...field} id={'medicalFormNotes'} />
            <FormHelperText>
              This space is for recording any thoughts/questions you may have
            </FormHelperText>
          </>
        )}
      </FormField>
    </Form>
  );
};

export default MedicalForm;
