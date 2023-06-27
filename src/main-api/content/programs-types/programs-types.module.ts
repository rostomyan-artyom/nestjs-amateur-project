import { Module } from '@nestjs/common';
import { ProgramsTypesController } from './programs-types.controller';
import { ProgramsTypesService } from './programs-types.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProgramType } from './program-type.model';
import { ProgramTypeProgram } from '../programs/program-type-program.model';
import { TitlesModule } from '../../common/title/titles.module';
import { DescriptionsModule } from '../../common/descriptions/descriptions.module';
import { ShortDescriptionsModule } from '../../common/short-descriptions/short-descriptions.module';
import { StatusesModule } from '../../common/statuses/statuses.module';
import { ProgramsModule } from '../programs/programs.module';

@Module({
  imports: [
    SequelizeModule.forFeature([ProgramType, ProgramTypeProgram]),
    ProgramsModule,
    TitlesModule,
    DescriptionsModule,
    ShortDescriptionsModule,
    StatusesModule,
  ],
  controllers: [ProgramsTypesController],
  providers: [ProgramsTypesService],
})
export class ProgramsTypesModule {}
