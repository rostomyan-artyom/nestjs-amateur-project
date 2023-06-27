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
import { ProgramsTypesService } from './programs-types.service';
import { CreateProgramTypeDto } from './dto/create-program-type.dto';

@Controller('/api/programs-types')
export class ProgramsTypesController {
  constructor(private programsTypesService: ProgramsTypesService) {}

  @Get()
  getActual() {
    return this.programsTypesService.getActual();
  }

  @UseGuards(JwtGuard)
  @Get('/admin/id/:id')
  adminGetById(@Param('id') id: string) {
    return this.programsTypesService.getById(Number(id));
  }

  @UseGuards(JwtGuard)
  @Get('/admin/all')
  getAll() {
    return this.programsTypesService.getAll();
  }

  @UseGuards(JwtGuard)
  @UsePipes(ValidatePipe)
  @Post()
  create(@Body() data: CreateProgramTypeDto) {
    if (Array.isArray(data)) {
      throw new HttpException(
        'Не может быть массивом!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.programsTypesService.create(data);
  }

  @UseGuards(JwtGuard)
  @Post(':typeId/add-program/:programId')
  addProgram(
    @Param('typeId') typeId: string,
    @Param('programId') programId: string,
  ) {
    return this.programsTypesService.addProgram(
      Number(typeId),
      Number(programId),
    );
  }

  @UseGuards(JwtGuard)
  @Post(':typeId/remove-program/:programId')
  removeProgram(
    @Param('typeId') typeId: string,
    @Param('programId') programId: string,
  ) {
    return this.programsTypesService.removeProgram(
      Number(typeId),
      Number(programId),
    );
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  editById(@Param('id') id: string, @Body() data: CreateProgramTypeDto) {
    if (Array.isArray(data)) {
      throw new HttpException(
        'Не может быть массивом!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.programsTypesService.editById(Number(id), data);
  }
}
