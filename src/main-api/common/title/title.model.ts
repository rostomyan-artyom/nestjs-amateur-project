import {
  Column,
  DataType,
  Model,
  Table,
  HasOne,
} from 'sequelize-typescript';
import { ProgramType } from '../../content/programs-types/program-type.model';
import { Blog } from '../../content/blogs/blog.model';
import { Program } from '../../content/programs/program.model';

@Table({ tableName: 'titles' })
export class Title extends Model<Title> {
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

  @HasOne(() => ProgramType)
  programType: ProgramType;

  @HasOne(() => Program)
  program: Program;

  @HasOne(() => Blog)
  blog: Blog;
}
