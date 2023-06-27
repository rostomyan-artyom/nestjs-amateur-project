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
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { WizardsService } from './wizards.service';
import { JwtGuard } from '../../auth/auth/guards/jwt.guard';
import { ValidatePipe } from '../../../core/pipes/validate.pipe';
import { CreateWizardDto } from './dto/create-wizard.dto';

@Controller('/api/models')
export class WizardsController {
  constructor(private wizardsService: WizardsService) {}

  @Get()
  getActual(@Query('limit') limit: string) {
    const params = { limit };

    return this.wizardsService.getActual(params);
  }

  @Get('/first-four')
  getFilter() {
    return this.wizardsService.firstFour();
  }


  @UseGuards(JwtGuard)
  @Get('/admin/all')
  adminGetAll() {
    return this.wizardsService.getAll();
  }

  @Get('/alias/:alias')
  getByAlias(@Param('alias') alias: string) {
    return this.wizardsService.getByAlias(alias);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  editById(@Param('id') id: string, @Body() data: CreateWizardDto) {
    if (Array.isArray(data)) {
      throw new HttpException(
        'Не может быть массивом!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.wizardsService.editById(Number(id), data);
  }

  @UseGuards(JwtGuard)
  @Delete('/:id')
  deleteById(@Param('id') id: string) {
    return this.wizardsService.deleteById(Number(id));
  }

  @UseGuards(JwtGuard)
  @Get('/admin/alias/:alias')
  adminGetByAlias(@Param('alias') alias: string) {
    return this.wizardsService.getByAlias(alias);
  }

  @UseGuards(JwtGuard)
  @Get('/admin/id/:id')
  adminGetById(@Param('id') id: string) {
    return this.wizardsService.getById(Number(id));
  }

  @UseGuards(JwtGuard)
  @UsePipes(ValidatePipe)
  @Post()
  create(@Body() data: CreateWizardDto) {
    if (Array.isArray(data)) {
      throw new HttpException(
        'Не может быть массивом!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.wizardsService.create(data);
  }

  @UseGuards(JwtGuard)
  @Post(':modelId/add-image/:imageId')
  addImage(
    @Param('modelId') modelId: string,
    @Param('imageId') imageId: string,
  ) {
    return this.wizardsService.addImage(Number(modelId), Number(imageId));
  }

  @UseGuards(JwtGuard)
  @Post(':modelId/remove-image/:imageId')
  removeImage(
    @Param('modelId') modelId: string,
    @Param('imageId') imageId: string,
  ) {
    return this.wizardsService.removeImage(Number(modelId), Number(imageId));
  }
}
