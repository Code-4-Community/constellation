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

interface FormInputProps {
  variant: InputVariant;
  field: FieldInputProps<any>;
  id: string;
  description?: string;
  selectList?: string[][];
  onChange?: (value: any) => void;
  isDisabled?: boolean;
  placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  variant,
  field,
  id,
  description,
  selectList,
  onChange,
  isDisabled,
  placeholder,
}) => {
  const handleChange = (value: any) => {
    field.onChange({
      target: {
        value,
        name: field.name,
      },
    });
    onChange?.(value);
  };

  if (variant === 'text' || variant === 'email' || variant === 'date') {
    return <Input {...field} id={id} type={variant} isDisabled={isDisabled} />;
  } else if (variant === 'number' || variant === 'money') {
    return (
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
          children="$"
        />
        <Input type="number" {...field} id={id} isDisabled={isDisabled} />
      </InputGroup>
    );
  } else if (variant === 'phoneNumber') {
    return (
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<PhoneIcon color="gray.300" />}
        />
        <Input type="text" {...field} id={id} isDisabled={isDisabled} />
      </InputGroup>
    );
  } else if (variant === 'textArea') {
    return (
      <>
        <Textarea
          {...field}
          id={'useOfGrant'}
          isDisabled={isDisabled}
          placeholder={placeholder}
        />
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
        onChange={(value) => handleChange(value)}
        isDisabled={isDisabled}
      />
    );
  }
  return null;
};

export default FormInput;
