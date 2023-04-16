import * as yup from 'yup';
import { formSchema } from './formSchema';

// export type FormData = Asserts<typeof formSchema>;

export type FormData = yup.InferType<typeof formSchema>;

type NestedKeyOfFormData<T> =
  | keyof T
  | {
      [K in keyof T]?: K extends string
        ? `${K}.${NestedKeyOfFormData<T[K]> & string}`
        : never;
    }[keyof T];

export type FormDataNestedKeys = NestedKeyOfFormData<
  yup.InferType<typeof formSchema>
>;
