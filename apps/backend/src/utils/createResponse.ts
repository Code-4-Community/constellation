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
