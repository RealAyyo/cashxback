import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post(`/bot`)
  getHello(@Body() body): any {
    console.log(body);
  }
  @Get()
  async getHellao(): Promise<any> {
    return 'hi';
  }
}
