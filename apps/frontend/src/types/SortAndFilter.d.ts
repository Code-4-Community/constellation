import { FormData, FormDataNestedKeys } from './formData';
import SortOrder from '../enums/SortOrder';

export type Options = {
  sorting?: Sorting;
  filtering?: Filtering;
  searching?: Searching;
};

export type Sorting = {
  field: keyof FormData;
  sortOrder: SortOrder;
};

export type Filtering = {
  filters: Filter[];
};

export type Filter = {
  field: FormDataNestedKeys;
  value: FormData[keyof FormData];
};

export type Searching = {
  searchTerm: string;
};

export type Filters = Options['filtering']['filters'];
