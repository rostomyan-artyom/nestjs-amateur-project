import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Wizard } from './wizard.model';
import { Image } from '../../common/image/image.model';

@Table({ tableName: 'wizards_images' })
export class WizardImage extends Model<WizardImage> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Wizard)
  @Column({ type: DataType.INTEGER, allowNull: false })
  wizardId: number;

  @ForeignKey(() => Image)
  @Column({ type: DataType.INTEGER, allowNull: false })
  imageId: number;
}
