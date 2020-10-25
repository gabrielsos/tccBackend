import { Request, Response } from 'express';
import db from '../database/connection';

export default class LocalController {
  async index(request: Request, response: Response) {
    const local = await db('local').select('*');

    return response.json(local);
  }

  async delete(request: Request, response: Response) {
    const { localId } = request.params;

    try {
      await db('local').delete('*').where('localId', '=', localId);

      return response.json({ sucess: 'deleted' }).status(200);
    } catch (err) {
      return response.status(400).json(err);
    }
  }

  async update(request: Request, response: Response) {
    const { localId, localName } = request.body;

    try {
      await db('local')
        .update('localName', localName)
        .where('localId', '=', localId);

      return response.json({ sucess: 'updated' }).status(200);
    } catch (err) {
      return response.status(400).json(err);
    }
  }

  async create(request: Request, response: Response) {
    const localId = await db('local').count('localId as id').first();
    const { localName } = request.body;
    let newLocalId;

    if (localId) {
      newLocalId = Number(localId.id) + 1;
    }

    try {
      await db('local').insert({
        localId: newLocalId,
        localName,
      });

      return response.json({ success: 'created' });
    } catch (er) {
      return response.json(er);
    }
  }
}
