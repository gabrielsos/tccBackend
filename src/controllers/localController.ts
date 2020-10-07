import { Request, Response } from 'express';
import db from '../database/connection';

interface ILocal {
  localId: number;
  localName: string;
}

export default class LocalController {
  async index(request: Request, response: Response): Promise<ILocal[]> {
    const local = await db('local').select('*');

    return local;
  }

  async create(request: Request, response: Response) {
    const localId = await db('local').count('localId as id').first();
    let newLocalId;

    if (localId) {
      newLocalId = Number(localId.id) + 1;
    }

    const { localName } = request.body;

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