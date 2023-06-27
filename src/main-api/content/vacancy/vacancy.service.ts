import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TitlesService } from '../../common/title/titles.service';
import { StatusesService } from '../../common/statuses/statuses.service';
import { ShortDescriptionsService } from '../../common/short-descriptions/short-descriptions.service';
import { DescriptionsService } from '../../common/descriptions/descriptions.service';
import { Vacancy } from './vacancy.model';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { SStatus } from '../../common/statuses/s-status.model';

@Injectable()
export class VacancyService {
  constructor(
    @InjectModel(Vacancy)
    private vacancyRepository: typeof Vacancy,
    private titlesService: TitlesService,
    private statusesService: StatusesService,
    private shortDescriptionsService: ShortDescriptionsService,
    private descriptionsService: DescriptionsService,
  ) {}

  async getActual(): Promise<Vacancy[]> {
    const activeType: SStatus = await this.statusesService.getByType('active');

    return this.vacancyRepository.findAll({
      where: { statusId: activeType.id },
      include: { all: true },
      order: [['createdAt', 'DESC']],
    });
  }

  async getAll(): Promise<Vacancy[]> {
    return this.vacancyRepository.findAll({
      include: { all: true },
      order: [['createdAt', 'DESC']],
    });
  }

  async getById(id: number) {
    return this.vacancyRepository.findByPk(id, {
      include: { all: true },
    });
  }

  async getByAlias(alias) {
    return this.vacancyRepository.findOne({
      where: { alias },
      include: { all: true },
    });
  }

  async validateCandidate(data, candidates) {
    if (!candidates) return;

    const errors = [];

    for (const candidate of candidates) {
      if (!(candidate.key in data) || data[candidate.key] === null) continue;

      const status = await candidate.service.getById(data[candidate.key]);

      if (!status)
        errors.push(`${candidate.errorName} с таким id не существует!`);
    }

    return errors;
  }

  async create(vacancy: CreateVacancyDto) {
    const candidate: Vacancy = await this.vacancyRepository.findOne({
      where: {
        alias: vacancy.alias,
      },
    });

    if (candidate) {
      throw new HttpException(
        'Элемент с таким alias уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const candidates = [
      {
        service: this.titlesService,
        key: 'titleId',
        errorName: 'Title',
      },
      {
        service: this.statusesService,
        key: 'statusId',
        errorName: 'Status',
      },
      {
        service: this.shortDescriptionsService,
        key: 'shortDescriptionId',
        errorName: 'ShortDescription',
      },
      {
        service: this.descriptionsService,
        key: 'descriptionId',
        errorName: 'Description',
      },
    ];

    const errors: any[] = await this.validateCandidate(vacancy, candidates);

    if (errors && errors.length) {
      throw new HttpException(JSON.stringify(errors), HttpStatus.BAD_REQUEST);
    }

    const createdVacancy: CreateVacancyDto =
      await this.vacancyRepository.create(vacancy);

    return createdVacancy;
  }

  async editById(id: number, data: CreateVacancyDto) {
    const candidates = [
      {
        service: this.titlesService,
        key: 'titleId',
        errorName: 'Title',
      },
      {
        service: this.statusesService,
        key: 'statusId',
        errorName: 'Status',
      },
      {
        service: this.shortDescriptionsService,
        key: 'shortDescriptionId',
        errorName: 'ShortDescription',
      },
      {
        service: this.descriptionsService,
        key: 'descriptionId',
        errorName: 'Description',
      },
    ];

    const errors: any[] = await this.validateCandidate(data, candidates);

    if (errors && errors.length) {
      throw new HttpException(JSON.stringify(errors), HttpStatus.BAD_REQUEST);
    }

    const candidate = await this.getById(id);

    if (!candidate) {
      throw new HttpException(
        'Вакансия с таким id не существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    await candidate.set(data);

    return candidate.save();
  }
}
