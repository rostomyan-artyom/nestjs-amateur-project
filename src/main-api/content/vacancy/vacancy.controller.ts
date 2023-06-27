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
import { CreateProgramDto } from '../programs/dto/create-program.dto';
import { VacancyService } from './vacancy.service';
import { CreateBlogDto } from '../blogs/dto/create-blog.dto';

@Controller('/api/vacancy')
export class VacancyController {
  constructor(private vacancyService: VacancyService) {}

  @Get()
  getActual() {
    return this.vacancyService.getActual();
  }

  @Get(':alias')
  getByAlias(@Param('alias') alias: string) {
    return this.vacancyService.getByAlias(alias);
  }

  @UseGuards(JwtGuard)
  @Get('/admin/all')
  getAll() {
    return this.vacancyService.getAll();
  }

  @UseGuards(JwtGuard)
  @Get('/admin/id/:id')
  adminGetById(@Param('id') id: string) {
    return this.vacancyService.getById(Number(id));
  }

  @UseGuards(JwtGuard)
  @UsePipes(ValidatePipe)
  @Post()
  create(@Body() program: CreateProgramDto) {
    if (Array.isArray(program)) return;

    return this.vacancyService.create(program);
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

    return this.vacancyService.editById(Number(id), data);
  }
}
