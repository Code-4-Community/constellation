import { financialAssistanceFormSchema } from '../../types/formSchema';
import { FieldView } from './FieldView';
import { Flex, Heading } from '@chakra-ui/react';
import type { Asserts } from 'yup';

interface FinancialAssistanceFormProps {
  financialAssistanceForm: Asserts<typeof financialAssistanceFormSchema>;
}

export const FinancialAssistanceForm: React.FC<
  FinancialAssistanceFormProps
> = ({ financialAssistanceForm }) => (
  <Flex flexDirection="column">
    <Heading size="md" marginBottom="16px">
      Financial Assistance Form
    </Heading>
    <Flex flexWrap="wrap">
      <FieldView
        fieldName="Last updated"
        value={new Date(financialAssistanceForm.date).toLocaleString()}
      />
    </Flex>
    <Flex flexWrap="wrap">
      <FieldView
        fieldName="Child's name"
        value={financialAssistanceForm.childsName}
      />
      <FieldView
        fieldName="Date of birth"
        value={new Date(financialAssistanceForm.dob).toLocaleDateString()}
      />
      <FieldView
        fieldName="Guardian Name"
        value={financialAssistanceForm.guardianName}
      />
    </Flex>
    <Flex flexWrap="wrap">
      <FieldView
        fieldName="Child's diagnosis"
        value={financialAssistanceForm.childsDiagnosis}
      />
      <FieldView
        fieldName="Other diagnosis"
        value={financialAssistanceForm.otherDiagnosis || 'N/A'}
      />
      <FieldView
        fieldName="Date of diagnosis"
        value={new Date(
          financialAssistanceForm.dateOfDiagnosis
        ).toLocaleDateString()}
      />
      <FieldView
        fieldName="Child's physician"
        value={financialAssistanceForm.childsPhysician}
      />
    </Flex>
    <Flex flexWrap="wrap">
      <FieldView
        fieldName="Hospital"
        value={financialAssistanceForm.hospital}
      />
      <FieldView
        fieldName="Other hospital"
        value={financialAssistanceForm.otherHospital || 'N/A'}
      />
      <FieldView
        fieldName="Hospital's street"
        value={financialAssistanceForm.hospitalAddress.street}
      />
      <FieldView
        fieldName="Hospital's city"
        value={financialAssistanceForm.hospitalAddress.city}
      />
      <FieldView
        fieldName="Hospital's state"
        value={financialAssistanceForm.hospitalAddress.state}
      />
      <FieldView
        fieldName="Hospital's zipcode"
        value={financialAssistanceForm.hospitalAddress.zipcode}
      />
    </Flex>
    <Flex flexWrap="wrap">
      <FieldView
        fieldName="Requested grant amount"
        value={
          financialAssistanceForm.requestedGrantAmount
            ? '$' + financialAssistanceForm.requestedGrantAmount
            : 'N/A'
        }
      />
      <FieldView
        fieldName="Intended use of grant"
        value={financialAssistanceForm.intendedUseOfGrant || 'N/A'}
      />
    </Flex>
  </Flex>
);
