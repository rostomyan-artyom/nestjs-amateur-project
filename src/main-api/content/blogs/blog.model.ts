import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo, HasMany
} from 'sequelize-typescript';
import { Description } from '../../common/descriptions/description.model';
import { Image } from '../../common/image/image.model';
import { Title } from '../../common/title/title.model';
import { ShortDescription } from '../../common/short-descriptions/short-description.model';
import { SStatus } from '../../common/statuses/s-status.model';
import { PagesBlog } from '../pages-blogs/pages-blogs.model';

@Table({ tableName: 'blogs' })
export class Blog extends Model<Blog> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  alias: string;

  @ForeignKey(() => SStatus)
  @Column({ type: DataType.INTEGER, allowNull: null })
  statusId: number;

  @BelongsTo(() => SStatus)
  status: SStatus;

  @ForeignKey(() => Image)
  @Column({ type: DataType.INTEGER })
  imageId: number;

  @BelongsTo(() => Image)
  image: Image;

  @ForeignKey(() => Title)
  @Column({ type: DataType.INTEGER })
  titleId: number;

  @BelongsTo(() => Title)
  title: Title;

  @ForeignKey(() => ShortDescription)
  @Column({ type: DataType.INTEGER })
  shortDescriptionId: number;

  @BelongsTo(() => ShortDescription)
  shortDescription: ShortDescription;

  @ForeignKey(() => Description)
  @Column({ type: DataType.INTEGER, allowNull: false })
  descriptionId: number;

  @BelongsTo(() => Description)
  description: Description;

  @HasMany(() => PagesBlog)
  pagesBlog: PagesBlog[];
}
