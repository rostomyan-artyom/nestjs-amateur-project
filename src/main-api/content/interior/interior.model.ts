import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'interior_images' })
export class InteriorModel extends Model<InteriorModel> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  fileName: string;

  @Column({ type: DataType.STRING })
  alt: string;
}
