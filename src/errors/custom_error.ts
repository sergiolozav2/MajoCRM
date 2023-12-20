export class CustomError extends Error {
  constructor(
    public statusCode: number = 500,
    public message: string = 'Error desconocido',
    public code: string = 'ERROR INTERNO',
  ) {
    super(message);
  }
}

export class ErrorTokenInvalido extends CustomError {
  constructor(statusCode = 403, message = 'Token de autorización inválido') {
    super(statusCode, 'TOKEN_INVALIDO');
  }
}

export class ErrorPermisoInsuficiente extends CustomError {
  constructor(statusCode = 403, message = 'Permiso de usuario insuficiente') {
    super(statusCode, message, 'PERMISO_INSUFICIENTE');
  }
}

export class ErrorLoginInvalido extends CustomError {
  constructor(statusCode = 401, message = 'Credenciales incorrectas') {
    super(statusCode, message, 'INICIO_SESION_FALLADO');
  }
}
