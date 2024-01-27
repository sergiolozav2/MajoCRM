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
};

export const swaggerUiOptions = {
  routePrefix: '/docs',
};
