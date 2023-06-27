import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { Title } from '../../common/title/title.model';
import { Description } from '../../common/descriptions/description.model';
import { ShortDescription } from '../../common/short-descriptions/short-description.model';
import { SStatus } from '../../common/statuses/s-status.model';
import { Program } from '../programs/program.model';
import { ProgramTypeProgram } from '../programs/program-type-program.model';

@Table({ tableName: 'programs_types' })
export class ProgramType extends Model<ProgramType> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  alias: string;

  @ForeignKey(() => Title)
  @Column({ type: DataType.INTEGER })
  titleId: number;

  @BelongsTo(() => Title)
  title: Title;

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

  @BelongsToMany(() => Program, () => ProgramTypeProgram)
  programs: Program[];
}
