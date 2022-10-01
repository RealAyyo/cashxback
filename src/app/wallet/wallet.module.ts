import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { WalletModel } from './wallet.model';
@Module({
  imports: [SequelizeModule.forFeature([WalletModel])],
  exports: [WalletService],
  providers: [WalletService],
})
export class WalletModule {}
