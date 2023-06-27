import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SStatus } from './s-status.model';
import { CreateStatusDto } from './dto/create-status.dto';

@Injectable()
export class StatusesService {
  constructor(@InjectModel(SStatus) private statusesService: typeof SStatus) {}

  async getAll() {
    return this.statusesService.findAll();
  }

  async getById(id) {
    return this.statusesService.findByPk(id);
  }

  async getByType(type: string) {
    return this.statusesService.findOne({
      where: { type },
    });
  }

  async create(status: CreateStatusDto) {
    return this.statusesService.create(status);
  }

  async deleteById(id: number) {
    return this.statusesService.destroy({
      where: { id },
    });
  }

  async editById(id: number, data: CreateStatusDto) {
    const candidate = await this.getById(id);

    if (!candidate) {
      throw new HttpException(
        'Статус с таким id не существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    await candidate.set(data);

    return candidate.save();
  }
}
