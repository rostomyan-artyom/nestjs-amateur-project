import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Image } from './image.model';
import { CreateImageDto } from './dto/create-image.dto';

@Injectable()
export class ImagesService {
  constructor(@InjectModel(Image) private imageRepository: typeof Image) {}

  async getAll() {
    return this.imageRepository.findAll();
  }

  async getById(id) {
    return this.imageRepository.findByPk(id);
  }

  async create(image: CreateImageDto) {
    return this.imageRepository.create(image);
  }
}
