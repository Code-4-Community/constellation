import {
  Box,
  Button,
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
import { useState } from 'react';
import NextButton from '../components/form/NextButton';
import Header from '../components/header/Header';
import SubmitButton from '../components/form/SubmitButton';
import FormPageSections from '../components/form/branches/FormPageSections';
import ProgressBar from '../components/form/ProgressBar';

const FormPage: React.FC = () => {
  const [isMedicalProfessional, setIsMedicalProfessional] = useState<
    boolean | undefined
  >(undefined);

  const [isValidState, setIsValidState] = useState<boolean | undefined>(
    undefined
  );

  const [step, setStep] = useState<number>(0);

  const numOfSections = 8;

  const sectionTitles = [
    'Identity Verification',
    'Location Verification',
    'Background Information',
    'Child Health Information',
    'Hospital Information',
    'Grant Request Information',
    'Medical Professional',
    'Additional Comments',
  ];

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
    step < numOfSections - 1 && !showBranchMedical && !showBranchState;

  const showSubmitButton =
    isMedicalProfessional && isValidState && step === numOfSections - 1;

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
          <Container mb="10">
            <Heading size="md" textAlign="center" fontSize="40px" mb="40px">
              Financial Assistance Form
            </Heading>

            <Form>
              {!showBranchMedical && !showBranchState && (
                <FormSection title={sectionTitles[step]}>
                  <FormPageSections
                    sectionNum={step}
                    isMedicalProfessional={isMedicalProfessional}
                    setIsMedicalProfessional={setIsMedicalProfessional}
                    isValidState={isValidState}
                    setIsValidState={setIsValidState}
                  />
                </FormSection>
              )}

              {showBranchMedical && (
                <FormSection title="">
                  <Text>
                    You must be a medical professional to fill out this form.
                  </Text>
                </FormSection>
              )}

              {showBranchState && (
                <FormSection title="">
                  <Text>
                    We apologize we must currently give preference to families
                    located near us (within the New England area). Below you can
                    find resources for families from other organizations that
                    may be able to better assist you at this time:
                  </Text>
                  <Text fontWeight="bold">
                    The Hope Portal (hosted by the Coalition Against Childhood
                    Cancer) is a searchable database which strives to connect
                    childhood cancer families to the information and vast array
                    of support resources they need–faster than ever.
                  </Text>
                </FormSection>
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

                {showBranchState && (
                  <Button
                    style={{
                      color: '#422669',
                      backgroundColor: '#ABE92C',
                      fontWeight: '700',
                    }}
                  >
                    <a href="https://cac2.org/impact-areas/family-support/hope-portal">
                      VISIT THE HOPE PORTAL NOW
                    </a>
                  </Button>
                )}

                {showSubmitButton && SubmitButton({ form })}
              </Center>
            </Form>
            {!showBranchMedical && !showBranchState && (
              <ProgressBar step={step + 1} numSteps={numOfSections} />
            )}
          </Container>
        </Box>
      )}
    </Formik>
  );
};

export default FormPage;
