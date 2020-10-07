import { Request, Response } from 'express';
import db from '../database/connection';

export default class StatisticsController {
  async show(request: Request, response: Response) {
    const totalOs = await db('os').count('osId as totalOs').first();

    const totalOpenOs = await db('os')
      .count('osId as totalOpenOs')
      .where('osStateId', '=', 1)
      .first();

    const totalFinishedOs = await db('os')
      .count('osId as totalFinishedOs')
      .where('osStateId', '=', 2)
      .first();

    const totalWaitingOs = await db('os')
      .count('osId as totalWaitingOs')
      .where('osStateId', '=', 3)
      .first();

    return response.json({
      totalOs,
      totalOpenOs,
      totalFinishedOs,
      totalWaitingOs,
    });
  }
}
