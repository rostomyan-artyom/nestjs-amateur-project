import {
  IsDefined,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateStatusDto {
  @IsDefined({ message: 'Обязательно к заполнению' })
  @MinLength(3, { message: 'Минимум 3 символа' })
  @MaxLength(150, {
    message: 'Максимум 150 символов',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly type: string;

  @IsOptional()
  @MaxLength(150, {
    message: 'Максимум 150 символов',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly description: string;
}
