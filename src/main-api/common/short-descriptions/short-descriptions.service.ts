import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateShortDescriptionDto } from './dto/create-short-description.dto';
import { ShortDescription } from './short-description.model';

@Injectable()
export class ShortDescriptionsService {
  constructor(
    @InjectModel(ShortDescription)
    private shortDescriptionRepository: typeof ShortDescription,
  ) {}

  async getAll() {
    return this.shortDescriptionRepository.findAll();
  }

  async getById(id) {
    return this.shortDescriptionRepository.findByPk(id);
  }

  async create(shortDescription: CreateShortDescriptionDto) {
    return this.shortDescriptionRepository.create(shortDescription);
  }

  async editById(id: number, data: CreateShortDescriptionDto) {
    const candidate = await this.getById(id);

    if (!candidate) {
      throw new HttpException(
        'Короткое описание с таким id не существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    await candidate.set(data);

    return candidate.save();
  }
}
