import { Flex, Heading } from '@chakra-ui/react';
import type { Asserts } from 'yup';
import { guardianFormSchema } from '../../types/formSchema';
import { FieldView } from './FieldView';

interface GuardianFormProps {
  guardianForm: Asserts<typeof guardianFormSchema>;
}
export const GuardianForm: React.FC<GuardianFormProps> = ({ guardianForm }) => (
  <Flex flexDirection="column">
    <Heading size="md" marginBottom="16px">
      Guardian Form
    </Heading>
    <Flex flexWrap="wrap">
      <FieldView
        fieldName="Last updated"
        value={new Date(guardianForm.date).toLocaleString()}
      />
    </Flex>
    <Flex flexWrap="wrap">
      <FieldView fieldName="Child's name" value={guardianForm.childsName} />
      <FieldView fieldName="Gender" value={guardianForm.gender || 'N/A'} />
      <FieldView
        fieldName="Date of birth"
        value={new Date(guardianForm.dob).toLocaleDateString()}
      />
    </Flex>
    <Flex flexWrap="wrap">
      <FieldView fieldName="Guardian name" value={guardianForm.guardianName} />
      <FieldView fieldName="Email" value={guardianForm.email} />
      <FieldView fieldName="Phone" value={guardianForm.phone} />
      <FieldView
        fieldName="Cellphone"
        value={guardianForm.cellPhone || 'N/A'}
      />
    </Flex>
    <Flex flexWrap="wrap">
      <FieldView fieldName="Street" value={guardianForm.address.street} />
      <FieldView fieldName="City" value={guardianForm.address.city} />
      <FieldView fieldName="State" value={guardianForm.address.state} />
      <FieldView fieldName="Zipcode" value={guardianForm.address.zipcode} />
    </Flex>
    <Flex flexWrap="wrap">
      <FieldView
        fieldName="Requested grant amount"
        value={
          guardianForm.requestedGrantAmount
            ? '$' + guardianForm.requestedGrantAmount
            : 'N/A'
        }
      />
      <FieldView
        fieldName="Intended use of grant"
        value={guardianForm.intendedUseOfGrant || 'N/A'}
      />
    </Flex>
  </Flex>
);
