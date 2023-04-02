import { Select } from '@chakra-ui/react';
import { FieldInputProps } from 'formik';

interface FormSelectProps {
  placeholder: string;
  selectList: string[][];
  id: string;
  field: FieldInputProps<any>;
}

const FormSelect: React.FC<FormSelectProps> = ({
  placeholder,
  selectList,
  id,
  field,
}) => {
  return (
    <Select placeholder={placeholder} size="md" {...field} id={id}>
      {selectList.map(([key, value]) => {
        return (
          <option value={key} key={key}>
            {value}
          </option>
        );
      })}
    </Select>
  );
};

export default FormSelect;
