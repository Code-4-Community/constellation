import { Checkbox } from '@chakra-ui/react';
import { useState } from 'react';
import useSortingAndFiltering from '../../hooks/useSortingAndFiltering';
import { FormData, FormDataNestedKeys } from '../../types/formData';
import { Filter, Options } from '../../types/SortAndFilter';

const FormListFilterCheck = ({
  filter,
  label,
}: {
  filter: Filter;
  label: string;
}) => {
  const { addFilter, removeFilter } = useSortingAndFiltering(null);

  const [isChecked, setIsChecked] = useState(false);

  function handleCheckboxChange() {
    if (isChecked) {
      removeFilter(filter);
    } else {
      addFilter(filter);
    }
    setIsChecked(!isChecked);
  }

  return (
    <Checkbox isChecked={isChecked} onChange={handleCheckboxChange}>
      {label.toString()}
    </Checkbox>
  );
};

export default FormListFilterCheck;
