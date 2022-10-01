import { Module } from '@nestjs/common';
import { RoundService } from './round.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoundModel } from './round.model';
import { RoundRepository } from './repositories/round.repository';

@Module({
  exports: [RoundService],
  imports: [SequelizeModule.forFeature([RoundModel])],
  providers: [RoundService, RoundRepository],
})
export class RoundModule {}
