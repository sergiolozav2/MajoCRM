interface schemaType {
  body?: any;
  headers?: any;
  params?: any;
  querystring?: any;
  response?: any;
}

export function schema(data: schemaType) {
  return {
    schema: {
      ...data,
    },
  };
}
