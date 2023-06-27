import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Blog } from './blog.model';
import { DescriptionsModule } from '../../common/descriptions/descriptions.module';
import { TitlesModule } from '../../common/title/titles.module';
import { ShortDescriptionsModule } from '../../common/short-descriptions/short-descriptions.module';
import { ImagesModule } from '../../common/image/images.module';
import { StatusesModule } from '../../common/statuses/statuses.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Blog]),
    TitlesModule,
    DescriptionsModule,
    ShortDescriptionsModule,
    ImagesModule,
    StatusesModule,
  ],
  providers: [BlogsService],
  controllers: [BlogsController],
  exports: [BlogsService],
})
export class BlogsModule {}
