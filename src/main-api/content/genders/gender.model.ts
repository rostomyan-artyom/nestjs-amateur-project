import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Wizard } from '../wizards/wizard.model';

@Table({ tableName: 'genders' })
export class Gender extends Model<Gender> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  type: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @HasMany(() => Wizard)
  wizards: Wizard;
}
