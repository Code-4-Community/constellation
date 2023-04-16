import { Checkbox, Heading, Input, VStack } from '@chakra-ui/react';
import { FormData, FormDataNestedKeys } from '../../types/formData';
import { Options } from '../../types/SortAndFilter';
import FormListFilterCheck from './FormListFilterCheck';
import { FormDataToEnglish } from './ViewFormsList';

const FormListFilter = ({
  dataField,
  dataLabel,
  filterValues,
}: {
  dataField: FormDataNestedKeys;
  dataLabel: FormDataToEnglish;
  filterValues: Array<FormData[keyof FormData]>;
}) => {
  return (
    <VStack>
      <Heading size="md">{dataLabel}</Heading>
      {
        // Input to search for specific filter values could be added here
        /* <Input size="sm" placeholder={dataLabel} /> */
      }
      {filterValues.map((value) => {
        if (typeof value === 'string' || typeof value === 'number') {
          return <FormListFilterCheck label={value.toString()} />;
        }
        return null;
      })}
    </VStack>
  );
};

export default FormListFilter;
