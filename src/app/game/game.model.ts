import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { RoundModel } from '../round/round.model';

@Table({ tableName: 'games' })
export class GameModel extends Model<GameModel> {

  @Column({type: DataType.UUID, defaultValue: DataType.UUIDV4, unique: true, primaryKey: true, allowNull: false})
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  active: string;

  @Column({ type: DataType.STRING, allowNull: false })
  type: string;

  @Column({ type: DataType.STRING, allowNull: false })
  link: string;

  @HasMany(() => RoundModel)
  round: RoundModel[];
}
