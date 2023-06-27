import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Blog } from './blog.model';
import { CreateBlogDto } from './dto/create-blog.dto';
import { DescriptionsService } from '../../common/descriptions/descriptions.service';
import { TitlesService } from '../../common/title/titles.service';
import { ImagesService } from '../../common/image/images.service';
import { ShortDescriptionsService } from '../../common/short-descriptions/short-descriptions.service';
import { StatusesService } from '../../common/statuses/statuses.service';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog) private blogRepository: typeof Blog,
    private statusesService: StatusesService,
    private imagesService: ImagesService,
    private titlesService: TitlesService,
    private descriptionsService: DescriptionsService,
    private shortDescriptionsService: ShortDescriptionsService,
  ) {}

  async getAll() {
    return this.blogRepository.findAll({
      include: { all: true },
      order: [['createdAt', 'DESC']],
    });
  }

  async getById(id) {
    return this.blogRepository.findByPk(id, {
      include: { all: true },
    });
  }

  async deleteById(id: number) {
    return await this.blogRepository.destroy({
      where: { id },
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

  async create(blog: CreateBlogDto) {
    const candidate: CreateBlogDto = await this.blogRepository.findOne({
      where: {
        alias: blog.alias,
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
        service: this.titlesService,
        key: 'titleId',
        errorName: 'Title',
      },
      {
        service: this.descriptionsService,
        key: 'descriptionId',
        errorName: 'Description',
      },
      {
        service: this.shortDescriptionsService,
        key: 'shortDescriptionId',
        errorName: 'ShortDescription',
      },
      {
        service: this.imagesService,
        key: 'imageId',
        errorName: 'Image',
      },
    ];

    const errors: any[] = await this.validateCandidate(blog, candidates);

    if (errors && errors.length) {
      throw new HttpException(JSON.stringify(errors), HttpStatus.BAD_REQUEST);
    }

    const createdBlog: CreateBlogDto = await this.blogRepository.create(blog);

    return createdBlog;
  }

  async editById(id: number, data: CreateBlogDto) {
    const candidates = [
      {
        service: this.statusesService,
        key: 'statusId',
        errorName: 'Status',
      },
      {
        service: this.titlesService,
        key: 'titleId',
        errorName: 'Title',
      },
      {
        service: this.descriptionsService,
        key: 'descriptionId',
        errorName: 'Description',
      },
      {
        service: this.shortDescriptionsService,
        key: 'shortDescriptionId',
        errorName: 'ShortDescription',
      },
      {
        service: this.imagesService,
        key: 'imageId',
        errorName: 'Image',
      },
    ];

    const errors: any[] = await this.validateCandidate(data, candidates);

    if (errors && errors.length) {
      throw new HttpException(JSON.stringify(errors), HttpStatus.BAD_REQUEST);
    }

    const candidate = await this.getById(id);

    if (!candidate) {
      throw new HttpException(
        'Блог с таким id не существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    await candidate.set(data);

    return candidate.save();
  }
}
