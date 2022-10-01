import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';

@Table({ tableName: 'tv' })
export class TvModel extends Model<TvModel> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING(9000) })
  link: string;

  @Column({ type: DataType.STRING(9000) })
  kinopoisk_id: string;

  @Column({ type: DataType.STRING(9000) })
  serial: string;

  @Column({ type: DataType.STRING(9000) })
  camrip: string;

  @Column({ type: DataType.STRING(9000) })
  rus: string;

  @Column({ type: DataType.STRING(9000) })
  orig: string;

  @Column({ type: DataType.INTEGER })
  year: number;

  @Column({ type: DataType.STRING(9000) })
  country: string;

  @Column({ type: DataType.STRING(9000) })
  director: string;

  @Column({ type: DataType.STRING(9000) })
  genre: string;

  @Column({ type: DataType.STRING(9000) })
  actors: string;

  @Column({ type: DataType.STRING(9000) })
  description: string;

  @Column({ type: DataType.STRING(9000) })
  slogan: string;

  @Column({ type: DataType.STRING(9000) })
  premiere: string;

  @Column({ type: DataType.STRING(9000) })
  time: string;

  @Column({ type: DataType.STRING(9000) })
  poster: string;

  @Column({ type: DataType.STRING(9000) })
  screenshot: string;

  @Column({ type: DataType.FLOAT })
  rating_kp: number;

  @Column({ type: DataType.FLOAT })
  rating_imdb: number;
}
