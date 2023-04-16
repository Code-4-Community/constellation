import { Td, Tr, Link } from '@chakra-ui/react';
import { addressSchema } from '../../types/formSchema';
import * as Yup from 'yup';

type FormListRowProps = {
  id: string;
  date: Date;
  childsName: string;
  dob: Date;
  hospital: string;
  address: Yup.InferType<typeof addressSchema>;
};

const FormListRow = ({
  id,
  date,
  childsName,
  dob,
  hospital,
  address,
}: FormListRowProps) => {
  return (
    <Tr key={id}>
      <Td>{new Date(date).toLocaleDateString()}</Td>
      <Td>
        <Link href={`/form/${id}`}>{childsName}</Link>
      </Td>
      <Td>{new Date(dob).toLocaleDateString()}</Td>
      <Td>{hospital}</Td>
      <Td>{`${address.city}, ${address.state}`}</Td>
    </Tr>
  );
};

export default FormListRow;
