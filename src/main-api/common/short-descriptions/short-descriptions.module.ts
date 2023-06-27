import { Module } from '@nestjs/common';
import { ShortDescriptionsController } from './short-descriptions.controller';
import { ShortDescriptionsService } from './short-descriptions.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShortDescription } from './short-description.model';

@Module({
  imports: [SequelizeModule.forFeature([ShortDescription])],
  controllers: [ShortDescriptionsController],
  providers: [ShortDescriptionsService],
  exports: [ShortDescriptionsService],
})
export class ShortDescriptionsModule {}
