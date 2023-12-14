import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { CustomError } from "../errors/custom_error";
import { STATUS_CODES } from "http";

export function errorHandlerPlugin(server: FastifyInstance, options: FastifyPluginOptions, done: () => void) {
  server.setErrorHandler((error, request, reply) => {
    console.error(error);
    const errorSeguroParaCliente = error instanceof CustomError;

    if (errorSeguroParaCliente) {
      reply.status(error.statusCode || 500).send({
        error: STATUS_CODES[error.statusCode || 500],
        message: error.message,
        name: error.name,
        code: error.code,
      });
      return;
    }
    reply.send(error);
  });
  done();
}
