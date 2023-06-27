import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { LoginUserDto } from '../users/dto/user.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ValidatePipe } from '../../../core/pipes/validate.pipe';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(ValidatePipe)
  @Post('/login')
  login(@Body() user: LoginUserDto) {
    if (Array.isArray(user)) {
      throw new HttpException(
        'Не может быть массивом!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.authService.login(user);
  }

  @UsePipes(ValidatePipe)
  @Post('/registration')
  registration(@Body() user: CreateUserDto) {
    if (Array.isArray(user)) {
      throw new HttpException(
        'Не может быть массивом!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.authService.registration(user);
  }
}
