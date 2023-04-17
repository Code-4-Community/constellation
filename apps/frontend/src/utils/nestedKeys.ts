import { FormData, FormDataNestedKeys } from '../types/formData';

export const getValueFromNestedKey = (
  form: FormData,
  nestedKey: FormDataNestedKeys
): FormData[keyof FormData] | undefined => {
  if (nestedKey && nestedKey.length > 0) {
    const keys = nestedKey.split('.');
    const firstKey = keys.shift();
    if (firstKey) {
      let value = form[firstKey as keyof FormData];
      for (const key of keys) {
        value = value[key as keyof typeof value];
      }

      return value;
    }
  }
  return undefined;
};

export const getUniqueValuesFromList = (
  formList: FormData[],
  nestedKey: FormDataNestedKeys
): FormData[keyof FormData][] => {
  const values = new Set<FormData[keyof FormData]>();

  for (const form of formList) {
    const value = getValueFromNestedKey(form, nestedKey);
    if (value) {
      values.add(value);
    }
  }

  return Array.from(values);
};