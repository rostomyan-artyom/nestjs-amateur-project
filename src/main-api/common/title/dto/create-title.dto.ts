import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTitleDto {
  @IsOptional()
  @MaxLength(350, {
    message: 'Максимум 350 символов',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly 'ru-RU': string;

  @IsOptional()
  @MaxLength(350, {
    message: 'Максимум 350 символов',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly 'en-US': string;
}
