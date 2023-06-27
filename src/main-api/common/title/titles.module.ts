import { Module } from '@nestjs/common';
import { TitlesService } from './titles.service';
import { TitlesController } from './titles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Title } from './title.model';

@Module({
  imports: [SequelizeModule.forFeature([Title])],
  providers: [TitlesService],
  controllers: [TitlesController],
  exports: [TitlesService],
})
export class TitlesModule {}
