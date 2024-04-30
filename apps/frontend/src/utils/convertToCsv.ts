import { Asserts } from 'yup';
import { FormData } from '../types/formData';
import { addressSchema, AdminNotes } from '../types/formSchema';

export const convertFormsToCSVFormat = (forms: FormData[]) => {
  return forms.map((form) => {
    return {
      id: form.id,
      childsName: form.financialAssistanceForm.childsName,
      dob: form.financialAssistanceForm.dob,
      guardianName: form.financialAssistanceForm.guardianName,
      childsDiagnosis: form.financialAssistanceForm.childsDiagnosis,
      otherDiagnosis: form.financialAssistanceForm.otherDiagnosis,
      dateOfDiagnosis: form.financialAssistanceForm.dateOfDiagnosis,
      childsPhysician: form.financialAssistanceForm.childsPhysician,
      hospital: form.financialAssistanceForm.hospital,
      otherHospital: form.financialAssistanceForm.otherHospital,
      hospitalAddress: convertAddressToString(
        form.financialAssistanceForm.hospitalAddress
      ),
      requestedGrantAmount: `$${form.financialAssistanceForm.requestedGrantAmount}`,
      intendedUseOfGrant: form.financialAssistanceForm.intendedUseOfGrant,
      medicalProfessionalPhone:
        form.financialAssistanceForm.medicalProfessionalPhone,
      medicalProfessionalEmail:
        form.financialAssistanceForm.medicalProfessionalEmail,
      notes: form.financialAssistanceForm.notes,
      date: form.financialAssistanceForm.date,
      ...convertAdminNotesToString(form.adminNotes),
    };
  });
};

const convertAddressToString = (hospital: Asserts<typeof addressSchema>) => {
  return `${hospital.street}, ${hospital.city} ${hospital.state}, ${hospital.zipcode}`;
};

const convertAdminNotesToString = (adminNotes: AdminNotes) => {
  let notes = {};
  adminNotes.forEach((adminNote, index) => {
    notes = {
      ...notes,
      [`admin_note_${index}`]: `${adminNote.note} (${adminNote.updatedAt})`,
    };
  });
  return notes;
};
