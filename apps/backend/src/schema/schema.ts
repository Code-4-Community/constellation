import { z } from 'zod';

const addressSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zipcode: z.number(),
});

// Regex to check for phone numbers formatted with `-`, ' ', and '.' separators,
// and with and without area code surrounded by parenthesis
const phoneNumberRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
const phoneNumber = z.string().regex(phoneNumberRegex);

// Schema to convert input to javascript date object
const dateSchema = z.coerce.date();

// Part of form to be filled out by the child's parent/legal guardian
const guardianFormSchema = z.object({
  childsName: z.string().min(1),
  dob: dateSchema,
  gender: z.string().optional(),
  guardianName: z.string().min(1),
  address: addressSchema,
  phone: phoneNumber,
  cellPhone: phoneNumber.optional(),
  email: z.string().email(),
  requestedGrantAmount: z.number().positive().optional(),
  intendedUseOfGrant: z.string().optional(),
  signature: z.string().min(1), // Not sure how this will be formated
  date: dateSchema,
  notes: z.string().optional(),
});

// Part of form to be filled out by a medical professional
const medicalFormSchema = z.object({
  childsDiagnosis: z.string().min(1),
  otherDiagnosis: z.string().optional(),
  dateOfDiagnosis: dateSchema,
  childsPhysician: z.string().min(1),
  hospital: z.string().min(1),
  otherHospital: z.string().optional(),
  address: addressSchema,
  phone: phoneNumber,
  descriptionOfCondition: z.string().optional(),
  medicalProfessionalName: z.string().optional(),
  medicalProfessionalTitle: z.string().optional(),
  signature: z.string().min(1),
  date: dateSchema,
  socialWorkersEmail: z.string().email(),
  notes: z.string().optional(),
});

export const formSchema = z.object({
  guardianForm: guardianFormSchema,
  medicalForm: medicalFormSchema,
});
