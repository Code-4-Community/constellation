import * as Yup from 'yup';

const addressSchema = Yup.object({
  street: Yup.string().min(1).required(),
  city: Yup.string().min(1).required(),
  state: Yup.string().min(1).required(),
  zipcode: Yup.string().length(5).required(),
});

export const guardianFormSchema = Yup.object().shape({
  childsName: Yup.string().min(1).required(),
  dob: Yup.date()
    .default(() => new Date())
    .required(),
  gender: Yup.string().min(1),
  guardianName: Yup.string().min(1).required(),
  address: addressSchema,
  phone: Yup.string().required(),
  cellPhone: Yup.string(),
  email: Yup.string().email().required(),
  requestedGrantAmount: Yup.number().positive(),
  intendedUseOfGrant: Yup.string(),
  signature: Yup.string().min(1).required(),
  date: Yup.date()
    .default(() => new Date())
    .required(),
});

export const medicalFormSchema = Yup.object().shape({
  childsDiagnosis: Yup.string().min(1).required(),
  otherDiagnosis: Yup.string(),
  dateOfDiagnosis: Yup.date()
    .default(() => new Date())
    .required(),
  childsPhysician: Yup.string().min(1).required(),
  hospital: Yup.string().min(1).required(),
  otherHospital: Yup.string(),
  address: addressSchema,
  phone: Yup.string().required(),
  descriptionOfCondition: Yup.string(),
  medicalProfessionalName: Yup.string().min(1),
  medicalProfessionalTitle: Yup.string().min(1),
  signature: Yup.string().min(1).required(),
  date: Yup.date()
    .default(() => new Date())
    .required(),
  socialWorkersEmail: Yup.string().email().required(),
  notes: Yup.string(),
});

export const formSchema = Yup.object().shape({
  guardianForm: guardianFormSchema,
  medicalForm: medicalFormSchema,
});
