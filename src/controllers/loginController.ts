import { Request, Response } from 'express';
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
    const { loginName, email, name, userType, password } = request.body;

    await db('users').insert({
      loginName,
      name,
      email,
      password,
      userType,
    });

    return response.json({ loginName, email, name, userType });
  }
}
