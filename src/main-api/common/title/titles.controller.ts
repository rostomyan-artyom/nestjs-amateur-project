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
import { CreateTitleDto } from './dto/create-title.dto';
import { TitlesService } from './titles.service';
import { ValidatePipe } from '../../../core/pipes/validate.pipe';
import { JwtGuard } from '../../auth/auth/guards/jwt.guard';

@Controller('api/titles')
export class TitlesController {
  constructor(private titlesService: TitlesService) {}

  @UseGuards(JwtGuard)
  @Get()
  getAll() {
    return this.titlesService.getAll();
  }

  @UseGuards(JwtGuard)
  @UsePipes(ValidatePipe)
  @Post()
  create(@Body() data: CreateTitleDto) {
    if (Array.isArray(data)) {
      throw new HttpException(
        'Не может быть массивом!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.titlesService.create(data);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  editById(@Param('id') id: string, @Body() data: CreateTitleDto) {
    if (Array.isArray(data)) {
      throw new HttpException(
        'Не может быть массивом!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.titlesService.editById(Number(id), data);
  }
}
