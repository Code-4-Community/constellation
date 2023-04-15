import FormData from './FormData';
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
  field: keyof FormData;
  value: FormData[keyof FormData];
};

export type Searching = {
  searchTerm: string;
};

export type Filters = Options['filtering']['filters'];
