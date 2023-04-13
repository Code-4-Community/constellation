// TODO: For testing locally, replace with aws api gateway url
export const BASE_URL =
  'https://bk3ffpsl08.execute-api.us-east-1.amazonaws.com/Prod/';

export const GET_ALL_FORMS_URL = `${BASE_URL}/forms`;

export const GET_FORM_BY_ID_URL = (id: string) => `${BASE_URL}/form/${id}`;

export const POST_FORM_URL = `${BASE_URL}/form`;
