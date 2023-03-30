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
    for (const [key, value] of Object.entries(filtering)) {
      list = list.filter((formEntry) => {
        /**
         * This is gross! Here are the stackoverflows I used for reference:
         * https://stackoverflow.com/questions/455338/how-do-i-check-if-an-object-has-a-key-in-javascript
         * https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b
         */
        if (Object.prototype.hasOwnProperty.call(formEntry, key)) {
          return formEntry[key as keyof FormData] === value;
        } else return false;
      });
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
