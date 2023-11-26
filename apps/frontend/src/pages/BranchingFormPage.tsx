import { Box, Button, Center, Spacer } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { FormValues } from '../components/form/Form';
import { formSchema } from '../types/formSchema';
import { submitForm } from '../utils/sendRequest';
import GrantFormPage from './GrantFormPage';
import MedicalFormPage from './MedicalFormPage';
import { useState } from 'react';
import { Branches } from '../enums/Branches';
import FormBranching from '../components/form/FormBranching';
import NextButton from '../components/form/NextButton';

const BranchingFormPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [medicalFormCurrentStep, setMedicalFormCurrentStep] =
    useState<Branches>('CONFIRMATION');
  const [grantFormCurrentStep, setGrantFormCurrentStep] =
    useState<Branches>('CONFIRMATION');
  const [ableToSubmit, setAbleToSubmit] = useState(true);
  const handleMedicalProfessional = (response: boolean) => {
    if (response) {
      setMedicalFormCurrentStep('FORM');
    } else {
      setMedicalFormCurrentStep('END');
      setAbleToSubmit(false);
    }
  };

  const handleGrantForm = (response: boolean) => {
    if (response) {
      setGrantFormCurrentStep('FORM');
    } else {
      setGrantFormCurrentStep('END');
      setAbleToSubmit(false);
    }
  };

  // Navigation Logic
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<any>
  ): Promise<void> => {
    try {
      await submitForm(values);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{}}
      validationSchema={formSchema}
    >
      {(form) => (
        <Form>
          {step === 1 && (
            <FormBranching
              currentStep={grantFormCurrentStep}
              form={GrantFormPage}
              confirmationQuestion={'Are you a parent or legal guardian?'}
              endMessage={
                'Please find a parent or legal guardian to complete the form.'
              }
              onConfirm={handleGrantForm}
            />
          )}

          {step === 2 && (
            <FormBranching
              currentStep={medicalFormCurrentStep}
              form={MedicalFormPage}
              confirmationQuestion={'Are you a medical professional?'}
              endMessage={
                'Please find a medical professional to complete the form.'
              }
              onConfirm={handleMedicalProfessional}
            />
          )}

          <Center mt={4}>
            {step > 1 && ableToSubmit && (
              <NextButton option={'Previous'} nextStep={prevStep} />
            )}
            {step < 2 && ableToSubmit ? (
              <NextButton option={'Next'} nextStep={nextStep} />
            ) : ableToSubmit ? (
              <NextButton option={'Submit'} nextStep={form.submitForm} />
            ) : null}
          </Center>
        </Form>
      )}
    </Formik>
  );
};

export default BranchingFormPage;
