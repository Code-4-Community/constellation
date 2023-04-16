import { Checkbox } from '@chakra-ui/react';
import { useState } from 'react';
import useSortingAndFiltering from '../../hooks/useSortingAndFiltering';
import { FormData } from '../../types/formData';
import { Options } from '../../types/SortAndFilter';

const FormListFilterCheck = ({ label }: { label: string }) => {
  const { addFilter, removeFilter } = useSortingAndFiltering(null);
  const [isChecked, setIsChecked] = useState(false);

  function handleCheckboxChange() {
    if (isChecked) {
      removeFilter();
    } else {
      addFilter();
    }
    setIsChecked(!isChecked);
  }

  return (
    <Checkbox isChecked={isChecked} onChange={handleCheckboxChange}>
      {label}
    </Checkbox>
  );
};

export default FormListFilterCheck;
