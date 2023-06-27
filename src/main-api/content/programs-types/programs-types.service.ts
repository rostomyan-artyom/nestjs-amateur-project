import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProgramType } from './program-type.model';
import { CreateProgramTypeDto } from './dto/create-program-type.dto';
import { TitlesService } from '../../common/title/titles.service';
import { StatusesService } from '../../common/statuses/statuses.service';
import { ShortDescriptionsService } from '../../common/short-descriptions/short-descriptions.service';
import { DescriptionsService } from '../../common/descriptions/descriptions.service';
import { Program } from '../programs/program.model';
import { ProgramsService } from '../programs/programs.service';
import { Title } from '../../common/title/title.model';
import { Image } from '../../common/image/image.model';
import { ShortDescription } from '../../common/short-descriptions/short-description.model';
import { Description } from '../../common/descriptions/description.model';
import { SStatus } from '../../common/statuses/s-status.model';

@Injectable()
export class ProgramsTypesService {
  constructor(
    @InjectModel(ProgramType)
    private programsTypesRepository: typeof ProgramType,
    private programsService: ProgramsService,
    private titlesService: TitlesService,
    private statusesService: StatusesService,
    private shortDescriptionsService: ShortDescriptionsService,
    private descriptionsService: DescriptionsService,
  ) {}

  async getActual(): Promise<ProgramType[]> {
    const activeType: SStatus = await this.statusesService.getByType('active');

    return this.programsTypesRepository.findAll({
      include: [
        {
          model: Program,
          where: { statusId: activeType.id },
          include: [
            { model: Image },
            { model: Title },
            { model: ShortDescription },
            { model: Description },
          ],
          order: [['createdAt', 'ASC']],
        },
        { model: Title },
        { model: ShortDescription },
        { model: SStatus },
      ],
      order: [['createdAt', 'ASC']],
    });
  }

  async getAll(): Promise<ProgramType[]> {
    return this.programsTypesRepository.findAll({
      include: [
        {
          model: Program,
          include: [
            { model: Image },
            { model: Title },
            { model: ShortDescription },
            { model: Description },
          ],
        },
        { model: Title },
        { model: ShortDescription },
        { model: SStatus },
      ],
      order: [['createdAt', 'ASC']],
    });
  }

  async getById(id: number) {
    return this.programsTypesRepository.findByPk(id, {
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

  async create(programType: CreateProgramTypeDto) {
    const candidate: ProgramType = await this.programsTypesRepository.findOne({
      where: {
        alias: programType.alias,
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

    const errors: any[] = await this.validateCandidate(programType, candidates);

    if (errors && errors.length) {
      throw new HttpException(JSON.stringify(errors), HttpStatus.BAD_REQUEST);
    }

    return this.programsTypesRepository.create(programType);
  }

  async addProgram(typeId: number, programId: number) {
    const programTypeCandidate: ProgramType = await this.getById(typeId);
    const programCandidate: Program = await this.programsService.getById(
      programId,
    );

    if (programTypeCandidate && programCandidate) {
      await programTypeCandidate.$add('programs', programId);

      return await this.getById(typeId);
    }

    throw new HttpException(
      `typeId или programId введены неверно. result:  typeId - ${!!programTypeCandidate}, programId - ${!!programCandidate}`,
      HttpStatus.NOT_FOUND,
    );
  }

  async removeProgram(typeId: number, programId: number) {
    const programTypeCandidate: ProgramType = await this.getById(typeId);
    const programCandidate: Program = await this.programsService.getById(
      programId,
    );

    if (programTypeCandidate && programCandidate) {
      await programTypeCandidate.$remove('programs', programId);

      return await this.getById(typeId);
    }

    throw new HttpException(
      `typeId или programId введены неверно. result:  typeId - ${!!programTypeCandidate}, programId - ${!!programCandidate}`,
      HttpStatus.NOT_FOUND,
    );
  }

  async editById(id: number, data: CreateProgramTypeDto) {
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
        'Вид программы (шоу) с таким id не существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    await candidate.set(data);

    return candidate.save();
  }
}
