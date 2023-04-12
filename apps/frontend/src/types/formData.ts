import type { Asserts } from 'yup';
import { formSchema } from './formSchema';

export type FormData = Asserts<typeof formSchema>;

export interface FormDataWithId {
  id: string;
  data: FormData;
}
