interface schemaType {
  body?: any;
  headers?: any;
  params?: any;
  querystring?: any;
  response?: any;
  tags?: string[];
}

export function schema(data: schemaType) {
  return {
    schema: {
      ...data,
    },
  };
}

export function schemaPartial(data: schemaType) {
  return (data2: schemaType) =>
    schema({
      ...data,
      ...data2,
    });
}
