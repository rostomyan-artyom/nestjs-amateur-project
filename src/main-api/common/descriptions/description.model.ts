import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';
import { Blog } from '../../content/blogs/blog.model';
import { ProgramType } from '../../content/programs-types/program-type.model';
import { Program } from '../../content/programs/program.model';
import { Vacancy } from '../../content/vacancy/vacancy.model';

@Table({ tableName: 'descriptions' })
export class Description extends Model<Description> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING(50000) })
  'ru-RU': string;

  @Column({ type: DataType.STRING(50000) })
  'en-US': string;

  @HasOne(() => Blog)
  blog: Blog;

  @HasOne(() => ProgramType)
  programType: ProgramType;

  @HasOne(() => Program)
  program: Program;

  @HasOne(() => Vacancy)
  vacancy: Vacancy;
}
