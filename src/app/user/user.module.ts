import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { AuthModule } from '../../auth/auth.module';
import { WalletModule } from '../wallet/wallet.module';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    SequelizeModule.forFeature([UserModel]),
    forwardRef(() => AuthModule),
    WalletModule,
  ],
  exports: [UserService],
})
export class UserModule {}
