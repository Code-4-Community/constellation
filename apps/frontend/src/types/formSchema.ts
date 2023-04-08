import * as Yup from 'yup';

const addressSchema = Yup.object({
  street: Yup.string().min(1),
  city: Yup.string().min(1),
  state: Yup.string().min(1),
  zipcode: Yup.number(),
});

export const formSchema = Yup.object().shape({
  guardianForm: Yup.object().shape({
    childsName: Yup.string().min(1),
    dob: Yup.date().default(() => new Date()),
    gender: Yup.string().min(1),
    guardianName: Yup.string().min(1),
    address: addressSchema,
    phone: Yup.string(),
    cellPhone: Yup.string(),
    email: Yup.string().email(),
    requestedGrantAmount: Yup.number().positive(),
    intendedUseOfGrant: Yup.string(),
    signature: Yup.string().min(1),
    date: Yup.date().default(() => new Date()),
  }),
  medicalForm: Yup.object().shape({
    childsDiagnosis: Yup.string().min(1),
    otherDiagnosis: Yup.string(),
    dateOfDiagnosis: Yup.date().default(() => new Date()),
    childsPhysician: Yup.string().min(1),
    hospital: Yup.string().min(1),
    otherHospital: Yup.string(),
    address: addressSchema,
    phone: Yup.string(),
    descriptionOfCondition: Yup.string(),
    medicalProfessionalName: Yup.string().min(1),
    medicalProfessionalTitle: Yup.string().min(1),
    signature: Yup.string().min(1),
    date: Yup.date().default(() => new Date()),
    socialWorkersEmail: Yup.string().email(),
    notes: Yup.string(),
  }),
});
