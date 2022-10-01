import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { SequelizeModule } from '@nestjs/sequelize';
import { TvModel } from './app/tv/tv.model';
import { TvService } from './app/tv/tv.service';
import { TvController } from './app/tv/tv.controller';
import { CrashModule } from './app/crash/crash.module';
import { BetCasinoModule } from './app/bet-casino/bet-casino.module';
import { GameModule } from './app/game/game.module';
import { DepositModule } from './app/deposit/deposit.module';
import { WithdrawModule } from './app/withdraw/withdraw.module';
import { RoundModule } from './app/round/round.module';
import { BetCasinoModel } from './app/bet-casino/bet-casino.model';
import { UserModel } from './app/user/user.model';
import { RoundModel } from './app/round/round.model';
import { GameModel } from './app/game/game.model';
import { WalletModel } from './app/wallet/wallet.model';
import { AuthModule } from './auth/auth.module';
import { MinesModule } from './app/mines/mines.module';
import { CurrencyModule } from './app/currency/currency.module';
import { UserModule } from './app/user/user.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 10,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '159753',
      database: 'cashx',
      models: [
        TvModel,
        BetCasinoModel,
        UserModel,
        RoundModel,
        GameModel,
        WalletModel,
      ],
      autoLoadModels: true,
    }),
    CrashModule,
    BetCasinoModule,
    GameModule,
    DepositModule,
    WithdrawModule,
    RoundModule,
    AuthModule,
    MinesModule,
    CurrencyModule,
  ],
  controllers: [AppController, TvController],
  providers: [AppService, TvService],
})
export class AppModule {}
