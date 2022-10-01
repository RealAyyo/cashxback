import { Injectable } from '@nestjs/common';
import { RoundRepository } from './repositories/round.repository';

@Injectable()
export class RoundService {

  constructor(private readonly roundRepository: RoundRepository) {
  }

  async startRound(roundId: string, gameId: string) {
    try {
      return await this.roundRepository.createRound(roundId, gameId, 'active');
    } catch (e) {
      console.log(e);
    }

  }

  async endRound(roundId: string, coefficient: number) {
    try {
      const round = await this.roundRepository.getByRoundId(roundId);
      round.status = 'finish';
      round.coefficient = coefficient;
      await round.save();
    } catch (e) {
      console.log(e);
    }
  }
}
