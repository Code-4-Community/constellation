import { FormData } from '../types/formData';

export const nameCompareFunction = (a: FormData, b: FormData) =>
  a.guardianForm.childsName.localeCompare(b.guardianForm.childsName);

export const lastUpdatedCompareFunction = (a: FormData, b: FormData) =>
  (b.adminNotes.length > 0
    ? new Date(b.adminNotes[0].updatedAt).getTime()
    : new Date(b.guardianForm.date).getTime()) -
  (a.adminNotes.length > 0
    ? new Date(a.adminNotes[0].updatedAt).getTime()
    : new Date(a.guardianForm.date).getTime());
