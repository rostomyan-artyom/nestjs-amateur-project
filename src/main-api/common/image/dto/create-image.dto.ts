import { IsDefined, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateImageDto {
  @IsDefined({ message: 'Обязательно к заполнению' })
  @IsString({ message: 'Должно быть строкой' })
  readonly fileName: string;

  @IsOptional()
  @MaxLength(50, {
    message: 'Максимум 50 символов',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly alt: string;
}
