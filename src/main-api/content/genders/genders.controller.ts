import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtGuard } from '../../auth/auth/guards/jwt.guard';
import { ValidatePipe } from '../../../core/pipes/validate.pipe';
import { GendersService } from './genders.service';
import { CreateGenderDto } from './dto/create-gender.dto';

@Controller('/api/genders')
export class GendersController {
  constructor(private gendersService: GendersService) {}

  @UseGuards(JwtGuard)
  @Get()
  getAll() {
    return this.gendersService.getAll();
  }

  @UseGuards(JwtGuard)
  @UsePipes(ValidatePipe)
  @Post()
  createTitle(@Body() data: CreateGenderDto) {
    if (Array.isArray(data)) {
      throw new HttpException(
        'Не может быть массивом!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.gendersService.create(data);
  }
}
