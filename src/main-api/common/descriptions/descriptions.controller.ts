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
import { DescriptionsService } from './descriptions.service';
import { CreateDescriptionDto } from './dto/create-description.dto';
import { ValidatePipe } from '../../../core/pipes/validate.pipe';
import { JwtGuard } from '../../auth/auth/guards/jwt.guard';

@Controller('/api/descriptions')
export class DescriptionsController {
  constructor(private descriptionService: DescriptionsService) {}

  @UseGuards(JwtGuard)
  @Get()
  getAll() {
    return this.descriptionService.getAll();
  }

  @UseGuards(JwtGuard)
  @UsePipes(ValidatePipe)
  @Post()
  create(@Body() description: CreateDescriptionDto) {
    if (Array.isArray(description)) {
      throw new HttpException(
        'Не может быть массивом!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.descriptionService.create(description);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  editById(@Param('id') id: string, @Body() data: CreateDescriptionDto) {
    if (Array.isArray(data)) {
      throw new HttpException(
        'Не может быть массивом!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.descriptionService.editById(Number(id), data);
  }
}
