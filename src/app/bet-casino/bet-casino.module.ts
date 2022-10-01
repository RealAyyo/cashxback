import { Module } from '@nestjs/common';
import { BetCasinoService } from './bet-casino.service';

@Module({
  providers: [BetCasinoService],
})
export class BetCasinoModule {}
