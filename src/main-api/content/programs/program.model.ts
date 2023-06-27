import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { Image } from '../../common/image/image.model';
import { Title } from '../../common/title/title.model';
import { SStatus } from '../../common/statuses/s-status.model';
import { ShortDescription } from '../../common/short-descriptions/short-description.model';
import { Description } from '../../common/descriptions/description.model';
import { ProgramType } from '../programs-types/program-type.model';
import { ProgramTypeProgram } from './program-type-program.model';

@Table({ tableName: 'programs' })
export class Program extends Model<Program> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  alias: string;

  @Column({ type: DataType.INTEGER })
  time: number;

  @Column({ type: DataType.INTEGER })
  price: number;

  @ForeignKey(() => Image)
  @Column({ type: DataType.INTEGER })
  imageId: number;

  @BelongsTo(() => Image)
  image: Image;

  @ForeignKey(() => Title)
  @Column({ type: DataType.INTEGER })
  titleId: number;

  @BelongsTo(() => Title)
  title: Title;

  @ForeignKey(() => SStatus)
  @Column({ type: DataType.INTEGER, allowNull: false })
  statusId: number;

  @BelongsTo(() => SStatus)
  status: SStatus;

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

  @BelongsToMany(() => ProgramType, () => ProgramTypeProgram)
  programsTypes: ProgramType[];
}
