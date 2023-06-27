import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InteriorModel } from './interior.model';
import { CreateInteriorDto } from './dto/create-interior.dto';

@Injectable()
export class InteriorService {
  constructor(
    @InjectModel(InteriorModel)
    private interiorRepository: typeof InteriorModel,
  ) {}

  async getAll() {
    return this.interiorRepository.findAll();
  }

  async create(image: CreateInteriorDto) {
    return this.interiorRepository.create(image);
  }

  async deleteById(id: number) {
    return this.interiorRepository.destroy({
      where: { id },
    });
  }
}
