import axios, { AxiosResponse } from 'axios';
import { FormValues } from '../components/form/Form';
import {
  GET_ALL_FORMS_URL,
  GET_FORM_BY_ID_URL,
  POST_FORM_URL,
} from '../constants/endpoints';
import { formSchema } from '../types/formSchema';
import { FormData } from '../types/formData';

export const submitForm = async (body: FormValues): Promise<void> => {
  try {
    await axios.post(POST_FORM_URL, formSchema.cast(body));
    alert('Form submitted successfully');
  } catch (error) {
    console.log('axios error making post request', error);
    alert('Error making request');
  }
};

export const getAllForms = async (): Promise<FormData[]> => {
  try {
    return (await axios.get(GET_ALL_FORMS_URL)).data;
  } catch (error) {
    console.log('axios error making get request', error);
    alert('Error getting data');
    return [];
  }
};

export const getFormById = async (id: string): Promise<AxiosResponse> => {
  return await axios.get(GET_FORM_BY_ID_URL(id));
};
