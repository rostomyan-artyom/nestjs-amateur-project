import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { InteriorService } from './interior.service';
import { JwtGuard } from '../../auth/auth/guards/jwt.guard';
import { ValidatePipe } from '../../../core/pipes/validate.pipe';
import { CreateInteriorDto } from './dto/create-interior.dto';

@Controller('/api/interior')
export class InteriorController {
  constructor(private interiorService: InteriorService) {}

  @Get()
  getAll() {
    return this.interiorService.getAll();
  }

  @UseGuards(JwtGuard)
  @UsePipes(ValidatePipe)
  @Post('')
  create(@Body() image: CreateInteriorDto) {
    if (Array.isArray(image)) {
      throw new HttpException(
        'Не может быть массивом!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.interiorService.create(image);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.interiorService.deleteById(Number(id));
  }
}
