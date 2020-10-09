import { Request, Response } from 'express';
import db from '../database/connection';

import randomDigits from '../utils/crypto';

export default class LoginController {
  async index(request: Request, response: Response) {
    const users = await db('users').select('*');

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
    const { loginName, email, name } = request.body;
    const password = randomDigits();

    await db('users').insert({
      loginName,
      name,
      email,
      password,
    });

    return response.json({ loginName, email, name });
  }
}
