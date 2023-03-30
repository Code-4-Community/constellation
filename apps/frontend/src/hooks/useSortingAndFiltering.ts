import { useEffect, useState } from 'react';
import {
  CancersDropdownValues,
  HospitalsDropdownValues,
} from '../components/form/MedicalForm';
import type FormData from '../types/FormData';

enum SortOrder {
  'ASC',
  'DESC',
}

type Options = {
  sorting?: {
    name?: SortOrder;
    date?: SortOrder;
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
  if (sorting) {
    for (const [key, value] of Object.entries(sorting)) {
      // TODO: Do sorting algorithm here
    }
  }
  if (filtering) {
    for (const [key, value] of Object.entries(filtering)) {
      // TODO: Do filtering algorithm here
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
  return list;
};

export default useSortingAndFiltering;
