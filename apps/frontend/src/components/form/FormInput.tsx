import { PhoneIcon } from '@chakra-ui/icons';
import {
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
} from '@chakra-ui/react';
import { FieldInputProps, FormikProps } from 'formik';
import DateInput from './inputTypes/DateInput';
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
  form: FormikProps<any>;
  id: string;
  description?: string;
  selectList?: string[][];
}

const FormInput: React.FC<FormInputProps> = ({
  variant,
  field,
  form,
  id,
  description,
  selectList,
}) => {
  if (variant === 'text') {
    return <Input {...field} id={id} type="text" />;
  } else if (variant === 'email') {
    return <Input {...field} id={id} type="email" />;
  } else if (variant === 'date') {
    return <Input {...field} id={id} type="date" />;
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
  } else {
    return null;
  }
};

export default FormInput;
