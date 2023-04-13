import { Flex, Heading } from '@chakra-ui/react';
import type { Asserts } from 'yup';
import { medicalFormSchema } from '../../types/formSchema';
import { FieldView } from './FieldView';

interface MedicalFormProps {
  medicalForm: Asserts<typeof medicalFormSchema>;
}
export const MedicalForm: React.FC<MedicalFormProps> = ({ medicalForm }) => (
  <Flex flexDirection="column" marginTop="40px">
    <Heading size="md" marginBottom="16px">
      Medical Form
    </Heading>
    <Flex flexWrap="wrap">
      <FieldView
        fieldName="Last updated"
        value={new Date(medicalForm.date).toLocaleString()}
      />
    </Flex>
    <Flex flexWrap="wrap">
      <FieldView
        fieldName="Child's diagnosis"
        value={medicalForm.childsDiagnosis}
      />
      <FieldView
        fieldName="Other diagnosis"
        value={medicalForm.otherDiagnosis || 'N/A'}
      />
      <FieldView
        fieldName="Date of diagnosis"
        value={new Date(medicalForm.dateOfDiagnosis).toLocaleDateString()}
      />
    </Flex>
    <Flex flexWrap="wrap">
      <FieldView
        fieldName="Child's physician"
        value={medicalForm.childsPhysician}
      />
      <FieldView fieldName="Hospital" value={medicalForm.hospital} />
      <FieldView
        fieldName="Other hospital"
        value={medicalForm.otherHospital || 'N/A'}
      />
      <FieldView fieldName="Phone" value={medicalForm.phone} />
    </Flex>
    <Flex flexWrap="wrap">
      <FieldView fieldName="Street" value={medicalForm.address.street} />
      <FieldView fieldName="City" value={medicalForm.address.city} />
      <FieldView fieldName="State" value={medicalForm.address.state} />
      <FieldView fieldName="Zipcode" value={medicalForm.address.zipcode} />
    </Flex>
    <Flex flexWrap="wrap">
      <FieldView
        fieldName="Medical professional name"
        value={medicalForm.medicalProfessionalName || 'N/A'}
      />
      <FieldView
        fieldName="Medical professional title"
        value={medicalForm.medicalProfessionalTitle || 'N/A'}
      />
    </Flex>
    <Flex flexWrap="wrap">
      <FieldView
        fieldName="Description of condition"
        value={medicalForm.descriptionOfCondition || 'N/A'}
      />
    </Flex>
    <Flex flexWrap="wrap">
      <FieldView
        fieldName="Social worker's email"
        value={medicalForm.socialWorkersEmail}
      />
    </Flex>
    <Flex flexWrap="wrap">
      <FieldView fieldName="Notes" value={medicalForm.notes || 'N/A'} />
    </Flex>
  </Flex>
);
