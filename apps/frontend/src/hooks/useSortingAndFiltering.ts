import { useEffect, useState } from 'react';
import {
  CancersDropdownValues,
  HospitalsDropdownValues,
} from '../components/form/MedicalForm';
import type FormData from '../types/FormData';

export enum SortField {
  NAME = 'childsName',
  DATE = 'date',
}
export enum SortOrder {
  'ASC',
  'DESC',
}

type Options = {
  sorting?: {
    field: keyof FormData;
    sortOrder: SortOrder;
  };
  filtering?: {
    filters: {
      field: keyof FormData;
      value: FormData[keyof FormData];
    }[];
    hospital?: HospitalsDropdownValues;
    cancerType?: CancersDropdownValues;
  };
};

const useSortingAndFiltering = (list: FormData[], options: Options) => {
  const [listState, setListState] = useState(list);

  useEffect(() => {
    const newData = reduceData(list, options);
    setListState(newData);
  }, [list, options]);

  return listState;
};

const reduceData = (list: FormData[], options: Options) => {
  const { sorting, filtering } = options;
  if (filtering) {
    const { filters } = filtering;
    for (const filter of filters) {
      const { field, value } = filter;

      list = list.filter((formEntry) => formEntry[field] === value);
    }
  }
  if (sorting) {
    const { field, sortOrder } = sorting;
    if (sortOrder === SortOrder.ASC) {
      list.sort((a, b) => (b[field] > a[field] ? -1 : 1));
    } else {
      list.sort((a, b) => (a[field] > b[field] ? -1 : 1));
    }
  }
  return list;
};

export default useSortingAndFiltering;
