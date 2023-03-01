import { z } from 'zod';

const addressSchema = z.object({
    address: z.string(),
    city: z.string(),
    state: z.string(),
    zipcode: z.number(),
})

// Part of form to be filled out by the child's parent/legal guardian
const guardianFormSchema = z.object({
    childsName: z.string(),
    ssn: z.number(),
    dob: z.string(),
    gender: z.string(),
    guardianName: z.string(),
    address: addressSchema,
    phone: z.number(),
    cellPhone: z.number(),
    email: z.string().email(),
    requestedGrantAmount: z.number(),
    intendedUseOfGrant: z.string(),
    signature: z.string(), // Not sure how this will be formated
    date: z.string(),
})

// Part of form to be filled out by a medical professional
const medicalFormSchema = z.object({
    childsDiagnosis: z.string(),
    dateOfDiagnosis: z.string(),
    childsPhysician: z.string(),
    hospital: z.string(),
    address: addressSchema,
    phone: z.number(),
    descriptionOfCondition: z.string(),
    medicalProfessionalNameAndTitle: z.string(),
    signature: z.string(),
    date: z.string(),
    socialWorkersEmail: z.string().email(),
})

export const formSchema = z.object({
    guardianForm: guardianFormSchema,
    medicalForm: medicalFormSchema,
})


