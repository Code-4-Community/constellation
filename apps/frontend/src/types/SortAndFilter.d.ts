import FormData from './FormData';

export enum SortOrder {
  'ASC',
  'DESC',
}

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
};
