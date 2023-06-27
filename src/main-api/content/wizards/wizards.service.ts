import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Wizard } from './wizard.model';
import { CreateWizardDto } from './dto/create-wizard.dto';
import { StatusesService } from '../../common/statuses/statuses.service';
import { ImagesService } from '../../common/image/images.service';
import { GendersService } from '../genders/genders.service';
import { Image } from '../../common/image/image.model';
import { SStatus } from '../../common/statuses/s-status.model';
import { Gender } from '../genders/gender.model';

@Injectable()
export class WizardsService {
  constructor(
    @InjectModel(Wizard) private wizardRepository: typeof Wizard,
    private statusesService: StatusesService,
    private imagesRepository: ImagesService,
    private genderRepository: GendersService,
  ) {}

  async getActual({ limit }) {
    const activeType: SStatus = await this.statusesService.getByType('active');

    return this.wizardRepository.findAll({
      where: { statusId: activeType.id },
      include: { all: true },
      order: [['createdAt', 'DESC']],
      limit: limit ? limit : null,
    });
  }

  // async getFiltered({ notDoll, onlyGirls }) {
  //   console.log(notDoll, onlyGirls);
  //   const activeType: SStatus = await this.statusesService.getByType('active');
  //   const notDollStatus = Boolean(Number(notDoll));
  //   const onlyGirlsBoolean = Boolean(Number(onlyGirls));
  //
  //   const where = {
  //     statusId: activeType.id,
  //     isDoll: notDollStatus,
  //   };
  //
  //   return this.wizardRepository.findAll({
  //     where: where,
  //
  //     include: [
  //       {
  //         model: Gender,
  //         where: {
  //           type: onlyGirlsBoolean ? 'female' : 'male',
  //         },
  //       },
  //     ],
  //   });
  // }

  async firstFour() {
    const activeType: SStatus = await this.statusesService.getByType('active');

    return this.wizardRepository.findAll({
      where: {
        statusId: activeType.id,
        isDoll: false,
      },
      include: [
        {
          model: Gender,
          where: {
            type: 'female',
          },
        },
        {
          model: Image,
          as: 'previewImage',
        },
      ],
      order: [['createdAt', 'DESC']],
      limit: 4,
    });
  }

  async getAll() {
    return this.wizardRepository.findAll({
      include: { all: true },
      order: [['createdAt', 'DESC']],
    });
  }

  async getById(id: number) {
    return await this.wizardRepository.findByPk(id, {
      include: { all: true },
    });
  }

  async deleteById(id: number) {
    return this.wizardRepository.destroy({
      where: { id },
    });
  }

  async getByAlias(alias: string) {
    return this.wizardRepository.findOne({
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

  async create(wizard: CreateWizardDto) {
    const candidate: CreateWizardDto = await this.wizardRepository.findOne({
      where: {
        alias: wizard.alias,
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
        service: this.statusesService,
        key: 'statusId',
        errorName: 'Status',
      },
      {
        service: this.imagesRepository,
        key: 'previewImageId',
        errorName: 'Preview',
      },
      {
        service: this.genderRepository,
        key: 'genderId',
        errorName: 'Gender',
      },
    ];

    const errors: any[] = await this.validateCandidate(wizard, candidates);

    if (errors && errors.length) {
      throw new HttpException(JSON.stringify(errors), HttpStatus.BAD_REQUEST);
    }

    const createdWizard: CreateWizardDto = await this.wizardRepository.create(
      wizard,
    );

    return createdWizard;
  }

  async editById(id: number, data: CreateWizardDto) {
    const candidates = [
      {
        service: this.statusesService,
        key: 'statusId',
        errorName: 'Status',
      },
      {
        service: this.imagesRepository,
        key: 'previewImageId',
        errorName: 'Preview',
      },
      {
        service: this.genderRepository,
        key: 'genderId',
        errorName: 'Gender',
      },
    ];

    const errors: any[] = await this.validateCandidate(data, candidates);

    if (errors && errors.length) {
      throw new HttpException(JSON.stringify(errors), HttpStatus.BAD_REQUEST);
    }

    const candidate = await this.getById(id);

    if (!candidate) {
      throw new HttpException(
        'Модели с таким id не существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    await candidate.set(data);

    return candidate.save();
  }

  async addImage(modelId: number, imageId: number) {
    const modelCandidate: Wizard = await this.getById(modelId);
    const imageCandidate: Image = await this.imagesRepository.getById(imageId);

    if (modelCandidate && imageCandidate) {
      await modelCandidate.$add('images', imageId);

      return await this.getById(modelId);
    }

    throw new HttpException(
      `modelId или imageId введены неверно. result:  model - ${!!modelCandidate}, image - ${!!imageCandidate}`,
      HttpStatus.NOT_FOUND,
    );
  }

  async removeImage(modelId: number, imageId: number) {
    const modelCandidate: Wizard = await this.getById(modelId);
    const imageCandidate: Image = await this.imagesRepository.getById(imageId);

    if (modelCandidate && imageCandidate) {
      await modelCandidate.$remove('images', imageId);

      return await this.getById(modelId);
    }

    throw new HttpException(
      `modelId или imageId введены неверно. result:  model - ${!!modelCandidate}, image - ${!!imageCandidate}`,
      HttpStatus.NOT_FOUND,
    );
  }
}
