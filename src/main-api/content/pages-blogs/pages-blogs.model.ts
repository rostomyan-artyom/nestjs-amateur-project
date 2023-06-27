import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Blog } from '../blogs/blog.model';

@Table({ tableName: 'pages_blogs' })
export class PagesBlog extends Model<PagesBlog> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true })
  alias: string;

  @Column({ type: DataType.STRING })
  description: string;

  @ForeignKey(() => Blog)
  @Column({ type: DataType.INTEGER })
  blogId: number;

  @BelongsTo(() => Blog)
  blog: Blog;
}
