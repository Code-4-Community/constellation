import { useState, useEffect } from 'react';
import { SortOrder } from '../enums/SortOrder';

export const useSort = <FormData>(
  forms: FormData[],
  compareFunction: (a: FormData, b: FormData) => number,
  setForms: (data: FormData[]) => void,
) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASC);

  useEffect(() => {
    const sortedData = [...forms].sort(compareFunction);
    if (sortOrder === SortOrder.DESC) {
      sortedData.reverse();
    }
    setForms(sortedData);
  }, [compareFunction, sortOrder]);

  return { setSortOrder };
};
