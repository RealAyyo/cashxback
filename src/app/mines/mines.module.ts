import { Module } from '@nestjs/common';
import { MinesService } from './mines.service';
import { MinesController } from './mines.controller';


@Module({
  imports: [],
  controllers: [MinesController],
  providers: [MinesService]
})
export class MinesModule {}