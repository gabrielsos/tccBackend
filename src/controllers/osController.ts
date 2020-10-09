import { Request, Response } from 'express';
import db from '../database/connection';

import currentDate from '../utils/currentDate';

export default class OsController {
  async index(request: Request, response: Response) {
    const os = await db('os')
      .join('osType', 'os.osTypeId', '=', 'osType.osTypeId')
      .join('osState', 'os.osStateId', '=', 'osState.osStateId')
      .join('equipmentOs', function () {
        this.on('os.osId', '=', 'equipmentOs.osId').andOn(
          'os.osDateInit',
          '=',
          'equipmentOs.osDateInit',
        );
      })
      .join(
        'equipment',
        'equipmentOs.equipmentSerialNumber',
        '=',
        'equipment.equipmentSerialNumber',
      )
      .join('local', 'equipment.localId', '=', 'local.localId')
      .select(
        db.raw(`date_format(os.osDateInit, '%d/%m/%Y %T') as rightInitDate`),
        'os.osDescription',
        db.raw(`date_format(os.osDateFinal, '%d/%m/%Y %T') as rightFinalDate`),
        'osType.typeName',
        'osState.osStateName',
        'local.localName',
        db.raw(`GROUP_CONCAT(??.?? separator ', ') as equip`, [
          'equipment',
          'equipmentName',
        ]),
      )
      .groupBy('os.osId', 'os.osDateInit')
      .orderBy('osStateName');

    return response.json(os);
  }

  async indexId(request: Request, response: Response) {
    const loginName = request.headers.authorization;

    const profile = await db('os')
      .join('osType', 'os.osTypeId', '=', 'osType.osTypeId')
      .join('osState', 'os.osStateId', '=', 'osState.osStateId')
      .join('equipmentOs', function () {
        this.on('os.osId', '=', 'equipmentOs.osId').andOn(
          'os.osDateInit',
          '=',
          'equipmentOs.osDateInit',
        );
      })
      .join(
        'equipment',
        'equipmentOs.equipmentSerialNumber',
        '=',
        'equipment.equipmentSerialNumber',
      )
      .join('local', 'equipment.localId', '=', 'local.localId')
      .select(
        'os.osId',
        db.raw(`date_format(os.osDateInit, '%d/%m/%Y %T') as rightInitDate`),
        'os.osDescription',
        db.raw(`date_format(os.osDateFinal, '%d/%m/%Y %T') as rightFinalDate`),
        'osType.typeName',
        'osState.osStateName',
        'local.localName',
        db.raw(`GROUP_CONCAT(??.?? separator ', ') as equip`, [
          'equipment',
          'equipmentName',
        ]),
      )
      .where('loginName', loginName)
      .groupBy('os.osId', 'os.osDateInit')
      .orderBy('osStateName');
    return response.json(profile);
  }

  async registersId(request: Request, response: Response) {
    const osId = request.headers.osregister;

    const osRegisters = await db('osRegisters')
      .join('users', 'osRegisters.loginName', '=', 'users.loginName')
      .select(
        db.raw(
          `date_format(osRegisters.osRegisterDate, '%d/%m/%Y %T') as rightDate`,
        ),
        'users.name as name',
        'osRegisters.osRegisterDescription',
      )
      .where('osId', osId)
      .orderBy('osRegisterDate', 'desc');
    return response.json(osRegisters);
  }

  async newRegister(request: Request, response: Response) {
    const osRegisterDate = currentDate();
    const { osRegisterDescription, loginName, osId, osDateInit } = request.body;

    await db('osRegisters').insert({
      osId,
      osDateInit,
      osRegisterDate,
      loginName,
      osRegisterDescription,
    });

    return response.json({
      osDateInit,
      osId,
      loginName,
      osRegisterDescription,
      osRegisterDate,
    });
  }

  async create(request: Request, response: Response) {
    const osDateInit = currentDate();

    const { osDescription, osTypeId, equipmentSerialNumber } = request.body;

    const loginName = request.headers.authorization;

    const osId = await db('os').count('osId as id').first();
    let newOsId;

    if (osId) {
      newOsId = Number(osId.id) + 1;
    }

    await db('os').insert({
      osId: newOsId,
      osDateInit,
      osDescription,
      osTypeId,
      osStateId: 1,
      loginName,
    });

    for (let i = 0; equipmentSerialNumber.length > i; i++) {
      await db('equipmentOs').insert({
        equipmentSerialNumber: equipmentSerialNumber[i],
        osId: newOsId,
        osDateInit,
      });
    }

    return response.json({
      osDateInit,
      osId,
      osDescription,
      loginName,
      equipmentSerialNumber,
    });
  }
}
