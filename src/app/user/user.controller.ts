import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../../guards/jwt.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @UseGuards(JwtGuard)
  @Get('/wallet')
  async getUserWallet(@Req() { user }) {
    //TODO СДЕЛАТЬ СУЩНОСТЬ ВАЛЮТ И ПРОВЕРЯТЬ С АКТИВНЫМИ
    const x =  await this.userService.getUserWallet(user.id);

    console.log(x);
    return x;

  }

  @Get('/test')
  test() {
    console.log('1');
  }

}

