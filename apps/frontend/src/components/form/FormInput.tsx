import { PhoneIcon } from '@chakra-ui/icons';
import {
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
} from '@chakra-ui/react';
import { FieldInputProps } from 'formik';
import FormSelect from './inputTypes/FormSelect';
import NumberInput from './inputTypes/NumberInput';

export type InputVariant =
  | 'text'
  | 'date'
  | 'number'
  | 'phoneNumber'
  | 'email'
  | 'money'
  | 'textArea'
  | 'select';

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
  if (variant === 'text') {
    return <Input {...field} id={id} type="text" />;
  } else if (variant === 'number' || variant === 'money') {
    return <NumberInput inputVariant={variant} field={field} id={id} />;
  } else if (variant === 'phoneNumber') {
    return (
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<PhoneIcon color="gray.300" />}
        />
        <Input type="tel" {...field} />
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
  } else {
    // handles email and date types
    return <Input {...field} type={variant} id={id} />;
  }
};

export default FormInput;
