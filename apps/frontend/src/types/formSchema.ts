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

export const financialAssistanceFormSchema = Yup.object().shape({
  childsName: Yup.string().min(1).required().default(''),
  dob: Yup.date()
    .default(() => new Date())
    .required(),
  guardianName: Yup.string().min(1).required().default(''),
  childsDiagnosis: Yup.string().min(1).required().default(''),
  otherDiagnosis: Yup.string().default(undefined),
  dateOfDiagnosis: Yup.date()
    .default(() => new Date())
    .required(),
  childsPhysician: Yup.string().min(1).required().default(''),
  hospital: Yup.string().min(1).required().default(''),
  otherHospital: Yup.string().default(undefined),
  hospitalAddress: addressSchema,
  requestedGrantAmount: Yup.number().positive().default(undefined),
  intendedUseOfGrant: Yup.string().default(undefined),
  medicalProfessionalPhone: Yup.string().required().default(''),
  medicalProfessionalEmail: Yup.string().email().required().default(''),
  notes: Yup.string().default(undefined),
  date: Yup.date()
    .default(() => new Date())
    .required(),
});

export const formSchema = Yup.object().shape({
  id: Yup.string().default(''),
  financialAssistanceForm: financialAssistanceFormSchema,
  adminNotes: adminNotesSchema,
  read: Yup.boolean().default(false),
});
