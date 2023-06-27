import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Image } from '../../common/image/image.model';
import { Gender } from '../genders/gender.model';
import { WizardImage } from './wizard-image.model';
import { SStatus } from '../../common/statuses/s-status.model';

@Table({ tableName: 'models' })
export class Wizard extends Model<Wizard> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  alias: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.INTEGER })
  age: number;

  @Column({ type: DataType.INTEGER })
  height: number;

  @Column({ type: DataType.INTEGER })
  breast: number;

  @Column({ type: DataType.INTEGER })
  footSize: number;

  @Column({ type: DataType.INTEGER })
  weight: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDoll: boolean;

  @ForeignKey(() => SStatus)
  @Column({ type: DataType.INTEGER, allowNull: false })
  statusId: number;

  @BelongsTo(() => SStatus)
  status: SStatus;

  @ForeignKey(() => Image)
  @Column({ type: DataType.INTEGER, allowNull: true })
  previewImageId: number;

  @BelongsTo(() => Image)
  previewImage: Image;

  @ForeignKey(() => Gender)
  @Column({ type: DataType.INTEGER, allowNull: true })
  genderId: number;

  @BelongsTo(() => Gender)
  gender: Gender;

  @BelongsToMany(() => Image, () => WizardImage)
  images: Image[];
}
