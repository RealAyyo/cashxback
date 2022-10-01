import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from './user.model';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private userRepository: typeof UserModel,
    private jwtService: JwtService,
    private walletService: WalletService,
  ) {}

  async userCreate(dto) {
    const user = await this.userRepository.create(dto);
    await this.walletService.createWallet(user.id);
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async getUser(request) {
    try {
      const cookie = request.cookies['jwt'];
      const verify = await this.jwtService.verifyAsync(cookie);
      if (!verify) {
        throw new UnauthorizedException({ message: 'Нет доступа' });
      }
      const user = await this.getUserByEmail(verify.email);
      return { id: user.id, email: user.email };
    } catch (e) {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизирован',
      });
    }
  }

  async getUserWallet(id){
    try {
      const currency = await this.walletService.getUserWallet(id)

      const currencyForm = {
        btc: currency.btc,
        eth: currency.eth,
        trx: currency.trx,
        ltc: currency.ltc,
        xmr: currency.xmr,
        dash: currency.dash,
      };

      let data = [];

      for(const key in currencyForm){
        data.push({id: key, value: key, sum: currency[key]})
      }

      return data

    } catch (e){

    }
  }
}
