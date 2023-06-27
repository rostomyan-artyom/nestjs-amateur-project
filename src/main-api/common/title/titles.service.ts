import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTitleDto } from './dto/create-title.dto';
import { Title } from './title.model';

@Injectable()
export class TitlesService {
  constructor(@InjectModel(Title) private titleRepository: typeof Title) {}

  async getAll() {
    return this.titleRepository.findAll();
  }

  async getById(id) {
    return this.titleRepository.findByPk(id);
  }

  async create(title: CreateTitleDto) {
    return this.titleRepository.create(title);
  }

  async editById(id: number, data: CreateTitleDto) {
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
