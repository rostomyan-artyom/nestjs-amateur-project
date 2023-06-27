import { IsDefined, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsDefined({ message: 'Обязательно к заполнению' })
  @IsString({ message: 'Должно быть строкой' })
  @MinLength(6, {
    message: 'Минимум 6 символов',
  })
  @MaxLength(25, {
    message: 'Максимум 25 символов',
  })
  readonly password: string;

  @IsDefined({ message: 'Обязательно к заполнению' })
  @IsString({ message: 'Должно быть строкой' })
  @MinLength(6, {
    message: 'Минимум 6 символов',
  })
  @MaxLength(20, {
    message: 'Максимум 20 символов',
  })
  readonly nickName: string;
}
