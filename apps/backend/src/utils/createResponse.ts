export type HTTPResponse = {
  statusCode: number;
  headers: {
    'Access-Control-Allow-Headers': string;
    'Access-Control-Allow-Origin': string;
    'Access-Control-Allow-Methods': string;
  };
  body?: string;
};

/** Takes in a status code and optional body, and returns an http response with headers */
export const createResponse = (statusCode: number, body?: string) => {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Headers':
        'Content-Type, Access-Control-Allow-Origin',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
    },
    body,
  };
};
