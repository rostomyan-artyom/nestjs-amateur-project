import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { JwtGuard } from '../../auth/auth/guards/jwt.guard';
import { ValidatePipe } from '../../../core/pipes/validate.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveImageToStorage } from '../../../core/helpers/files-helper';

@Controller('/api/images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @UseGuards(JwtGuard)
  @Get()
  getAll() {
    return this.imagesService.getAll();
  }

  @UseGuards(JwtGuard)
  @UsePipes(ValidatePipe)
  @Post('/add-in-db')
  create(@Body() image: CreateImageDto) {
    if (Array.isArray(image)) {
      throw new HttpException(
        'Не может быть массивом!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.imagesService.create(image);
  }

  @UseGuards(JwtGuard)
  @Post('/upload-file')
  @UseInterceptors(FileInterceptor('photo', saveImageToStorage))
  uploadSingle(@UploadedFile() file) {
    if (Array.isArray(file)) {
      throw new HttpException(
        'Не может быть массивом!',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!file || !file.filename) {
      throw new HttpException(`Ошибка!`, HttpStatus.BAD_REQUEST);
    }

    return file.filename;
  }
}
