import request from 'supertest';
import { app } from '../../src/app';
import { createRegisterPayload } from './auth_routes.utils';

const loginRoute = '/api/auth/login';
const registerRoute = '/api/auth/register';
const refreshTokenRoute = '/api/auth/refreshToken';

describe('POST /register', () => {
  beforeAll(async () => {
    await app.ready();
  });
  it('crea usuario y empresa correctamente', async () => {
    const payload = createRegisterPayload();
    const response = await request(app.server)
      .post(registerRoute)
      .send(payload);
    expect(response.body).toMatchObject({
      nombre: payload.usuario.nombre,
      apellido: payload.usuario.apellido,
      correo: payload.usuario.correo,
      telefono: payload.usuario.telefono,
      tipo: 'EMPRESARIO',
      licencia: null,
      rol: null,
      empresa: {
        nombreEmpresa: payload.empresa.nombreEmpresa,
      },
    });
  });

  it('debe fallar falta usuario', async () => {
    const payload = {
      empresa: {
        nombreEmpresa: 'holacorp',
      },
    };
    const response = await request(app.server)
      .post(registerRoute)
      .send(payload);
    expect(response.statusCode).toBe(400);
  });

  it('debe fallar falta empresa', async () => {
    const payload = {
      usuario: {
        nombre: 'pedro',
        apellido: 'juan',
        segundoApellido: 'lopez',
        correo: 'lopez@example.com',
        telefono: '1234234',
        password: 'password',
      },
    };
    const response = await request(app.server)
      .post(registerRoute)
      .send(payload);
    expect(response.statusCode).toBe(400);
  });
});

describe('POST /login', () => {
  const userPayload = createRegisterPayload();
  beforeAll(async () => {
    await app.ready();
    // Registrar usuario primero
    await request(app.server).post(registerRoute).send(userPayload);
  });

  it('inicia sesión correctamente', async () => {
    const payload = {
      email: userPayload.usuario.correo,
      password: userPayload.usuario.password,
    };
    const response = await request(app.server).post(loginRoute).send(payload);
    expect(response.statusCode).toBe(200);
  });

  it('retorna token y refresh token', async () => {
    const payload = {
      email: userPayload.usuario.correo,
      password: userPayload.usuario.password,
    };
    const response = await request(app.server).post(loginRoute).send(payload);

    expect(response.body).toMatchObject({
      token: expect.any(String),
      refreshToken: expect.any(String),
    });
  });

  it('debe fallar email no existe', async () => {
    const payload = {
      email: 'correofalso12342@email.com',
      password: 'password',
    };
    const response = await request(app.server).post(loginRoute).send(payload);
    expect(response.statusCode).toBe(401);
  });

  it('debe fallar contraseña incorrecta', async () => {
    const payload = {
      email: userPayload.usuario.correo,
      password: 'password1234',
    };
    const response = await request(app.server).post(loginRoute).send(payload);
    expect(response.statusCode).toBe(401);
  });
});

describe('POST /refreshToken', () => {
  const userPayload = createRegisterPayload();
  let token = '';
  let refreshToken = '';
  beforeAll(async () => {
    await app.ready();
    await request(app.server).post(registerRoute).send(userPayload);

    const response = await request(app.server).post(loginRoute).send({
      email: userPayload.usuario.correo,
      password: userPayload.usuario.password,
    });
    token = response.body.token;
    refreshToken = response.body.refreshToken;
  });

  it('genera token correctamente', async () => {
    const header = {
      authorization: refreshToken,
    };
    const response = await request(app.server)
      .post(refreshTokenRoute)
      .set(header);
    expect(response.statusCode).toBe(200);
  });
  it('debe rechazar token jwt normal', async () => {
    const header = {
      authorization: token,
    };
    const response = await request(app.server)
      .post(refreshTokenRoute)
      .set(header);
    expect(response.statusCode).toBe(403);
  });
});
