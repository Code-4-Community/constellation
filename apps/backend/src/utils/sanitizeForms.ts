import { formSchema } from '../schema/schema.js';

export const sanitizeFormList = (forms: any[]) => {
  return forms
    .map((form) => sanitizeForm(form))
    .filter((form) => form !== false);
};

const sanitizeForm = (form: any) => {
  try {
    formSchema.parse(form);
    return form;
  } catch {
    return parseForm(form);
  }
};

const parseForm = (form: any) => {
  if (!form.id) {
    return false;
  }

  try {
    const finForm = parseFinancialAssistanceForm(form);

    return {
      id: form.id,
      read: form.read ?? false,
      adminNotes: form.adminNotes ?? [],
      financialAssistanceForm: finForm,
    };
  } catch {
    return false;
  }
};

const parseFinancialAssistanceForm = (form: any) => {
  return {
    childsName: form.guardianForm.childsName,
    dob: form.guardianForm.dob,
    guardianName: form.guardianForm.guardianName,
    childsDiagnosis: form.medicalForm.childsDiagnosis,
    otherDiagnosis: form.medicalForm.otherDiagnosis,
    dateOfDiagnosis: form.medicalForm.dateOfDiagnosis,
    childsPhysician: form.medicalForm.childsPhysician,
    hospital: form.medicalForm.hospital,
    otherHospital: form.medicalForm.otherHospital,
    hospitalAddress: form.medicalForm.address,
    requestedGrantAmount: form.guardianForm.requestedGrantAmount,
    intendedUseOfGrant: form.guardianForm.intendedUseOfGrant,
    medicalProfessionalPhone: form.medicalForm.phone,
    medicalProfessionalEmail: form.medicalForm.socialWorkersEmail,
    notes: form.medicalForm.notes,
    date: form.medicalForm.date,
  };
};
