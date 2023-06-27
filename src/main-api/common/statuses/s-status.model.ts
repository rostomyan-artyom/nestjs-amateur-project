import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { ProgramType } from '../../content/programs-types/program-type.model';
import { Wizard } from '../../content/wizards/wizard.model';
import { Program } from '../../content/programs/program.model';
import { Vacancy } from '../../content/vacancy/vacancy.model';
import { Blog } from '../../content/blogs/blog.model';

@Table({ tableName: 'statuses' })
export class SStatus extends Model<SStatus> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  type: string;

  @Column({ type: DataType.STRING })
  description: string;

  @HasMany(() => ProgramType)
  programTypes: ProgramType[];

  @HasMany(() => Wizard)
  wizards: Wizard[];

  @HasMany(() => Program)
  programs: Program[];

  @HasMany(() => Vacancy)
  vacancy: Vacancy[];

  @HasMany(() => Blog)
  blogs: Blog[];
}
