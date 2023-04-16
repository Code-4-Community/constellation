import { Checkbox, Heading, Input, VStack } from '@chakra-ui/react';
import { FormDataToEnglish } from '.';
import { FormData } from '../../types/formData';
import { Options } from '../../types/SortAndFilter';
import FormListFilterCheck from './FormListFilterCheck';

const FormListFilter = ({
  dataLabel,
  filterValues,
}: {
  dataLabel: FormDataToEnglish;
  filterValues: Array<FormData[keyof FormData]>;
}) => {
  return (
    <VStack>
      <Heading size="md">{dataLabel}</Heading>
      <Input size="sm" placeholder={dataLabel} />
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
