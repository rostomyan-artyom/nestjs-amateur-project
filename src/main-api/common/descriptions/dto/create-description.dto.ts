import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateDescriptionDto {
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  @MaxLength(50000, {
    message: 'Максимум 50000 символов',
  })
  readonly 'ru-RU': string;

  @IsOptional()
  @MaxLength(50000, {
    message: 'Максимум 50000 символов',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly 'en-US': string;
}
