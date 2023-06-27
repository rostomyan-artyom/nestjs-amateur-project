import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
  HasMany,
} from 'sequelize-typescript';
import { Wizard } from '../../content/wizards/wizard.model';
import { WizardImage } from '../../content/wizards/wizard-image.model';
import { Program } from '../../content/programs/program.model';
import { Blog } from '../../content/blogs/blog.model';
import { Vacancy } from '../../content/vacancy/vacancy.model';

@Table({ tableName: 'images' })
export class Image extends Model<Image> {
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

  @HasMany(() => Wizard)
  wizard: Wizard[];

  @HasMany(() => Program)
  program: Program[];

  @HasMany(() => Blog)
  blog: Blog;

  @HasMany(() => Vacancy)
  vacancy: Vacancy;

  @BelongsToMany(() => Wizard, () => WizardImage)
  wizards: Wizard[];
}
