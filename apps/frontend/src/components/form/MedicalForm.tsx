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
  FormHelperText,
  Textarea,
  Box,
  Text,
} from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons';
import { Field, FieldProps } from 'formik';

enum CancersDropdownValues {
  BRAINCANCERS = 'braincancers',
  LEUKEMIAS='leukemias',
  LYMPHOMAS='lymphomas',
  THYROIDCANCER='thyroidCancer',
  GERMCELLTUMORS='germCellGonadalTumors',
  NEUROBLASTOMAS='neuroblastomas',
  OSTEOSARCOMA='osteosarcoma',
  OTHERCANCERS='otherCancers',
}
enum HospitalsDropdownValues {
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
    <Box py="2">
    <Field name="childDiagnosis">
      {({ field, form }: FieldProps) => (
        <FormControl
          isRequired
          isInvalid={Boolean(
            form.errors['childDiagnosis'] &&
              form.touched['childDiagnosis']
          )}
        >
          <FormLabel htmlFor={'childDiagnosis'}>Child's Diagnosis</FormLabel>
          <Select placeholder="Select Child's Diagnosis" size='md'>
            <option value= {CancersDropdownValues.BRAINCANCERS}> Brain Cancers </option>
            <option value={CancersDropdownValues.LEUKEMIAS}> Leukemias </option>
            <option value={CancersDropdownValues.LYMPHOMAS}> Lymphomas </option>
            <option value={CancersDropdownValues.THYROIDCANCER}> Thyroid Cancer </option>
            <option value={CancersDropdownValues.GERMCELLTUMORS}> Germ Cell & Gonadal Tumors </option>
            <option value={CancersDropdownValues.NEUROBLASTOMAS}> Neuroblastomas </option>
            <option value={CancersDropdownValues.OSTEOSARCOMA}> Osteosarcoma </option>
            <option value={CancersDropdownValues.OTHERCANCERS}> Other </option>
          </Select>
        </FormControl>
      )}
    </Field>
    </Box>
    <Box py="2">
    <Field name="otherCancer">
      {({ field, form }: FieldProps) => (
        <FormControl
          isInvalid={Boolean(
            form.errors['otherCancer'] &&
              form.touched['otherCancer']
          )}
        >
          <FormLabel htmlFor={'otherCancer'}>If Other, please specify the type of cancer</FormLabel>
          <Input {...field} id={'otherCancer'} />
        </FormControl>
      )}
    </Field>
    </Box>
    <Box py="2">
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
    </Box>
    <Box py="2">
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
          <Select placeholder="Hospital Name" size='md'>
            <option value={HospitalsDropdownValues.BOSHOSPITAL}> Boston Children's Hospital </option>
            <option value={HospitalsDropdownValues.CTHOPSITAL}> Connecticut Children's Hospital </option>
            <option value={HospitalsDropdownValues.DANAHOSPITAL}> Dana-Farber Cancer Institute </option>
            <option value={HospitalsDropdownValues.HASBROHOSPITAL}> Hasbro Children's Hospital </option>
            <option value={HospitalsDropdownValues.HOPEHOSPITAL}> Hope Health Hospice </option>
            <option value={HospitalsDropdownValues.MASSGENHOSPITAL}> Massachusetts General Hospital (MGH) </option>
            <option value={HospitalsDropdownValues.TUFTSHOSPITAL}> Tufts Medical Center </option>
            <option value={HospitalsDropdownValues.UMASSHOSPITAL}> UMass Memorial Cancer Center </option>
            <option value={HospitalsDropdownValues.VERMONTHOSPITAL}> University of Vermont Children's Hospital </option>
            <option value={HospitalsDropdownValues.OTHERHOSPITALS}> Other </option>
          </Select>
        </FormControl>
      )}
    </Field>
    </Box>
    <Box py="2">
    <Field name="otherHospital">
      {({ field, form }: FieldProps) => (
        <FormControl
          isInvalid={Boolean(
            form.errors['otherHospital'] &&
              form.touched['otherHospital']
          )}
        >
          <FormLabel htmlFor={'otherHospital'}>If Other, please specify the hospital name</FormLabel>
          <Input {...field} id={'otherHospital'} />
        </FormControl>
      )}
    </Field>
    </Box>
    <Box py="2">
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
    </Box>
    <Box py="2">
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
    </Box>
    <Box py="2">
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
    </Box>
    <Box py="2">
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
    </Box>
    <Box py="2">
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
    </Box>
    <Box py="2">
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
    </Box>
    <Box py="2">
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
    </Box>
    <Box py="2">
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
    </Box>
    <Box py="2">
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
    </Box>
    <Box py="2">
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
    </Box>
    <Box py="2">
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
    </Box>
    <Box py="2">
    <Field name="medicalFormNotes">
      {({ field, form }: FieldProps) => (
        <FormControl
          isInvalid={Boolean(
            form.errors['medicalFormNotes'] && form.touched['medicalFormNotes']
          )}
        >
          <FormLabel htmlFor={'medicalFormNotes'}>Notes</FormLabel>
          <Textarea {...field} id={'medicalFormNotes'} />
          <FormHelperText>
            This space is for recording any thoughts/questions you may have
          </FormHelperText>
        </FormControl>
      )}
    </Field>
    </Box>
    <Box py="2">
    <Text as="i" fontSize={"xs"}>
    By signing this application, you are attesting to the accuracy of the information on both pages,
    to the best of your knowledge. Fraudulent applications may result in your institution being
    deemed ineligible for this program. Please be sure that the entire application is complete before
    submitting it.
    </Text>
    </Box>
  </Form>
);

export default ExampleForm;
