import { Select } from '@chakra-ui/react';
import { FieldInputProps } from 'formik';

interface FormSelectProps {
  placeholder: string;
  selectList: string[][];
  id: string;
  field: FieldInputProps<any>;
  onChange?: (value: string) => void;
  isDisabled?: boolean;
}

const FormSelect: React.FC<FormSelectProps> = ({
  placeholder,
  selectList,
  id,
  field,
  onChange,
  isDisabled,
}) => {

  const handleStateSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    field.onChange(event);
    if (onChange) {
      onChange(selectedValue);
    }
  };

  return (
    <Select placeholder={placeholder} size="md" {...field} id={id} 
    onChange={(event) => handleStateSelectChange(event)}
    isDisabled={isDisabled}
    >
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
