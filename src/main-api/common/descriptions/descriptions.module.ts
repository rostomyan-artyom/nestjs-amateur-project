import { Module } from '@nestjs/common';
import { DescriptionsController } from './descriptions.controller';
import { DescriptionsService } from './descriptions.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Description } from './description.model';

@Module({
  imports: [SequelizeModule.forFeature([Description])],
  controllers: [DescriptionsController],
  providers: [DescriptionsService],
  exports: [DescriptionsService],
})
export class DescriptionsModule {}
