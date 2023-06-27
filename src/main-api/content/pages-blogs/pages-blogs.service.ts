import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PagesBlog } from './pages-blogs.model';
import { BlogsService } from '../blogs/blogs.service';
import { CreatePageBlogDto } from './dto/create-page-blog.dto';
import { Description } from '../../common/descriptions/description.model';
import { Blog } from '../blogs/blog.model';

@Injectable()
export class PagesBlogsService {
  constructor(
    @InjectModel(PagesBlog) private pagesBlogRepository: typeof PagesBlog,
    private blogsService: BlogsService,
  ) {}

  async getAll(): Promise<PagesBlog[]> {
    return await this.pagesBlogRepository.findAll({
      include: [
        {
          model: Blog,
          include: [{ model: Description }],
        },
      ],
    });
  }

  async getById(id: number): Promise<PagesBlog> {
    return await this.pagesBlogRepository.findByPk(id, {
      include: { all: true },
    });
  }

  async getByAlias(alias: string): Promise<PagesBlog> {
    return await this.pagesBlogRepository.findOne({
      where: { alias },
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

  async create(pageBlog: CreatePageBlogDto): Promise<PagesBlog> {
    const candidate: PagesBlog = await this.pagesBlogRepository.findOne({
      where: {
        alias: pageBlog.alias,
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
        service: this.blogsService,
        key: 'blogId',
        errorName: 'Blog',
      },
    ];

    const errors: any[] = await this.validateCandidate(pageBlog, candidates);

    if (errors && errors.length) {
      throw new HttpException(JSON.stringify(errors), HttpStatus.BAD_REQUEST);
    }

    return this.pagesBlogRepository.create(pageBlog);
  }

  async editById(id: number, data: CreatePageBlogDto): Promise<PagesBlog> {
    const candidates = [
      {
        service: this.blogsService,
        key: 'blogId',
        errorName: 'Blog',
      },
    ];

    const errors: any[] = await this.validateCandidate(data, candidates);

    if (errors && errors.length) {
      throw new HttpException(JSON.stringify(errors), HttpStatus.BAD_REQUEST);
    }

    const candidate = await this.getById(id);

    if (!candidate) {
      throw new HttpException(
        'Программы (шоу) с таким id не существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    await candidate.set(data);

    return candidate.save();
  }
}
