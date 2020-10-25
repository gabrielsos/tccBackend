import { Request, Response } from 'express';
import db from '../database/connection';

export default class equipmentController {
  async index(request: Request, response: Response) {
    const equipment = await db('equipment')
      .select('*')
      .join('local', 'equipment.localId', '=', 'local.localId');

    return response.json(equipment);
  }

  async delete(request: Request, response: Response) {
    const { equipmentSerialNumber } = request.params;

    try {
      await db('equipment')
        .delete('*')
        .where('equipmentSerialNumber', '=', equipmentSerialNumber);

      return response.json({ sucess: 'deleted' }).status(200);
    } catch (err) {
      return response.status(400).json(err);
    }
  }

  async indexId(request: Request, response: Response) {
    const localId = request.headers.localid;

    const equipment = await db('equipment')
      .select('equipmentName', 'equipmentSerialNumber', 'localId')
      .where('localId', localId);

    return response.json(equipment);
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
