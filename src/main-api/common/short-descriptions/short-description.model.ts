import { Column, DataType, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { ProgramType } from '../../content/programs-types/program-type.model';
import { Program } from '../../content/programs/program.model';
import { Vacancy } from '../../content/vacancy/vacancy.model';
import { Blog } from '../../content/blogs/blog.model';

@Table({ tableName: 'short_descriptions' })
export class ShortDescription extends Model<ShortDescription> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING(350) })
  'ru-RU': string;

  @Column({ type: DataType.STRING(350) })
  'en-US': string;

  @HasMany(() => ProgramType)
  programType: ProgramType[];

  @HasMany(() => Program)
  program: Program[];

  @HasMany(() => Vacancy)
  vacancy: Vacancy[];

  @HasOne(() => Blog)
  blog: Blog;
}
