import type { Asserts } from 'yup';
import { formSchema } from './formSchema';

export type FormData = Asserts<typeof formSchema>;
