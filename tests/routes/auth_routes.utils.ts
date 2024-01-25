import { faker } from '@faker-js/faker';

export function createRegisterPayload() {
  return {
    usuario: {
      nombre: faker.person.firstName(),
      apellido: faker.person.lastName(),
      segundoApellido: faker.person.lastName(),
      correo: faker.internet.email(),
      telefono: faker.phone.number(),
      password: faker.internet.password(),
    },
    empresa: {
      nombreEmpresa: faker.company.name(),
    },
  };
}
