import { IsDefined, IsString } from 'class-validator';

export class LoginUserDto {
  @IsDefined({ message: 'Обязательно к заполнению' })
  @IsString({ message: 'Должно быть строкой' })
  readonly nickName: string;

  @IsDefined({ message: 'Обязательно к заполнению' })
  @IsString({ message: 'Должно быть строкой' })
  readonly password: string;
}
