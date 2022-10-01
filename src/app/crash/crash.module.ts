import { Module } from '@nestjs/common';
import { CrashController } from './crash.controller';
import { CrashGateway } from './crash.gateway';
import { CrashService } from './crash.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { GameModel } from '../game/game.model';
import { RoundModule } from '../round/round.module';

@Module({
  imports: [SequelizeModule.forFeature([GameModel]), RoundModule],
  controllers: [CrashController],
  providers: [CrashGateway, CrashService],
})
export class CrashModule {}
