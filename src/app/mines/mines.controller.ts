import { Controller, Get } from '@nestjs/common';
import { MinesService } from './mines.service';

@Controller('mines')
export class MinesController {
  constructor(private readonly minesService: MinesService) {
  }

  @Get('/test')
  test() {
    return this.minesService.gameStart();
  }

}