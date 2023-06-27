import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Description } from './description.model';
import { CreateDescriptionDto } from './dto/create-description.dto';

@Injectable()
export class DescriptionsService {
  constructor(
    @InjectModel(Description) private descriptionRepository: typeof Description,
  ) {}

  async getAll() {
    return this.descriptionRepository.findAll();
  }

  async getById(id) {
    return this.descriptionRepository.findByPk(id);
  }

  async create(description: CreateDescriptionDto) {
    return this.descriptionRepository.create(description);
  }

  async editById(id: number, data: CreateDescriptionDto) {
    const candidate = await this.getById(id);

    if (!candidate) {
      throw new HttpException(
        'Описание с таким id не существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    await candidate.set(data);

    return candidate.save();
  }
}
