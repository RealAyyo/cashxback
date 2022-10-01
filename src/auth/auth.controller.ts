import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/app/user/dto/create.user.dto';
import { AuthService } from './auth.service';
import {Response} from 'express'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  signIn(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.signIn(userDto, response);
  }

  @Post('/signup')
  signUp(@Body() userDto) {
    return this.authService.signUp(userDto);
  }

  @Get('/logout')
  logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }
}
