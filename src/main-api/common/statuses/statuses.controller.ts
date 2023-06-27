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
import { CreateStatusDto } from './dto/create-status.dto';
import { StatusesService } from './statuses.service';
import { JwtGuard } from '../../auth/auth/guards/jwt.guard';
import { ValidatePipe } from '../../../core/pipes/validate.pipe';

@Controller('/api/statuses')
export class StatusesController {
  constructor(private statusesService: StatusesService) {}

  @UseGuards(JwtGuard)
  @Get()
  getAll() {
    return this.statusesService.getAll();
  }

  @UseGuards(JwtGuard)
  @UsePipes(ValidatePipe)
  @Post()
  create(@Body() data: CreateStatusDto) {
    if (Array.isArray(data)) {
      throw new HttpException(
        'Не может быть массивом!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.statusesService.create(data);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.statusesService.deleteById(Number(id));
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  editById(@Param('id') id: string, @Body() data: CreateStatusDto) {
    if (Array.isArray(data)) {
      throw new HttpException(
        'Не может быть массивом!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.statusesService.editById(Number(id), data);
  }
}
