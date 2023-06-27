import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { ValidatePipe } from '../../../core/pipes/validate.pipe';
import { JwtGuard } from '../../auth/auth/guards/jwt.guard';

@Controller('api/blogs')
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @Get()
  getActual() {
    return this.blogsService.getAll();
  }

  @UseGuards(JwtGuard)
  @Get('/admin/all')
  getAll() {
    return this.blogsService.getAll();
  }

  @Get(':id')
  getBlogById(@Param('id') id: string) {
    return this.blogsService.getById(id);
  }

  @UseGuards(JwtGuard)
  @Get('/admin/id/:id')
  adminGetById(@Param('id') id: string) {
    return this.blogsService.getById(Number(id));
  }

  @UseGuards(JwtGuard)
  @UsePipes(ValidatePipe)
  @Post()
  createBlog(@Body() data: CreateBlogDto) {
    if (Array.isArray(data)) {
      throw new HttpException(
        'Не может быть массивом!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.blogsService.create(data);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.blogsService.deleteById(Number(id));
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  editById(@Param('id') id: string, @Body() data: CreateBlogDto) {
    if (Array.isArray(data)) {
      throw new HttpException(
        'Не может быть массивом!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.blogsService.editById(Number(id), data);
  }
}
