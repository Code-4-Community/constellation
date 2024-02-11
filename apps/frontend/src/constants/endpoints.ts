// TODO: For testing locally, replace with aws api gateway url
export const BASE_URL =
  process.env.NX_ENV_NAME === 'prod'
    ? 'https://4ysmqnctv2.execute-api.us-east-1.amazonaws.com/Prod/'
    : 'https://begjn9gcm5.execute-api.us-east-1.amazonaws.com/Prod/';

export const GET_ALL_FORMS_URL = `${BASE_URL}/forms`;

export const GET_FORM_BY_ID_URL = (id: string) => `${BASE_URL}/form/${id}`;

export const POST_FORM_URL = `${BASE_URL}/form`;

export const PATCH_ADMIN_NOTES_URL = (id: string) =>
  `${BASE_URL}/form/${id}/notes`;

export const MARK_FORM_AS_READ_URL = (id: string) =>
  `${BASE_URL}/form/${id}/read`;

export const PUT_MULTIPLE_CSV_FORMS_URL = `${BASE_URL}/temp`