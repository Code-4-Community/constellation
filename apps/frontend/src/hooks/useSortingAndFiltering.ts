import { useEffect, useMemo, useState } from 'react';
import { SortOrder } from '../enums/SortOrder';
import { FormData } from '../types/formData';
import { Options } from '../types/SortAndFilter';

/**
 * This hook is for sorting, filtering, and searching an array of form data.
 * Currently, you can filter by any number of fields, sort on any field, and searching by most fields
 * @param list a list of form entries
 * @param options an object representing the different ways the user wants to sort, filter, and search the data
 * @returns a piece of state representing the list that is reduced to the user's preferences.
 */
const useSortingAndFiltering = (list: FormData[], options: Options) => {
  const [listState, setListState] = useState(list);

  const reducedData = useMemo(() => reduceData(list, options), [list, options]);

  useEffect(() => {
    setListState(reducedData);
  }, [reducedData]);

  return listState;
};

/**
 * A function that represents the driver for sorting, searching, and filtering a list of form entries.
 * @param list A list of form entries
 * @param options An object that represents every sorting, filtering, and searching option that the user wants
 * @returns A list of form entries that pass all filtering, sorting, and searching conditions
 */
const reduceData = (list: FormData[], options: Options): FormData[] => {
  const { sorting, filtering, searching } = options;

  let reducedList = [...list];

  if (filtering) {
    reducedList = filterData(reducedList, { filtering });
  }

  // TODO: Make searching work with numbers and recursively through all child objects
  if (searching) {
    reducedList = searchData(reducedList, { searching });
  }

  if (sorting) {
    reducedList = sortData(reducedList, { sorting });
  }

  return reducedList;
};

/**
 * A function that performs filtering on a list of form objects.
 * @param list A list of form objects
 * @param filteringObject Options pertaining to filters
 * @returns A list of filtered form objects
 */
const filterData = (
  list: FormData[],
  filteringObject: Pick<Options, 'filtering'>
) => {
  if (filteringObject && filteringObject.filtering) {
    const { filters } = filteringObject.filtering;
    const filteredList = list.filter((formEntry) => {
      for (const filter of filters) {
        const { field: filterField, value: filterValue } = filter;
        if (formEntry[filterField] === filterValue) return true;
      }
      return false;
    });

    return filteredList;
  }
  return list;
};

/**
 * A function that performs sorting on a list of form objects. Sorting can happen on any object parameter
 * in ascending or descending order, and only one paramter can be sorted on at a time.
 * @param list a list of form objects
 * @param sortingObject Options pertaining to sorting
 * @returns A list of sorted form objects
 */
const sortData = (
  list: FormData[],
  sortingObject: Pick<Options, 'sorting'>
) => {
  if (sortingObject.sorting) {
    const { field, sortOrder } = sortingObject.sorting;
    if (sortOrder === SortOrder.ASC) {
      list.sort((a, b) => (b[field] > a[field] ? -1 : 1));
    } else {
      list.sort((a, b) => (a[field] > b[field] ? -1 : 1));
    }
  }
  return list;
};

/**
 * A function that performs a search through every value in each form object.
 * @param list a list of form objects
 * @param searchingObject Options pertaining to searching
 * @returns A list of searched form objects
 */
const searchData = (
  list: FormData[],
  searchingObject: Pick<Options, 'searching'>
) => {
  if (searchingObject.searching) {
    const { searchTerm } = searchingObject.searching;
    const searchedList = list.filter((form) => {
      const formValues = Object.values({
        ...form.guardianForm,
        ...form.medicalForm,
      });
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

    return searchedList;
  }
  return list;
};

export default useSortingAndFiltering;
