import { FormData } from './formData';
import SortOrder from '../enums/SortOrder';

export type Options = {
  sorting?: {
    field: keyof FormData;
    sortOrder: SortOrder;
  };
  filtering?: {
    filters: {
      field: keyof FormData;
      value: FormData[keyof FormData];
    }[];
  };
  searching?: {
    searchTerm: string;
  };
};
