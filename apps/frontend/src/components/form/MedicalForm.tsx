/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Form, { FormValues } from './Form';
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons';
import { Field, FieldProps } from 'formik';

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
    <Field name="childDiagnosis">
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired
          isInvalid={Boolean(
            form.errors['childDiagnosis'] && form.touched["childDiagnosis"]
          )}>
            <FormLabel htmlFor={'childDiagnosis'}>Child's Diagnosis</FormLabel>
            <Input {...field} id={'childDiagnosis'} />
        </FormControl>
      )}
    </Field>
    <Field name="diagnosisDate">
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired
          isInvalid={Boolean(
            form.errors['diagnosisDate'] &&
              form.touched['diagnosisDate']
          )}
        >
          <FormLabel htmlFor={'diagnosisDate'}>Date of Diagnosis</FormLabel>
          <Input {...field} type="date" id={'diagnosisDate'} />
        </FormControl>
      )}
    </Field>
    <Field name="childPhysician">
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired
          isInvalid={Boolean(
            form.errors['childPhysician'] &&
              form.touched['childPhysician']
          )}
        >
          <FormLabel htmlFor={'childPhysician'}>Child's Physician</FormLabel>
          <Input {...field} id={'childPhysician'} />
        </FormControl>
      )}
    </Field>
    <Field name="hospitalName">
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired
          isInvalid={Boolean(
            form.errors['hospitalName'] &&
              form.touched['hospitalName']
          )}
        >
          <FormLabel htmlFor={'hospitalName'}>Hospital</FormLabel>
          <Input {...field} id={'hospitalName'} />
        </FormControl>
      )}
    </Field>
    <Field name="hospitalAddress">
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired
          isInvalid={Boolean(
            form.errors['hospitalAddress'] &&
              form.touched['hospitalAddress']
          )}
        >
          <FormLabel htmlFor={'hospitalAddress'}>Address</FormLabel>
          <Input {...field} id={'hospitalAddress'} />
        </FormControl>
      )}
    </Field>
    <Field name="hospitalCity">
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired
          isInvalid={Boolean(
            form.errors['hospitalCity'] &&
              form.touched['hospitalCity']
          )}
        >
          <FormLabel htmlFor={'hospitalCity'}>City</FormLabel>
          <Input {...field} id={'hospitalCity'} />
        </FormControl>
      )}
    </Field>
    <Field name="hospitalState">
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired
          isInvalid={Boolean(
            form.errors['hospitalState'] &&
              form.touched['hospitalState']
          )}
        >
          <FormLabel htmlFor={'hospitalState'}>State</FormLabel>
          <Input {...field} id={'hospitalState'} />
        </FormControl>
      )}
    </Field>
    <Field name="hospitalZipcode">
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired
          isInvalid={Boolean(
            form.errors['hospitalZipcode'] &&
              form.touched['hospitalZipcode']
          )}
        >
          <FormLabel htmlFor={'hospitalZipcode'}>Zip Code</FormLabel>
          <Input {...field} id={'hospitalZipcode'} />
        </FormControl>
      )}
    </Field>
    <Field name="hospitalPhone">
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired
          isInvalid={Boolean(
            form.errors['hospitalPhone'] &&
              form.touched['hospitalPhone']
          )}
        >
          <FormLabel htmlFor={'hospitalPhone'}>Phone</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<PhoneIcon color="gray.300"/>}
              />
              <Input type="tel" />
          </InputGroup>
        </FormControl>
      )}
    </Field>
    <Field name="doctorsExplanation">
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired
          isInvalid={Boolean(
            form.errors['doctorsExplanation'] &&
              form.touched['doctorsExplanation']
          )}
        >
          <FormLabel htmlFor={'doctorsExplanation'}>Please describe the child's medical condition and anticipated hospital stay</FormLabel>
          <Input {...field} id={'doctorsExplanation'} />
        </FormControl>
      )}
    </Field>
    <Field name="doctorName">
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired
          isInvalid={Boolean(
            form.errors['doctorName'] &&
              form.touched['doctorName']
          )}
        >
          <FormLabel htmlFor={'doctorName'}>Doctor's Name</FormLabel>
          <Input {...field} id={'doctorName'} />
        </FormControl>
      )}
    </Field>
    <Field name="doctorTitle">
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired
          isInvalid={Boolean(
            form.errors['doctorTitle'] &&
              form.touched['doctorTitle']
          )}
        >
          <FormLabel htmlFor={'doctorTitle'}>Doctor's Title</FormLabel>
          <Input {...field} id={'doctorTitle'} />
        </FormControl>
      )}
    </Field>
    <Field name="doctorSignature">
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired
          isInvalid={Boolean(
            form.errors['doctorSignature'] &&
              form.touched['doctorSignature']
          )}
        >
          <FormLabel htmlFor={'doctorSignature'}>Doctor's Signature</FormLabel>
          <Input {...field} id={'doctorSignature'} />
        </FormControl>
      )}
    </Field>
    <Field name="doctorSignatureDate">
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired
          isInvalid={Boolean(
            form.errors['doctorSignatureDate'] &&
              form.touched['doctorSignatureDate']
          )}
        >
          <FormLabel htmlFor={'doctorSignatureDate'}>Date Signed</FormLabel>
          <Input {...field} type="date" id={'doctorSignatureDate'} />
        </FormControl>
      )}
    </Field>
    <Field name="socialWorkerEmail">
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired
          isInvalid={Boolean(
            form.errors['socialWorkerEmail'] &&
              form.touched['socialWorkerEmail']
          )}
        >
          <FormLabel htmlFor={'socialWorkerEmail'}>Social Worker's Email Address</FormLabel>
          <Input {...field} type="email" id={'socialWorkerEmail'} />
        </FormControl>
      )}
    </Field>
  </Form>
);

export default ExampleForm;
