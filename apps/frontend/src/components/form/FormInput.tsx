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
// import NumberInput from './inputTypes/NumberInput';

interface FormInputProps {
  variant: InputVariant;
  field: FieldInputProps<any>;
  id: string;
  description?: string;
  selectList?: string[][];
  onChange?: (value: any) => void;
  isDisabled?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  variant,
  field,
  id,
  description,
  selectList,
  onChange,
  isDisabled,
}) => {

  const handleChange = (value: any) => {
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

  if (variant === 'text' || variant === 'email' || variant === 'date') {
    return <Input {...field} id={id} type={variant} 
    onChange={(e) => handleChange(e.target.value)}
    isDisabled={isDisabled} 
    />;
  } else if (variant === 'number' || variant === 'money') {
    return (
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
          children="$"
        />
        <Input type="number" {...field} id={id} 
        onChange={(e) => handleChange(e.target.value)}
        isDisabled={isDisabled} 
        />
      </InputGroup>
    );
    // return <NumberInput inputVariant={variant} field={field} id={id} />;
  } else if (variant === 'phoneNumber') {
    return (
      <InputGroup> 
        <InputLeftElement
          pointerEvents="none"
          children={<PhoneIcon color="gray.300" />}
        />
        <Input type="text" {...field} id={id}
        onChange={(e) => handleChange(e.target.value)}
        isDisabled={isDisabled} 
        />
      </InputGroup>
    );
  } else if (variant === 'textArea') {
    return (
      <>
        <Textarea {...field} id={'useOfGrant'} 
        onChange={(e) => handleChange(e.target.value)}
        isDisabled={isDisabled} 
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
