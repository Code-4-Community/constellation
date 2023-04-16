import type { Asserts } from 'yup';
import * as Yup from 'yup';

export const addressSchema = Yup.object({
  street: Yup.string().min(1).required(),
  city: Yup.string().min(1).required(),
  state: Yup.string().min(1).required(),
  zipcode: Yup.string().length(5).required(),
});

const adminNoteSchema = Yup.object().shape({
  note: Yup.string().required(),
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
  medicalProfessionalName: Yup.string(),
  medicalProfessionalTitle: Yup.string(),
  signature: Yup.string().min(1).required(),
  date: Yup.date()
    .default(() => new Date())
    .required(),
  socialWorkersEmail: Yup.string().email().required(),
  notes: Yup.string(),
});

export const formSchema = Yup.object().shape({
  id: Yup.string().default(''),
  guardianForm: guardianFormSchema,
  medicalForm: medicalFormSchema,
  adminNotes: adminNotesSchema,
});
