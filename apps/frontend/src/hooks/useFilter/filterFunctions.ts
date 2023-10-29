import { FormData } from '../../types/formData';

export const formFilterFunction = (form: FormData, term: string) => {
    const formValues = Object.values({
      ...form.guardianForm,
      ...form.medicalForm,
      ...form.guardianForm.address,
    });
    for (const val of formValues) {
      if (
        typeof val === 'string' &&
        val.toLowerCase().includes(term.toLowerCase())
      ) {
        return true;
      }
    }
    return false;
  };