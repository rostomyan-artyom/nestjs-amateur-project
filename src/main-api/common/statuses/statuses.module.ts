import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StatusesService } from './statuses.service';
import { StatusesController } from './statuses.controller';
import { SStatus } from './s-status.model';

@Module({
  imports: [SequelizeModule.forFeature([SStatus])],
  providers: [StatusesService],
  controllers: [StatusesController],
  exports: [StatusesService],
})
export class StatusesModule {}
