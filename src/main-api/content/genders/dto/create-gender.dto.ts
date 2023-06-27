import { IsDefined, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateGenderDto {
  @IsDefined({ message: 'Обязательно к заполнению' })
  @MinLength(3, { message: 'Минимум 3 символа' })
  @MaxLength(150, {
    message: 'Максимум 150 символов',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly type: string;

  @IsDefined({ message: 'Обязательно к заполнению' })
  @IsString({ message: 'Должно быть строкой' })
  readonly description: string;
}
