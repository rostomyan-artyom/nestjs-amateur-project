import { Module } from '@nestjs/common';
import { VacancyController } from './vacancy.controller';
import { VacancyService } from './vacancy.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vacancy } from './vacancy.model';
import { TitlesModule } from '../../common/title/titles.module';
import { ShortDescriptionsModule } from '../../common/short-descriptions/short-descriptions.module';
import { DescriptionsModule } from '../../common/descriptions/descriptions.module';
import { StatusesModule } from '../../common/statuses/statuses.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Vacancy]),
    TitlesModule,
    ShortDescriptionsModule,
    DescriptionsModule,
    StatusesModule,
  ],
  controllers: [VacancyController],
  providers: [VacancyService],
})
export class VacancyModule {}
