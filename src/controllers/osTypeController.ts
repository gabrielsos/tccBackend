import { Request, Response } from 'express';
import db from '../database/connection';

export default class osTypeController {
  async index(request: Request, response: Response) {
    const osType = await db('osType').select('*');
    return response.json(osType);
  }

  async delete(request: Request, response: Response) {
    const { osTypeId } = request.params;

    try {
      await db('osType').delete('*').where('osTypeId', '=', osTypeId);

      return response.json({ sucess: 'deleted' }).status(200);
    } catch (err) {
      return response.status(400).json(err);
    }
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

  async update(request: Request, response: Response) {
    const { typeName, osTypeId } = request.body;

    try {
      await db('osType')
        .update('typeName', typeName)
        .where('osTypeId', '=', osTypeId);

      return response.json({ sucess: 'updated' }).status(200);
    } catch (err) {
      return response.status(400).json(err);
    }
  }
}
