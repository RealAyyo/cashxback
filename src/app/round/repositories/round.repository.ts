import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoundModel } from '../round.model';
import { v4 as uuidv4 } from 'uuid';
import { RoundStatus } from '../interfaces/round.interface';


@Injectable()
export class RoundRepository {
  constructor(
    @InjectModel(RoundModel)
    private roundModel: typeof RoundModel,
  ) {
  }

  async createRound(roundId: string, gameId: string, status: string) {
    await this.roundModel.create({ id: roundId, gameId, status });
  }

  async getByRoundId(roundId: string) {
    return await this.roundModel.findOne({where: { id: roundId }})
  }

  async createMinesRound(userid: string) {
    const id = uuidv4();
    return await this.roundModel.create({id, status: RoundStatus.active});
  }
}
