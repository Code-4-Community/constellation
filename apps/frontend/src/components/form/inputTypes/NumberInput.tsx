import {
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { InputVariant } from '../../../types/input';
import { FieldInputProps } from 'formik';

interface NumberInputProps {
  inputVariant: InputVariant;
  id: string;
  field: FieldInputProps<any>;
  onChange?: (value: any) => void;
  isDisabled?: boolean;
}

const NumberInputView: React.FC<NumberInputProps> = ({
  inputVariant,
  id,
  field,
  onChange,
  isDisabled,
}) => {

  const handleChange = (value: string) => {
    field.onChange({
      target: {
        value,
        name: field.name,
      },
    });

    if (onChange) {
      onChange(value);
    }
  };
  return (
    <InputGroup>
      <NumberInput>
        {inputVariant === 'money' ? (
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
            children="$"
          />
        ) : null}
        <NumberInputField {...field} id={id} type="number" paddingLeft={8}
        onChange={(e) => handleChange(e.target.value)}
        disabled={isDisabled} 
         />
      </NumberInput>
    </InputGroup>
  );
};

export default NumberInputView;
