import assert from 'assert';
import nodemailer from 'nodemailer';

const service = process.env.EMAIL_SERVICE;
const host = process.env.EMAIL_HOST;
const port = Number.parseInt(process.env.EMAIL_PORT ?? '');
const user = process.env.EMAIL_AUTH_USER;
const password = process.env.EMAIL_AUTH_PASSWORD;

assert(service, "Falta .env variable: 'service'");
assert(host, "Falta .env variable: 'host'");
assert(port, "Falta .env variable: 'port'");
assert(user, "Falta .env variable: 'user'");
assert(password, "Falta .env variable: 'password'");

export const transporter = nodemailer.createTransport({
  service: service,
  host: host,
  port: port,
  secure: true,
  auth: {
    user: user,
    pass: password,
  },
});
