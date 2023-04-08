import { Button, Center, Spacer } from '@chakra-ui/react';
import { Formik, FormikHelpers } from 'formik';
import Form, { FormValues } from '../components/form/Form';
import { submitForm } from '../utils/sendRequest';
import GrantFormPage from './GrantFormPage';
import MedicalFormPage from './MedicalFormPage';
import * as Yup from 'yup';

const addressSchema = Yup.object({
  street: Yup.string().min(1),
  city: Yup.string().min(1),
  state: Yup.string().min(1),
  zipcode: Yup.number(),
});

const schema = Yup.object().shape({
  guardianForm: Yup.object().shape({
    childsName: Yup.string().min(1),
    dob: Yup.date().default(() => new Date()),
    gender: Yup.string().min(1),
    guardianName: Yup.string().min(1),
    address: addressSchema,
    phone: Yup.string(),
    cellPhone: Yup.string(),
    email: Yup.string().email(),
    requestedGrantAmount: Yup.number().positive(),
    intendedUseOfGrant: Yup.string(),
    signature: Yup.string().min(1),
    date: Yup.date().default(() => new Date()),
  }),
  medicalForm: Yup.object().shape({
    childsDiagnosis: Yup.string().min(1),
    otherDiagnosis: Yup.string(),
    dateOfDiagnosis: Yup.date().default(() => new Date()),
    childsPhysician: Yup.string().min(1),
    hospital: Yup.string().min(1),
    otherHospital: Yup.string(),
    address: addressSchema,
    phone: Yup.string(),
    descriptionOfCondition: Yup.string(),
    medicalProfessionalName: Yup.string().min(1),
    medicalProfessionalTitle: Yup.string().min(1),
    signature: Yup.string().min(1),
    date: Yup.date().default(() => new Date()),
    socialWorkersEmail: Yup.string().email(),
    notes: Yup.string(),
  }),
});

const FormPage: React.FC = () => {
  const onSubmit = async (values: FormValues): Promise<void> => {
    await submitForm(values);
  };

  return (
    <Formik onSubmit={onSubmit} initialValues={{}} validationSchema={schema}>
      {(form) => (
        <>
          <GrantFormPage />

          <Spacer height={16} />

          <MedicalFormPage />

          <Center>
            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              onClick={form.submitForm}
            >
              Submit
            </Button>
          </Center>
        </>
      )}
    </Formik>
  );
};

export default FormPage;
