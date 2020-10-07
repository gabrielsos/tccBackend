import { Request, Response } from 'express';
import db from '../database/connection';

export default class osTypeController {
  async index(request: Request, response: Response) {
    const osType = await db('osType').select('*');
    return response.json(osType);
  }

  async create(request: Request, response: Response) {
    const osTypeId = await db('osType').count('osTypeId as id').first();
    let osType;

    if (osTypeId) {
      osType = Number(osTypeId.id) + 1;
    }

    const { typeName } = request.body;
    try {
      await db('osType').insert({
        osTypeId: osType,
        typeName,
      });
      return response.json({ typeName });
    } catch (er) {
      return response.json(er);
    }
  }
}
