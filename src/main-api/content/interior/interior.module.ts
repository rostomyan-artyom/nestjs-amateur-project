import { Module } from '@nestjs/common';
import { InteriorService } from './interior.service';
import { InteriorController } from './interior.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { InteriorModel } from './interior.model';

@Module({
  providers: [InteriorService],
  controllers: [InteriorController],
  imports: [SequelizeModule.forFeature([InteriorModel])],
})
export class InteriorModule {}
