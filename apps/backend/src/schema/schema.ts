import { z } from 'zod';

const addressSchema = z.object({
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zipcode: z.number(),
})

// Regex to check for phone numbers formatted with `-`, ' ', and '.' separators, 
// and with and without area code surrounded by parenthesis
const phoneNumberRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
const phoneNumber = z.string().regex(phoneNumberRegex)

// Part of form to be filled out by the child's parent/legal guardian
const guardianFormSchema = z.object({
  childsName: z.string().min(1),
  dob: z.string().datetime(),
  gender: z.string().min(1),
  guardianName: z.string().min(1),
  address: addressSchema,
  phone: phoneNumber,
  cellPhone: phoneNumber,
  email: z.string().email(),
  requestedGrantAmount: z.number().positive(),
  intendedUseOfGrant: z.string(),
  signature: z.string().min(1), // Not sure how this will be formated
  date: z.string().datetime(),
})

// Part of form to be filled out by a medical professional
const medicalFormSchema = z.object({
  childsDiagnosis: z.string().min(1),
  dateOfDiagnosis: z.string().datetime(),
  childsPhysician: z.string().min(1),
  hospital: z.string().min(1),
  address: addressSchema,
  phone: phoneNumber,
  descriptionOfCondition: z.string(),
  medicalProfessionalNameAndTitle: z.string().min(1),
  signature: z.string().min(1),
  date: z.string().datetime(),
  socialWorkersEmail: z.string().email(),
})

export const formSchema = z.object({
  guardianForm: guardianFormSchema,
  medicalForm: medicalFormSchema,
})


