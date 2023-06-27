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
import { ProgramsService } from './programs.service';
import { JwtGuard } from '../../auth/auth/guards/jwt.guard';
import { CreateProgramDto } from './dto/create-program.dto';
import { ValidatePipe } from '../../../core/pipes/validate.pipe';

@Controller('/api/programs')
export class ProgramsController {
  constructor(private programsService: ProgramsService) {}

  @Get()
  getActual() {
    return this.programsService.getAll();
  }

  @UseGuards(JwtGuard)
  @Get('/admin/all')
  getAll() {
    return this.programsService.getAll();
  }

  @UseGuards(JwtGuard)
  @Get('/admin/id/:id')
  adminGetById(@Param('id') id: string) {
    return this.programsService.getById(Number(id));
  }

  @UseGuards(JwtGuard)
  @UsePipes(ValidatePipe)
  @Post()
  create(@Body() data: CreateProgramDto) {
    if (Array.isArray(data)) {
      throw new HttpException(
        'Не может быть массивом!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.programsService.create(data);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  editById(@Param('id') id: string, @Body() data: CreateProgramDto) {
    if (Array.isArray(data)) {
      throw new HttpException(
        'Не может быть массивом!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.programsService.editById(Number(id), data);
  }
}
