import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { UserModel } from '../user/user.model';
import { GameModel } from '../game/game.model';
import { BetCasinoModel } from '../bet-casino/bet-casino.model';

@Table({ tableName: 'rounds' })
export class RoundModel extends Model<RoundModel> {

  @Column({type: DataType.UUID, defaultValue: DataType.UUIDV4, unique: true, primaryKey: true, allowNull: false})
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  status: string;

  @Column({ type: DataType.FLOAT, allowNull: true })
  coefficient: number;

  @ForeignKey(() => GameModel)
  @Column({ type: DataType.UUID, allowNull: false })
  gameId: string;

  @BelongsTo(() => GameModel)
  games: GameModel;

  @HasMany(() => BetCasinoModel)
  bets: BetCasinoModel[];
}
