import { Request, Response } from 'express';
import db from '../database/connection';

export default class sessionController {
  async create(request: Request, response: Response) {
    const { loginName, password } = request.body;

    const user = await db('users')
      .where('loginName', loginName)
      .where('password', password)
      .select('loginName', 'name', 'email', 'userType', 'passwordExpired')
      .first();

    if (!user) {
      return response
        .status(400)
        .json({ error: 'No logon foud with this ID or password' });
    }
    return response.json(user);
  }
}
