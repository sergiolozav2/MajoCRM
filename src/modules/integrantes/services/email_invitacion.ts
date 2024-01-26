import { transporter } from '../../../services/email/email_setup';

export function enviarEmailInvitacion(email: string, enlaceVerificar: string) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        to: email,
        subject: 'Invitación de integración',
        text: `Fuiste invitado para unirte a la organización de 'Pedro CRM', haz click en el enlace para verificar tu cuenta.\nEnlace de verificación: ${enlaceVerificar}`,
      },
      (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      },
    );
  });
}
