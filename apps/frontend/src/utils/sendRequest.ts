import axios, { AxiosResponse } from 'axios';
import { FormValues } from '../components/form/Form';
import { Auth } from 'aws-amplify';
import {
  GET_ALL_FORMS_URL,
  GET_FORM_BY_ID_URL,
  PATCH_ADMIN_NOTES_URL,
  POST_FORM_URL,
} from '../constants/endpoints';
import { FormData } from '../types/formData';
import { AdminNotes, formSchema } from '../types/formSchema';

const authenticatedAxios = axios.create();
authenticatedAxios.interceptors.request.use(async (config) => {
  try {
    const session = await Auth.currentSession();
    const token = session.getIdToken().getJwtToken();
    config.headers.Authorization = `Bearer ${token}`;
  } catch (error) {
    console.error('Error setting auth header:', error);
  }
  return config;
});

export const submitForm = async (
  body: FormValues,
  callback?: () => void
): Promise<void> => {
  try {
    await axios.post(POST_FORM_URL, formSchema.cast(body));
    alert('Form submitted successfully');
    callback?.();
  } catch (error) {
    console.log('axios error making post request', error);
    alert('Error making request');
  }
};

export const getAllForms = async (): Promise<FormData[]> => {
  try {
    return (await authenticatedAxios.get(GET_ALL_FORMS_URL)).data;
  } catch (error) {
    console.log('axios error making get request', error);
    alert('Error getting data');
    return [];
  }
};

export const getFormById = async (id: string): Promise<AxiosResponse> => {
  return await authenticatedAxios.get(GET_FORM_BY_ID_URL(id));
};

export const patchAdminNotes = async (
  id: string,
  notes: AdminNotes
): Promise<AxiosResponse> => {
  return await authenticatedAxios.patch(PATCH_ADMIN_NOTES_URL(id), notes);
};
