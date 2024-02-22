export const swaggerOptions = {
  swagger: {
    info: {
      title: 'MajoCRM',
      version: '0.0.1',
    },
    basePath: '/api',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform({ schema, url }: any) {
    console.log(schema, url);
    const segments = url.split('/');
    const module = segments[2];
    schema.tags = [module];
    return { schema: schema, url: url };
  },
};

export const swaggerUiOptions = {
  routePrefix: '/docs',
};
