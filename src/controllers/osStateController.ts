import { Request, Response } from 'express';
import db from '../database/connection';

export default class osStateController {
  async index(request: Request, response: Response) {
    const osState = await db('osState').select('*');
    return response.json(osState);
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
}
