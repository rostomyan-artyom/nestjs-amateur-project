import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { ProgramType } from '../programs-types/program-type.model';
import { Program } from './program.model';

@Table({ tableName: 'programs_types_programs' })
export class ProgramTypeProgram extends Model<ProgramTypeProgram> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => ProgramType)
  @Column({ type: DataType.INTEGER })
  programTypeId: number;

  @ForeignKey(() => Program)
  @Column({ type: DataType.INTEGER })
  programId: number;
}
