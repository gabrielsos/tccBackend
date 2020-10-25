import { Request, Response } from 'express';
import db from '../database/connection';

export default class osStateController {
  async index(request: Request, response: Response) {
    const osState = await db('osState').select('*');
    return response.json(osState);
  }

  async delete(request: Request, response: Response) {
    const { osStateId } = request.params;

    try {
      await db('osState').delete('*').where('osStateId', '=', osStateId);

      return response.json({ sucess: 'deleted' }).status(200);
    } catch (err) {
      return response.status(400).json(err);
    }
  }

  async create(request: Request, response: Response) {
    const osStateId = await db('osState').count('osStateId as id').first();
    let osState;

    if (osStateId) {
      osState = Number(osStateId.id) + 1;
    }
    const { osStateName } = request.body;

    try {
      await db('osState').insert({
        osStateId: osState,
        osStateName,
      });

      return response.json({ osStateName });
    } catch (er) {
      return response.json(er);
    }
  }

  async update(request: Request, response: Response) {
    const { osStateName, osStateId } = request.body;

    try {
      await db('osState')
        .update('osStateName', osStateName)
        .where('osStateId', '=', osStateId);

      return response.json({ sucess: 'updated' }).status(200);
    } catch (err) {
      return response.status(400).json(err);
    }
  }
}
