import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createNewUser(dto: CreateUserDto): Promise<any> {
    const user: User = await this.userRepository.create(dto);

    return user;
  }
}
