import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Title } from '../../common/title/title.model';
import { ShortDescription } from '../../common/short-descriptions/short-description.model';
import { Description } from '../../common/descriptions/description.model';
import { SStatus } from '../../common/statuses/s-status.model';
import { Image } from '../../common/image/image.model';

@Table({ tableName: 'vacancy' })
export class Vacancy extends Model<Vacancy> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  alias: string;

  @ForeignKey(() => Title)
  @Column({ type: DataType.INTEGER })
  titleId: number;

  @BelongsTo(() => Title)
  title: Title;

  @ForeignKey(() => Image)
  @Column({ type: DataType.INTEGER })
  imageId: number;

  @BelongsTo(() => Image)
  image: Image;

  @ForeignKey(() => ShortDescription)
  @Column({ type: DataType.INTEGER })
  shortDescriptionId: number;

  @BelongsTo(() => ShortDescription)
  shortDescription: ShortDescription;

  @ForeignKey(() => Description)
  @Column({ type: DataType.INTEGER })
  descriptionId: number;

  @BelongsTo(() => Description)
  description: Description;

  @ForeignKey(() => SStatus)
  @Column({ type: DataType.INTEGER })
  statusId: number;

  @BelongsTo(() => SStatus)
  status: SStatus;
}
