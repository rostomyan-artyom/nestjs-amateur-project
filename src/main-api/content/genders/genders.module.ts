import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GendersController } from './genders.controller';
import { GendersService } from './genders.service';
import { Gender } from './gender.model';

@Module({
  imports: [SequelizeModule.forFeature([Gender])],
  controllers: [GendersController],
  providers: [GendersService],
  exports: [GendersService],
})
export class GendersModule {}
