import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Gender } from './gender.model';
import { CreateGenderDto } from './dto/create-gender.dto';

@Injectable()
export class GendersService {
  constructor(@InjectModel(Gender) private genderRepository: typeof Gender) {}

  async getAll() {
    return this.genderRepository.findAll();
  }

  async getById(id) {
    const gender: CreateGenderDto = await this.genderRepository.findByPk(id);

    return gender;
  }

  async create(gender: CreateGenderDto) {
    const createdGender: CreateGenderDto = await this.genderRepository.create(
      gender,
    );

    return createdGender;
  }
}
