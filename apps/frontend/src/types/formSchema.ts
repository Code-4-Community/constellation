import type { Asserts } from 'yup';
import * as Yup from 'yup';

const addressSchema = Yup.object({
  street: Yup.string().min(1).required().default(''),
  city: Yup.string().min(1).required().default(''),
  state: Yup.string().min(1).required().default(''),
  zipcode: Yup.string().length(5).required().default(''),
});

const adminNoteSchema = Yup.object().shape({
  note: Yup.string().required().default(''),
  updatedAt: Yup.date()
    .default(() => new Date())
    .required(),
});

export const adminNotesSchema = Yup.array()
  .of(adminNoteSchema)
  .required()
  .default(() => []);

export type AdminNotes = Asserts<typeof adminNotesSchema>;

export const guardianFormSchema = Yup.object().shape({
  childsName: Yup.string().min(1).required().default(''),
  dob: Yup.date()
    .default(() => new Date())
    .required(),
  gender: Yup.string().min(1).default(''),
  guardianName: Yup.string().min(1).required().default(''),
  address: addressSchema,
  phone: Yup.string().required().default(''),
  cellPhone: Yup.string().default(''),
  email: Yup.string().email().required().default(''),
  requestedGrantAmount: Yup.number().positive().default(0),
  intendedUseOfGrant: Yup.string().default(''),
  signature: Yup.string().min(1).required().default(''),
  date: Yup.date()
    .default(() => new Date())
    .required(),
});

export const medicalFormSchema = Yup.object().shape({
  childsDiagnosis: Yup.string().min(1).required().default(''),
  otherDiagnosis: Yup.string().default(''),
  dateOfDiagnosis: Yup.date()
    .default(() => new Date())
    .required(),
  childsPhysician: Yup.string().min(1).required().default(''),
  hospital: Yup.string().min(1).required().default(''),
  otherHospital: Yup.string().default(''),
  address: addressSchema,
  phone: Yup.string().required().default(''),
  descriptionOfCondition: Yup.string().default(''),
  medicalProfessionalName: Yup.string().default(''),
  medicalProfessionalTitle: Yup.string().default(''),
  signature: Yup.string().min(1).required().default(''),
  date: Yup.date()
    .default(() => new Date())
    .required(),
  socialWorkersEmail: Yup.string().email().required().default(''),
  notes: Yup.string().default(''),
});
export const formSchema = Yup.object().shape({
  id: Yup.string().default(''),
  guardianForm: guardianFormSchema,
  medicalForm: medicalFormSchema,
  adminNotes: adminNotesSchema,
});
