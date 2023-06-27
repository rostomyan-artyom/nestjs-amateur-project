import { Module } from '@nestjs/common';
import { PagesBlogsController } from './pages-blogs.controller';
import { PagesBlogsService } from './pages-blogs.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { PagesBlog } from './pages-blogs.model';
import { BlogsModule } from '../blogs/blogs.module';

@Module({
  controllers: [PagesBlogsController],
  providers: [PagesBlogsService],
  imports: [SequelizeModule.forFeature([PagesBlog]), BlogsModule],
})
export class PagesBlogsModule {}
