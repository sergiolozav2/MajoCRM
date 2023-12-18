import request from 'supertest';
import { app } from '../../src/app';
import { validUserRegisterPayload } from './auth_routes.data';
import { prisma } from '../../src/prisma';

describe('POST /register', () => {
  const route = '/api/register';

  beforeAll(async () => {
    await app.ready();
  });
  it('crea usuario y empresa correctamente', async () => {
    const payload = validUserRegisterPayload;
    const response = await request(app.server).post(route).send(payload);
    expect(response.body).toMatchObject({
      nombre: 'pedro',
      apellido: 'juan',
      correo: 'lopez@example.com',
      telefono: '1234234',
      tipo: 'EMPRESARIO',
      licencia: null,
      rol: null,
      empresaCreada: {
        nombreEmpresa: 'empresacorp',
      },
    });
    await prisma.empresa.delete({
      where: {
        creadorID: response.body.usuarioID,
      },
    });
    await prisma.usuario.delete({
      where: {
        usuarioID: response.body.usuarioID,
      },
    });
  });

  it('debe fallar falta usuario', async () => {
    const payload = {
      empresa: {
        nombreEmpresa: 'holacorp',
      },
    };
    const response = await request(app.server).post(route).send(payload);
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
    const response = await request(app.server).post(route).send(payload);
    expect(response.statusCode).toBe(400);
  });
});

describe('POST /login', () => {
  const route = '/api/login';

  const userPayload = validUserRegisterPayload;
  beforeAll(async () => {
    await app.ready();
    // Registrar usuario primero
    await request(app.server).post('/api/register').send(userPayload);
  });

  it('inicia sesión correctamente', async () => {
    const payload = {
      email: userPayload.usuario.correo,
      password: userPayload.usuario.password,
    };
    const response = await request(app.server).post(route).send(payload);
    expect(response.statusCode).toBe(200);
  });

  it('debe fallar email no existe', async () => {
    const payload = {
      email: 'correofalso12342@email.com',
      password: 'password',
    };
    const response = await request(app.server).post(route).send(payload);
    expect(response.statusCode).toBe(401);
  });

  it('debe fallar contraseña incorrecta', async () => {
    const payload = {
      email: userPayload.usuario.correo,
      password: 'password1234',
    };
    const response = await request(app.server).post(route).send(payload);
    expect(response.statusCode).toBe(401);
  });
});
