import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

export const swaggerOptions = {
  swagger: {
    info: {
      title: "Blabla API",
      description: "Blabla API endpoints",
      version: "0.0.1",
    },
    host: "127.0.0.1:5000",
    basePath: "/api",
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
};

export const swaggerUiOptions = {
  routePrefix: "/docs",
};
