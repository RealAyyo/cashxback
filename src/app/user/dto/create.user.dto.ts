import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString, Length } from 'class-validator';

export class CreateUserDto {
  readonly id: number;

  @Length(6, 32, { message: 'Пароль должен содержать от 6 до 32 символов' })
  @IsString({ message: 'Только строковые значения' })
  readonly login: string;

  @Length(6, 32, { message: 'Пароль должен содержать от 6 до 32 символов' })
  @IsString({ message: 'Только строковые значения' })
  readonly password: string;

  @IsString({ message: 'Только строковые значения' })
  @IsEmail({}, { message: 'Неккоректный E-mail' })
  readonly email: string;

  @Length(11, 14, { message: 'Введите действительный номер телефона' })
  @IsString({ message: 'Только строковые значения' })
  readonly phone: string;

  @Length(6, 8, { message: 'Введите действительную дату рождения' })
  readonly birthday: string;

  readonly settings: string;
}
