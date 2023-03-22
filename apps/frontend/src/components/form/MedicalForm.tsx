/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Form, { FormValues } from './Form';
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons';
import { Field, FieldProps } from 'formik';

enum DropdownValues {
  BRAINCANCERS = 'braincancers',
  LEUKEMIAS='leukemias',
  LYMPHOMAS='lymphomas',
  THYROIDCANCER='thyroidCancer',
  GERMCELLTUMORS='germCellGonadalTumors',
  NEUROBLASTOMAS='neuroblastomas',
  OSTEOSARCOMA='osteosarcoma',
  OTHERCANCERS='otherCancers',

  BOSHOSPITAL='bostonChildrenHospital',
  CTHOPSITAL='connecticutChildrenHospital',
  DANAHOSPITAL='danaFarberHospital',
  HASBROHOSPITAL='hasbroChildrenHospital',
  HOPEHOSPITAL='hopeHealthHospital',
  MASSGENHOSPITAL='massGeneralHospital',
  TUFTSHOSPITAL='tuftsMedicalHospital',
  UMASSHOSPITAL='umassHospital',
  VERMONTHOSPITAL='universityOfVermontHospital',
  OTHERHOSPITALS='otherHospitals',
}
interface MedicalFormValues {
  // childDiagnosis: string;
  diagnosisDate: Date;
  childPhysician: string;
  // hospitalName: string;
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

    <Select placeholder="Select Child's Diagnosis" size='md'>
      <option value= {DropdownValues.BRAINCANCERS}> Brain Cancers </option>
      <option value={DropdownValues.LEUKEMIAS}> Leukemias </option>
      <option value={DropdownValues.LYMPHOMAS}> Lymphomas </option>
      <option value={DropdownValues.THYROIDCANCER}> Thyroid Cancer </option>
      <option value={DropdownValues.GERMCELLTUMORS}> Germ Cell & Gonadal Tumors </option>
      <option value={DropdownValues.NEUROBLASTOMAS}> Neuroblastomas </option>
      <option value={DropdownValues.OSTEOSARCOMA}> Osteosarcoma </option>
      <option value={DropdownValues.OTHERCANCERS}> Other </option>
    </Select>
    <Field name="childPhysician">
      {({ field, form }: FieldProps) => (
        <FormControl
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

    <Select placeholder="Hospital Name" size='md'>
      <option value={DropdownValues.BOSHOSPITAL}> Boston Children's Hospital </option>
      <option value={DropdownValues.CTHOPSITAL}> Connecticut Children's Hospital </option>
      <option value={DropdownValues.DANAHOSPITAL}> Dana-Farber Cancer Institute </option>
      <option value={DropdownValues.HASBROHOSPITAL}> Hasbro Children's Hospital </option>
      <option value={DropdownValues.HOPEHOSPITAL}> Hope Health Hospice </option>
      <option value={DropdownValues.MASSGENHOSPITAL}> Massachusetts General Hospital (MGH) </option>
      <option value={DropdownValues.TUFTSHOSPITAL}> Tufts Medical Center </option>
      <option value={DropdownValues.UMASSHOSPITAL}> UMass Memorial Cancer Center </option>
      <option value={DropdownValues.VERMONTHOSPITAL}> University of Vermont Children's Hospital </option>
      <option value={DropdownValues.OTHERHOSPITALS}> Other </option>
    </Select>

    <Field name="hospitalAddress">
      {({ field, form }: FieldProps) => (
        <FormControl
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
