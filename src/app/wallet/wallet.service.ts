import { Injectable } from '@nestjs/common';
import { WalletModel } from './wallet.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(WalletModel) private walletRepository: typeof WalletModel,
  ) {}

  async createWallet(userId) {
    await this.walletRepository.create({ userId });
  }

  async getUserWallet(id: number){
    return await this.walletRepository.findOne({where: { id }})
  }
}
