import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { UserModel } from '../user/user.model';

@Table({ tableName: 'wallets' })
export class WalletModel extends Model<WalletModel> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.FLOAT, allowNull: false, defaultValue: 0.0 })
  btc: number;

  @Column({ type: DataType.FLOAT, allowNull: false, defaultValue: 0.0 })
  eth: number;

  @Column({ type: DataType.FLOAT, allowNull: false, defaultValue: 0.0 })
  trx: number;

  @Column({ type: DataType.FLOAT, allowNull: true, defaultValue: 0.0 })
  ltc: number;

  @Column({ type: DataType.FLOAT, allowNull: false, defaultValue: 0.0 })
  xmr: number;

  @Column({ type: DataType.FLOAT, allowNull: true, defaultValue: 0.0 })
  dash: number;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => UserModel)
  user: UserModel;
}
