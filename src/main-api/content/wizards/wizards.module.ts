import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WizardsController } from './wizards.controller';
import { WizardsService } from './wizards.service';
import { Wizard } from './wizard.model';
import { WizardImage } from './wizard-image.model';
import { StatusesModule } from '../../common/statuses/statuses.module';
import { GendersModule } from '../genders/genders.module';
import { ImagesModule } from '../../common/image/images.module';
import { Image } from '../../common/image/image.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Wizard, WizardImage, Image]),
    StatusesModule,
    GendersModule,
    ImagesModule,
  ],
  controllers: [WizardsController],
  providers: [WizardsService],
})
export class WizardsModule {}
