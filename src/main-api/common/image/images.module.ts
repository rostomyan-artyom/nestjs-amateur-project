import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Image } from './image.model';
import { WizardImage } from '../../content/wizards/wizard-image.model';

@Module({
  imports: [SequelizeModule.forFeature([Image, WizardImage])],
  controllers: [ImagesController],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
