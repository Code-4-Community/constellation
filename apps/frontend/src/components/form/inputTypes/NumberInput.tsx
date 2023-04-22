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
}

const NumberInputView: React.FC<NumberInputProps> = ({
  inputVariant,
  id,
  field,
}) => {
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
        <NumberInputField {...field} id={id} type="number" paddingLeft={8}/>
      </NumberInput>
    </InputGroup>
  );
};

export default NumberInputView;
