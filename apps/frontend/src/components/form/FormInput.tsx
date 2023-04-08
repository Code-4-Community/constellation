import { PhoneIcon } from '@chakra-ui/icons';
import {
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
} from '@chakra-ui/react';
import { FieldInputProps } from 'formik';
import { InputVariant } from '../../types/input';
import FormSelect from './inputTypes/FormSelect';
import NumberInput from './inputTypes/NumberInput';

interface FormInputProps {
  variant: InputVariant;
  field: FieldInputProps<any>;
  id: string;
  description?: string;
  selectList?: string[][];
}

const FormInput: React.FC<FormInputProps> = ({
  variant,
  field,
  id,
  description,
  selectList,
}) => {
  if (variant === 'text' || variant === 'email' || variant === 'date') {
    return <Input {...field} id={id} type={variant} />;
  } else if (variant === 'number' || variant === 'money') {
    return <NumberInput inputVariant={variant} field={field} id={id} />;
  } else if (variant === 'phoneNumber') {
    return (
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<PhoneIcon color="gray.300" />}
        />
        <Input type="text" {...field} id={id} />
      </InputGroup>
    );
  } else if (variant === 'textArea') {
    return (
      <>
        <Textarea {...field} id={'useOfGrant'} />
        <FormHelperText>{description}</FormHelperText>
      </>
    );
  } else if (variant === 'select' && selectList && description) {
    return (
      <FormSelect
        placeholder={description}
        id={id}
        selectList={selectList}
        field={field}
      />
    );
  }
  return null;
};

export default FormInput;
