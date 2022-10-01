import {
  Column,
  DataType,
  Model,
  Table,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { WalletModel } from '../wallet/wallet.model';
import { BetCasinoModel } from '../bet-casino/bet-casino.model';

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  login: number;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: true, unique: true })
  phone: string;

  @Column({ type: DataType.STRING, allowNull: false })
  birthday: string;

  @Column({ type: DataType.JSONB, allowNull: true })
  settings: string;

  @HasOne(() => WalletModel)
  wallet: WalletModel;

  @HasMany(() => BetCasinoModel)
  betCasino: BetCasinoModel;
}
