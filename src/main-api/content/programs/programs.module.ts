import { Module } from '@nestjs/common';
import { ProgramsController } from './programs.controller';
import { ProgramsService } from './programs.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Program } from './program.model';
import { ProgramTypeProgram } from './program-type-program.model';
import { ImagesModule } from '../../common/image/images.module';
import { TitlesModule } from '../../common/title/titles.module';
import { StatusesModule } from '../../common/statuses/statuses.module';
import { ShortDescriptionsModule } from '../../common/short-descriptions/short-descriptions.module';
import { DescriptionsModule } from '../../common/descriptions/descriptions.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Program, ProgramTypeProgram]),
    ImagesModule,
    TitlesModule,
    StatusesModule,
    ShortDescriptionsModule,
    DescriptionsModule,
  ],
  controllers: [ProgramsController],
  providers: [ProgramsService],
  exports: [ProgramsService],
})
export class ProgramsModule {}
