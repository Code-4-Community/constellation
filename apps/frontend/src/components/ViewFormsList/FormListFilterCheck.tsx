import { Checkbox } from '@chakra-ui/react';
import { useState } from 'react';
import useSortingAndFiltering from '../../hooks/useSortingAndFiltering';
import { FormData, FormDataNestedKeys } from '../../types/formData';
import { Options } from '../../types/SortAndFilter';

const FormListFilterCheck = ({ label }: { label: string }) => {
  const [isChecked, setIsChecked] = useState(false);

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
  }

  return (
    <Checkbox isChecked={isChecked} onChange={handleCheckboxChange}>
      {dataValue.toString()}
    </Checkbox>
  );
};

export default FormListFilterCheck;
