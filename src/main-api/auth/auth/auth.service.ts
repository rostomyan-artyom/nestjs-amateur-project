import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.model';
import { LoginUserDto } from '../users/dto/user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
// import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);

    if (user) {
      return this.generateToken(user);
    }

    return null;
  }

  async generateToken(user: any): Promise<{ access_token: string }> {
    const payload = {
      nickName: user.nickName,
      id: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registration(userDto: CreateUserDto): Promise<any> {
    const candidateNickname: User = await this.userRepository.findOne({
      where: { nickName: userDto.nickName },
    });

    if (candidateNickname) {
      throw new HttpException(
        `Пользователь с таким nickName уже существует`,
        HttpStatus.BAD_REQUEST,
      );
    }

    //хэшируем пароль
    const hashPassword = await bcrypt.hash(userDto.password, 5);

    //создаем юзера
    const user = await this.usersService.createNewUser({
      ...userDto,
      password: hashPassword,
    });

    //получаем полные данные о юзере
    const createdUser: User = await this.userRepository.findOne({
      where: { id: user.id },
    });

    return this.generateToken(createdUser);
  }

  async validateUser(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { nickName: loginUserDto.nickName },
      include: { all: true },
    });

    if (user && user.password) {
      const passwordEquals: boolean = await bcrypt.compare(
        loginUserDto.password,
        user.password,
      );

      if (passwordEquals) {
        return user;
      } else {
        throw new HttpException(
          { status: HttpStatus.FORBIDDEN, error: 'Неправильный пароль' },
          HttpStatus.FORBIDDEN,
        );
      }
    }

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Юзера с таким nickName не существует',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return null;
  }
}
