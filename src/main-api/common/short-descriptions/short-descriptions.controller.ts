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
import { CreateDescriptionDto } from '../descriptions/dto/create-description.dto';
import { ShortDescriptionsService } from './short-descriptions.service';
import { CreateShortDescriptionDto } from './dto/create-short-description.dto';

@Controller('/api/short-descriptions')
export class ShortDescriptionsController {
  constructor(private shortDescriptionsService: ShortDescriptionsService) {}

  @UseGuards(JwtGuard)
  @Get()
  getAll() {
    return this.shortDescriptionsService.getAll();
  }

  @UseGuards(JwtGuard)
  @UsePipes(ValidatePipe)
  @Post()
  create(@Body() data: CreateDescriptionDto) {
    if (Array.isArray(data)) {
      throw new HttpException(
        'Не может быть массивом!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.shortDescriptionsService.create(data);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  editById(@Param('id') id: string, @Body() data: CreateShortDescriptionDto) {
    if (Array.isArray(data)) {
      throw new HttpException(
        'Не может быть массивом!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.shortDescriptionsService.editById(Number(id), data);
  }
}
