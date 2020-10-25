import { Request, Response } from 'express';
import mailer from 'nodemailer';
import randomDigits from '../utils/crypto';
import db from '../database/connection';

export default class LoginController {
  async indexAdmin(request: Request, response: Response) {
    const users = await db('users')
      .select('loginName', 'name', 'email', 'userType')
      .where('userType', '=', '0');

    return response.json(users);
  }

  async delete(request: Request, response: Response) {
    const { loginName } = request.params;

    try {
      await db('users').delete('*').where('loginName', '=', loginName);

      return response.json({ sucess: 'deleted' }).status(200);
    } catch (err) {
      return response.status(400).json(err);
    }
  }

  async indexUsers(request: Request, response: Response) {
    const users = await db('users')
      .select('loginName', 'name', 'email', 'userType')
      .where('userType', '<>', '0');

    return response.json(users);
  }

  async newPassword(request: Request, response: Response): Promise<void> {
    const { loginName, password } = request.body;

    await db('users')
      .update('password', password)
      .where('loginName', loginName);

    await db('users')
      .update('passwordExpired', 0)
      .where('loginName', loginName);
  }

  async create(request: Request, response: Response) {
    const { loginName, email, name, userType } = request.body;

    const password = randomDigits();

    try {
      await db('users').insert({
        loginName,
        name,
        email,
        password,
        userType,
        passwordExpired: 1,
      });

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
        subject: 'Criação de conta',
        text: `Olá ${name}.
Sua conta foi criada no sistema de ordem de serviço de nossa empresa!

Para acessar o sistema use suas credenciais:

Usuário: ${loginName}
Senha: ${password}`,
      };

      transporter.sendMail(message, (error, info) => {
        if (error) {
          console.log('erro ao enviar email');
        }
      });

      return response.status(201).json({ loginName, email, name, userType });
    } catch (err) {
      return response.status(404).json(err);
    }
  }

  async update(request: Request, response: Response) {
    const { loginName, email, name, userType, password } = request.body;

    try {
      await db('users')
        .update('email', email)
        .update('name', name)
        .update('userType', userType)
        .where('loginName', '=', loginName);

      return response.json({ sucess: 'updated' }).status(200);
    } catch (err) {
      return response.status(400).json(err);
    }
  }
}
