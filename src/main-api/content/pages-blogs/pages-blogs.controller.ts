import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtGuard } from '../../auth/auth/guards/jwt.guard';
import { ValidatePipe } from '../../../core/pipes/validate.pipe';
import { CreatePageBlogDto } from './dto/create-page-blog.dto';
import { PagesBlogsService } from './pages-blogs.service';

@Controller('/api/pages-blogs')
export class PagesBlogsController {
  constructor(private pagesBlogsService: PagesBlogsService) {}

  @Get()
  getAll() {
    return this.pagesBlogsService.getAll();
  }

  @Get('/alias/:alias')
  getByAlias(@Param('alias') alias: string) {
    return this.pagesBlogsService.getByAlias(alias);
  }

  @UseGuards(JwtGuard)
  @UsePipes(ValidatePipe)
  @Post()
  create(@Body() data: CreatePageBlogDto) {
    if (Array.isArray(data)) {
      throw new HttpException(
        'Не может быть массивом!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.pagesBlogsService.create(data);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  editById(@Param('id') id: string, @Body() data: CreatePageBlogDto) {
    if (Array.isArray(data)) {
      throw new HttpException(
        'Не может быть массивом!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.pagesBlogsService.editById(Number(id), data);
  }
}
