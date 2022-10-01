import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../app/user/user.service';
import { CreateUserDto } from '../app/user/dto/create.user.dto';
import * as bcrypt from 'bcryptjs';
import { UserModel } from '../app/user/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(userDto: CreateUserDto, response) {
    const userInfo = await this.userService.getUserByEmail(userDto.email);
    if (userInfo) {
      const user = await this.userValidate(userDto);
      const token = await this.tokenGenerate(user);
      response.cookie('jwt', token, {
        httpOnly: true,
      });

      return 'Вы успешно вошли';
    }
    throw new UnauthorizedException({ message: 'Пользователь не найден' });
  }

  async signUp(userDto) {
    const userCheck = await this.userService.getUserByEmail(userDto.email);
    if (userCheck) {
      throw new HttpException(
        'Пользователь уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    userDto.birthday = Date.now()
    const cryptoPass = await bcrypt.hash(userDto.password, 10);
    const user = await this.userService.userCreate({
      ...userDto,
      password: cryptoPass,
    });
    return this.tokenGenerate(user);
  }

  async logout(response) {
    response.cookie('jwt', 'none', { httpOnly: true });
  }

  async tokenGenerate(user: UserModel) {
    const info = { email: user.email, id: user.id };
    return this.jwtService.signAsync(info);
  }

  private async userValidate(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const checkPass = await bcrypt.compare(userDto.password, user.password);
    if (user && checkPass) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Неверный пароль' });
  }
}
