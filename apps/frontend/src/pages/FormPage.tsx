import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Spacer,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { FormValues } from '../components/form/Form';
import { financialAssistanceFormSchema, formSchema } from '../types/formSchema';
import { submitForm } from '../utils/sendRequest';
import Confirmation from '../components/form/branches/Confirmation';
import Message from '../components/form/branches/Message';
import {
  ChildInfoSection,
  MedDetailsSection,
  HospitalInfoSection,
  GrantDetailsSection,
  MedProfessionalDetailsSection,
  NotesSection,
} from '../components/form/FinancialAssistanceForm';

import { useState } from 'react';
import NextButton from '../components/form/NextButton';
import Header from '../components/header/Header';
import SubmitButton from '../components/form/SubmitButton';

const FormPage: React.FC = () => {
  const sections: { [key: number]: JSX.Element } = {
    1: <ChildInfoSection />,
    2: <MedDetailsSection />,
    3: <HospitalInfoSection />,
    4: <GrantDetailsSection />,
    5: <MedProfessionalDetailsSection />,
    6: <NotesSection />,
  };
  const [step, setStep] = useState<number>(0);
  const [eligibleToSubmit, setEligibleToSubmit] = useState<boolean>(true);
  const numOfSections = 6;

  const handleFinancialAssistanceForm = (response: boolean) => {
    if (response) {
      setStep(1);
    } else {
      setEligibleToSubmit(false);
    }
  };

  // Navigation Logic
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : 1));
  };

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<any>
  ): Promise<void> => {
    try {
      await submitForm(values, actions.resetForm);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        financialAssistanceForm: financialAssistanceFormSchema.getDefault(),
      }}
      validationSchema={formSchema}
    >
      {(form) => (
        <Container>
          <Header />
          <Heading size="md" textAlign="center">
            Application for Financial Assistance
          </Heading>
          <Text textAlign="center" padding="2">
            (to be completed by medical professional)
          </Text>

          <Box height="5vh" />

          <Form>
            {step === 0 && eligibleToSubmit && (
              <Confirmation
                confirmationQuestion={'Are you a medical professional?'}
                onConfirm={handleFinancialAssistanceForm}
              />
            )}

            {!eligibleToSubmit && (
              <Message
                message={
                  'You must be a medical professional to fill out this form.'
                }
              />
            )}

            {sections[step]}

            <Center mt={4}>
              {step > 1 && eligibleToSubmit && (
                <>
                  <NextButton option={'Previous'} nextStep={prevStep} />
                  <Spacer />
                </>
              )}

              {step > 0 && step < numOfSections && eligibleToSubmit && (
                <NextButton option={'Next'} nextStep={nextStep} />
              )}

              {eligibleToSubmit &&
                step === numOfSections &&
                SubmitButton({ form })}
            </Center>
          </Form>
        </Container>
      )}
    </Formik>
  );
};

export default FormPage;
