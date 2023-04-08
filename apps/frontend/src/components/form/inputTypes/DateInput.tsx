import { Input } from '@chakra-ui/react';
import { FieldInputProps, FormikProps } from 'formik';
import { ChangeEvent } from 'react';

interface DateInputProps {
  id: string;
  field: FieldInputProps<any>;
  form: FormikProps<any>;
}

const DateInput: React.FC<DateInputProps> = ({ id, field, form }) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    console.log(new Date(e.target.value));
    form.setFieldValue(id, new Date(e.target.value));
  };
  return <Input {...field} id={id} type="date" onChange={onChange} />;
};

export default DateInput;
