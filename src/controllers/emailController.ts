import mailer from 'nodemailer';
import { Request, Response } from 'express';
import db from '../database/connection';
import generatePassword from '../utils/crypto';

export default class EmailController {
  async forgotPassword(request: Request, response: Response) {
    const { email } = request.body;

    const name = await db('users')
      .select(db.raw('name as name'))
      .where('email', email)
      .first();

    if (name !== undefined) {
      const password = generatePassword();

      await db('users').update('password', password).where('email', email);
      await db('users').update('passwordExpired', 1).where('email', email);

      const config = {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'projetorose2019@gmail.com',
          pass: 'projrose2019',
        },
      };
      const transporter = mailer.createTransport(config);
      const message = {
        from: 'projetorose2019@gmail.com',
        to: email,
        subject: 'Mudança de senha',
        text: `Olá ${name.name}.
Sua nova senha é: ${password}`,
      };
      transporter.sendMail(message, (error, info) => {
        if (error) {
          return response.status(500).send('falhou');
        }
        return response.status(200).send('enviou');
      });
      return response.json({ return: true });
    }
    return response.json({ return: false });
  }
}
