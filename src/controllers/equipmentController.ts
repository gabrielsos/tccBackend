import { Request, Response } from 'express';
import db from '../database/connection';

export default class equipmentController {
  async index(request: Request, response: Response) {
    const equipment = await db('equipment').select('*');

    return response.json(equipment);
  }

  async indexId(request: Request, response: Response) {
    const localId = request.headers.localid;

    const equipment = await db('equipment')
      .select('equipmentName', 'equipmentSerialNumber', 'localId')
      .where('localId', localId);

    return response.json(equipment[0]);
  }

  async create(request: Request, response: Response) {
    const { equipmentSerialNumber, equipmentName, localId } = request.body;

    await db('equipment').insert({
      equipmentSerialNumber,
      equipmentName,
      localId,
    });

    return response.json({ equipmentSerialNumber, equipmentName, localId });
  }
}
