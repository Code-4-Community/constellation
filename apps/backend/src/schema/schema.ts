import { z } from 'zod';

const addressSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zipcode: z.string().length(5),
});

// Regex to check for phone numbers formatted with `-`, ' ', and '.' separators,
// and with and without area code surrounded by parenthesis
const phoneNumberRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
const phoneNumber = z.string().regex(phoneNumberRegex);

// Schema to convert input to javascript date object
const dateSchema = z.coerce.date();
const adminNoteSchema = z.object({
  note: z.string(),
  updatedAt: dateSchema,
});

export const readSchema = z.object({
  read: z.boolean(),
});

export const adminNotesSchema = adminNoteSchema.array();
export type AdminNotes = z.infer<typeof adminNotesSchema>;

// Schema for the financial assistance form.
const financialAssistanceFormSchema = z.object({
  childsName: z.string().min(1),
  dob: dateSchema,
  guardianName: z.string().min(1),
  childsDiagnosis: z.string().min(1),
  otherDiagnosis: z.string().optional(),
  dateOfDiagnosis: dateSchema,
  childsPhysician: z.string().min(1),
  hospital: z.string().min(1),
  otherHospital: z.string().optional(),
  hospitalAddress: addressSchema,
  requestedGrantAmount: z.number().positive().optional(),
  intendedUseOfGrant: z.string().optional(),
  medicalProfessionalPhone: phoneNumber,
  medicalProfessionalEmail: z.string().email(),
  notes: z.string().optional(),
  date: dateSchema,
});

export const formSchema = z.object({
  id: z.string(),
  financialAssistanceForm: financialAssistanceFormSchema,
  adminNotes: adminNotesSchema,
  read: z.boolean(),
});
