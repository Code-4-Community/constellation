import { useEffect, useMemo, useState } from 'react';
import SortOrder from '../enums/SortOrder';
import type FormData from '../types/FormData';
import { Options } from '../types/SortAndFilter';

const useSortingAndFiltering = (list: FormData[], options: Options) => {
  const [listState, setListState] = useState(list);

  const reducedData = useMemo(() => reduceData(list, options), [list, options]);

  useEffect(() => {
    setListState(reducedData);
  }, [reducedData]);

  return listState;
};

const reduceData = (list: FormData[], options: Options) => {
  const { sorting, filtering, searching } = options;
  let newData = [...list];

  if (filtering) {
    const { filters } = filtering;
    for (const filter of filters) {
      const { field, value } = filter;

      newData = list.filter((formEntry) => formEntry[field] === value);
    }
  }

  if (searching) {
    const { searchTerm } = searching;
    newData = newData.filter((form) => {
      const formValues = Object.values(form);
      const lowercaseFormValues = formValues.map((value) => {
        if (typeof value === 'string') return value.toLowerCase();
        return value;
      });

      for (const val of lowercaseFormValues) {
        if (typeof val === 'string' && val.includes(searchTerm.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  }

  if (sorting) {
    const { field, sortOrder } = sorting;
    if (sortOrder === SortOrder.ASC) {
      newData.sort((a, b) => (b[field] > a[field] ? -1 : 1));
    } else {
      newData.sort((a, b) => (a[field] > b[field] ? -1 : 1));
    }
  }

  return newData;
};

export default useSortingAndFiltering;
