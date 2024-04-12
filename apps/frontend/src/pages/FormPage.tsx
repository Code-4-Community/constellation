import {
  Box,
  Center,
  Container,
  Heading,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { FormValues } from '../components/form/Form';
import FormSection from '../components/form/FormSection';
import { financialAssistanceFormSchema, formSchema } from '../types/formSchema';
import { submitForm } from '../utils/sendRequest';
import Message from '../components/form/branches/Message';
import { useState } from 'react';
import NextButton from '../components/form/NextButton';
import Header from '../components/header/Header';
import SubmitButton from '../components/form/SubmitButton';
import FormPageSections from '../components/form/branches/FormPageSections';

const FormPage: React.FC = () => {
  const [isMedicalProfessional, setIsMedicalProfessional] = useState<
    boolean | undefined
  >(undefined);

  const [isValidState, setIsValidState] = useState<boolean | undefined>(
    undefined
  );

  const [step, setStep] = useState<number>(0);

  const numOfSections = 7;

  const sectionTitles = [
    "",
    "",
    "Background Information",
    "Child Health Information",
    "Hospital Information",
    "Grant Request Information",
    "Medical Professional",
    "Additional Comments"
  ]

  // Navigation Logic
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => (prevStep > 0 ? prevStep - 1 : 1));
  };

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<any>
  ): Promise<void> => {
    try {
      await submitForm(values, actions.resetForm);
    } finally {
      actions.setSubmitting(false);
      setStep(0);
      setIsMedicalProfessional(undefined);
      setIsValidState(undefined);
    }
  };

  const showBranchMedical = isMedicalProfessional === false && step === 1;
  const showBranchState = isValidState === false && step === 2;

  const disableNextButton =
    (step === 0 && isMedicalProfessional === undefined) ||
    (step === 1 && isValidState === undefined);

  const showNextButton =
    step < numOfSections && !showBranchMedical && !showBranchState;

  const showSubmitButton =
    isMedicalProfessional && isValidState && step === numOfSections;

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        financialAssistanceForm: financialAssistanceFormSchema.getDefault(),
      }}
      validationSchema={formSchema}
    >
      {(form) => (
        <Box>
          <Header />
          <Container>
            <Heading size="md" textAlign="center" fontSize="40px" mb="40px">
              Financial Assistance Form
            </Heading>

            <Form>
              {!showBranchMedical && !showBranchState && (
                <FormPageSections
                  sectionNum={step}
                  isMedicalProfessional={isMedicalProfessional}
                  setIsMedicalProfessional={setIsMedicalProfessional}
                  isValidState={isValidState}
                  setIsValidState={setIsValidState}
                />
              )}

              {showBranchMedical && (
                <Message>
                  <Text>
                    You must be a medical professional to fill out this form.
                  </Text>
                </Message>
              )}

              {showBranchState && (
                <Message>
                  <Text>
                    We apologize we must currently give preference to families
                    located near us (within the New England area). Below you can
                    find resources for families from other organizations that
                    may be able to better assist you at this time:
                    <a
                      href="https://cac2.org/impact-areas/family-support/hope-portal"
                      style={{ color: 'blue', display: 'block' }}
                    >
                      VISIT THE HOPE PORTAL NOW
                    </a>
                  </Text>
                </Message>
              )}

              <Center mt={4}>
                {step > 0 && (
                  <>
                    <NextButton option={'Previous'} nextStep={prevStep} />
                    <Spacer />
                  </>
                )}

                {showNextButton && (
                  <NextButton
                    option={'Next'}
                    nextStep={nextStep}
                    isDisabled={disableNextButton}
                  />
                )}

                {showSubmitButton && SubmitButton({ form })}
              </Center>
            </Form>
          </Container>
        </Box>
      )}
    </Formik>
  );
};

export default FormPage;
